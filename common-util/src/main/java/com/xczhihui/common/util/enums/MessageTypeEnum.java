package com.xczhihui.common.util.enums;

/**
 * @author hejiwei
 */
public enum MessageTypeEnum {

    SYSYTEM(0),
    COURSE(1),
    FEEDBACK(2),
    ASK_QUESTION(3),
    REPLY(4);

    private int val;

    MessageTypeEnum(int val) {
        this.val = val;
    }

    public int getVal() {
        return val;
    }

    public void setVal(int val) {
        this.val = val;
    }
}
