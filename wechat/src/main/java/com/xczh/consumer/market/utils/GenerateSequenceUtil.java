package com.xczh.consumer.market.utils;

import java.util.Calendar;
import java.util.Random;

/**
 * 生成唯一的20数字序列号;
 *
 * @author yanghui <br>
 */
public class GenerateSequenceUtil {

    private static final int MAX = 9999;
    private static int spec = 0;
    private static int seq = 0;

    static {
        Random r = new Random();
        spec = r.nextInt(99);
        while (spec < 10) {
            spec = r.nextInt(99);
        }
    }

    public static String GetDateTimeStr() {
        Calendar CD = Calendar.getInstance();

        int YY = CD.get(Calendar.YEAR);
        //分布式下id重复的可能
        //??YY = Integer.parseInt(String.valueOf(YY).replaceFirst("20", String.valueOf(spec)));

        int MM = CD.get(Calendar.MONTH) + 1;
        int DD = CD.get(Calendar.DATE);
        int HH = CD.get(Calendar.HOUR_OF_DAY);
        int NN = CD.get(Calendar.MINUTE);
        int SS = CD.get(Calendar.SECOND);
        // int MI = CD.get(Calendar.MILLISECOND);

        return String.format("%04d%02d%02d%02d%02d%02d", YY, MM, DD, HH, NN, SS);//??return String.format("%02d%02d%02d%02d%02d%02d%02d", YY, MM, DD, HH, NN, SS, String.valueOf(spec));
    }

    public static synchronized String generateSequenceNo() {

        String strPart1 = GetDateTimeStr();
        String strPart2 = String.format("%04d%02d", seq, spec);

        if (seq == MAX) {
            seq = 0;
        } else {
            seq++;
        }

        // Long lValue = new Long(strPart1 + strPart2);// Long lValue = Long.parseLong(strPart1 + strPart2); // 提升效率有一点算一点
        String sValue = strPart1 + strPart2;
        return sValue;
    }


}
