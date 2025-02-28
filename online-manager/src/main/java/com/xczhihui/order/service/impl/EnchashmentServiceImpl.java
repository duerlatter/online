package com.xczhihui.order.service.impl;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.xczhihui.bxg.online.common.base.service.impl.OnlineBaseServiceImpl;
import com.xczhihui.bxg.online.common.domain.EnchashmentApplyInfo;
import com.xczhihui.bxg.online.common.domain.UserCoin;
import com.xczhihui.bxg.online.common.domain.UserCoinConsumption;
import com.xczhihui.bxg.online.common.domain.UserCoinIncrease;
import com.xczhihui.common.util.CodeUtil;
import com.xczhihui.common.util.TimeUtil;
import com.xczhihui.common.util.bean.Page;
import com.xczhihui.common.util.enums.*;
import com.xczhihui.course.params.BaseMessage;
import com.xczhihui.course.service.ICommonMessageService;
import com.xczhihui.message.dao.MessageDao;
import com.xczhihui.order.dao.EnchashmentDao;
import com.xczhihui.order.service.EnchashmentService;

@Service
public class EnchashmentServiceImpl extends OnlineBaseServiceImpl implements
        EnchashmentService {

    @Value("${sms.enhashment.pass.code}")
    private String enchashmentPassSmsCode;
    @Value("${sms.enhashment.grant.code}")
    private String enchashmentGrantSmsCode;
    @Value("${sms.enhashment.notPass.code}")
    private String enchashmentNotPassSmsCode;
    @Value("${weixin.enchashment.pass.code}")
    private String enchashmentPassWeixinCode;
    @Value("${weixin.enchashment.not.pass.code}")
    private String enchashmentNotPassWeixinCode;

    @Autowired
    private EnchashmentDao enchashmentDao;
    @Autowired
    private ICommonMessageService commonMessageService;

    @Autowired
    private MessageDao messageDao;

    @Override
    public Page<EnchashmentApplyInfo> findEnchashmentPage(
            EnchashmentApplyInfo orderVo, Integer pageNumber, Integer pageSize) {
        Page<EnchashmentApplyInfo> page = enchashmentDao.findEnchashmentPage(
                orderVo, pageNumber, pageSize);
        for (EnchashmentApplyInfo enchashmentApplyInfo : page.getItems()) {
            if (enchashmentApplyInfo.getStatus() == ApplyStatus.NOT_PASS
                    .getCode()) {
                enchashmentApplyInfo.setDismissalText(EnchashmentDismissal
                        .getDismissal(enchashmentApplyInfo.getDismissal()));
            }
        }
        return page;
    }

    @Override
    public void updateHandleEnchashment(EnchashmentApplyInfo eai) {
        DetachedCriteria dc = DetachedCriteria
                .forClass(EnchashmentApplyInfo.class);
        dc.add(Restrictions.eq("id", eai.getId()));
        EnchashmentApplyInfo e = dao.findEntity(dc);
        // if(e.getStatus()!=ApplyStatus.UNTREATED.getCode()){
        // throw new RuntimeException("该提现已处理过！");
        // }
        // 驳回
        if (eai.getStatus() != ApplyStatus.PASS.getCode()
                && eai.getStatus() != ApplyStatus.NOT_PASS.getCode()
                && eai.getStatus() != ApplyStatus.GRANT.getCode()) {
            throw new RuntimeException("处理状态不对");
        }
        if (eai.getStatus() == ApplyStatus.NOT_PASS.getCode()) {
            if (eai.getDismissal() == null) {
                throw new RuntimeException("驳回原因不为空");
            }
            e.setDismissal(eai.getDismissal());
            e.setDismissalRemark(eai.getDismissalRemark());
        }
        e.setTicklingTime(new Date());
        e.setStatus(eai.getStatus());

        dao.update(e);

        sendEnchashmentMessage(e, eai.getOperator());
    }

    /**
     * 提现状态变更消息推送
     *
     * @param e
     * @param operator
     */
    private void sendEnchashmentMessage(EnchashmentApplyInfo e, String operator) {
        try {
            String content = "";
            String reason = "";
            String orderNo = e.getOrderNo();
            boolean success = true;

            // 若为打款
            if (e.getStatus() == ApplyStatus.PASS.getCode()) {
                content = "【提现通知】编号：" + orderNo + "提现申请已审核通过,1-3个工作日内完成打款操作，请耐心等候，谢谢!";
            } else if (e.getStatus() == ApplyStatus.GRANT.getCode()) {
                content = "【提现通知】编号：" + orderNo + "您的提现金额已打入您指定的账户，预计72小时内到账。";
            } else if (e.getStatus() == ApplyStatus.NOT_PASS.getCode()) {
                // 驳回---将提现金额重回打入用户账户
                success = false;
                updateUserCoinForEnchashment(e);
                reason = EnchashmentDismissal.getDismissal(e.getDismissal());
                if (StringUtils.isNotBlank(e.getDismissalRemark())) {
                    reason = reason + "," + e.getDismissalRemark();
                }
                content = "【提现通知】编号："
                        + orderNo
                        + "提现申请已被驳回，驳回原因："
                        + reason + ",如有疑问请联系客服0898-32881934";
            }

            Map<String, String> weixinParams = new HashMap<>();
            if (success) {
                weixinParams.put("first", "申请单号：" + orderNo);
                weixinParams.put("keyword1", TimeUtil.getYearMonthDayHHmm(e.getTime()));
                weixinParams.put("keyword2", e.getEnchashmentSum().setScale(1, BigDecimal.ROUND_DOWN) + "(元)");
                weixinParams.put("keyword3", "银行卡");
                weixinParams.put("keyword4", e.getStatus() == ApplyStatus.PASS.getCode() ? "提现申请已审核通过，1-3个工作日内完成打款操作，请耐心等候，谢谢！" : "您的提现金额已打入您指定的账户，预计72小时内到账。");
                weixinParams.put("keyword5", "");
                weixinParams.put("remark", "");
            } else {
                weixinParams.put("first", "您好，您的提现申请审核失败~");
                weixinParams.put("keyword1", e.getEnchashmentSum().setScale(1, BigDecimal.ROUND_DOWN) + "(元)");
                weixinParams.put("keyword2", e.getOrderNo());
                weixinParams.put("keyword3", reason + "，如有疑问，请联系客服0898-32881934。");
                weixinParams.put("remark", "");
            }
            commonMessageService.saveMessage(new BaseMessage.Builder(MessageTypeEnum.SYSYTEM.getVal())
                    .buildAppPush(content)
                    .buildWeb(content)
                    .buildWeixin(success ? enchashmentPassWeixinCode : enchashmentNotPassWeixinCode, weixinParams)
                    .build(e.getUserId(), RouteTypeEnum.NONE, operator));
        } catch (Exception e1) {
            e1.printStackTrace();
        }

    }

    /**
     * Description：提现被驳回，更新用户账户（rmb加回） creed: Talk is cheap,show me the code
     *
     * @author name：yuxin <br>
     * email: yuruixin@ixincheng.com
     * @Date: 下午 8:14 2018/1/30 0030
     **/
    private void updateUserCoinForEnchashment(EnchashmentApplyInfo eai) {
        DetachedCriteria dc1 = DetachedCriteria
                .forClass(UserCoinConsumption.class);
        dc1.add(Restrictions.eq("correlationId", eai.getId()));
        UserCoinConsumption ucc = dao.findEntity(dc1);

        if (ucc == null) {
            throw new RuntimeException("提现申请数据异常");
        }
        if (ucc.getRmb().compareTo(BigDecimal.ZERO) != -1) {
            throw new RuntimeException("申请数据有异常");
        }
        DetachedCriteria dc2 = DetachedCriteria.forClass(UserCoin.class);
        dc2.add(Restrictions.eq("id", ucc.getUserCoinId()));
        UserCoin uc = dao.findEntity(dc2);

        UserCoinIncrease uci = new UserCoinIncrease();
        uci.setUserId(eai.getUserId());
        // 从代币消费表中取出提现时扣除的数据，并冲回用户代币余额
        uci.setValue(ucc.getValue().negate());
        uci.setChangeType(IncreaseChangeType.ENCHASHMENT.getCode());
        uci.setOrderFrom(ucc.getOrderFrom());
        uci.setBalanceType(BalanceType.ANCHOR_RMB.getCode());
        StringBuffer sql = new StringBuffer("UPDATE user_coin uc SET");
        sql.append(" uc.`rmb`=uc.`rmb`+" + ucc.getRmb().negate().toString());
        sql.append(", uc.`version`=\"" + CodeUtil.getRandomUUID() + "\"");
        sql.append(", uc.`update_time` = now() ");
        sql.append("where user_id=\"" + uci.getUserId()
                + "\"  and uc.version =\"" + uc.getVersion() + "\"");

        int updateCount = dao.getNamedParameterJdbcTemplate()
                .getJdbcOperations().update(sql.toString());
        if (updateCount < 1) {
            // 若更新失败，则继续回调该方法
            throw new RuntimeException("系统繁忙请稍后再试！");
        }

        uci.setUserCoinId(uc.getId());
        uci.setBalance(BigDecimal.ZERO);
        uci.setBalanceGive(BigDecimal.ZERO);
        uci.setBalanceRewardGift(BigDecimal.ZERO);
        uci.setRmb(ucc.getRmb().negate());
        uci.setCreateTime(new Date());
        uci.setDeleted(false);
        uci.setStatus(true);
        // 存入对应的提现单id
        uci.setCorrelationId(eai.getId());
        uci.setBrokerageValue(BigDecimal.ZERO);
        uci.setIosBrokerageValue(BigDecimal.ZERO);
        dao.save(uci);
    }
}
