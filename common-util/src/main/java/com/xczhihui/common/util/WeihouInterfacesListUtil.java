package com.xczhihui.common.util;

import java.security.MessageDigest;
import java.util.*;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

/**
 * 得到微吼官方接口数据工具类
 * ClassName: WeihouInterListUtil.java <br>
 * Description: <br>
 * Create by: name：yangxuan <br>email: 15936216273@163.com <br>
 * Create Time: 2017年8月10日<br>
 */
public class WeihouInterfacesListUtil {

    //当前在线人数
    public static final String CURRENTONLINENUMBER = "http://e.vhall.com/api/vhallapi/v2/webinar/current-online-number";

    //获取活动状态
    public static final String CURRENTONLINESTATE = "http://e.vhall.com/api/vhallapi/v2/webinar/state";

    //得到微吼用户id
    public static final String CURRENT_USER_ID = "http://e.vhall.com/api/vhallapi/v2/user/get-user-id";

    //注册用户  http://e.vhall.com/api/vhallapi/v2/user/register
    public static final String REGISTER = "http://e.vhall.com/api/vhallapi/v2/user/register";

    //获取用户信息
    public static final String GET_USER_INFO = "http://e.vhall.com/api/vhallapi/v2/user/get-user-info";

    //查看这个回放
    public static final String record_time = "http://e.vhall.com/api/vhallapi/v2/record/record-time";

    //查看直播信息
    public static final String live_info = "http://e.vhall.com/api/vhallapi/v2/webinar/fetch";


    public static final String event_info = "http://e.vhall.com/api/vhallapi/v2/callback/event-info";

    //获取直播回放列表
    public static final String record_list = "http://e.vhall.com/api/vhallapi/v2/record/list";


    public static final String APP_KEY = "71a22e5b4a41483d41d96474511f58f3";

    public static final String APP_SECRET_KEY = "1898130bad871d1bf481823ba1f3ffb1";


    public static final String MOREN = RandomUtil.getCharAndNumr(6);//第三方登录默认微吼密码

    public static final String MOREN_USER_PASSWORD = "123456";//第三方登录默认用户密码

    public static Map<String, String> getBaseParams() {
        Map<String, String> parameters = new HashMap<String, String>();
        //公共参数
        parameters.put("auth_type", "1");
        parameters.put("password", "xinchengzhihui");
        parameters.put("account", "v19624388");

        //{head=123, webinar_id=1, password=xinchengzhihui, pass=123, webinar_id=985221, third_user_id=1111, name=yangxuan}
        return parameters;
    }


    /**
     * Description：请求根据用户id,更新用户接口信息！微吼更新用户接口，
     *
     * @param userId
     * @param pass
     * @param name
     * @param head
     * @return String
     * @author name：yangxuan <br>email: 15936216273@163.com
     */
    public static Integer currentUserID(String videoId) {
        String whUrl = CURRENT_USER_ID;
        Map<String, String> parameters = new TreeMap<String, String>();
        /* 公共参数 */
        parameters.put("auth_type", "1");
        parameters.put("account", "v19624388");
        parameters.put("password", "xinchengzhihui");


        parameters.put("third_user_id", videoId);
        String json = HttpUtil.sendPostRequest(whUrl, parameters);
        JSONObject js = JSONObject.parseObject(json);
        if ("200".equals(js.get("code"))) {
            if (js.get("data") != null) {
                return Integer.parseInt(js.get("data").toString());
            }
        }
        return 0;
    }


    /**
     * Description：请求根据用户id,更新用户接口信息！微吼更新用户接口，
     *
     * @param userId
     * @param pass
     * @param name
     * @param head
     * @return String
     * @author name：yangxuan <br>email: 15936216273@163.com
     */
    public static Integer getOnlineState(String videoId) {
/*		if(!StringUtils.hasText(name) &&!StringUtils.hasText(head)){
            return null;
		}*/
        String whUrl = CURRENTONLINESTATE;
        Map<String, String> parameters = new TreeMap<String, String>();
		/* 公共参数 */
        parameters.put("auth_type", "1");
        parameters.put("account", "v19624388");
        parameters.put("password", "xinchengzhihui");

        parameters.put("webinar_id", videoId);
        String json = HttpUtil.sendPostRequest(whUrl, parameters);
        JSONObject js = JSONObject.parseObject(json);
        if ("200".equals(js.get("code"))) {
            if (js.get("data") != null) {
                return Integer.parseInt(js.get("data").toString());
            }
        }
        return 0;
    }

    /**
     * Description：获取直播间当前在线人数
     *
     * @param webinar_id
     * @return JSONObject
     * @author name：yangxuan <br>email: 15936216273@163.com
     */
    public static Integer getCurrentOnlineNumber(String webinar_id) {
        Map<String, String> parameters = getBaseParams();
        parameters.put("webinar_id", webinar_id);
        String str = HttpUtil.sendPostRequest(CURRENTONLINENUMBER, parameters);
        JSONObject js = JSONObject.parseObject(str);
        if (js.get("msg") != null && js.get("code").equals("200")) {
            return Integer.parseInt(js.get("data").toString());
        }
        return 0;
    }


    /**
     * 请求当前观看人数时，需要判断是不是在30秒内，如果在30秒内，就不用请求了
     * Description：
     *
     * @param recordDate
     * @return boolean
     * @author name：yangxuan <br>email: 15936216273@163.com
     */
    public static boolean currentonLinenumberConditions(Date recordDate) {
        boolean falg = false;
        Calendar c = new GregorianCalendar();
        c.setTime(recordDate);//设置参数时间
        c.add(Calendar.SECOND, +30);//把日期往后增加SECOND 秒.整数往后推,负数往前移动
        recordDate = c.getTime();
        if (recordDate.getTime() < System.currentTimeMillis()) {
            falg = true;
        }
        return falg;
    }


    /**
     * Description：请求根据用户id,更新用户接口信息！微吼更新用户接口，
     *
     * @param userId
     * @param pass
     * @param name
     * @param head
     * @return String
     * @author name：yangxuan <br>email: 15936216273@163.com
     */
    public static String updateUser(String userId, String password, String name, String head) {
        String whUrl = "http://e.vhall.com/api/vhallapi/v2/user/update";
        Map<String, String> parameters = new TreeMap<String, String>();
		/* 公共参数 */
        parameters.put("auth_type", "1");
        parameters.put("account", "v19624388");
        parameters.put("password", "xinchengzhihui");
		/* 公共参数 */
        parameters.put("third_user_id", userId);
        if (IStringUtil.isNotBlank(password)) {
            parameters.put("pass", password);
        }
        if (IStringUtil.isNotBlank(name)) {
            parameters.put("name", name);
        }
        if (IStringUtil.isNotBlank(head)) {
            parameters.put("head", head);
        }
        String json = HttpUtil.sendPostRequest(whUrl, parameters);
        Map<String, String> m = json2Map(json);
        if ("success".equals(m.get("msg"))
                && Integer.parseInt(m.get("code")) == 200) {
            Map<String, String> map = json2Map(m.get("data"));
            String vhallId = map.get("user_id");
            return vhallId;
        }
        return null;
    }


    /**
     * Description：请求根据用户id,更新用户接口信息！微吼更新用户接口，
     *
     * @param userId
     * @param pass   fields 需要获取的字段，字段之间用英文逗号,分割
     * @return String
     * @author name：yangxuan <br>email: 15936216273@163.com
     */
    public static JSONObject getUserinfo(String userId, String fields) {
        if (!IStringUtil.isNotBlank(userId) && !IStringUtil.isNotBlank(fields)) {
            return null;
        }
        String whUrl = "http://e.vhall.com/api/vhallapi/v2/user/get-user-info";
        Map<String, String> parameters = new TreeMap<String, String>();
		/* 公共参数 */
        parameters.put("auth_type", "1");
        parameters.put("account", "v19624388");
        parameters.put("password", "xinchengzhihui");
		/* 公共参数 */
        parameters.put("user_id", userId);
        parameters.put("fields", fields);
        String json = HttpUtil.sendPostRequest(whUrl, parameters);
        //Map<String, String> m =json2Map(json);
        JSONObject js = JSONObject.parseObject(json);
        if ("成功".equals(js.get("msg"))) {
            JSONObject jsData = JSONObject.parseObject(js.get("data").toString());
            return jsData;
        }
        return null;
    }


    /**
     * Description：请求微吼创建用户接口，得到一个微吼用户id。
     *
     * @param userId 第三方用户id
     * @param pass   登录密码
     * @param name   姓名
     * @param head   头像
     * @return String
     * @author name：yangxuan <br>email: 15936216273@163.com
     */
    public static String createUser(String userId, String pass,
                                    String name, String head) {

        Map<String, String> parameters = WeihouInterfacesListUtil.getBaseParams();

        parameters.put("third_user_id", userId);
        parameters.put("pass", pass);
        parameters.put("name", name);
        parameters.put("head", head);

        String json = HttpUtil.sendPostRequest(REGISTER, parameters);

        JSONObject js = JSONObject.parseObject(json);
        if ("success".equals(js.get("msg")) &&
                Integer.parseInt(js.get("code").toString()) == 200) {
            JSONObject jsData = JSONObject.parseObject(js.get("data").toString());
            String vhallId = jsData.get("user_id").toString();
            return vhallId;
        } else if (Integer.parseInt(js.get("code").toString()) == 10804) {
            return updateUser(userId, pass, name, head);
        }
        return null;
    }


    /**
     * Description：请求微吼创建用户接口，得到一个微吼用户id。
     *
     * @param userId 第三方用户id
     * @param pass   登录密码
     * @param name   姓名
     * @param head   头像
     * @return String
     * @author name：yangxuan <br>email: 15936216273@163.com
     */
    public static String createUser(String userId, String pass,
                                    String name, String head, String loginName) {

        Map<String, String> parameters = WeihouInterfacesListUtil.getBaseParams();

        parameters.put("third_user_id", userId);
        parameters.put("pass", pass);
        parameters.put("name", name);
        parameters.put("head", head);
        parameters.put("phone", loginName);

        String json = HttpUtil.sendPostRequest(REGISTER, parameters);
        JSONObject js = JSONObject.parseObject(json);
        if ("success".equals(js.get("msg")) && "200".equals(js.get("code").toString())) {
            JSONObject jsData = JSONObject.parseObject(js.get("data").toString());
            String vhallId = jsData.get("user_id").toString();
            return vhallId;
        } else if (Integer.parseInt(js.get("code").toString()) == 10804) {
            return updateUser(userId, pass, name, head);
        }
        return null;
    }


    //20264468
    public static Map<String, String> json2Map(String jsonStr) {
        JSONObject jsonObj = JSON.parseObject(jsonStr);
        Set<String> jsonKeySet = jsonObj.keySet();
        Map<String, String> resultMap = new HashMap<>();
        Iterator<String> it = jsonKeySet.iterator();
        while (it.hasNext()) {
            String key = it.next();
            resultMap.put(key, jsonObj.getString(key));
        }
        return resultMap;
    }


    /**
     * Description：查询回放视频时长
     *
     * @param userId 视频id
     * @return String
     * @author name：yangxuan <br>email: 15936216273@163.com
     */
    public static String recordTime(String videoId) {

        Map<String, String> parameters = WeihouInterfacesListUtil.getBaseParams();

        parameters.put("record_id", videoId);

        String json = HttpUtil.sendPostRequest(record_time, parameters);

        JSONObject js = JSONObject.parseObject(json);
        if ("success".equals(js.get("msg")) &&
                Integer.parseInt(js.get("code").toString()) == 200) {

            return "";
        } else {
        }

        return null;
    }

    /**
     * Description：查看直播信息
     *
     * @param userId
     * @return String
     * @author name：yangxuan <br>email: 15936216273@163.com
     */
    public static String liveInfo(String videoId) {

        Map<String, String> parameters = WeihouInterfacesListUtil.getBaseParams();
        parameters.put("webinar_id", videoId);
        parameters.put("fields", "alias_name,user_id,subject,type,t_start,end_time,live_start_time,buffer,auto_record");

        String json = HttpUtil.sendPostRequest(live_info, parameters);
        JSONObject js = JSONObject.parseObject(json);
        if ("success".equals(js.get("msg")) &&
                Integer.parseInt(js.get("code").toString()) == 200) {

            return "";
        } else {
        }
        return null;
    }

    /**
     * Description：查看回放信息
     *
     * @param userId
     * @return String
     * @author name：yangxuan <br>email: 15936216273@163.com
     */
    public static String recordList(String videoId) {

        Map<String, String> parameters = WeihouInterfacesListUtil.getBaseParams();
        parameters.put("webinar_id", videoId);
        //parameters.put("fields", "alias_name,user_id,subject,type");
        String json = HttpUtil.sendPostRequest(record_list, parameters);
        JSONObject js = JSONObject.parseObject(json);
        if ("success".equals(js.get("msg")) &&
                Integer.parseInt(js.get("code").toString()) == 200) {

            return "";
        } else {
        }
        return null;
    }

    public static void main(String[] args) {


        recordList("113218845");


    }


    public static String getSign(Map<String, String> signkv) {
        Set<String> keySet = signkv.keySet();
        Iterator<String> iter = keySet.iterator();
        StringBuilder sb = new StringBuilder();
        sb.append(WeihouInterfacesListUtil.APP_SECRET_KEY);
        while (iter.hasNext()) {
            String key = iter.next();
            sb.append(key + signkv.get(key));
        }
        sb.append(WeihouInterfacesListUtil.APP_SECRET_KEY);
        return getMD5(sb.toString());
    }

    /**
     * 生成md5
     *
     * @param message
     * @return
     */
    public static String getMD5(String message) {
        String md5str = "";
        try {
            // 1 创建一个提供信息摘要算法的对象，初始化为md5算法对象
            MessageDigest md = MessageDigest.getInstance("MD5");
            // 2 将消息变成byte数组
            byte[] input = message.getBytes("UTF-8");
            // 3 计算后获得字节数组,这就是那128位了
            byte[] buff = md.digest(input);
            // 4 把数组每一字节（一个字节占八位）换成16进制连成md5字符串
            md5str = bytesToHex(buff);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return md5str.toLowerCase();
    }

    /**
     * 二进制转十六进制
     *
     * @param bytes
     * @return
     */
    public static String bytesToHex(byte[] bytes) {
        StringBuffer md5str = new StringBuffer();
        // 把数组每一字节换成16进制连成md5字符串
        int digital;
        for (int i = 0; i < bytes.length; i++) {
            digital = bytes[i];

            if (digital < 0) {
                digital += 256;
            }
            if (digital < 16) {
                md5str.append("0");
            }
            md5str.append(Integer.toHexString(digital));
        }
        return md5str.toString().toUpperCase();
    }

}
