package com.xczhihui.bxg.online.web.controller.ftl;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import com.baomidou.mybatisplus.plugins.Page;
import com.xczhihui.bxg.online.common.domain.OnlineUser;
import com.xczhihui.common.util.CourseUtil;
import com.xczhihui.common.util.bean.ResponseObject;
import com.xczhihui.common.util.enums.AnchorType;
import com.xczhihui.course.service.ICourseService;
import com.xczhihui.course.service.ICriticizeService;
import com.xczhihui.course.service.IFocusService;
import com.xczhihui.course.service.IMyInfoService;
import com.xczhihui.course.vo.CourseLecturVo;
import com.xczhihui.medical.doctor.model.MedicalDoctorAccount;
import com.xczhihui.medical.doctor.service.IMedicalDoctorBusinessService;
import com.xczhihui.medical.hospital.model.MedicalHospital;
import com.xczhihui.medical.hospital.service.IMedicalHospitalApplyService;


/**
 * Description：主播信息页面
 *
 * @author name：yuxin <br>
 * email: yuruixin@ixincheng.com
 * @Date: 2018/3/28 0028 下午 4:50
 **/
@Controller
@RequestMapping(value = "/anchors")
public class AnchorsController extends AbstractFtlController {


    @Autowired
    private IMyInfoService myInfoService;

    @Autowired
    @Qualifier("focusServiceRemote")
    private IFocusService focusServiceRemote;

    @Autowired
    private ICourseService courseService;

    @Autowired
    private ICriticizeService criticizeService;

    @Autowired
    private IMedicalHospitalApplyService medicalHospitalApplyService;

    @Autowired
    private IMedicalDoctorBusinessService medicalDoctorBusinessService;


    @Value("${web.url}")
    private String webUrl;


    private Logger log = LoggerFactory.getLogger(this.getClass());

    /**
     * 课程详情页面中的 推荐课程
     *
     * @return
     * @throws IOException
     */
    @RequestMapping(value = "{userId}/info", method = RequestMethod.GET)
    public ModelAndView info(HttpServletRequest req, HttpServletResponse res,
                             @PathVariable String userId) throws IOException, ServletException {

        ModelAndView view = new ModelAndView("school/anchor_details");

        //显示详情呢、大纲、评论、常见问题呢
        view.addObject("type", "info");
        view.addObject("userId", userId);
        view.addObject("webUrlParam", webUrl + "/anchors/" + userId);

        view = getHostBaseInfo(req,res,view, userId);

        //推荐课程   -- 从推荐值最高的课程里面查询啦啦啦啦。
        view.addObject("recommendCourse", getRecommendCourse());

        return view;
    }


    /**
     * 课程详情页面中的 推荐课程
     *
     * @return
     * @throws IOException
     */
    @RequestMapping(value = "{userId}/courses", method = RequestMethod.GET)
    public ModelAndView courses(HttpServletRequest request, HttpServletResponse response, @PathVariable String userId,
                                @RequestParam(required = false) Integer pageSize,
                                @RequestParam(required = false) Integer pageNumber) throws ServletException, IOException {


        pageNumber = pageNumber == null ? 1 : pageNumber;
        pageSize = pageSize == null ? 9 : pageSize;

        ModelAndView view = new ModelAndView("school/anchor_details");
        //显示详情呢、大纲、评论、常见问题呢
        view.addObject("type", "courses");
        view.addObject("userId", userId);
        view.addObject("webUrlParam", webUrl + "/anchors/" + userId);
        /**
         * 这个主播可能认证的是医馆，也可能认证的是医师
         */
        view = getHostBaseInfo(request, response, view, userId);

        //查找主播课程
        Page<CourseLecturVo> page = new Page<>();
        page.setCurrent(pageNumber);
        page.setSize(pageSize);
        Page<CourseLecturVo> list = courseService.selectLecturerAllCourse(page, userId);
        view.addObject("courseList", list);
        //推荐课程   -- 从推荐值最高的课程里面查询啦啦啦啦。
        view.addObject("recommendCourse", getRecommendCourse());

        return view;
    }


    /**
     * 课程详情页面中的 推荐课程
     *
     * @return
     * @throws IOException
     */
    @RequestMapping(value = "{userId}/comment", method = RequestMethod.GET)
    public ModelAndView comment(HttpServletRequest req, HttpServletResponse res,
                                @PathVariable String userId,
                                @RequestParam(required = false) Integer pageSize,
                                @RequestParam(required = false) Integer pageNumber) throws IOException, ServletException {


        pageNumber = pageNumber == null ? 1 : pageNumber;
        pageSize = pageSize == null ? 5 : pageSize;

        ModelAndView view = new ModelAndView("school/anchor_details");

        //显示详情呢、大纲、评论、常见问题呢
        view.addObject("type", "comment");
        view.addObject("userId", userId);
        view.addObject("webUrlParam", webUrl + "/anchors/" + userId);

        /**
         * 这个主播可能认证的是医馆，也可能认证的是医师
         */
        view = getHostBaseInfo(req,res,view, userId);

        //获取用户信息
        OnlineUser user = getCurrentUser();
        //课程评价
        Map<String, Object> map = criticizeService.getAnchorCriticizes(new Page<>(pageNumber, pageSize), userId, user != null ? user.getId() : null);
        view.addObject("criticizesMap", map);
        //查询各种平均值
        List<Double> listComment = criticizeService.selectPcUserCommentMeanCount(userId);
        view.addObject("listCommentCount", listComment);
        String strLevel = CourseUtil.criticizeStartLevel(listComment.get(7)) + "";
        view.addObject("startLevel", strLevel.replace(".", "_"));

        //推荐课程   -- 从推荐值最高的课程里面查询啦啦啦啦。
        view.addObject("recommendCourse", getRecommendCourse());

        return view;
    }

    /*
     * 获取推荐课程
     */
    private List<CourseLecturVo> getRecommendCourse() {
        //推荐课程   -- 从推荐值最高的课程里面查询啦啦啦啦。
        Page<CourseLecturVo> pageRecommend = new Page<CourseLecturVo>();
        pageRecommend.setCurrent(0);
        pageRecommend.setSize(3);
        return courseService.selectRecommendSortAndRandCourse(pageRecommend);
    }

    /*
     * 获取主播基本信息啦
     */
    private ModelAndView getHostBaseInfo(HttpServletRequest request, HttpServletResponse response, ModelAndView view, String userId) throws ServletException, IOException {
        //推荐课程   -- 从推荐值最高的课程里面查询啦啦啦啦。
        /**
         * 这个主播可能认证的是医馆，也可能认证的是医师
         */
        Map<String, Object> lecturerInfo = myInfoService.findHostInfoByIdProbablyPhysician(userId);
        if (lecturerInfo.size() == 0) {
            return to404(request,response);
        }
        view.addObject("lecturerInfo", lecturerInfo);

        MedicalHospital mha = new MedicalHospital();
        
        //1.医师2.医馆
        if (AnchorType.DOCTOR.getCode() == (Integer.parseInt(lecturerInfo.get("type").toString()))) {
            mha = medicalHospitalApplyService.getMedicalHospitalByMiddleUserId(userId);
        } else if (AnchorType.HOSPITAL.getCode() == (Integer.parseInt(lecturerInfo.get("type").toString()))) {
            mha = medicalHospitalApplyService.getMedicalHospitalByUserId(userId);
        }
        
        //认证的主播 还是 医馆
        view.addObject("hospital", mha);

        List<Integer> listff = focusServiceRemote.selectFocusOrFansCountOrCriticizeCount(userId);
        view.addObject("fansCount", listff.get(0));           //粉丝总数
        view.addObject("focusCount", listff.get(1));           //关注总数
        view.addObject("criticizeCount", listff.get(2));       //总数评论总数
        OnlineUser user = getCurrentUser();
        if (user == null) {
            view.addObject("isFours", 0);
        } else {
            Integer isFours = focusServiceRemote.isFoursLecturer(user.getId(), userId);
            view.addObject("isFours", isFours);
        }
        return view;
    }

    @RequestMapping(value = "offline", method = RequestMethod.GET)
    @ResponseBody
    public ResponseObject listOffline() {
        String userId = getUserId();
        return ResponseObject.newSuccessResponseObject(courseService.selectOfflineCourseByAnchorId(userId));
    }

    @RequestMapping(value = "doctorPost", method = RequestMethod.GET)
    public String redirectDoctorPostsRequest(@RequestParam String id) {
        MedicalDoctorAccount medicalDoctorAccount = medicalDoctorBusinessService.getByDoctorId(id);
        if (medicalDoctorAccount != null) {
            String accountId = medicalDoctorAccount.getAccountId();
            return "redirect:/anchors/" + accountId + "/info";
        }
        return "redirect:/doctors";
    }
}
