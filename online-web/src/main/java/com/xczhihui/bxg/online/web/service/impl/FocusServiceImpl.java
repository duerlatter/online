package com.xczhihui.bxg.online.web.service.impl;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xczhihui.bxg.online.common.domain.Focus;
import com.xczhihui.bxg.online.common.domain.OnlineUser;
import com.xczhihui.bxg.online.web.dao.FocusDao;
import com.xczhihui.bxg.online.web.service.FocusService;
import com.xczhihui.common.util.bean.Page;
import com.xczhihui.common.util.bean.ResponseObject;

/**
 * @author
 * @create 2017-08-20 13:07
 **/
@Service
public class FocusServiceImpl implements FocusService {

    @Autowired
    private FocusDao focusDao;

    @Override
    public void addFocusInfo(Focus focus, OnlineUser onlineUser, OnlineUser onlineLecturer) {
        focus.setId(UUID.randomUUID().toString().replaceAll("-", ""));
        focus.setUserId(onlineUser.getId());
        focus.setUserName(onlineUser.getName());
        focus.setUserHeadImg(onlineUser.getSmallHeadPhoto());
        focus.setLecturerId(onlineLecturer.getId());
        focus.setLecturerName(onlineLecturer.getName());
        focus.setLecturerHeadImg(onlineLecturer.getSmallHeadPhoto());
        focus.setRoomNumber(onlineLecturer.getRoomNumber());
        focusDao.save(focus);
    }

    @Override
    public ResponseObject removeFocus(String lecturerId, String userId) {
        focusDao.getNamedParameterJdbcTemplate().getJdbcOperations().update("delete from oe_focus where user_id = ?  and  lecturer_id = ?", userId, lecturerId);
        return ResponseObject.newSuccessResponseObject("取消关注成功!");
    }

    @Override
    public Page<Focus> findMyFocus(String userId, Integer number, Integer pageSize) {
        return focusDao.findMyFocus(userId, number, pageSize);
    }

    @Override
    public Page<Focus> findMyFans(String userId, Integer pageNumber, Integer pageSize) {
        return focusDao.findMyFans(userId, pageNumber, pageSize);
    }
}
