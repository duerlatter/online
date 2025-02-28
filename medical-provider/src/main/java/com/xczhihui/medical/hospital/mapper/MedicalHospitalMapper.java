package com.xczhihui.medical.hospital.mapper;


import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.xczhihui.medical.doctor.model.MedicalDoctor;
import com.xczhihui.medical.field.vo.MedicalFieldVO;
import com.xczhihui.medical.hospital.model.MedicalHospital;
import com.xczhihui.medical.hospital.vo.MedicalHospitalPictureVO;
import com.xczhihui.medical.hospital.vo.MedicalHospitalSolrVO;
import com.xczhihui.medical.hospital.vo.MedicalHospitalVo;

/**
 * <p>
 * Mapper 接口
 * </p>
 *
 * @author yuxin
 * @since 2017-12-09
 */ 
public interface MedicalHospitalMapper extends BaseMapper<MedicalHospital> {

    List<String> selectHospitalIdList(@Param("page") Page<MedicalHospitalVo> page, @Param("name") String name, @Param("field") String field);

    List<MedicalHospitalVo> selectHospitalAndPictureList(List<String> mhIds);

    MedicalHospitalVo selectHospitalById(String id);

    List<MedicalHospitalVo> selectRecHospital();

    List<MedicalFieldVO> getHotField();

    List<MedicalFieldVO> selectMedicalFieldsByHospitalId(String hospitalId);

    boolean getAuthenticationById(String id);

    /**
     * 获取医疗领域
     *
     * @return 医疗领域集合
     */
    List<MedicalFieldVO> getFieldsPage(Page page);

    /**
     * 修改医馆信息
     *
     * @param medicalHospital 医馆信息的封装
     */
    void updateSelective(@Param("medicalHospital") MedicalHospital medicalHospital);

    /**
     * 根据医馆名称获取医馆信息
     *
     * @param name 医馆名称
     * @return 医馆信息
     */
    MedicalHospital findByName(String name);

    List<MedicalDoctor> selectDoctorList(@Param("page") Page<MedicalDoctor> page,
                                         @Param("doctorName") String doctorName,
                                         @Param("hospitalId") String hospitalId);

    /**
     * 根据用户id和启用状态获取医馆信息
     *
     * @param userId 用户id
     * @param status 医馆启用状态（1：启用 0：未启用）
     * @return 医馆详情
     */
    MedicalHospitalVo selectHospitalByIdAndStatus(@Param("id") String userId,
                                                  @Param("status") Integer status);

    List<MedicalHospitalSolrVO> selectHospitalList4Solr(@Param("hospitalId") String hospitalId);

    List<String> selectPictureListByHospital(@Param("hospitalId") String hospitalId);
}