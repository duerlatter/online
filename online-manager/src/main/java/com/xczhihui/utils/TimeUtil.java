package com.xczhihui.utils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class TimeUtil {

    private static final DateFormat FORMAT = new SimpleDateFormat("yyyy-MM-dd");
    private static final DateFormat FORMAT_HH_MM_SS = new SimpleDateFormat(
            "yyyy-MM-dd hh:mm:ss");
    private static final DateFormat FORMAT_HH_MM = new SimpleDateFormat(
            "yyyy-MM-dd hh:mm");
    private static final DateFormat FORMAT_HHMM_UNDERLINE = new SimpleDateFormat(
            "yyyy_MM_dd_hh_mm_ss");

    public static String formatTime(String ms) {
        int a = Integer.parseInt(ms);
        SimpleDateFormat formatter = new SimpleDateFormat("mm:ss");

        String hms = formatter.format(a);

        return hms;
    }

    /**
     * 格式化成时期对象
     *
     * @param date
     * @return
     */
    public static Date parseDate(String date) {
        try {
            return FORMAT_HH_MM.parse(date);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 格式化成时期对象 yyyy-MM-dd
     *
     * @param date
     * @return
     */
    public static Date stringParseDate(String date) {
        try {
            return FORMAT.parse(date);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 格式化成字符串对象
     *
     * @param date
     * @return
     */
    public static String formatDate(Date date) {
        try {
            return FORMAT_HH_MM_SS.format(date);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 格式化成字符串对象
     *
     * @param date
     * @return
     */
    public static String formatDateUnderline(Date date) {
        try {
            return FORMAT_HHMM_UNDERLINE.format(date);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 时间和当前时间对比 不足1小时显示XX分钟前,超过一小时不足一天显示XX小时前,超过1天显示昨天,大于1天显示日期
     *
     * @param date
     * @return
     * @author majian
     */
    public static String comparisonDate(Date date) {
        Date now = new Date();
        long l = now.getTime() - date.getTime();
        long day = l / (24 * 60 * 60 * 1000);
        long hour = (l / (60 * 60 * 1000) - day * 24);
        long min = ((l / (60 * 1000)) - day * 24 * 60 - hour * 60);
        long s = (l / 1000 - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60);
        if (day == 1) {
            return "昨天";
        } else if (day > 1) {
            return FORMAT.format(date);
        }
        if (hour > 0) {
            return hour + "小时前";
        }
        if (min > 0) {
            return min + "分钟前";
        } else {
            return "刚刚";
        }
    }

    /**
     * 计算两个日期之间相差多久
     *
     * @param begin
     * @param end
     * @return
     */
    public static String countTime(String begin, String end) {
        int hour = 0;
        int minute = 0;
        long total_minute = 0;
        StringBuffer sb = new StringBuffer();

        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            Date begin_date = df.parse(begin);
            Date end_date = df.parse(end);

            total_minute = (end_date.getTime() - begin_date.getTime())
                    / (1000 * 60);

            hour = (int) total_minute / 60;
            minute = (int) total_minute % 60;

        } catch (ParseException e) {
            e.printStackTrace();
        }

        sb.append("工作时间为：").append(hour).append("小时").append(minute)
                .append("分钟");
        return sb.toString();
    }

    public static Integer countTime(Date begin_date, Date end_date) {
        int hour = 0;
        long total_minute = 0;

        total_minute = (end_date.getTime() - begin_date.getTime())
                / (1000 * 60);

        hour = (int) total_minute / 60;

        int day = 0;
        day = hour / 24;
        return day == 0 ? 1 : day;
    }

    /**
     * 返回分秒
     *
     * @param timeLong
     * @return 例如:00时59分59秒
     */
    public static String timeConvert(long ms) {
        StringBuilder str = new StringBuilder();
        if (ms / (1000 * 60 * 60) > 1) {
            str.append((ms / (1000 * 60 * 60)) + "时");
            ms = ms - (1000 * 60 * 60) * (ms / (1000 * 60 * 60));
            if (ms / (1000 * 60) > 0) {
                str.append((ms / (1000 * 60)) + "分");
                ms = ms - (1000 * 60 * (ms / (1000 * 60)));
                if (ms / 1000 > 0) {
                    str.append((ms / 1000) + "秒");
                }
            } else {
                str.append("0分");
                if (ms / 1000 > 0) {
                    str.append((ms / 1000) + "秒");
                }
            }
        } else {
            if (ms / (1000 * 60) > 0) {
                str.append((ms / (1000 * 60)) + "分");
                ms = ms - (1000 * 60 * (ms / (1000 * 60)));
                if (ms / 1000 > 0) {
                    str.append((ms / 1000) + "秒");
                }
            } else {
                if (ms / 1000 > 0) {
                    str.append((ms / 1000) + "秒");
                } else {
                    str.append("00分00秒");
                }
            }
        }
        return str.toString();
    }

    /**
     * 返回分秒
     *
     * @param timeLong
     * @return 例如:00时59分59秒
     */
    public static String timeConvertHHMM(long ms) {
        StringBuilder str = new StringBuilder();
        if (ms / (1000 * 60 * 60) > 1) {
            if (ms / (1000 * 60 * 60) < 10) {
                str.append("0" + ms / (1000 * 60 * 60) + "时");
            } else {
                str.append(ms / (1000 * 60 * 60) + "时");
            }
            ms = ms - (1000 * 60 * 60) * (ms / (1000 * 60 * 60));
            if (ms / (1000 * 60) > 0) {
                if (ms / (1000 * 60) < 10) {
                    str.append("0" + ms / (1000 * 60) + "分");
                } else {
                    str.append(ms / (1000 * 60) + "分");
                }
                ms = ms - (1000 * 60 * (ms / (1000 * 60)));
            } else {
                str.append("00分");
            }
        } else {
            str.append("00时");
            if (ms / (1000 * 60) > 0) {
                if (ms / (1000 * 60) < 10) {
                    str.append("0" + ms / (1000 * 60) + "分");
                } else {
                    str.append((ms / (1000 * 60)) + "分");
                }
                ms = ms - (1000 * 60 * (ms / (1000 * 60)));
            } else {
                str.append("00分");
            }
        }
        return str.toString();
    }

    /**
     * 返回分秒
     *
     * @param timeLong
     * @return 例如:59分59秒
     */
    public static String timeConvertMMSS(long ms) {
        StringBuilder str = new StringBuilder();
        if (ms / (1000 * 60 * 60) > 1) {
            str.append((ms / (1000 * 60)) + "分");
            ms = ms - (1000 * 60 * 60) * (ms / (1000 * 60 * 60));
            if (ms / (1000 * 60) > 0) {
                ms = ms - (1000 * 60 * (ms / (1000 * 60)));
                if (ms / 1000 > 0) {
                    str.append((ms / 1000) + "秒");
                }
            } else {
                str.append("00分");
                if (ms / 1000 > 0) {
                    str.append((ms / 1000) + "秒");
                }
            }
        } else {
            if (ms / (1000 * 60) > 0) {
                if (ms / (1000 * 60) < 10) {
                    str.append("0" + (ms / (1000 * 60)) + "分");
                } else {
                    str.append((ms / (1000 * 60)) + "分");
                }
                ms = ms - (1000 * 60 * (ms / (1000 * 60)));
                if (ms / 1000 > 0) {
                    str.append((ms / 1000) + "秒");
                }
            } else {
                str.append("00分");
                if (ms / 1000 > 0) {
                    if ((ms / 1000) < 10) {
                        str.append("0" + (ms / 1000) + "秒");
                    } else {
                        str.append((ms / 1000) + "秒");
                    }
                } else {
                    str.append("00秒");
                }
            }
        }
        return str.toString();
    }

    /**
     * 计算视频时长小时
     *
     * @return
     */
    public static Integer countTimeHour(Integer timelong) {
        int hour = 0;
        long total_minute = 0;

        total_minute = (timelong) / (1000 * 60);

        hour = (int) total_minute / 60;

        return hour;
    }

    /**
     * 计算视频时长分钟
     *
     * @param timelong
     * @return
     */
    public static Integer countTimeMinute(Integer timelong) {
        int minute = 0;
        long total_minute = 0;

        total_minute = (timelong) / (1000 * 60);

        minute = (int) total_minute % 60;

        return minute;
    }

    /**
     * 计算视频毫秒数
     *
     * @param timelong
     * @return
     */
    public static String countTimeMillisecond(Integer minute) {
        Integer timeLong = 0;
        if (minute == null) {
            return String.valueOf(timeLong);
        }
        timeLong = minute * 1000 * 60;
        return String.valueOf(timeLong);
    }

    /**
     * 返回分秒
     *
     * @param timeLong
     * @return 例如:59:59
     */
    public static String getMinuteAndSecond(long timeLong) {
        String mm = "00";
        String ss = "00";
        timeLong = timeLong / 1000; // 获得总秒数
        if (timeLong % 60 == 0) {
            mm = String.valueOf(timeLong / 60);
        } else {
            mm = String.valueOf(timeLong / 60);
            ss = String.valueOf(timeLong % 60);
        }
        if (mm.length() == 1) {
            mm = "0" + mm;
        }
        if (ss.length() == 1) {
            ss = "0" + ss;
        }
        return mm + ":" + ss;
    }

    /**
     * 通过视频时长返回视频的long类型
     *
     * @param time 例如:59:59
     * @return
     */
    public static long getTimeLong(String time) {
        if (StringUtil.checkNull(time)) {
            return 0;
        }
        long timeLong = 0;
        String[] array = time.split(":");
        long hourLong = Long.parseLong(array[0]);
        long hourMinute = Long.parseLong(array[1]);
        timeLong = (hourMinute + hourLong * 60) * 1000;
        return timeLong;
    }

    // 指定日期加上指定天数得到新日期
    public static Date addDate(Date date, long day) throws ParseException {
        long time = date.getTime(); // 得到指定日期的毫秒数
        day = day * 24 * 60 * 60 * 1000; // 要加上的天数转换成毫秒数
        time += day; // 相加得到新的毫秒数
        return new Date(time); // 将毫秒数转换成日期
    }

    /**
     * 获取系统时间,格式如：06111214
     *
     * @return
     */
    public static String getSystemTime() {
        SimpleDateFormat df = new SimpleDateFormat("yyMMddHH");
        Date date = new Date();
        String curentTime = df.format(date);
        return curentTime;
    }
}
