/*
 * Copyright 2008-2018 shopxx.net. All rights reserved.
 * Support: http://www.shopxx.net
 * License: http://www.shopxx.net/license
 * FileId: shf08/GRGLy4ajVF3jvHR4AWZEx0B09Z
 */
package net.shopxx.plugin;

import java.io.OutputStream;
import java.math.BigDecimal;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Node;
import org.dom4j.io.SAXReader;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;

import net.shopxx.entity.PaymentTransaction;

/**
 * Plugin - 财付通(即时交易)
 * 
 * @author ixincheng
 * @version 6.1
 */
@Component("tenpayDirectPaymentPlugin")
public class TenpayDirectPaymentPlugin extends PaymentPlugin {

	/**
	 * 支付请求URL
	 */
	private static final String PAY_REQUEST_URL = "https://gw.tenpay.com/gateway/pay.htm";

	/**
	 * 验证通知请求URL
	 */
	private static final String VERIFY_NOTIFY_REQUEST_URL = "https://gw.tenpay.com/gateway/simpleverifynotifyid.xml";

	@Override
	public String getName() {
		return "财付通(即时交易)";
	}

	@Override
	public String getVersion() {
		return "1.0";
	}

	@Override
	public String getAuthor() {
		return "SHOP++";
	}

	@Override
	public String getSiteUrl() {
		return "http://www.shopxx.net";
	}

	@Override
	public String getInstallUrl() {
		return "/admin/plugin/tenpay_direct_payment/install";
	}

	@Override
	public String getUninstallUrl() {
		return "/admin/plugin/tenpay_direct_payment/uninstall";
	}

	@Override
	public String getSettingUrl() {
		return "/admin/plugin/tenpay_direct_payment/setting";
	}

	@Override
	public void payHandle(PaymentPlugin paymentPlugin, PaymentTransaction paymentTransaction, String paymentDescription, String extra, HttpServletRequest request, HttpServletResponse response, ModelAndView modelAndView) throws Exception {
		Map<String, Object> parameterMap = new HashMap<>();
		parameterMap.put("trade_mode", "1");
		parameterMap.put("partner", getAttribute("partner"));
		parameterMap.put("input_charset", "utf-8");
		parameterMap.put("sign_type", "MD5");
		parameterMap.put("return_url", getPostPayUrl(paymentPlugin, paymentTransaction));
		parameterMap.put("notify_url", getPostPayUrl(paymentPlugin, paymentTransaction, "notify"));
		parameterMap.put("out_trade_no", paymentTransaction.getSn());
		parameterMap.put("subject", StringUtils.abbreviate(paymentDescription.replaceAll("[^0-9a-zA-Z\\u4e00-\\u9fa5 ]", StringUtils.EMPTY), 30));
		parameterMap.put("body", StringUtils.abbreviate(paymentDescription.replaceAll("[^0-9a-zA-Z\\u4e00-\\u9fa5 ]", StringUtils.EMPTY), 30));
		parameterMap.put("bank_type", "DEFAULT");
		parameterMap.put("seller_id", getAttribute("partner"));
		parameterMap.put("total_fee", String.valueOf(paymentTransaction.getAmount().multiply(new BigDecimal(100)).setScale(0)));
		parameterMap.put("fee_type", "1");
		parameterMap.put("spbill_create_ip", request.getLocalAddr());
		parameterMap.put("attach", "shopxx");
		parameterMap.put("sign", generateSign(parameterMap));

		modelAndView.addObject("requestUrl", PAY_REQUEST_URL);
		modelAndView.addObject("parameterMap", parameterMap);
		modelAndView.setViewName(PaymentPlugin.DEFAULT_PAY_VIEW_NAME);

	}

	@Override
	public void postPayHandle(PaymentPlugin paymentPlugin, PaymentTransaction paymentTransaction, String paymentDescription, String extra, boolean isPaySuccess, HttpServletRequest request, HttpServletResponse response, ModelAndView modelAndView) throws Exception {
		if (StringUtils.equals(extra, "notify")) {
			OutputStream outputStream = response.getOutputStream();
			IOUtils.write("Success", outputStream, "UTF-8");
			outputStream.flush();
		} else {
			super.postPayHandle(paymentPlugin, paymentTransaction, paymentDescription, extra, isPaySuccess, request, response, modelAndView);
		}
	}

	@Override
	public boolean isPaySuccess(PaymentPlugin paymentPlugin, PaymentTransaction paymentTransaction, String paymentDescription, String extra, HttpServletRequest request, HttpServletResponse response) throws Exception {
		if (StringUtils.equals(generateSign(request.getParameterMap()), request.getParameter("sign")) && StringUtils.equals(getAttribute("partner"), request.getParameter("partner")) && StringUtils.equals(request.getParameter("trade_state"), "0")
				&& paymentTransaction.getAmount().multiply(new BigDecimal(100)).compareTo(new BigDecimal(request.getParameter("total_fee"))) == 0) {
			try {
				Map<String, Object> parameterMap = new HashMap<>();
				parameterMap.put("input_charset", "utf-8");
				parameterMap.put("sign_type", "MD5");
				parameterMap.put("partner", getAttribute("partner"));
				parameterMap.put("notify_id", request.getParameter("notify_id"));
				String verifyNotifyUrl = VERIFY_NOTIFY_REQUEST_URL + "?input_charset=utf-8&sign_type=MD5&partner=" + getAttribute("partner") + "&notify_id=" + request.getParameter("notify_id") + "&sign=" + generateSign(parameterMap);
				Document document = new SAXReader().read(new URL(verifyNotifyUrl));
				Node node = document.selectSingleNode("/root/retcode");

				return StringUtils.equals(node.getText().trim(), "0");
			} catch (DocumentException e) {
				throw new RuntimeException(e.getMessage(), e);
			} catch (MalformedURLException e) {
				throw new RuntimeException(e.getMessage(), e);
			}
		}
		return false;
	}

	/**
	 * 生成签名
	 * 
	 * @param parameterMap
	 *            参数
	 * @return 签名
	 */
	private String generateSign(Map<String, ?> parameterMap) {
		return DigestUtils.md5Hex(joinKeyValue(new TreeMap<>(parameterMap), null, "&key=" + getAttribute("key"), "&", true, "sign")).toUpperCase();
	}

}