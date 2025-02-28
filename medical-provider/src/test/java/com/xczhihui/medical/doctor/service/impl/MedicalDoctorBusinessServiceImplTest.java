package com.xczhihui.medical.doctor.service.impl;

import java.util.List;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.xczhihui.medical.doctor.service.IMedicalDoctorBusinessService;
import com.xczhihui.medical.doctor.vo.MedicalDoctorVO;

import test.BaseJunit4Test;

/**
 * ClassName: UserCoin.java <br>
 * Description:用户-代币余额表 <br>
 * Create by: name：yuxin <br>email: yuruixin@ixincheng.com <br>
 * Create Time: 上午 11:37 2017/12/18 0018<br>
 */
public class MedicalDoctorBusinessServiceImplTest extends BaseJunit4Test {

    @Autowired //自动注入
    private IMedicalDoctorBusinessService iMedicalDoctorBusinessService;

    @Test
//    @Transactional   //标明此方法需使用事务
//    @Rollback(false)  //标明使用完此方法后事务不回滚,true时为回滚
    public void test1() {
        MedicalDoctorVO medicalDoctor = iMedicalDoctorBusinessService.selectDoctorById("3476f961251b4094b020b560b8fddf48");
    }


    @Test
    public void test2() {
        List<MedicalDoctorVO> list = iMedicalDoctorBusinessService.selectDoctorCouserByAccountId(0, 3);
    }

}