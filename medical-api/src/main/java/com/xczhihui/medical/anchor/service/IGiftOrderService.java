package com.xczhihui.medical.anchor.service;

import com.baomidou.mybatisplus.plugins.Page;
import com.xczhihui.medical.anchor.vo.UserCoinIncreaseVO;

public interface IGiftOrderService {

    /**
     * 获取用户的礼物订单列表
     *
     * @param userId 用户id
     */
    Page<UserCoinIncreaseVO> list(String userId, Page<UserCoinIncreaseVO> page,
                                  String gradeName, String startTime, String endTime);

    /**
     * 礼物订单排行榜
     *
     * @param liveId 直播id
     * @param userId 用户id
     */
    Page<UserCoinIncreaseVO> sort(String liveId, String userId, Page<UserCoinIncreaseVO> page);

}
