package com.xczhihui.bxg.online.web.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xczhihui.bxg.online.common.domain.AlipayPaymentRecord;
import com.xczhihui.bxg.online.web.dao.AlipayPaymentRecordDao;
import com.xczhihui.bxg.online.web.service.AliPayPaymentRecordService;

@Service
public class AliPayPaymentRecordServiceImpl implements AliPayPaymentRecordService {

    @Autowired
    private AlipayPaymentRecordDao alipayPaymentRecordDao;

    @Override
    public void save(AlipayPaymentRecord alipayPaymentRecord) {
        alipayPaymentRecordDao.save(alipayPaymentRecord);
    }
}
