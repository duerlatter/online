package com.xczhihui.bxg.online.web.service.impl;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xczhihui.bxg.online.web.service.OrderService;
import com.xczhihui.common.util.enums.OrderFrom;
import com.xczhihui.common.util.enums.PayOrderType;
import com.xczhihui.common.util.enums.Payment;
import com.xczhihui.course.model.AlipayPaymentRecord;
import com.xczhihui.course.model.WxcpPayFlow;
import com.xczhihui.course.service.IPaymentRecordService;
import com.xczhihui.course.vo.PayMessage;
import com.xczhihui.online.api.service.OrderPayService;
import com.xczhihui.online.api.service.PayService;
import com.xczhihui.online.api.service.UserCoinService;

/**
 * Description: <br>
 *
 * @author: name：yuxin <br>email: yuruixin@ixincheng.com <br>
 * Create Time:  2018/4/19 0019-下午 3:04<br>
 */
@Service("payService")
public class PayServiceImpl implements PayService {

    private static String SUCCESS = "TRADE_SUCCESS";
    @Autowired
    public OrderService orderService;
    @Autowired
    public OrderPayService orderPayService;
    @Autowired
    public UserCoinService userCoinService;
    @Autowired
    public IPaymentRecordService paymentRecordService;
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Override
    public void aliPayBusiness(Map<String, String> params) throws Exception {
        AlipayPaymentRecord apr = paymentRecordService.saveAlipayPaymentRecord(params);
        
        String payMessageStr = params.get("passback_params");
        String subject = params.get("subject");
    	if(subject!=null && subject.indexOf("支付宝扫码支付")!=-1) {
    		payMessageStr = params.get("body");
    	}
        
        PayMessage payMessage = PayMessage.getPayMessageType(params);
        
        if (apr != null) {
            if (SUCCESS.equals(apr.getTradeStatus())) {
                String type = payMessage.getType();
                this.business(type, apr.getOutTradeNo(), apr.getTradeNo(), payMessageStr, Payment.ALIPAY);
            } else {
                StringBuilder sb = new StringBuilder();
                for (Map.Entry<String, String> entry : params.entrySet()) {
                    sb.append(entry.getKey() + " = " + entry.getValue() + ";");
                }
                logger.error("alipay支付失败:{}", sb.toString());
            }
        } else {
            StringBuilder sb = new StringBuilder();
            for (Map.Entry<String, String> entry : params.entrySet()) {
                sb.append(entry.getKey() + " = " + entry.getValue() + ";");
            }
            logger.error("alipay该支付记录已存在:{}", sb.toString());
        }
    }

    @Override
    public void wxPayBusiness(Map<String, String> params) throws Exception {
        String payMessageStr = params.get("attach");
        PayMessage payMessage = PayMessage.getPayMessage(String.valueOf(payMessageStr));

        WxcpPayFlow wxcpPayFlow = paymentRecordService.saveWxPayPaymentRecord(params);
        if (wxcpPayFlow != null) {
            String type = payMessage.getType();
            this.business(type, wxcpPayFlow.getOutTradeNo().substring(0, 20), wxcpPayFlow.getTransactionId(), payMessageStr, Payment.WECHATPAY);
        } else {
            StringBuilder sb = new StringBuilder();
            for (Map.Entry<String, String> entry : params.entrySet()) {
                sb.append(entry.getKey() + " = " + entry.getValue() + ";");
            }
            logger.error("wxpay该支付记录已存在:{}", sb.toString());
        }
    }

    @Override
    public void business(String type, String outTradeNo, String tradeNo, String payMessageStr, Payment payment) throws Exception {
        if (PayOrderType.COURSE_ORDER.getCode().equals(type)) {
            Integer orderStatus = orderService.getOrderStatus(outTradeNo);
            //付款成功，如果order未完成
            if (orderStatus == 0) {
                try {
                    //计时
                    long current = System.currentTimeMillis();
                    //处理订单业务
                    orderPayService.addPaySuccess(outTradeNo, payment, tradeNo);
                    logger.info("订单支付成功，订单号:{},用时{}", outTradeNo, (System.currentTimeMillis() - current) + "毫秒");
                } catch (Exception e) {
                    logger.error("用户支付成功，构建课程失败！！！" + outTradeNo + "，错误信息：", e);
                }
            }
        } else if (PayOrderType.COIN_ORDER.getCode().equals(type)) {
            PayMessage payMessage = PayMessage.getPayMessage(String.valueOf(payMessageStr));
            Integer from = payMessage.getFrom();
            userCoinService.updateBalanceForRecharge(payMessage.getUserId(), payment, payMessage.getValue(), OrderFrom.getOrderFrom(from), outTradeNo);
        }
    }


}
