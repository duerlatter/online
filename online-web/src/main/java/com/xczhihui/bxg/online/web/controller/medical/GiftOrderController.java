package com.xczhihui.bxg.online.web.controller.medical;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.baomidou.mybatisplus.plugins.Page;
import com.xczhihui.bxg.online.common.domain.OnlineUser;
import com.xczhihui.bxg.online.web.controller.AbstractController;
import com.xczhihui.common.util.bean.ResponseObject;
import com.xczhihui.medical.anchor.service.IGiftOrderService;
import com.xczhihui.medical.anchor.vo.UserCoinIncreaseVO;

/**
 * 订单控制层
 *
 * @author zhuwenbao
 */
@RestController
@RequestMapping("/anchor/order/gift")
public class GiftOrderController extends AbstractController {

    @Autowired
    private IGiftOrderService giftOrderService;

    /**
     * 获取礼物订单列表
     *
     * @param current   当前页
     * @param size      每页显示的数据条数
     * @param gradeName 课程名
     * @param startTime 开始时间
     * @param endTime   结束时间
     */
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public ResponseObject list(HttpServletRequest request, Integer current, Integer size,
                               String gradeName, String startTime, String endTime) {

        Page<UserCoinIncreaseVO> page = new Page<>();
        page.setCurrent(current != null && current > 0 ? current : 1);
        page.setSize(size != null && size > 0 ? size : 10);

        Page<UserCoinIncreaseVO> result = giftOrderService.list(this.getCurrentUserId(request), page,
                gradeName, startTime, endTime);

        return ResponseObject.newSuccessResponseObject(result);
    }

    /**
     * 获取礼物订单列表
     *
     * @param current 当前页
     * @param size    每页显示的数据条数
     * @param liveId  直播id
     */
    @RequestMapping(value = "/rankingList", method = RequestMethod.GET)
    public ResponseObject rankingList(HttpServletRequest request, Integer current, Integer size, String liveId) {

        Page<UserCoinIncreaseVO> page = new Page<>();
        page.setCurrent(current != null && current > 0 ? current : 1);
        page.setSize(size != null && size > 0 ? size : 10);

        Page<UserCoinIncreaseVO> result = giftOrderService.sort(liveId, this.getCurrentUserId(request), page);

        return ResponseObject.newSuccessResponseObject(result);
    }

    /**
     * 获取用户id
     */
    private String getCurrentUserId(HttpServletRequest request) {
        OnlineUser loginUser = getCurrentUser();
        return loginUser.getId();
    }


}
