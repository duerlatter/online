/**
 * Copyright (c) 2011-2014, James Zhan 詹波 (jfinal@126.com).
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 */
package com.xczhihui.pay.ext.kit;

import javax.servlet.http.HttpServletRequest;

public class IpKit {

    public static String getRealIp(HttpServletRequest request) {
        String ip = request.getHeader("x-forwarded-for");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        if (StrKit.isBlank(ip)) {
            ip = "127.0.0.1";
        }
        return ip;
    }

    public static String getRealIpV2(HttpServletRequest request) {
        String accessIP = request.getHeader("x-forwarded-for");
        if (null == accessIP)
            return request.getRemoteAddr();
        return accessIP;
    }
}
