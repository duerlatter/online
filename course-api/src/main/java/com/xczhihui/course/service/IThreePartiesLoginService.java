package com.xczhihui.course.service;

import java.util.Map;

import com.xczhihui.course.model.QQClientUserMapping;
import com.xczhihui.course.model.WeiboClientUserMapping;


/**
 * 第三方登录service 用户保存微博、qq 第三方登录信息，也可用来查询
 * ClassName: IThreePartiesLoginService.java <br>
 * Description: <br>
 * Create by: name：yangxuan <br>email: 15936216273@163.com <br>
 * Create Time: 2018年2月1日<br>
 */
public interface IThreePartiesLoginService {

    /**
     * Description：保存--》微博信息
     *
     * @param weiboClientUserMapping
     * @return void
     * @author name：yangxuan <br>email: 15936216273@163.com
     */
    public void saveWeiboClientUserMapping(WeiboClientUserMapping weiboClientUserMapping);


    /**
     * Description：保存--》qq信息
     *
     * @param weiboClientUserMapping
     * @return void
     * @author name：yangxuan <br>email: 15936216273@163.com
     */
    public void saveQQClientUserMapping(QQClientUserMapping qqClientUserMapping);

    /**
     * Description：通过uid查找微博信息
     *
     * @param uid
     * @return WeiboClientUserMapping
     * @author name：yangxuan <br>email: 15936216273@163.com
     */
    WeiboClientUserMapping selectWeiboClientUserMappingByUid(String uid);

    /**
     * Description：通过openId查找qq信息
     *
     * @param openId
     * @return QQClientUserMapping
     * @author name：yangxuan <br>email: 15936216273@163.com
     */
    QQClientUserMapping selectQQClientUserMappingByOpenId(String openId);


    /**
     * Description：通过用户id查找信息
     *
     * @param userid
     * @return WeiboClientUserMapping
     * @author name：yangxuan <br>email: 15936216273@163.com
     */
    WeiboClientUserMapping selectWeiboClientUserMappingByUserIdAndUid(String userId, String uid);

    /**
     * Description：通过用户id查找信息
     *
     * @param userid
     * @return WeiboClientUserMapping
     * @author name：yangxuan <br>email: 15936216273@163.com
     */
    QQClientUserMapping selectQQClientUserMappingByUserIdAndUniondId(String userId, String unionId);

    /**
     * Description：
     *
     * @param qq
     * @return void
     * @author name：yangxuan <br>email: 15936216273@163.com
     */
    public void updateQQInfoAddUserId(QQClientUserMapping qq);


    public void updateWeiboInfoAddUserId(WeiboClientUserMapping weibo);


    /**
     * Description：通过unionid查找信息
     *
     * @param userid
     * @return WeiboClientUserMapping
     * @author name：yangxuan <br>email: 15936216273@163.com
     */
    QQClientUserMapping selectQQClientUserMappingByUnionId(String UnionId);

    /**
     * Description：
     *
     * @param userId
     * @return Map<String,Object>
     * @author name：yangxuan <br>email: 15936216273@163.com
     */
    Map<String, Object> selectUserBindingInfo(String userId);


    public void deleteAccount(String id);

    /**
     * Description：通过用户id和unionId获取qq信息
     *
     * @param userId
     * @param openId
     * @return QQClientUserMapping
     * @author name：yangxuan <br>email: 15936216273@163.com
     */
    QQClientUserMapping selectQQClientUserMappingByUserIdAndOpenId(String userId, String openId);


    WeiboClientUserMapping selectWeiboClientUserMappingByUserId(String userId);


    QQClientUserMapping selectQQClientUserMappingByUserId(String userId);


}
