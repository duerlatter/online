package com.xczhihui.medical.doctor.service.impl;

import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.baomidou.mybatisplus.toolkit.CollectionUtils;
import com.xczhihui.medical.department.mapper.MedicalDepartmentMapper;
import com.xczhihui.medical.department.model.MedicalDepartment;
import com.xczhihui.medical.doctor.mapper.MedicalDoctorAccountMapper;
import com.xczhihui.medical.doctor.mapper.MedicalDoctorDepartmentMapper;
import com.xczhihui.medical.doctor.model.MedicalDoctorAccount;
import com.xczhihui.medical.doctor.model.MedicalDoctorDepartment;
import com.xczhihui.medical.doctor.service.IMedicalDoctorDepartmentService;
import com.xczhihui.medical.exception.MedicalException;

/**
 * 医师对应科室服务实现类
 *
 * @author zhuwenbao
 */
@Service
public class MedicalDoctorDepartmentServiceImpl extends ServiceImpl<MedicalDoctorDepartmentMapper, MedicalDoctorDepartment> implements IMedicalDoctorDepartmentService {

    @Autowired
    private MedicalDoctorDepartmentMapper doctorDepartmentMapper;
    @Autowired
    private MedicalDoctorAccountMapper doctorAccountMapper;
    @Autowired
    private MedicalDepartmentMapper departmentMapper;

    /**
     * 添加医师科室
     *
     * @param departmentId 科室信息
     * @param doctorId     医师id
     * @param createTime   创建时间
     */
    @Override
    public void add(String departmentId, String doctorId, Date createTime) {
        MedicalDoctorDepartment doctorDepartment = new MedicalDoctorDepartment();
        doctorDepartment.setId(UUID.randomUUID().toString().replace("-", ""));
        doctorDepartment.setDoctorId(doctorId);
        doctorDepartment.setDepartmentId(departmentId);
        doctorDepartment.setCreateTime(createTime);
        doctorDepartment.setDeleted(false);
        doctorDepartmentMapper.insert(doctorDepartment);
    }

    /**
     * 根据医师id获取科室列表
     *
     * @param doctorId 医师id
     * @return 科室列表
     */
    @Override
    public List<MedicalDoctorDepartment> selectByDoctorId(String doctorId) {
        return doctorDepartmentMapper.selectByDoctorId(doctorId);
    }

    /**
     * 根据用户id获取科室列表
     *
     * @param userId 用户id
     * @return 科室列表
     */
    @Override
    public List<MedicalDepartment> selectByUserId(String userId) {

        // 根据用户id获取其医馆
        MedicalDoctorAccount doctorAccount = doctorAccountMapper.getByUserId(userId);
        if (doctorAccount == null) {
            throw new MedicalException("您暂不是医师，请认证后再来");
        }

        // 根据医师id获取其科室
        List<MedicalDoctorDepartment> doctorDepartments = this.selectByDoctorId(doctorAccount.getDoctorId());

        if (CollectionUtils.isNotEmpty(doctorDepartments)) {
            List<String> ids = doctorDepartments.stream().map(MedicalDoctorDepartment::getDepartmentId).collect(Collectors.toList());

            return departmentMapper.selectBatchIds(ids);

        }

        return null;
    }
}
