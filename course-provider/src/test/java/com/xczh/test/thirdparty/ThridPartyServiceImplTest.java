package com.xczh.test.thirdparty;

import java.util.Map;
import java.util.UUID;

import org.json.JSONObject;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.xczhihui.course.model.QQClientUserMapping;
import com.xczhihui.course.model.WeiboClientUserMapping;
import com.xczhihui.course.service.IThreePartiesLoginService;

import test.BaseJunit4Test;

/**
 * 医馆入驻测试类
 */
public class ThridPartyServiceImplTest extends BaseJunit4Test {

    @Autowired
    private IThreePartiesLoginService threePartiesLoginService;

    /**
     * 测试qq的保存信息
     */
    @Test
    public void testSaveQQInfo() {
        QQClientUserMapping qq = new QQClientUserMapping();
        qq.setId(UUID.randomUUID().toString().replace("-", ""));
        qq.setOpenId("111");
        qq.setNickname("杨宣");
        qq.setGender("男");
        qq.setLevel(1);
        qq.setVip(false);
        qq.setYellowYearVip(false);
        qq.setFigureurl("11111");
        qq.setFigureurl1("11111");
        qq.setFigureurl2("11111");
        qq.setUnionId("1111");
        threePartiesLoginService.saveQQClientUserMapping(qq);

    }

    @Test
    public void testUpdateQQInfo() {

        QQClientUserMapping qq1 = threePartiesLoginService.selectQQClientUserMappingByOpenId("111");
        qq1.setUnionId("");
        qq1.setUserId("");
        threePartiesLoginService.updateQQInfoAddUserId(qq1);

    }

    /**
     * 测试qq查询信息
     * Description：
     *
     * @return void
     * @author name：yangxuan <br>email: 15936216273@163.com
     */
    @Test
    public void testSelectQQInfo() {

        QQClientUserMapping qq1 = threePartiesLoginService.selectQQClientUserMappingByOpenId("111");

        QQClientUserMapping qq2 = threePartiesLoginService.selectQQClientUserMappingByUnionId("1");
    }

    /**
     * 测试微博查询信息
     * Description：
     *
     * @return void
     * @author name：yangxuan <br>email: 15936216273@163.com
     */
    @Test
    public void testSaveWEIBOInfo() {

        JSONObject json = new JSONObject();
        json.put("id", "123456");
        json.put("screen_name", "123456");
        json.put("name", "123456");
        json.put("province", "123456");
        json.put("city", "123456");
        json.put("location", "123456");
        json.put("description", "123456");
        json.put("url", "123456");
        json.put("profile_image_url", "123456");
        json.put("domain", "123456");
        json.put("gender", "1");
        json.put("followers_count", "123456");
        json.put("friends_count", "123456");
        json.put("favourites_count", "123456");
        json.put("statuses_count", "123456");
        json.put("created_at", "123456");
        json.put("verified", "123456");
        json.put("remark", "123456");
        json.put("lang", "123456");
        json.put("weihao", "123456");


        WeiboClientUserMapping weibo = new WeiboClientUserMapping(json);
        weibo.setId("123");
        threePartiesLoginService.saveWeiboClientUserMapping(weibo);

    }

    @Test
    public void testSelectWeiboInfo() {
        WeiboClientUserMapping weibo1 = threePartiesLoginService.selectWeiboClientUserMappingByUid("123456");
    }

    @Test
    public void testUpdateWeiboInfo() {
        WeiboClientUserMapping weibo1 = threePartiesLoginService.selectWeiboClientUserMappingByUid("123456");
        weibo1.setUserId("");
        threePartiesLoginService.updateWeiboInfoAddUserId(weibo1);
    }

    @Test
    public void testQueryMethod() {
        Map<String, Object> map = threePartiesLoginService.selectUserBindingInfo("");
    }

}