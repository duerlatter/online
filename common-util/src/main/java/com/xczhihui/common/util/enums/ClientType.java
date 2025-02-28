package com.xczhihui.common.util.enums;

/**
 * Description：客户端类型
 * creed: Talk is cheap,show me the code
 *
 * @author name：yuxin
 * @Date: 2018/7/3 0003 下午 3:30
 **/
public enum ClientType {

    UNKNOWN(0, "未知"),
    PC(1, "pc"),
    H5(2, "h5"),
    ANDROID(3, "android"),
    IOS(4, "ios"),
    IMPORT(5, "导入"),
    OTHER(-1, "其他");

    /**
     * 描述
     **/
    private String text;
    private int code;

    private ClientType(int code, String text) {
        this.text = text;
        this.code = code;
    }

    public static ClientType getClientType(int code) {
        for (ClientType clientType : ClientType.values()) {
            if (clientType.getCode() == code) {
                return clientType;
            }
        }
        return null;
    }

    public static ClientType valueOf(int value) {

        switch (value) {
            case 0:
                return ClientType.UNKNOWN;
            case 1:
                return ClientType.PC;
            case 2:
                return ClientType.H5;
            case 3:
                return ClientType.ANDROID;
            case 4:
                return ClientType.IOS;
            case 5:
                return ClientType.IMPORT;
            case -1:
                return ClientType.OTHER;
            default:
                return null;
        }
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

}