package com.xczh.consumer.market.controller.threeparties;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xczh.consumer.market.auth.Account;
import com.xczh.consumer.market.bean.WxcpClientUserWxMapping;
import com.xczh.consumer.market.service.WxcpClientUserWxMappingService;
import com.xczh.consumer.market.utils.ResponseObject;
import com.xczhihui.common.util.enums.ThirdPartyType;
import com.xczhihui.course.model.QQClientUserMapping;
import com.xczhihui.course.model.WeiboClientUserMapping;
import com.xczhihui.course.service.IThreePartiesLoginService;

import weibo4j.http.HttpClient;

/**
 * ClassName: ThirdPartyCertificationController.java <br>
 * Description: <br>
 * Create by: name：yangxuan <br>email: 15936216273@163.com <br>
 * Create Time: 2018年2月2日<br>
 */
@Controller
@RequestMapping(value = "/xczh/bind")
public class ThirdPartyBindingController {

    private static final org.slf4j.Logger LOGGER = LoggerFactory.getLogger(ThirdPartyBindingController.class);


    public HttpClient client = new HttpClient();
    //手机端登录使用
    @Value("${mobile.authorizeURL}")
    public String weiboMobileAuthorizeURL;
    @Autowired
    private IThreePartiesLoginService threePartiesLoginService;
    @Autowired
    private WxcpClientUserWxMappingService wxcpClientUserWxMappingService;

    /**
     * Description：获取当前用户的绑定信息
     *
     * @param req
     * @return ResponseObject
     * @author name：yangxuan <br>email: 15936216273@163.com
     */
    @RequestMapping(value = "userBindingInfo")
    @ResponseBody
    public ResponseObject userBindingInfo(@Account String accountId) {
        try {
            Map<String, Object> map = threePartiesLoginService.selectUserBindingInfo(accountId);
            return ResponseObject.newSuccessResponseObject(map);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseObject.newSuccessResponseObject("获取用户绑定信息有误");
        }
    }

    /**
     * Description：解除绑定
     *
     * @param req
     * @return ResponseObject
     * @author name：yangxuan <br>email: 15936216273@163.com
     */
    @RequestMapping(value = "removeBinding")
    @ResponseBody
    public ResponseObject removeBinding(@RequestParam("unionId") String unionId,
                                        @RequestParam("type") Integer type, @Account String accountId) {
        try {
            if (type == ThirdPartyType.WECHAT.getCode()) {  //微信
                WxcpClientUserWxMapping m = wxcpClientUserWxMappingService.getWxcpClientUserWxMappingByUserIdAndUnionId(accountId, unionId);
                m.setClient_id("");
                wxcpClientUserWxMappingService.update(m);
            } else if (type == ThirdPartyType.QQ.getCode()) {
                QQClientUserMapping qq = threePartiesLoginService.selectQQClientUserMappingByUserIdAndOpenId(accountId, unionId);
                qq.setUserId("");
                threePartiesLoginService.updateQQInfoAddUserId(qq);
            } else if (type == ThirdPartyType.WEIBO.getCode()) {
                WeiboClientUserMapping weibo = threePartiesLoginService.selectWeiboClientUserMappingByUserIdAndUid(accountId, unionId);
                weibo.setUserId("");
                threePartiesLoginService.updateWeiboInfoAddUserId(weibo);
            }
            return ResponseObject.newSuccessResponseObject("解除绑定成功");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseObject.newSuccessResponseObject("解除绑定失败");
        }
    }
}
