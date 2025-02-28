package com.xczhihui.common.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * 有关日期方面的操作类
 */
public class DateUtil {

    /**
     * day的format形式，格式为为：2015-12-14
     */
    public final static String FORMAT_DAY = "yyyy-MM-dd";

    /**
     * day的format形式，格式为为：2015-12-14 05:15:31
     */
    public final static String FORMAT_DAY_TIME = "yyyy-MM-dd HH:mm:ss";

    /**
     * day的format形式，格式为为：2015年12月14日
     */
    public final static String FORMAT_CHINA_DAY = "yyyy年MM月dd日";

    /**
     * day的format形式，格式为为：2015年12月14日 05时15分31秒
     */
    public final static String FORMAT_CHINA_DAY_TIME = "yyyy年MM月dd日 HH时mm分ss秒";
    
    /**
     * day的format形式，格式为为：2015年12月14日 05时15分
     */
    public final static String FORMAT_CHINA_MINUTE = "yyyy年MM月dd日 HH时mm分";

    /**
     * day的format形式，格式为为：05时15分
     */
    public final static String FORMAT_CHINA_HOUR_MINUTE = "HH时mm分";
    
    
    public final static String  VERB= "至";
    
    
    static Map<Integer, String> dayMap;

    static {
        dayMap = new HashMap<>();
        dayMap.put(1, "一");
        dayMap.put(2, "二");
        dayMap.put(3, "三");
        dayMap.put(4, "四");
        dayMap.put(5, "五");
        dayMap.put(6, "六");
        dayMap.put(7, "日");
    }

    static Map<Integer, String> weekMap;

    static {
        weekMap = new HashMap<>();
        weekMap.put(1, "一");
        weekMap.put(2, "二");
        weekMap.put(3, "三");
        weekMap.put(4, "四");
        weekMap.put(5, "五");
        weekMap.put(6, "六");
        weekMap.put(0, "日");
    }


    /**
     * 格式化日期，格式为：yyyy-MM-dd HH:mm:ss
     *
     * @param date
     * @return String
     */
    public static String formatDate(Date date) {
        return formatDate(date, null);
    }

    /**
     * 格式化日期
     *
     * @param date
     * @param formate null：yyyy-MM-dd HH:mm:ss
     * @return String
     */
    public static String formatDate(Date date, String format) {
        if (date == null) {
            date = new Date(System.currentTimeMillis());
        }
        if (format == null || format.trim().length() < 1) {
            format = FORMAT_DAY_TIME;
        }

        DateFormat dateFormat = new SimpleDateFormat(format);
        return dateFormat.format(date);
    }

    /**
     * 把给定格式的字符串日期转换成其他格式的日期字符串
     *
     * @param date           日期
     * @param formate        与给定日期匹配格式的格式化模板
     * @param anotherPattern 待被转换成的目标模板
     * @return 转换后的日期字符串
     * eg：
     */
    public static String toAnotherFormate(String date, String formate, String anotherPattern) {
        SimpleDateFormat sdf = new SimpleDateFormat(formate);
        try {
            Date d = sdf.parse(date);
            sdf = new SimpleDateFormat(anotherPattern);
            return sdf.format(d);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;

    }

    /**
     * 解析日期
     *
     * @param value
     * @param format 默认值为"yyyy-MM-dd HH:mm:ss"
     * @return Date
     */
    public static Date parseDate(String value, String format) {
        if (IStringUtil.isNotBlank(value)) {
            if (!IStringUtil.isNotBlank(format)) {
                format = FORMAT_DAY_TIME;
            }
            DateFormat dateFormate = new SimpleDateFormat(format);
            Date date = null;
            try {
                date = dateFormate.parse(value);
            } catch (ParseException e) {
                throw new RuntimeException(e.getMessage(), e);
            }
            return date;
        }
        return null;
    }

    /**
     * 根据日期计算星座
     *
     * @param month
     * @param date
     */
    public static String getConstellation(Date date) {
        Calendar cal = Calendar.getInstance();
        if (date != null) {
            cal.setTime(date);
        }
        int month = cal.get(Calendar.MONTH) + 1;
        int day = cal.get(Calendar.DAY_OF_MONTH);

        return getConstellation(month, day);
    }

    /**
     * 根据月份和日期计算星座
     *
     * @param month
     * @param day
     * @return String
     */
    public static String getConstellation(int month, int day) {
        String s = "魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
        int[] arr = {20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22};
        int num = month * 2 - (day < arr[month - 1] ? 2 : 0);
        return s.substring(num, num + 2);
    }

    /**
     * 根据年份计算生肖
     *
     * @param year
     * @return String
     */
    public static String getZodiac(int year) {
        if (year < 1900) {
            return null;
        }
        String str = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
        int num = (year - 1900) % 12;
        return str.substring(num, num + 1);
    }

    public static String getDayOfWeek(Integer day) {
        return dayMap.get(day);
    }

    public static String getDayOfWeek(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        return "星期" + weekMap.get(calendar.get(Calendar.DAY_OF_WEEK) - 1);
    }

    public static boolean isCurrentYear(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        int dateYear = calendar.get(Calendar.YEAR);
        calendar.setTime(new Date());
        int curYear = calendar.get(Calendar.YEAR);
        return dateYear == curYear;
    }
    
    
    
    /**
     * 解析日期
     *
     * @param value
     * @param format 默认值为"yyyy-MM-dd HH:mm:ss"
     * @return Date
     * @throws Exception 
     */
    public static Date parseDate1(String value, String format) throws Exception {
        if (IStringUtil.isNotBlank(value)) {
            if (!IStringUtil.isNotBlank(format)) {
                format = FORMAT_DAY_TIME;
            }
            DateFormat dateFormate = new SimpleDateFormat(format);
            Date date = null;
            try {
                date = dateFormate.parse(value);
            } catch (Exception e) {
                throw new Exception("时间格式有误");
            }
            return date;
        }
        return null;
    }
    
    /**
     * 
     * <p>Title:获取诊疗时间段</p>  
     * <p>Description: </p>  
     * @param value
     * @param format
     * @return
     * @throws Exception
     */
    public static String treatmentTime(Date startTime,Date endTime) throws Exception {
    	String start = formatDate(startTime,FORMAT_CHINA_MINUTE);
    	String end = formatDate(endTime,FORMAT_CHINA_HOUR_MINUTE);
        return start+VERB+end;
    }
    
//    public final static String FORMAT_CHINA_MINUTE = "yyyy年MM月dd日 HH时mm分";
//    public final static String FORMAT_CHINA_HOUR_MINUTE = "HH时mm分";
    
    
    public static void main(String[] args) throws Exception {
        
        System.out.println(parseDate1("2018-01/01","yyyy/MM/dd"));
        
    }
    
    
}
