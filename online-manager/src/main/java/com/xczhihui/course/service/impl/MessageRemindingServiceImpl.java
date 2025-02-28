package com.xczhihui.course.service.impl;

import static com.xczhihui.common.util.enums.RouteTypeEnum.COMMON_COURSE_DETAIL_PAGE;
import static com.xczhihui.common.util.enums.RouteTypeEnum.COMMON_LEARNING_LIVE_COURSE_DETAIL_PAGE;
import static com.xczhihui.common.util.redis.key.RedisCacheKey.LIVE_COURSE_REMIND_LAST_TIME_KEY;

import java.text.MessageFormat;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.xczhihui.anchor.service.AnchorService;
import com.xczhihui.bxg.online.common.domain.Course;
import com.xczhihui.bxg.online.common.domain.CourseAnchor;
import com.xczhihui.bxg.online.common.domain.OnlineUser;
import com.xczhihui.bxg.online.common.domain.User;
import com.xczhihui.common.support.service.CacheService;
import com.xczhihui.common.support.service.impl.RedisCacheService;
import com.xczhihui.common.util.DateUtil;
import com.xczhihui.common.util.SmsUtil;
import com.xczhihui.common.util.TimeUtil;
import com.xczhihui.common.util.bean.MinuteTaskMessageVo;
import com.xczhihui.common.util.enums.MessageTypeEnum;
import com.xczhihui.common.util.enums.RouteTypeEnum;
import com.xczhihui.common.util.redis.key.RedisCacheKey;
import com.xczhihui.course.dao.CollectionCourseApplyUpdateDateDao;
import com.xczhihui.course.dao.CourseDao;
import com.xczhihui.course.params.BaseMessage;
import com.xczhihui.course.service.ICommonMessageService;
import com.xczhihui.course.service.MessageRemindingService;
import com.xczhihui.course.util.TextStyleUtil;
import com.xczhihui.user.dao.UserDao;
import com.xczhihui.user.service.OnlineUserService;
import com.xczhihui.user.service.UserService;

/**
 * Description: <br>
 *
 * @author: name：yuxin <br>
 * 			email: yuruixin@ixincheng.com <br>
 *          Create Time: 2018/5/9 0009-下午 1:43<br>
 */
@Service
public class MessageRemindingServiceImpl implements MessageRemindingService {

	private static final String APP_PUSH_LIVE_COURSE_REMIND = "{0}老师叫你去上课了！您报名的《{1}》直播还有{2}分钟就要开始了，别忘了准时观看";
	private static final String WEB_LIVE_COURSE_REMIND = "【上课提醒】{0}老师叫你去上课了！您报名的" + TextStyleUtil.LEFT_TAG + "《{1}》"
			+ TextStyleUtil.RIGHT_TAG + "直播还有{2}分钟就要开始了，别忘了准时观看";
	private static final String APP_PUSH_OFFLINE_COURSE_REMIND = "您报名的《{0}》将于明天{1}在{2}开始，别忘了准时参加！";
	private static final String WEB_OFFLINE_COURSE_REMIND = "【上课提醒】您报名的" + TextStyleUtil.LEFT_TAG + "《{0}》"
			+ TextStyleUtil.RIGHT_TAG + "将于明天{1}在{2}开始，别忘了准时参加！";
	private static final String APP_PUSH_COLLECTION_COURSE_REMIND = "您的专辑课程《{0}》需要更新啦~更新时间为每周{1}";
	private static final String WEB_COLLECTION_COURSE_REMIND = "【课程更新提示】您的专辑课程《{0}》需要更新啦~更新时间为每周{1}";
	CacheService cacheService;
	@Autowired
	CourseDao courseDao;
	private Logger loggger = LoggerFactory.getLogger(this.getClass());
	@Value("${sms.live.course.remind.code}")
	private String sendLiveRemindCode;
	@Value("${sms.offline.course.remind.code}")
	private String sendOfflineRemindCode;
	@Value("${sms.update.course.remind.code}")
	private String sendCourseUpdateRemindCode;
	@Value("${weixin.course.remind.code}")
	private String weixinTemplateMessageRemindCode;
	@Value("${mobile.domain}")
	private String mobileDomain;
	@Autowired
	private CollectionCourseApplyUpdateDateDao collectionCourseApplyUpdateDateDao;
	@Autowired
	private ICommonMessageService commonMessageService;
	@Autowired
	private AnchorService anchorService;
	
	@Autowired
	private OnlineUserService onlineUserService;

	@Value("${env.flag}")
	private String envFlag;
	
	@Value("${sms.remote.doctor.remind.code}")
	private String sendRemoteTreatmentDoctorCode;
	@Value("${sms.remote.disciple.remind.code}")
	private String sendRemoteTreatmentDiscipleCode;
	

	MessageRemindingServiceImpl() {
		cacheService = new RedisCacheService();
	}

	@Override
	public void saveCourseMessageReminding(Course course, String redisKey) {
		cacheService.set(redisKey + RedisCacheKey.REDIS_SPLIT_CHAR + course.getId(), course);
	}

	@Override
	public void deleteCourseMessageReminding(Course course, String redisKey) {
		cacheService.delete(redisKey + RedisCacheKey.REDIS_SPLIT_CHAR + course.getId());
	}

	@Override
	public List<Course> getCourseMessageRemindingList(String redisKey) {
		Set<String> keys = cacheService.getKeys(redisKey);
		List<Course> courses = new ArrayList<>();
		for (String key : keys) {
			Course course = cacheService.get(key);
			courses.add(course);
		}
		return courses;
	}

	@Override
	public void offlineCourseMessageReminding() {
		List<Course> courseMessageRemindingList = getCourseMessageRemindingList(
				RedisCacheKey.OFFLINE_COURSE_REMIND_KEY);
		Date today = new Date();
		for (Course course : courseMessageRemindingList) {
			// 之前的课程未提醒,需移除掉
			if (course.getStartTime() != null && today.after(course.getStartTime())) {
				deleteCourseMessageReminding(course, RedisCacheKey.OFFLINE_COURSE_REMIND_KEY);
			} else {
				// 开始时间是明天
				if (TimeUtil.isTomorrow(course.getStartTime())) {
					List<OnlineUser> users = getUsersByCourseId(course.getId(), null);
					String courseName = course.getGradeName();
					String address = course.getAddress();
					String time = TimeUtil.getHourMonth(course.getStartTime());
					Map<String, String> smsParams = new HashMap<>(3);
					smsParams.put("courseName", courseName);
					smsParams.put("time", time);
					smsParams.put("address", address);

					String commonContent = MessageFormat.format(WEB_OFFLINE_COURSE_REMIND, courseName, time, address);
					Map<String, String> weixinParams = new HashMap<>(4);
					weixinParams.put("first", TextStyleUtil.clearStyle(commonContent));
					weixinParams.put("keyword1", courseName);
					weixinParams.put("keyword2",
							course.getStartTime() != null ? TimeUtil.getYearMonthDayHHmm(course.getStartTime())
									: "随到随学");
					weixinParams.put("remark", "");
					for (OnlineUser user : users) {
						BaseMessage baseMessage = new BaseMessage.Builder(MessageTypeEnum.COURSE.getVal())
								.buildWeb(commonContent)
								.buildAppPush(
										MessageFormat.format(APP_PUSH_OFFLINE_COURSE_REMIND, courseName, time, address))
								.buildWeixin(weixinTemplateMessageRemindCode, weixinParams)
								.buildSms(sendOfflineRemindCode, smsParams).detailId(String.valueOf(course.getId()))
								.build(user.getId(), COMMON_COURSE_DETAIL_PAGE, null);
						commonMessageService.saveMessage(baseMessage);
					}
				}
			}
		}
	}

	@Override
	public void collectionUpdateRemind() {
		List<Course> courseMessageRemindingList = getCourseMessageRemindingList(
				RedisCacheKey.COLLECTION_COURSE_REMIND_KEY);
		Date today = new Date();
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(today);
		Integer day = calendar.get(Calendar.DAY_OF_WEEK);
		// 周几
		day = day == 1 ? 7 : day - 1;
		for (Course course : courseMessageRemindingList) {
			List<Integer> dates = collectionCourseApplyUpdateDateDao.getUpdateDatesByCollectionId(course.getId());
			if (dates.isEmpty()) {
				deleteCourseMessageReminding(course, RedisCacheKey.COLLECTION_COURSE_REMIND_KEY);
			} else if (dates.contains(day)) {
				String courseName = course.getGradeName();
				String address = course.getAddress();
				String dateStr = dates.stream().map(DateUtil::getDayOfWeek).collect(Collectors.joining(","));
				Map<String, String> params = new HashMap<>(1);
				params.put("courseName", courseName);
				String commonContent = MessageFormat.format(WEB_COLLECTION_COURSE_REMIND, courseName, dateStr);

				Map<String, String> weixinParams = new HashMap<>(4);
				weixinParams.put("first", TextStyleUtil.clearStyle(commonContent));
				weixinParams.put("keyword1", courseName);
				weixinParams.put("keyword2", "随到随学");
				weixinParams.put("remark", "");
				BaseMessage baseMessage = new BaseMessage.Builder(MessageTypeEnum.COURSE.getVal())
						.buildWeb(commonContent)
						.buildAppPush(MessageFormat.format(APP_PUSH_COLLECTION_COURSE_REMIND, courseName, dateStr))
						.buildSms(sendCourseUpdateRemindCode, params)
						.buildWeixin(weixinTemplateMessageRemindCode, weixinParams)
						.detailId(String.valueOf(course.getId()))
						.build(course.getUserLecturerId(), RouteTypeEnum.COLLECTION_COURSE_LIST_ONLY_WEB, null);
				commonMessageService.saveMessage(baseMessage);
			}
		}
	}

	@Override
	public void liveCourseMessageReminding() {
		List<Course> courseMessageRemindingList = getCourseMessageRemindingList(RedisCacheKey.LIVE_COURSE_REMIND_KEY);
		for (Course course : courseMessageRemindingList) {
			if (course.getStartTime() != null) {
				String time = new SimpleDateFormat("yyyy-MM-dd HH:mm").format(course.getStartTime());
				Instant startTime = course.getStartTime().toInstant();
				Instant now = Instant.now();
				long seconds = Duration.between(now, startTime).getSeconds();
				Integer id = course.getId();
				String key = LIVE_COURSE_REMIND_LAST_TIME_KEY + RedisCacheKey.REDIS_SPLIT_CHAR + id;
				if (seconds <= (60 * 10 + 30)) {
					long minute = (long) Math.ceil(seconds / 60.0);
					if (minute <= 0) {
						deleteCourseMessageReminding(course, RedisCacheKey.LIVE_COURSE_REMIND_KEY);
						cacheService.delete(key);
					} else {
						// 发送提醒
						Date lastTime = cacheService.get(key);
						List<OnlineUser> users;
						// 还没推送过
						if (lastTime == null) {
							users = getUsersByCourseId(id, null);
						} else {
							users = getUsersByCourseId(id, lastTime);
						}
						if (users.isEmpty()) {
							continue;
						}
						cacheService.set(key, new Date(), 24 * 60 * 60);
						String courseName = course.getGradeName();
						CourseAnchor courseAnchor = anchorService.findByUserId(course.getUserLecturerId());
						if (courseAnchor != null) {
							String lecturer = courseAnchor.getName();
							String commonContent = MessageFormat.format(WEB_LIVE_COURSE_REMIND, lecturer, courseName,
									minute);
							Map<String, String> params = new HashMap<>(4);
							params.put("courseName", courseName);
							params.put("lecture", lecturer);
							params.put("minute", String.valueOf(minute));
							params.put("code", String.valueOf(id) + " ");
							Map<String, String> weixinParams = new HashMap<>(4);
							weixinParams.put("first", TextStyleUtil.clearStyle(commonContent));
							weixinParams.put("keyword1", courseName);
							weixinParams.put("keyword2", time);
							weixinParams.put("remark", "");
							for (OnlineUser user : users) {
								loggger.info("推送给:{}", user.getName());
								commonMessageService.saveMessage(
										new BaseMessage.Builder(MessageTypeEnum.COURSE.getVal()).buildWeb(commonContent)
												.buildAppPush(MessageFormat.format(APP_PUSH_LIVE_COURSE_REMIND,
														lecturer, courseName, minute))
												.buildWeixin(weixinTemplateMessageRemindCode, weixinParams)
												.buildSms(sendLiveRemindCode, params).detailId(String.valueOf(id))
												.build(user.getId(), COMMON_LEARNING_LIVE_COURSE_DETAIL_PAGE, null));
							}
						}
					}
				}
			}
		}
	}

	private List<OnlineUser> getUsersByCourseId(Integer id, Date lastTime) {
        return courseDao.getUsersByCourseId(id, lastTime);
    }

	@Override
	public synchronized void minuteTaskMessage() {
		
		
		List<MinuteTaskMessageVo> listMinuteTaskMessageVo =   getCommonMinuteRemindingList(RedisCacheKey.COMMON_MINUTE_REMIND_KEY);
		
        for (MinuteTaskMessageVo mv : listMinuteTaskMessageVo) {
        	
        	//远程诊疗提醒
        	if(RedisCacheKey.TREATMENT_MINUTE_TYPE.equals(mv.getMessageType())) {
                if (mv.getStartTime() != null) {
                    Instant startTime = mv.getStartTime().toInstant();
                    Instant now = Instant.now();
                    long seconds = Duration.between(now, startTime).getSeconds();
                    
                    
                    String key = RedisCacheKey.COMMON_MINUTE_REMIND_KEY +
                    				RedisCacheKey.REDIS_SPLIT_CHAR +
                    		RedisCacheKey.TREATMENT_MINUTE_TYPE +
                    			    RedisCacheKey.REDIS_SPLIT_CHAR +
                    		mv.getTypeUnique();
                    
                    if (seconds <= (60 * 10 + 30)) {
                    	/*
                    	 * 数据准备
                    	 */
                    	//yyyy年MM月dd日 HH时mm分
                    	String strStartTime =  DateUtil.formatDate(mv.getStartTime(),DateUtil.FORMAT_CHINA_MINUTE);
                    	//HH时mm分
                    	String strEndTime =   DateUtil.formatDate(mv.getEndTime(),DateUtil.FORMAT_CHINA_HOUR_MINUTE);
                    	
                    	OnlineUser doctor = onlineUserService.getOnlineUserByUserId(mv.getDoctorUserId());
                    	OnlineUser user =  onlineUserService.getOnlineUserByUserId(mv.getUserId());
                    	
                        Map<String, String> doctorParams = new HashMap<>();
                        doctorParams.put("startTime", strStartTime);
                        doctorParams.put("endTime", strEndTime);
                        
                        Map<String, String> userParams = new HashMap<>();
                        userParams.put("name", mv.getDoctorName());
                        userParams.putAll(doctorParams);
                        
                        /**
                         * 发送短信
                         */
                        //给弟子发送	
                        SmsUtil.sendSMS(sendRemoteTreatmentDiscipleCode, userParams, user.getLoginName());
                        //给医师发送
                        SmsUtil.sendSMS(sendRemoteTreatmentDoctorCode, doctorParams,doctor.getLoginName());
                        
                        //删除
                        cacheService.delete(key);
                    }    
                }
        	}   
        }
	}

	private List<MinuteTaskMessageVo> getCommonMinuteRemindingList(String commonMinuteRemindKey) {
		Set<String> keys = cacheService.getKeys(commonMinuteRemindKey);
		List<MinuteTaskMessageVo> courses = new ArrayList<>();
		for (String key : keys) {
			MinuteTaskMessageVo course = cacheService.get(key);
			courses.add(course);
		}
		return courses;
	}
}
