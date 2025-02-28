package com.xczhihui.medical.doctor.service;

import com.xczhihui.medical.doctor.vo.MedicalDoctorAuthenticationInformationVO;

/**
 * 医师认证信息服务类
 *
 * @author zhuwenbao
 */
public interface IMedicalDoctorAuthenticationInformationService {

    /**
     * 根据用户id获取其医师认证信息
     *
     * @param userId 用户id
     */
    MedicalDoctorAuthenticationInformationVO selectDoctorAuthenticationVO(String userId);

}
