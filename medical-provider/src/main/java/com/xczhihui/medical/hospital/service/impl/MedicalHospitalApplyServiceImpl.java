package com.xczhihui.medical.hospital.service.impl;

import java.util.*;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.baomidou.mybatisplus.toolkit.CollectionUtils;
import com.xczhihui.common.support.lock.Lock;
import com.xczhihui.medical.common.enums.CommonEnum;
import com.xczhihui.medical.common.service.ICommonService;
import com.xczhihui.medical.exception.MedicalException;
import com.xczhihui.medical.hospital.enums.MedicalHospitalApplyEnum;
import com.xczhihui.medical.hospital.mapper.MedicalHospitalAccountMapper;
import com.xczhihui.medical.hospital.mapper.MedicalHospitalApplyMapper;
import com.xczhihui.medical.hospital.mapper.MedicalHospitalMapper;
import com.xczhihui.medical.hospital.model.MedicalHospital;
import com.xczhihui.medical.hospital.model.MedicalHospitalAccount;
import com.xczhihui.medical.hospital.model.MedicalHospitalApply;
import com.xczhihui.medical.hospital.service.IMedicalHospitalApplyService;

/**
 * <p>
 * 医馆入驻申请认证服务实现类
 * </p>
 *
 * @author yuxin
 * @since 2018-01-15
 */
@Service
public class MedicalHospitalApplyServiceImpl extends ServiceImpl<MedicalHospitalApplyMapper, MedicalHospitalApply> implements IMedicalHospitalApplyService {

    private final static Pattern LICENSE_FOR_PHARMACEUTICAL_TRADING_PATTERN= Pattern.compile("^[\\u4E00-\\u9FA5]{1}[A-Za-z]{2}[0-9]{7}$");
    private final static Pattern BUSINESS_LICENSE_NO_REG_PATTERN= Pattern.compile("^[0-9A-Z]{18}$");
    private final Logger logger = LoggerFactory.getLogger(getClass());


    @Autowired
    private MedicalHospitalApplyMapper applyMapper;
    @Autowired
    private MedicalHospitalAccountMapper hospitalAccountMapper;
    @Autowired
    private MedicalHospitalMapper hospitalMapper;
    @Autowired
    private ICommonService commonService;
    @Autowired
    private IMedicalHospitalApplyService medicalHospitalApplyService;

    /**
     * 添加医馆入驻申请认证信息
     *
     * @param target 医馆入驻申请认证的信息封装
     */
    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void add(MedicalHospitalApply target) {
        logger.warn(target.toString());
        medicalHospitalApplyService.addDetail(target);
    }

    @Override
    public void addDetail(MedicalHospitalApply target) {
        medicalHospitalApplyService.addDetail4Lock(target.getUserId(), target);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    @Lock(lockName = "addHospitalApply")
    public void addDetail4Lock(String lockKey, MedicalHospitalApply target) {
        // 参数校验
        this.validate(target);
        // 判断用户是否是认证医师或者认证医馆
        Integer result = commonService.isDoctorOrHospital(target.getUserId());

        // 如果用户是认证医师或者医师认证中 不让其认证医馆
        if (result.equals(CommonEnum.AUTH_DOCTOR.getCode()) ||result.equals(CommonEnum.AUTH_DOCTOR_CLOSE.getCode()) ||
                result.equals(CommonEnum.DOCTOR_APPLYING.getCode())) {
            throw new MedicalException("您已经认证了医师，不能再认证医馆");
        }

        // 如果用户认证医馆中
        if (result.equals(CommonEnum.AUTH_HOSPITAL.getCode()) ||  result.equals(CommonEnum.AUTH_HOSPITAL_CLOSE.getCode())||
                result.equals(CommonEnum.HOSPITAL_APPLYING.getCode())) {
            if (result.equals(CommonEnum.HOSPITAL_APPLYING.getCode())) {
                this.checkHospitalName(target.getName(), target.getUserId(), 1);
            }
            if (result.equals(CommonEnum.AUTH_HOSPITAL.getCode()) ||  result.equals(CommonEnum.AUTH_HOSPITAL_CLOSE.getCode())) {
                this.checkHospitalName(target.getName(), target.getUserId(), 2);
            }

            // 如果用户之前提交了申请信息 表示其重新认证 删除之前的认证信息
            applyMapper.deleteByUserIdAndStatus(target.getUserId(), MedicalHospitalApplyEnum.WAIT.getCode());

            // 新增新的认证信息
            this.addMedicalHospitalApply(target);

        }

        // 如果用户医馆认证失败，医馆认证成功，医师认证失败，或者从没申请
        if (result.equals(CommonEnum.HOSPITAL_APPLY_REJECT.getCode()) ||
                result.equals(CommonEnum.NOT_DOCTOR_AND_HOSPITAL.getCode()) ||
                result.equals(CommonEnum.DOCTOR_APPLY_REJECT.getCode())) {

            this.addMedicalHospitalApply(target);

        }

    }


    /**
     * 检查医馆名是否被占用
     *
     * @param hospitalName 医馆名
     * @param userId       用户id
     * @param status       状态（1：用户的医馆在认证中 2：用户的医馆认证已经通过）
     */
    private void checkHospitalName(String hospitalName, String userId, int status) {

        MedicalHospitalApply medicalHospitalApply = applyMapper.findByName(hospitalName);
        if (medicalHospitalApply != null && !(medicalHospitalApply.getUserId().equals(userId))) {
            throw new MedicalException("医馆名称已经在认证中");
        }

        MedicalHospital hospital = hospitalMapper.findByName(hospitalName);

        // status = 1 时 无需考虑hospital表中的医馆名是否就已经属于他的
        if (status == 1 && hospital != null) {
            throw new MedicalException("医馆名称已经被占用");
        }

        // status = 2 时 需要考虑hospital表中的医馆名是否属于他
        if (status == 2 && hospital != null) {

            Map<String, Object> columnMap = new HashMap<>();
            columnMap.put("doctor_id", hospital.getId());
            columnMap.put("account_id", userId);
            List<MedicalHospitalAccount> list = hospitalAccountMapper.selectByMap(columnMap);

            // 通过doctor_id和account_id查询不到数据 表示该医馆名不属于他的
            if (CollectionUtils.isEmpty(list)) {
                throw new MedicalException("医馆名称已经被占用");
            }
        }

    }

    private void addMedicalHospitalApply(MedicalHospitalApply target) {

        // 生成主键
        String id = UUID.randomUUID().toString().replace("-", "");
        target.setId(id);

        // 设置初始值 默认不删除 默认未处理
        target.setDeleted(false);
        target.setStatus(MedicalHospitalApplyEnum.WAIT.getCode());
        target.setCreateTime(new Date());

        applyMapper.insert(target);

    }

    /**
     * 获取用户最后一次申请认证信息
     *
     * @param userId 用户id
     * @return 最后一次申请认证信息
     */
    @Override
    public MedicalHospitalApply getLastOne(String userId) {

        MedicalHospitalApply lastApply = applyMapper.getLastOne(userId);

        return lastApply;
    }


    /**
     * 参数校验
     *
     * @param target 医馆入驻申请信息
     */
    private void validate(MedicalHospitalApply target) {

        if (StringUtils.isBlank(target.getName())) {
            throw new MedicalException("医馆名称不能为空");
        } else {
            if (target.getName().length() > 32) {
                throw new MedicalException("医馆名称应保持在32字以内");
            }
        }

        if (StringUtils.isBlank(target.getCompany())) {
            throw new MedicalException("医馆所属公司不能为空");
        } else {
            if (target.getCompany().length() > 32) {
                throw new MedicalException("医馆所属公司名应保持在32字以内");
            }
        }

        if (StringUtils.isBlank(target.getBusinessLicenseNo())) {
            throw new MedicalException("统一社会信用代码不能为空");
        } else {
            if (!BUSINESS_LICENSE_NO_REG_PATTERN.matcher(target.getBusinessLicenseNo()).matches()) {
                throw new MedicalException("统一社会信用代码格式错误");
            }
        }

        if (StringUtils.isBlank(target.getBusinessLicensePicture())) {
            throw new MedicalException("请上传营业执照");
        }

        if (StringUtils.isBlank(target.getLicenseForPharmaceuticalTrading())) {
            throw new MedicalException("药品经营许可证号码不能为空");
        } else {
            if (!LICENSE_FOR_PHARMACEUTICAL_TRADING_PATTERN.matcher(target.getLicenseForPharmaceuticalTrading()).matches()) {
                throw new MedicalException("药品经营许可证号码格式错误");
            }
        }

        if (StringUtils.isBlank(target.getLicenseForPharmaceuticalTradingPicture())) {
            throw new MedicalException("请上传药品经营许可证照片");
        }

    }

    @Override
    public MedicalHospital getMedicalHospitalByMiddleUserId(String userId) {
        return hospitalAccountMapper.getMedicalHospitalByMiddleUserId(userId);
    }

    @Override
    public MedicalHospital getMedicalHospitalByUserId(String userId) {
        return hospitalAccountMapper.getMedicalHospitalByUserId(userId);
    }

    @Override
    public MedicalHospitalAccount getByUserId(String userId) {
        return hospitalAccountMapper.getByUserId(userId);
    }

    @Override
    public MedicalHospital getMedicalHospitalByDoctorId(String doctorId) {

        return hospitalAccountMapper.getMedicalHospitalByDoctorId(doctorId);
    }
}
