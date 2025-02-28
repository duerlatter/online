package com.xczhihui.bxg.online.web.service.impl;/**
 * Created by admin on 2016/10/13.
 */

import java.util.List;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.stereotype.Service;

import com.xczhihui.bxg.online.common.domain.User;
import com.xczhihui.bxg.online.web.service.ManagerUserService;
import com.xczhihui.common.support.dao.SimpleHibernateDao;

/**
 * Manager端用户业务层接口
 *
 * @author 康荣彩
 * @create 2016-10-13 17:06
 */
@Service
public class ManagerUserServiceImpl extends SimpleHibernateDao implements ManagerUserService {

    private final static String salt = "ipandatcm20180611";

    /**
     * 查看当前登录账号是否存在于manager端
     *
     * @param loginName 当前登录用户的登录账号
     * @return
     */
    @Override
    public User findUserByLoginName(String loginName) {
        String sql = "select login_name from user t where upper(md5(upper(md5(CONCAT(t.login_name,'" + salt + "'))))) = upper(?)";
        List<User> user = this.getNamedParameterJdbcTemplate().getJdbcOperations().query(sql,
                BeanPropertyRowMapper.newInstance(User.class), loginName);
        return user.size() > 0 ? user.get(0) : null;

    }

}
