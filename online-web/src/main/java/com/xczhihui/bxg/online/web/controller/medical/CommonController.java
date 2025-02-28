package com.xczhihui.bxg.online.web.controller.medical;

import com.xczhihui.bxg.online.common.domain.OnlineUser;
import com.xczhihui.bxg.online.web.base.common.OnlineResponse;
import com.xczhihui.bxg.online.web.controller.AbstractController;
import com.xczhihui.common.support.domain.Attachment;
import com.xczhihui.common.support.service.AttachmentCenterService;
import com.xczhihui.common.support.service.AttachmentType;
import com.xczhihui.common.util.bean.ResponseObject;
import com.xczhihui.medical.common.service.ICommonService;
import com.xczhihui.medical.doctor.model.MedicalDoctorAccount;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.ServletRequestBindingException;
import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/medical/common")
public class CommonController extends AbstractController {

    @Autowired
    private ICommonService commonService;
    @Autowired
    private AttachmentCenterService attachmentCenterService;

    /**
     * 上传图片
     */
    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    public ResponseObject upload(HttpServletRequest request,  @RequestParam("image")MultipartFile file) throws ServletRequestBindingException, IOException {

        // 获取当前用户
        OnlineUser loginUser = getCurrentUser();
        if (loginUser == null) {
            return OnlineResponse.newErrorOnlineResponse("请登录！");
        }
        String userId = loginUser.getId();
        byte[] bs = file.getBytes();

        Attachment attachment = attachmentCenterService.addAttachment(userId,
                AttachmentType.ONLINE,
                userId + System.currentTimeMillis() + ".png", bs,
                org.springframework.util.StringUtils.getFilenameExtension(userId + System.currentTimeMillis() + ".png"));

        return ResponseObject.newSuccessResponseObject(attachment.getUrl());

    }

    /**
     * 判断用户是医师还是医馆,是否具有主播权限
     */
    @RequestMapping(value = "/isDoctorOrHospital", method = RequestMethod.GET)
    public ResponseObject isDoctorOrHospital(HttpServletRequest request) throws ServletRequestBindingException, IOException {
        // 获取当前用户
        OnlineUser loginUser = getCurrentUser();
        Integer isDoctorOrHospital = commonService.isDoctorOrHospital(loginUser.getId());
        Integer anchorPower = commonService.isAnchorPower(loginUser.getId());
        Map result = new HashMap();
        result.put("isDoctorOrHospital",isDoctorOrHospital);
        result.put("anchorPower",anchorPower);
        return ResponseObject.newSuccessResponseObject(result);
    }

    /**
     * 通过用户获取医师信息
     */
    @RequestMapping(value = "/getDoctorByUserId", method = RequestMethod.GET)
    public ResponseObject getDoctorByUserId(HttpServletRequest request) throws ServletRequestBindingException, IOException {
        // 获取当前用户
        OnlineUser loginUser = getCurrentUser();
        MedicalDoctorAccount medicalDoctorAccount = commonService.isDoctorStatus(loginUser.getId());
        return ResponseObject.newSuccessResponseObject(medicalDoctorAccount);
    }
}
