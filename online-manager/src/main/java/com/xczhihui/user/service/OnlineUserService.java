package com.xczhihui.user.service;

import java.util.List;
import java.util.Map;

import com.xczhihui.bxg.online.common.domain.OnlineUser;
import com.xczhihui.common.util.bean.Page;

/**
 * 网站用户
 *
 * @author Haicheng Jiang
 */
public interface OnlineUserService {
    /**
     * 按条件分页查询用户
     *
     * @param lastLoginIp
     * @param createTimeStart
     * @param createTimeEnd
     * @param lastLoginTimeStart
     * @param lastLoginTimeEnd
     * @param searchName
     * @param status
     * @param pageNumber
     * @param pageSize
     * @return
     */
    public Page<OnlineUser> findUserPage(String lastLoginIp,
                                         String createTimeStart, String createTimeEnd,
                                         String lastLoginTimeStart, String lastLoginTimeEnd,
                                         String searchName, Integer status, Integer menuId, int pageNumber,
                                         int pageSize);

    /**
     * 禁用/启用
     *
     * @param loginName
     */
    public void updateUserStatus(String loginName, int status);

    /**
     * 设置学科权限
     *
     * @return
     */
    public void updateMenuForUser(OnlineUser entity);

    /**
     * 查找所有的讲师 Description：
     *
     * @return List<Map<String,Object>>
     * @author name：yangxuan <br>
     * email: 15936216273@163.com
     */
    List<Map<String, Object>> getAllUserLecturer();

    /**
     * 设置此用户为讲师 Description：
     *
     * @param loginName
     * @param status
     * @param description
     * @return void
     * @author name：yangxuan <br>
     * email: 15936216273@163.com
     */
    void updateUserLecturer(String loginName, int status, String description);

    public OnlineUser getOnlineUserByUserId(String userId);

    OnlineUser getUserByLoginName(String loginName);

    public List<Map<String, Object>> getAllCourseName();

    void updateUserLogin(String userId, String loginName);
}
