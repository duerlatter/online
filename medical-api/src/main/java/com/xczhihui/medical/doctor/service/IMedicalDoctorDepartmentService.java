package com.xczhihui.medical.doctor.service;

import java.util.Date;
import java.util.List;

import com.xczhihui.medical.department.model.MedicalDepartment;
import com.xczhihui.medical.doctor.model.MedicalDoctorDepartment;

/**
 * 医师对应科室服务接口
 *
 * @author zhuwenbao
 */
public interface IMedicalDoctorDepartmentService {

    /**
     * 添加医师科室
     *
     * @param departmentId 科室信息
     * @param doctorId     医师id
     * @param createTime   创建时间
     */
    void add(String departmentId, String doctorId, Date createTime);

    /**
     * 根据医师id获取科室列表
     *
     * @param doctorId 医师id
     * @return 科室列表
     */
    List<MedicalDoctorDepartment> selectByDoctorId(String doctorId);

    /**
     * 根据用户id获取科室列表
     *
     * @param userId 用户id
     * @return 科室列表
     */
    List<MedicalDepartment> selectByUserId(String userId);

}
