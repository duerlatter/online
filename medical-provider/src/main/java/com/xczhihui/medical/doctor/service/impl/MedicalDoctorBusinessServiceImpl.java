package com.xczhihui.medical.doctor.service.impl;

import com.baomidou.mybatisplus.plugins.Page;
import com.baomidou.mybatisplus.toolkit.CollectionUtils;
import com.xczhihui.common.util.XzStringUtils;
import com.xczhihui.common.util.enums.HeadlineType;
import com.xczhihui.medical.department.mapper.MedicalDepartmentMapper;
import com.xczhihui.medical.department.model.MedicalDepartment;
import com.xczhihui.medical.department.vo.MedicalDepartmentVO;
import com.xczhihui.medical.doctor.mapper.*;
import com.xczhihui.medical.doctor.model.*;
import com.xczhihui.medical.doctor.service.IMedicalDoctorBusinessService;
import com.xczhihui.medical.doctor.service.IMedicalDoctorDepartmentService;
import com.xczhihui.medical.doctor.service.IMedicalDoctorSolrService;
import com.xczhihui.medical.doctor.vo.*;
import com.xczhihui.medical.exception.MedicalException;
import com.xczhihui.medical.field.vo.MedicalFieldVO;
import com.xczhihui.medical.headline.mapper.OeBxsArticleMapper;
import com.xczhihui.medical.hospital.mapper.MedicalHospitalAccountMapper;
import com.xczhihui.medical.hospital.mapper.MedicalHospitalDoctorMapper;
import com.xczhihui.medical.hospital.mapper.MedicalHospitalMapper;
import com.xczhihui.medical.hospital.model.MedicalHospital;
import com.xczhihui.medical.hospital.model.MedicalHospitalAccount;
import com.xczhihui.medical.hospital.model.MedicalHospitalDoctor;
import com.xczhihui.medical.hospital.service.IMedicalHospitalApplyService;
import com.xczhihui.medical.hospital.service.IMedicalHospitalBusinessService;
import com.xczhihui.medical.hospital.vo.MedicalHospitalVo;
import org.apache.commons.lang3.StringUtils;
import org.apache.solr.client.solrj.SolrServerException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

/**
 * ClassName: MedicalDoctorBusinessServiceImpl.java <br>
 * Description:医师业务接口类 <br>
 * Create by: name：yuxin <br>email: yuruixin@ixincheng.com <br>
 * Create Time: 下午 11:24 2017/12/9 0009<br>
 */
@Service
public class MedicalDoctorBusinessServiceImpl implements IMedicalDoctorBusinessService {
    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private MedicalDoctorMapper medicalDoctorMapper;
    @Autowired
    private IMedicalHospitalBusinessService iMedicalHospitalBusinessService;
    @Autowired
    private MedicalDoctorAuthenticationInformationMapper medicalDoctorAuthenticationInformationMapper;
    @Autowired
    private OeBxsArticleMapper oeBxsArticleMapper;
    @Autowired
    private MedicalHospitalMapper medicalHospitalMapper;
    @Autowired
    private MedicalDoctorAccountMapper medicalDoctorAccountMapper;
    @Autowired
    private MedicalHospitalAccountMapper hospitalAccountMapper;
    @Autowired
    private MedicalHospitalDoctorMapper hospitalDoctorMapper;
    @Autowired
    private ThreadPoolTaskExecutor commonThreadPoolTaskExecutor;
    @Autowired
    private MedicalDoctorDepartmentMapper doctorDepartmentMapper;
    @Autowired
    private MedicalDepartmentMapper departmentMapper;
    @Autowired
    private IMedicalDoctorDepartmentService medicalDoctorDepartmentService;

    @Autowired
    private IMedicalHospitalApplyService medicalHospitalApplyService;
    
    @Autowired
    private IMedicalDoctorSolrService medicalDoctorSolrService;
    
    @Autowired
    private DoctorTypeMapper doctorTypeMapper;
    
    @Override
    public Page<MedicalDoctorVO> selectDoctorPage(Page<MedicalDoctorVO> page, Integer type, String hospitalId, String name, String field, String departmentId) {
        List<MedicalDoctorVO> records = null;
        if (page.getSize() == 4 && StringUtils.isBlank(hospitalId)) {
            int unRecommendCount = medicalDoctorMapper.selectDoctorListCount(type);
            int recommendCount = medicalDoctorMapper.selectDoctorRecommendListCount(type);

            int rows = 4;
            int offset = 0;
            Random random = new Random();
            if (recommendCount > rows) {
                recommendCount = random.nextInt(recommendCount);
                offset = recommendCount - rows;
                if (offset < 0) {
                    offset = 0;
                }
            }
            records = medicalDoctorMapper.selectDoctorRecommendList4Random(type, offset, rows);
            if (records.size() < 4) {
                offset = 0;
                rows = 4 - records.size();
                if (unRecommendCount > rows) {
                    unRecommendCount = random.nextInt(unRecommendCount);
                    offset = unRecommendCount - rows;
                    if (offset < 0) {
                        offset = 0;
                    }
                }

                List<MedicalDoctorVO> mds = medicalDoctorMapper.selectDoctorList4Random(type, offset, rows);
                records.addAll(mds);
            }

        } else {
            records = medicalDoctorMapper.selectDoctorList(page, type, hospitalId, name, field, departmentId);
        }

        StringBuilder departments = new StringBuilder();
        for (int i = 0; i < records.size(); i++) {
            List<MedicalDepartmentVO> medicalDepartments = medicalDoctorMapper.selectMedicalDepartmentsByDoctorId(records.get(i).getId());
            for (MedicalDepartmentVO medicalDepartment : medicalDepartments) {
                departments.append(medicalDepartment.getName() + "/");
            }
            if (departments.length() > 0) {
                departments.deleteCharAt(departments.length() - 1);
                records.get(i).setDepartmentText(departments.toString());
            }
            //筛选坐诊时间
            records.get(i).setWorkTime(XzStringUtils.workTimeScreen(records.get(i).getWorkTime()));
            ;
        }
        page.setRecords(records);
        return page;
    }

    @Override
    public MedicalDoctorVO selectDoctorById(String id) {
        MedicalDoctorVO medicalDoctorVO = medicalDoctorMapper.selectDoctorById(id);
        if(medicalDoctorVO == null){
            return null;
        }
        List<MedicalFieldVO> medicalFields = medicalDoctorMapper.selectMedicalFieldsByDoctorId(medicalDoctorVO.getId());
        medicalDoctorVO.setFields(medicalFields);

        if (medicalDoctorVO.getHospitalId() != null) {
            MedicalHospitalVo medicalHospital = iMedicalHospitalBusinessService.selectHospitalById(medicalDoctorVO.getHospitalId());
            medicalDoctorVO.setMedicalHospital(medicalHospital);
        }
        if (medicalDoctorVO.getAuthenticationInformationId() != null) {
            MedicalDoctorAuthenticationInformationVO medicalDoctorAuthenticationInformation = medicalDoctorAuthenticationInformationMapper.selectByDoctorId(medicalDoctorVO.getAuthenticationInformationId());
            medicalDoctorVO.setMedicalDoctorAuthenticationInformation(medicalDoctorAuthenticationInformation);
        }
        List<MedicalDepartmentVO> medicalDepartments = medicalDoctorMapper.selectMedicalDepartmentsByDoctorId(id);
        if (medicalDepartments != null) {
            medicalDoctorVO.setDepartmentText(medicalDepartments.stream().map(MedicalDepartmentVO::getName).collect(Collectors.joining("/")));
        }
        return medicalDoctorVO;
    }

    @Override
    public List<MedicalFieldVO> getHotField() {
        return medicalDoctorMapper.getHotField();
    }

    @Override
    public List<MedicalDepartmentVO> getHotDepartment() {
        return medicalDoctorMapper.getHotDepartment();
    }

    @Override
    public List<MedicalDoctorVO> selectRecDoctor() {
        return medicalDoctorMapper.selectRecDoctor();
    }

    @Override
    public List<OeBxsArticleVO> getNewsReports(String doctorId) {
        return oeBxsArticleMapper.getNewsReports(doctorId);
    }

    @Override
    public OeBxsArticleVO getNewsReportByArticleId(String articleId) {
        return oeBxsArticleMapper.getNewsReportByArticleId(articleId);
    }

    @Override
    public Page<OeBxsArticleVO> getSpecialColumns(Page<OeBxsArticleVO> page, String doctorId) {
        List<OeBxsArticleVO> specialColumns = oeBxsArticleMapper.getSpecialColumns(page, doctorId);
        page.setRecords(specialColumns);
        return page;
    }

    @Override
    public OeBxsArticleVO getSpecialColumnDetailsById(String articleId) {
        return oeBxsArticleMapper.getSpecialColumnDetailsById(articleId);
    }

    @Override
    public List<MedicalWritingVO> getWritingsByDoctorId(String doctorId) {
        return medicalDoctorMapper.getWritingsByDoctorId(doctorId);
    }

    @Override
    public MedicalWritingVO getWritingsDetailsById(String writingsId) {
        return medicalDoctorMapper.getWritingsDetailsById(writingsId);
    }

    @Override
    public List<MedicalWritingVO> getRecentlyWritings() {
        return medicalDoctorMapper.getRecentlyWritings();
    }

    @Override
    public List<OeBxsArticleVO> getRecentlyNewsReports() {
        return oeBxsArticleMapper.getRecentlyNewsReports(HeadlineType.MYBD.getCode());
    }

    @Override
    public List<OeBxsArticleVO> getHotArticles() {
        return oeBxsArticleMapper.getHotArticles();
    }

    @Override
    public Page<OeBxsArticleVO> getNewsReportsByPage(Page<OeBxsArticleVO> page, String doctorId) {
        List<OeBxsArticleVO> records = oeBxsArticleMapper.getNewsReportsByPage(page, doctorId, HeadlineType.MYBD.getCode());
        page.setRecords(records);
        return page;
    }

    @Override
    public List<OeBxsArticleVO> getHotSpecialColumn() {
        return oeBxsArticleMapper.getHotSpecialColumn(HeadlineType.DJZL.getCode());
    }

    @Override
    public List<MedicalDoctorVO> getHotSpecialColumnAuthor() {
        return medicalDoctorMapper.getHotSpecialColumnAuthor(HeadlineType.DJZL.getCode());
    }

    @Override
    public Page<MedicalWritingVO> getWritingsByPage(Page<MedicalWritingVO> page) {
        List<MedicalWritingVO> writings = medicalDoctorMapper.getWritingsByPage(page);
        page.setRecords(writings);
        return page;
    }

    /**
     * 加入医馆
     *
     * @param medicalDoctor 加入医馆提交的信息
     */
    @Override
    public void joinHospital(MedicalDoctor medicalDoctor) {

        // 判断用户是否为医师
        MedicalDoctorAccount medicalDoctorAccount = medicalDoctorAccountMapper.getByUserId(medicalDoctor.getUserId());
        if (medicalDoctorAccount == null) {
            throw new MedicalException("您不是医师，不能加入医馆");
        }

        String doctorId = medicalDoctorAccount.getDoctorId();

        // 参数校验
        this.validate(medicalDoctor, 1);

        commonThreadPoolTaskExecutor.submit(() -> {

            // 如果之前已经加入医馆了
            Map<String, Object> columnMap = new HashMap<>();
            columnMap.put("doctor_id", doctorId);
            List<MedicalHospitalDoctor> medicalHospitalDoctors = hospitalDoctorMapper.selectByMap(columnMap);
            if (CollectionUtils.isNotEmpty(medicalHospitalDoctors)) {

                // 删除之前医师对应医馆的关联关系
                hospitalDoctorMapper.deleteByMap(columnMap);

            }

            // 添加医馆和医师的对应关系：medical_hospital_doctor
            MedicalHospitalDoctor hospitalDoctor = new MedicalHospitalDoctor();
            hospitalDoctor.setId(UUID.randomUUID().toString().replace("-", ""));
            hospitalDoctor.setDoctorId(doctorId);
            hospitalDoctor.setHospitalId(medicalDoctor.getHospitalId());
            hospitalDoctorMapper.insert(hospitalDoctor);

            // 添加医师的坐诊时间
            medicalDoctor.setUpdateTime(new Date());
            medicalDoctor.setId(doctorId);
            medicalDoctorMapper.updateSelective(medicalDoctor);

            logger.info("hospitalId：{} and accountId：{}，doctorId：{} build relation Successfully", medicalDoctor.getHospitalId(),
                    medicalDoctor.getUserId(), doctorId);

            try {
                medicalDoctorSolrService.initDoctorsSolrDataById(doctorId);
            } catch (IOException e) {
                e.printStackTrace();
            } catch (SolrServerException e) {
                e.printStackTrace();
            }
        });
    }

    /**
     * 获取医师的坐诊时间
     *
     * @author zhuwenbao
     */
    @Override
    public String getWorkTimeById(String userId, Integer type) {

        if (type == null) {
            type = 1;
        }

        MedicalDoctorAccount doctorAccount =
                medicalDoctorAccountMapper.getByUserId(userId);

        if (doctorAccount != null) {
            //StringBuffer sb = new StringBuffer();
            String workTime = medicalDoctorMapper.getWorkTimeById(doctorAccount.getDoctorId());
            if (type == 1) {
                if (StringUtils.isNotBlank(workTime)) {
//                    if (workTime.contains("一")) {
//                        sb.append("一");
//                    }
//                    if (workTime.contains("二")) {
//                        sb.append("，二");
//                    }
//                    if (workTime.contains("三")) {
//                        sb.append("，三");
//                    }
//                    if (workTime.contains("四")) {
//                        sb.append("，四");
//                    }
//                    if (workTime.contains("五")) {
//                        sb.append("，五");
//                    }
//                    if (workTime.contains("六")) {
//                        sb.append("，六");
//                    }
//                    if (workTime.contains("日")) {
//                        sb.append("，日");
//                    }
                    //过滤下坐诊时间
                    workTime = XzStringUtils.workTimeScreen(workTime);
                }
                return workTime;
            }
        }

        return null;
    }

    /**
     * 修改医师信息
     *
     * @param uid    修改人id
     * @param doctor 修改的内容
     */
    @Override
    public void update(String uid, MedicalDoctor doctor) {

        // 参数为空 直接返回
        if (doctor == null) {
            return;
        }

        // 参数校验
        this.validate(doctor, 2);
        String doctorId = doctor.getId();
        try {

            boolean flag = false;

            MedicalDoctor medicalDoctor = medicalDoctorMapper.selectById(doctorId);

            // 修改的对象存在
            if (medicalDoctor != null) {
                // 判断uid和doctorId的关系,是否有权限修改
                // 医师本人去修改
                MedicalDoctorAccount doctorAccount = medicalDoctorAccountMapper.getByUserId(uid);
                if (doctorAccount != null && StringUtils.equals(doctorAccount.getDoctorId(), doctorId)) {
                    flag = true;
                } else {
                    // 医馆去修改
                    MedicalHospitalAccount hospitalAccount = hospitalAccountMapper.getByUserId(uid);
                    if (hospitalAccount != null) {
                        Map<String, Object> columnMap = new HashMap<>();
                        columnMap.put("doctor_id", doctorId);
                        columnMap.put("hospital_id", hospitalAccount.getDoctorId());
                        List<MedicalHospitalDoctor> hospitalDoctors = hospitalDoctorMapper.selectByMap(columnMap);
                        if (CollectionUtils.isNotEmpty(hospitalDoctors)) {
                            flag = true;
                        } else {
                            // throw new RuntimeException("您没有权限修改该医师信息");
                        }
                    }
                }

                if (flag) {

                    Date now = new Date();
                    doctor.setUpdatePerson(uid);
                    medicalDoctorMapper.updateById(doctor);

                    // 如果参数中有头像信息或者职称证明
                    if (StringUtils.isNotBlank(doctor.getHeadPortrait()) || StringUtils.isNotBlank(doctor.getTitleProve())) {
                        // 获取 authentication_information_id
                        if (StringUtils.isNotBlank(medicalDoctor.getAuthenticationInformationId())) {
                            MedicalDoctorAuthenticationInformation authenticationInformation =
                                    new MedicalDoctorAuthenticationInformation();
                            authenticationInformation.setId(medicalDoctor.getAuthenticationInformationId());
                            if (StringUtils.isNotBlank(doctor.getHeadPortrait())) {
                                authenticationInformation.setHeadPortrait(doctor.getHeadPortrait());
                            }
                            if (StringUtils.isNotBlank(doctor.getTitleProve())) {
                                authenticationInformation.setTitleProve(doctor.getTitleProve());
                            }
                            medicalDoctorAuthenticationInformationMapper.updateById(authenticationInformation);
                            authenticationInformation.setUpdateTime(now);
                        } else {
                            throw new MedicalException("该医师没有认证信息，不能修改其头像，职称证明等信息");
                        }
                    }

                    // 如果参数中有科室信息
                    if (CollectionUtils.isNotEmpty(doctor.getDepartmentIds())) {
                        // 根据医师id删除之前的科室信息
                        doctorDepartmentMapper.deleteByDoctorId(doctorId);
                        // 新增新的医师与科室对应关系：medical_doctor_department
                        List<String> departmentIds = doctor.getDepartmentIds();
                        if (CollectionUtils.isNotEmpty(departmentIds)) {
                            departmentIds.forEach(departmentId -> medicalDoctorDepartmentService.add(departmentId, doctorId, now));
                        }
                    }
                }
            }
        } catch (Exception e) {
            throw new MedicalException("修改失败");
        }
    }

    /**
     * 根据doctorId获取医师详情
     */
    @Override
    public MedicalDoctor selectDoctorByIdV2(String doctorId) {

        if (StringUtils.isBlank(doctorId)) {
            throw new MedicalException("请选择你要查看的医师");
        }

        MedicalDoctor medicalDoctor = medicalDoctorMapper.selectById(doctorId);

        if (medicalDoctor != null) {

            // 获取医师的认证信息（头像，身份证，职称证明）
            if (medicalDoctor.getAuthenticationInformationId() != null) {

                MedicalDoctorAuthenticationInformation medicalDoctorAuthenticationInformation
                        = medicalDoctorAuthenticationInformationMapper.selectById(medicalDoctor.getAuthenticationInformationId());

                medicalDoctor.setMedicalDoctorAuthenticationInformation(medicalDoctorAuthenticationInformation);

            }

            // 获取医师所在的科室
            List<MedicalDoctorDepartment> doctorDepartments =
                    medicalDoctorDepartmentService.selectByDoctorId(medicalDoctor.getId());

            if (CollectionUtils.isNotEmpty(doctorDepartments)) {
                List<String> ids = new ArrayList<>();
                for (MedicalDoctorDepartment doctorDepartment : doctorDepartments) {
                    ids.add(doctorDepartment.getDepartmentId());
                }
                List<MedicalDepartment> departments = departmentMapper.selectBatchIds(ids);
                medicalDoctor.setDepartments(departments);
            }
        }
        return medicalDoctor;
    }

    /**
     * 添加医师
     */
    @Override
    public void add(MedicalDoctor medicalDoctor) {
        // 参数校验
        this.validate(medicalDoctor, 3);

        // 获取用户的医馆
        MedicalHospitalAccount hospitalAccount =
                hospitalAccountMapper.getByUserId(medicalDoctor.getUserId());
        if (hospitalAccount == null) {
            throw new MedicalException("您尚为认证医馆，请认证后再添加");
        }
        // 判断医馆是否认证
        if (!medicalHospitalMapper.getAuthenticationById(hospitalAccount.getDoctorId())) {
            throw new MedicalException("医馆尚未认证，请认证后再添加");
        }
        MedicalHospital medicalHospital = medicalHospitalMapper.selectById(hospitalAccount.getDoctorId());

        String doctorId = UUID.randomUUID().toString().replace("-", "");
        String doctorAuthenticationId = UUID.randomUUID().toString().replace("-", "");
        Date now = new Date();

        // 保存医师信息
        medicalDoctor.setId(doctorId);
        medicalDoctor.setDeleted(false);
        medicalDoctor.setStatus(true);
        medicalDoctor.setCreatePerson(medicalDoctor.getUserId());
        medicalDoctor.setAuthenticationInformationId(doctorAuthenticationId);
        medicalDoctor.setCreateTime(now);

        medicalDoctor.setCity(medicalHospital.getCity());
        medicalDoctor.setProvince(medicalHospital.getProvince());
        medicalDoctor.setDetailedAddress(medicalHospital.getDetailedAddress());
        medicalDoctorMapper.insert(medicalDoctor);

        // 将医师的头像,职称证明添加到认证表上：medical_doctor_authentication_information
        MedicalDoctorAuthenticationInformation authenticationInformation =
                new MedicalDoctorAuthenticationInformation();
        authenticationInformation.setId(doctorAuthenticationId);
        authenticationInformation.setTitleProve(medicalDoctor.getTitleProve());
        authenticationInformation.setHeadPortrait(medicalDoctor.getHeadPortrait());
        authenticationInformation.setCreatePerson(medicalDoctor.getUserId());
        medicalDoctorAuthenticationInformationMapper.insert(authenticationInformation);

        // 保存医师的科室：medical_doctor_department
        List<String> departmentIds = medicalDoctor.getDepartmentIds();

        if (CollectionUtils.isNotEmpty(departmentIds)) {
            departmentIds.forEach(departmentId -> medicalDoctorDepartmentService.add(departmentId, doctorId, now));
        }

        // 保存新增的医师与医馆的对应关系
        MedicalHospitalDoctor hospitalDoctor = new MedicalHospitalDoctor();
        hospitalDoctor.setId(UUID.randomUUID().toString().replace("-", ""));
        hospitalDoctor.setHospitalId(hospitalAccount.getDoctorId());
        hospitalDoctor.setDoctorId(doctorId);
        hospitalDoctor.setCreateTime(now);
        hospitalDoctorMapper.insert(hospitalDoctor);

        logger.info("user : {} add doctor successfully, doctorId : {}",
                medicalDoctor.getUserId(), doctorId);
    }

    /**
     * 根据用户id获取其所在的医馆信息
     */
    @Override
    public MedicalHospitalVo getHospital(String uid) {

        // 根据用户id获取其医师id
        MedicalDoctorAccount doctorAccount = medicalDoctorAccountMapper.getByUserId(uid);
        if (doctorAccount == null) {
            throw new MedicalException("您不是医师，无法获取医馆信息");
        }

        // 根据医师id获取其所在的医馆
        List<MedicalHospitalDoctor> hospitalDoctors = hospitalDoctorMapper.selectByDoctorId(doctorAccount.getDoctorId());
        if (CollectionUtils.isEmpty(hospitalDoctors)) {
            return null;
        }

        // 根据医馆id获取医馆信息
        MedicalHospital hospital = medicalHospitalMapper.selectById(hospitalDoctors.get(0).getHospitalId());
        MedicalHospitalVo hospitalVo = new MedicalHospitalVo();
        if (hospital != null) {
            BeanUtils.copyProperties(hospital, hospitalVo);
            // 根据医馆信息获取其坐诊时间
            MedicalDoctor doctor = medicalDoctorMapper.selectById(doctorAccount.getDoctorId());
            if (doctor != null) {
                hospitalVo.setVisitTime(doctor.getWorkTime());
            }
        }

        return hospitalVo;
    }

    @Override
    public MedicalDepartment getDepartmentById(String departmentId) {
        return departmentMapper.selectById(departmentId);
    }

    @Override
    public String getDoctorIdByUserId(String userId) {
        MedicalDoctorAccount medicalDoctorAccount = medicalDoctorAccountMapper.getByUserId(userId);
        if (medicalDoctorAccount == null || StringUtils.isBlank(medicalDoctorAccount.getDoctorId())) {
            throw new MedicalException("该用户不是医师");
        }
        return medicalDoctorAccount.getDoctorId();
    }

    @Override
    public MedicalDoctor get(String id) {
        return medicalDoctorMapper.selectById(id);
    }

    @Override
    public MedicalDoctorAccount getByDoctorId(String doctorId) {
        return medicalDoctorAccountMapper.getByDoctorId(doctorId);
    }

    @Override
    public List<MedicalDoctorVO> listRandomByType(String type, int size) {
        int count = medicalDoctorMapper.countByType(type);
        int offset = 0;
        if (count > size) {
            Random random = new Random();
            offset = random.nextInt(count - size);
        }
        return medicalDoctorMapper.selectRandomDoctorByType(type, offset, size);
    }


    @Override
    public List<MedicalDoctorVO> selectDoctorRecommendList4Random(Integer type,
                                                                  Integer pageNumber, Integer pageSize) {
       
        List<MedicalDoctorVO> records = medicalDoctorMapper.
                selectDoctorRecommendList4Random(type, pageNumber, pageSize);
        for (int i = 0; i < records.size(); i++) {
            records.get(i).setWorkTime(XzStringUtils.workTimeScreen(records.get(i).getWorkTime()));
        }
        return records;
    }


    /**
     * 参数校验
     *
     * @param medicalDoctor 被校验的参数
     * @param type          校验方式
     */
    private void validate(MedicalDoctor medicalDoctor, int type) {

        if (type == 1) {

            if (medicalDoctor == null) {
                throw new MedicalException("请求参数不能为空");
            }

            if (StringUtils.isBlank(medicalDoctor.getHospitalId())) {
                throw new MedicalException("请选择医馆");
            }

            if (StringUtils.isBlank(medicalDoctor.getWorkTime())) {
                throw new MedicalException("请选择坐诊时间");
            }
        }

        if (type == 2) {
            if (StringUtils.isBlank(medicalDoctor.getId())) {
                throw new MedicalException("请选择要修改的医师");
            }

            if (StringUtils.isNotBlank(medicalDoctor.getName()) && medicalDoctor.getName().length() > 32) {
                throw new MedicalException("医师名字不能超过32个字");
            }
            if (StringUtils.isNotBlank(medicalDoctor.getTitle()) && medicalDoctor.getTitle().length() > 100) {
                throw new MedicalException("职称不能超过100个字");
            }
            if (StringUtils.isNotBlank(medicalDoctor.getFieldText()) && medicalDoctor.getFieldText().length() > 100) {
                throw new MedicalException("擅长领域不能超过100个字");
            }
        }

        if (type == 3) {
            if (StringUtils.isBlank(medicalDoctor.getName())) {
                throw new MedicalException("医师名字不能为空");
            }

            if (StringUtils.isBlank(medicalDoctor.getHeadPortrait())) {
                throw new MedicalException("医师头像不能为空");
            }

            if (StringUtils.isBlank(medicalDoctor.getTitle())) {
                throw new MedicalException("医师职称不能为空");
            }

            if (medicalDoctor.getTitleProve() == null) {
                throw new MedicalException("请上传职称证明");
            }

            if (StringUtils.isBlank(medicalDoctor.getFieldText())) {
                throw new MedicalException("擅长不能为空");
            }

            if (CollectionUtils.isEmpty(medicalDoctor.getDepartmentIds())) {
                throw new MedicalException("请选择科室");
            }

            if (StringUtils.isBlank(medicalDoctor.getDescription())) {
                throw new MedicalException("医师介绍不能为空");
            }/*else{
                if(medicalDoctor.getDescription().length() > 500){
                    throw new MedicalException("医师介绍字数应在500字以内");
                }
            }*/
        }
    }

    @Override
    public List<MedicalDoctorVO> selectDoctorCouserByAccountId(Integer pageNumber, Integer pageSize) {
        return medicalDoctorMapper.selectDoctorCouserByAccountId(pageNumber, pageSize);
    }

    @Override
    public Page<MedicalDoctorVO> selectDoctorListByQueryKey(Page<MedicalDoctorVO> page,
                                                            DoctorQueryVo dqv) {

        List<MedicalDoctorVO> records = medicalDoctorMapper.selectDoctorListByQueryKey(page, dqv);
        return page.setRecords(records);
    }

    @Override
    public Map<String, Object> selectDoctorWorkTimeAndDetailsById(String doctorId) {
        Map<String, Object> map = medicalDoctorMapper.selectDoctorWorkTimeAndDetailsById(doctorId);
        if(map!=null && map.get("description") !=null) {
            map.put("description",XzStringUtils.formatA(map.get("description").toString()));
        }
        if (map != null) {
            MedicalHospital mha = medicalHospitalApplyService.getMedicalHospitalByDoctorId(doctorId);
            map.put("hospital", mha);
        }
        return map;
    }

    @Override
    public MedicalDoctorVO findSimpleById(String doctorId) {
        return this.medicalDoctorMapper.selectDoctorById(doctorId);
    }

    @Override
    public List<Map<String, Object>> doctorCategoryList() {
        
        
        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        
        List<MedicalDoctorVO> doctors0 = medicalDoctorMapper.selectDoctorList(new Page<MedicalDoctorVO>(1,3), null, 
                null, null, null, null);
        
        if (doctors0 != null && doctors0.size() > 0) {

            doctors0.forEach(doctor -> {
                String doctorId = doctor.getId();
                // 根据医师id获取其所在的医馆
                List<MedicalHospitalDoctor> hospitalDoctors = hospitalDoctorMapper.selectByDoctorId(doctorId);
                String account = "";
                if(hospitalDoctors.size()>0){
                    String hospitalId = hospitalDoctors.get(0).getHospitalId();
                    account = hospitalAccountMapper.getAccountIdByHospitalId(hospitalId);
                }
                if(account != null && !account.equals("")){
                    doctor.setDoctorType(2);
                    doctor.setUserId(account);
                } else {
                    doctor.setDoctorType(1);
                }
            });

            Map<String, Object> map = new HashMap<String, Object>();
            map.put("code", -1);
            map.put("text", "热门医师");
            map.put("doctors", doctors0);
            list.add(map);
        }
        
        /**
         * 循环枚举进行查询
         */
        //List<Map> listMap = DoctorType1.getDoctorTypeList();
        List<Map<String,Object>> listMap = doctorTypeMapper.getDoctorTypeTitleList();
        for (int i = 0; i < listMap.size(); i++) {
            Map maps = listMap.get(i);
            Integer code = (Integer) maps.get("code");
            String text = (String) maps.get("value");

            List<MedicalDoctorVO> doctors = medicalDoctorMapper.selectDoctorList(new Page<MedicalDoctorVO>(1,3),
                    code, null, null, null, null);
            if (doctors != null && doctors.size() > 0) {

                doctors.forEach(doctor -> {
                    String doctorId = doctor.getId();
                    // 根据医师id获取其所在的医馆
                    List<MedicalHospitalDoctor> hospitalDoctors = hospitalDoctorMapper.selectByDoctorId(doctorId);
                    String account = "";
                    if(hospitalDoctors.size()>0){
                        String hospitalId = hospitalDoctors.get(0).getHospitalId();
                        account = hospitalAccountMapper.getAccountIdByHospitalId(hospitalId);
                    }
                    if(account != null && !account.equals("")){
                        doctor.setDoctorType(2);
                        doctor.setUserId(account);
                    } else {
                        doctor.setDoctorType(1);
                    }
                });

                Map<String, Object> map1 = new HashMap<String, Object>();
                map1.put("code", code);
                map1.put("text", text);
                map1.put("doctors", doctors);
                list.add(map1);
            }
        }
        return list;
    }

    @Override
    public List<MedicalDoctorVO> selectHotInBatch(Page<MedicalDoctorVO> page) {
        List<MedicalDoctorVO> list = medicalDoctorMapper.selectHotInBatch(page);
        list.forEach(doctor -> {
            String doctorId = doctor.getId();
            // 根据医师id获取其所在的医馆
            List<MedicalHospitalDoctor> hospitalDoctors = hospitalDoctorMapper.selectByDoctorId(doctorId);
            String account = "";
            if(hospitalDoctors.size()>0){
                String hospitalId = hospitalDoctors.get(0).getHospitalId();
                account = hospitalAccountMapper.getAccountIdByHospitalId(hospitalId);
            }
            if(account != null && !account.equals("")){
                doctor.setDoctorType(2);
                doctor.setUserId(account);
            } else {
                doctor.setDoctorType(1);
            }
        });

        return list;
    }

	@Override
	public List<Map<String, Object>> doctorTypeList() {
	   List<Map<String, Object>> listMap = new ArrayList<Map<String, Object>>();	
	   List<DoctorType> list  = doctorTypeMapper.getDoctorTypeList();
       for (int i = 0; i < list.size(); i++) {
    	   DoctorType dt = list.get(i);
            List<MedicalDoctorVO> doctors = medicalDoctorMapper.selectDoctorList(new Page<MedicalDoctorVO>(1,4),
            		dt.getId(), null, null, null, null);
            if (doctors != null && doctors.size() > 0) {
                Map<String, Object> map1 = new HashMap<String, Object>();
                map1.put("code", dt.getId());
                map1.put("text", dt.getTitle());
                map1.put("doctors", doctors);
                listMap.add(map1);
            }
        }
		return listMap;
	}

    @Override
    public Map<String, Object> getDoctorInfoByDoctorId(String doctorId) {
        return medicalDoctorMapper.selectUserByDoctorId(doctorId);
    }

    @Override
    public List<MedicalDoctorVO> listDoctor() {
        return medicalDoctorMapper.listDoctor();
    }
}
