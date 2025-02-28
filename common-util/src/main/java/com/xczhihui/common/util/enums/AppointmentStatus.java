package com.xczhihui.common.util.enums;

/**
 * 远程诊疗状态
 *
 * @author hejiwei
 */
public enum AppointmentStatus {

    //初始状态
    ORIGIN(0),
    //待审核
    WAIT_APPLY(1),
    //待开始
    WAIT_START(2),
    //已开始
    STARTED(3),
    //已完成
    FINISHED(4),
    //已过期
    EXPIRED(5);

    private int val;

    AppointmentStatus(int val) {
        this.val = val;
    }

    public int getVal() {
        return val;
    }
}
