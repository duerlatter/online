package com.xczhihui.bxg.online.web.controller.medical;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.xczhihui.bxg.online.common.domain.OnlineUser;
import com.xczhihui.bxg.online.web.controller.AbstractController;
import com.xczhihui.bxg.online.web.service.UserService;
import com.xczhihui.bxg.online.web.vo.UserDataVo;
import com.xczhihui.common.util.bean.ResponseObject;
import com.xczhihui.common.util.enums.ClientType;
import com.xczhihui.medical.hospital.model.MedicalHospitalApply;
import com.xczhihui.medical.hospital.service.IMedicalHospitalApplyService;

/**
 * 医馆入驻申请控制层
 *
 * @author zhuwenbao
 * @date 2018-01-17
 */
@RestController
@RequestMapping(value = "/hospital/apply")
public class HospitalApplyController extends AbstractController {

    @Autowired
    private IMedicalHospitalApplyService applyService;
    @Autowired
    private UserService userService;

    /**
     * 添加医馆入驻申请
     *
     * @param target 医师入驻申请信息
     */
    @RequestMapping(method = RequestMethod.POST)
    public ResponseObject add(MedicalHospitalApply target) {

        ResponseObject responseObj = new ResponseObject();

        if (target == null) {
            responseObj.setSuccess(false);
            responseObj.setErrorMessage("请求参数不能为空");
            return responseObj;
        }

        // 获取发起申请的用户id
        OnlineUser loginUser = getCurrentUser();
        UserDataVo currentUser = userService.getUserData(loginUser);

        target.setUserId(currentUser.getUid());
        target.setClientType(ClientType.PC.getCode());

        applyService.add(target);

        responseObj.setSuccess(true);
        responseObj.setErrorMessage("入驻申请信息提交成功");
        return responseObj;
    }

    /**
     * 根据用户id获取最后一条医馆入驻申请信息
     */
    @RequestMapping(value = "/getLastOne", method = RequestMethod.GET)
    public ResponseObject getLastOne(HttpServletRequest request) {

        // 获取当前用户
        OnlineUser loginUser = getCurrentUser();
        UserDataVo currentUser = userService.getUserData(loginUser);

        return ResponseObject.newSuccessResponseObject(applyService.getLastOne(currentUser.getUid()));
    }

}
