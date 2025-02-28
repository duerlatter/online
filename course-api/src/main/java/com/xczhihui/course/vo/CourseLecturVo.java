package com.xczhihui.course.vo;


import com.xczhihui.common.util.XzStringUtils;

import java.io.Serializable;
import java.util.Date;
import java.util.Map;


/**
 * Created by admin on 2016/7/27.
 */
public class CourseLecturVo implements Serializable {
    /**
     * 课程ID
     */
    private Integer id;

    private Integer courseId;
    /**
     * 课程名
     */
    private String gradeName;

    /**
     * 讲师简介
     */
    private String lecturerDescription;

    /**
     * 课程小图
     */
    private String smallImgPath;


    private String userId;
    /**
     * 主播名字
     */
    private String name;

    /**
     * 上传人
     */
    private String heir;

    /**
     * 讲师头像
     */
    private String headImg;

    /**
     * 直播间id
     */
    private String directId;

    /**
     * 章节id
     */
    private String chapterId;

    /**
     * 视频 的 主键id
     */
    private String vId;

    /**
     * 直播开始时间
     */
    private Date startTime;
    /**
     * 直播结束时间
     */
    private Date endTime;
    /**
     * 当前直播状态:
     */
    private Integer lineState;

    /**
     * 现价
     */
    private double currentPrice;
    /**
     * 原价
     */
    private Double originalCost;
    /**
     * 是否付费  true 免费  false 付费
     */
    private Integer isFree;

    /**
     * 课程时长
     */
    private String courseLength;

    /**
     * 观看人数
     */
    private Integer learndCount;  //学习人数

    private Integer giftCount; //礼物数

    private Integer fansCount; //粉丝数

    private Integer focusCount; //关注数

    //打赏数量
    private String rewardCount;

    /**
     * 是否需要密码认证
     */
    private Integer isApprove;  //0 需要认证，1，不需要认证

    /**
     * 课程详情
     */
    private String description;    //来自oe_course_mobile的详情   富文本的课程详情


    private String courseDescription; //课程简介

    /**
     * 多媒体类型   1 点播  2 音频
     */
    private Integer multimediaType;
    private Integer courseForm;

    /**
     * 房间号
     */
    private Integer roomNumber;
    /**
     * 直播方式
     */
    private Integer type; //课程分类 1:公开直播课     is null ：点播

    /**
     * 是否关注了这个主播
     */
    private Integer isFocus; //课程分类   0 未关注     1 关注

    private Integer isSubscribe; //0 未预约  1预约

    private Integer watchState; //观看状态 0免费  1付费  2 需要密码验证

    private String imRoomId; //im房间号

    private String address;

    private String udescription;//讲师简介

    private String city;//线下课程所在城市

    private String courseTimeConver; //课程时间转换为: 00:00:00

    private Integer cutoff;    //  0 为截止  1 已截止

    private String userLecturerId;

    private String note; //课程分类列表中的title

    private Integer isLive; // 是否在一小时以内的数据


    private Boolean collection;

    private Integer courseNumber;

    private String subtitle; //副标题

    private Integer criticizeCount; //课程评论数

    private Double startLevel; //星级

    private String courseOutline; //大纲

    private String liveSourceType; //直播源类型  0:来自pc直播,1:来自app 直播

    private Integer applyStatus; //审核状态  0未审核 1 审核通过 2 审核未通过

    private String startDateStr; //截取的时间

    private Integer courseType;

    private String vhallId; //进入直播间后需要用这个id来判断是否是主播发布的消息

    private String vhallName; //进入直播间后需要用这个id来判断是否是主播发布的消息

    private Integer learning = 0;

    private Integer status; //是否上架      禁用0，启用，1

    private String richCourseDetailsUrl;//富文本课程详情的html片段url

    private String richHostDetailsUrl;//富文本主讲人详情的html片段url
    
    private String hostCourseDetailsUrl;//富文本主讲人课程详情的html片段url

    private Integer playBackType; //回放状态：0表示生成中，1表示生成成功，2表示生成失败

    private Boolean isDelete; // false 没有删除  true 删除

    private Integer recommendSort; // 推荐值

    private Integer dirtyNumber; //已更新多少集

    private String dirtyDate; //更新时间

    private String outlineDetailsUrl;//富文本课程大纲的html片段url

    private String doctorId; //医师id

    private Integer hostType; //主播类型：type：1 医师主播    type:2 医馆主播

    private Boolean teaching; //是否师承课程

    private String channelId;

    private String recordId;
    private Boolean record;

    private String vhallYunToken;
    private String appid;

    /**
     * 直播状况。1.正常直播 2.退出但不结束
     */
    private Integer liveCase;

    /**
     * 是否提交线下课报名表单
     */
    private boolean submitted;

    /**
     * 专辑提示。此付费课程是否包含在付费的专辑中，如果包含的话，做一个提示
     */
    private Map<String, Object> collectionHint;

    /**
     * 医师名字
     */
    private String doctorName;


    private Integer appointmentInfoId;

    private Integer liveStatus;
    
    private String  inavId;

    /**
     * 弟子名字
     */
    private String discipleName;
    /**
     * 弟子头像
     */
    private String discipleHeadPhoto;
    /**
     * 医师头像
     */
    private String doctorHeadPhoto;

    public String getAppid() {
        return appid;
    }

    public void setAppid(String appid) {
        this.appid = appid;
    }

    public Boolean getRecord() {
        return record;
    }

    public void setRecord(Boolean record) {
        this.record = record;
    }

    public Integer getCourseForm() {
        return courseForm;
    }

    public void setCourseForm(Integer courseForm) {
        this.courseForm = courseForm;
    }

    public String getUdescription() {
        return udescription;
    }

    public void setUdescription(String udescription) {
        this.udescription = udescription;
    }

    public String getGradeName() {
        return gradeName;
    }

    public void setGradeName(String gradeName) {
        this.gradeName = gradeName;
    }

    public String getSmallImgPath() {
        return smallImgPath;
    }

    public void setSmallImgPath(String smallImgPath) {
        this.smallImgPath = smallImgPath;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHeadImg() {
        return headImg;
    }

    public void setHeadImg(String headImg) {
        this.headImg = headImg;
    }

    public String getDirectId() {
        return directId;
    }

    public void setDirectId(String directId) {
        this.directId = directId;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public Integer getLineState() {
        return lineState;
    }

    public void setLineState(Integer lineState) {
        this.lineState = lineState;
    }


    public Integer getFocusCount() {
        return focusCount;
    }

    public void setFocusCount(Integer focusCount) {
        this.focusCount = focusCount;
    }

    public double getCurrentPrice() {
        return currentPrice;
    }

    public void setCurrentPrice(double currentPrice) {
        this.currentPrice = currentPrice;
    }

    public Integer getIsFree() {
        return isFree;
    }

    public void setIsFree(Integer isFree) {
        this.isFree = isFree;
    }


    public String getCourseLength() {
        return courseLength;
    }

    public void setCourseLength(String courseLength) {
        this.courseLength = courseLength;
    }

    public Integer getLearndCount() {
        return learndCount;
    }

    public void setLearndCount(Integer learndCount) {
        this.learndCount = learndCount;
    }

    public Integer getIsApprove() {
        return isApprove;
    }

    public void setIsApprove(Integer isApprove) {
        this.isApprove = isApprove;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {

        //过滤掉课程中的连接
        description = XzStringUtils.formatA(description);

        setCourseDescription(description);
        this.description = description;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Integer getCourseId() {
        return courseId;
    }

    public void setCourseId(Integer courseId) {
        this.courseId = courseId;
    }

    public Integer getMultimediaType() {
        return multimediaType;
    }

    public void setMultimediaType(Integer multimediaType) {
        this.multimediaType = multimediaType;
    }

    public Integer getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(Integer roomNumber) {
        this.roomNumber = roomNumber;
    }

    public String getCourseDescription() {
        return courseDescription;
    }

    public void setCourseDescription(String courseDescription) {
        this.courseDescription = courseDescription;
    }

    public Integer getIsSubscribe() {
        return isSubscribe;
    }

    public void setIsSubscribe(Integer isSubscribe) {
        this.isSubscribe = isSubscribe;
    }

    public Integer getWatchState() {
        return watchState;
    }

    public void setWatchState(Integer watchState) {
        this.watchState = watchState;
    }

    public Integer getGiftCount() {
        return giftCount;
    }

    public void setGiftCount(Integer giftCount) {
        this.giftCount = giftCount;
    }

    public String getImRoomId() {
        return imRoomId;
    }

    public void setImRoomId(String imRoomId) {
        this.imRoomId = imRoomId;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getRewardCount() {
        return rewardCount;
    }

    public void setRewardCount(String rewardCount) {
        this.rewardCount = rewardCount;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getChapterId() {
        return chapterId;
    }

    public void setChapterId(String chapterId) {
        this.chapterId = chapterId;
    }

    public String getvId() {
        return vId;
    }

    public void setvId(String vId) {
        this.vId = vId;
    }

    public String getCourseTimeConver() {
        return courseTimeConver;
    }

    public void setCourseTimeConver(String courseTimeConver) {
        this.courseTimeConver = courseTimeConver;
    }

    public Integer getCutoff() {
        return cutoff;
    }

    public void setCutoff(Integer cutoff) {
        this.cutoff = cutoff;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getUserLecturerId() {
        return userLecturerId;
    }

    public void setUserLecturerId(String userLecturerId) {
        this.userLecturerId = userLecturerId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getFansCount() {
        return fansCount;
    }

    public void setFansCount(Integer fansCount) {
        this.fansCount = fansCount;
    }

    public String getLecturerDescription() {
        return lecturerDescription;
    }

    public void setLecturerDescription(String lecturerDescription) {
        //过滤掉课程中的连接
        lecturerDescription = XzStringUtils.formatA(lecturerDescription);

        this.lecturerDescription = lecturerDescription;
    }

    public Boolean getCollection() {
        return collection;
    }

    public void setCollection(Boolean collection) {
        this.collection = collection;
    }

    public Integer getCourseNumber() {
        return courseNumber;
    }

    public void setCourseNumber(Integer courseNumber) {
        this.courseNumber = courseNumber;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public void setSubtitle(String subtitle) {

        this.subtitle = subtitle;
    }

    public Integer getCriticizeCount() {
        return criticizeCount;
    }

    public void setCriticizeCount(Integer criticizeCount) {
        this.criticizeCount = criticizeCount;
    }

    public Double getStartLevel() {

        return startLevel;
    }

    public void setStartLevel(Double startLevel) {

        this.startLevel = startLevel;
    }

    public String getCourseOutline() {
        return courseOutline;
    }

    public void setCourseOutline(String courseOutline) {

        //过滤掉课程中的连接
        courseOutline = XzStringUtils.formatA(courseOutline);

        this.courseOutline = courseOutline;
    }

    public Integer getIsLive() {
        return isLive;
    }

    public void setIsLive(Integer isLive) {
        this.isLive = isLive;
    }

    public String getLiveSourceType() {
        return liveSourceType;
    }

    public void setLiveSourceType(String liveSourceType) {
        this.liveSourceType = liveSourceType;
    }

    public Integer getApplyStatus() {
        return applyStatus;
    }

    public void setApplyStatus(Integer applyStatus) {
        this.applyStatus = applyStatus;
    }

    public Integer getIsFocus() {
        return isFocus;
    }

    public void setIsFocus(Integer isFocus) {
        this.isFocus = isFocus;
    }

    public String getStartDateStr() {
        return startDateStr;
    }

    public void setStartDateStr(String startDateStr) {
        this.startDateStr = startDateStr;
    }

    public String getHeir() {
        return heir;
    }

    public void setHeir(String heir) {
        this.heir = heir;
    }

    public Integer getCourseType() {
        return courseType;
    }

    public void setCourseType(Integer courseType) {
        this.courseType = courseType;
    }

    public String getVhallId() {
        return vhallId;
    }

    public void setVhallId(String vhallId) {
        this.vhallId = vhallId;
    }

    public Integer getLearning() {
        return learning;
    }

    public void setLearning(Integer learning) {
        this.learning = learning;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getRichCourseDetailsUrl() {

        return richCourseDetailsUrl;
    }

    public void setRichCourseDetailsUrl(String richCourseDetailsUrl) {


        this.richCourseDetailsUrl = richCourseDetailsUrl;
    }

    public String getRichHostDetailsUrl() {
        return richHostDetailsUrl;
    }

    public void setRichHostDetailsUrl(String richHostDetailsUrl) {
        this.richHostDetailsUrl = richHostDetailsUrl;
    }

    public String getVhallName() {
        return vhallName;
    }

    public void setVhallName(String vhallName) {
        this.vhallName = vhallName;
    }

    public Integer getPlayBackType() {
        return playBackType;
    }

    public void setPlayBackType(Integer playBackType) {
        this.playBackType = playBackType;
    }

    public Boolean getIsDelete() {
        return isDelete;
    }

    public void setIsDelete(Boolean isDelete) {
        this.isDelete = isDelete;
    }

    public Integer getRecommendSort() {
        return recommendSort;
    }

    public void setRecommendSort(Integer recommendSort) {
        this.recommendSort = recommendSort;
    }

    public Boolean getDelete() {
        return isDelete;
    }

    public void setDelete(Boolean delete) {
        isDelete = delete;
    }

    public boolean isSubmitted() {
        return submitted;
    }

    public void setSubmitted(boolean submitted) {
        this.submitted = submitted;
    }

    public Integer getDirtyNumber() {
        return dirtyNumber;
    }

    public void setDirtyNumber(Integer dirtyNumber) {
        this.dirtyNumber = dirtyNumber;
    }

    public String getDirtyDate() {
        return dirtyDate;
    }

    public void setDirtyDate(String dirtyDate) {
        this.dirtyDate = dirtyDate;
    }

    public String getOutlineDetailsUrl() {
        return outlineDetailsUrl;
    }

    public void setOutlineDetailsUrl(String outlineDetailsUrl) {
        this.outlineDetailsUrl = outlineDetailsUrl;
    }

    public String getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(String doctorId) {
        this.doctorId = doctorId;
    }

    public Integer getHostType() {
        return hostType;
    }

    public void setHostType(Integer hostType) {
        this.hostType = hostType;
    }

    public Double getOriginalCost() {
        return originalCost;
    }

    public void setOriginalCost(Double originalCost) {
        this.originalCost = originalCost;
    }

    public Boolean getTeaching() {
        return teaching;
    }

    public void setTeaching(Boolean teaching) {
        this.teaching = teaching;
    }

    public String getChannelId() {
        return channelId;
    }

    public void setChannelId(String channelId) {
        this.channelId = channelId;
    }

    public String getRecordId() {
        return recordId;
    }

    public void setRecordId(String recordId) {
        this.recordId = recordId;
    }

    public String getVhallYunToken() {
        return vhallYunToken;
    }

    public void setVhallYunToken(String vhallYunToken) {
        this.vhallYunToken = vhallYunToken;
    }

    public Integer getLiveCase() {
        return liveCase;
    }

    public void setLiveCase(Integer liveCase) {
        this.liveCase = liveCase;
    }

    public Map<String, Object> getCollectionHint() {
        return collectionHint;
    }

    public void setCollectionHint(Map<String, Object> collectionHint) {
        this.collectionHint = collectionHint;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }


    public Integer getAppointmentInfoId() {
		return appointmentInfoId;
	}

	public void setAppointmentInfoId(Integer appointmentInfoId) {
		this.appointmentInfoId = appointmentInfoId;
	}

	public Integer getLiveStatus() {
        return liveStatus;
    }

    public void setLiveStatus(Integer liveStatus) {
        this.liveStatus = liveStatus;
    }

	public String getInavId() {
		return inavId;
	}

	public void setInavId(String inavId) {
		this.inavId = inavId;
	}

    public String getDiscipleName() {
        return discipleName;
    }

    public void setDiscipleName(String discipleName) {
        this.discipleName = discipleName;
    }

    public String getDiscipleHeadPhoto() {
        return discipleHeadPhoto;
    }

    public void setDiscipleHeadPhoto(String discipleHeadPhoto) {
        this.discipleHeadPhoto = discipleHeadPhoto;
    }

    public String getDoctorHeadPhoto() {
        return doctorHeadPhoto;
    }

    public void setDoctorHeadPhoto(String doctorHeadPhoto) {
        this.doctorHeadPhoto = doctorHeadPhoto;
    }

	public String getHostCourseDetailsUrl() {
		return hostCourseDetailsUrl;
	}

	public void setHostCourseDetailsUrl(String hostCourseDetailsUrl) {
		this.hostCourseDetailsUrl = hostCourseDetailsUrl;
	}
    
}
