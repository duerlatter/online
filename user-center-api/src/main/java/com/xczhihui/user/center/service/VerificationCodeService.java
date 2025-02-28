package com.xczhihui.user.center.service;

import com.xczhihui.common.util.enums.VCodeType;

public interface VerificationCodeService {
    /**
     * 发送验证信息
     * <p>
     * 业务逻辑：
     * 1、动态码有效期XX分钟，XX分钟之内发送的动态码都一样
     * 2、同一帐号两次发送间隔至少XX秒
     *
     * @param username 用户名
     * @param vtype    动态码类型，1新注册，2找回密码
     */
    boolean addMessage(String username, VCodeType vtype);

    /**
     * 校验动态码
     *
     * @param phone
     * @param code
     */
    boolean checkCode(String phone, VCodeType vtype, String code);
}
