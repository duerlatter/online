package com.xczhihui.medical.doctor.enums;

/**
 * 医师入驻申请状态枚举
 *
 * @author zhuwenbao
 */
public enum MedicalDoctorApplyEnum {

    REJECT(0, "拒绝"),
    PASS(1, "通过"),
    WAIT(2, "未处理");

    private Integer code;

    private String msg;

    MedicalDoctorApplyEnum(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public Integer getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }

}
