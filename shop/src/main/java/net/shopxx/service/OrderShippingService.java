/*
 * Copyright 2008-2018 shopxx.net. All rights reserved.
 * Support: http://www.shopxx.net
 * License: http://www.shopxx.net/license
 * FileId: V3KLcDVT3fe25JDsP+KrDv7FEtDEKOn2
 */
package net.shopxx.service;

import net.shopxx.entity.OrderShipping;

import java.util.List;
import java.util.Map;

/**
 * Service - 订单发货
 * 
 * @author ixincheng
 * @version 6.1
 */
public interface OrderShippingService extends BaseService<OrderShipping, Long> {

	/**
	 * 根据编号查找订单发货
	 * 
	 * @param sn
	 *            编号(忽略大小写)
	 * @return 订单发货，若不存在则返回null
	 */
	OrderShipping findBySn(String sn);

	/**
	 * 获取物流动态
	 * 
	 * @param orderShipping
	 *            订单发货
	 * @return 物流动态
	 */
	List<Map<String, String>> getTransitSteps(OrderShipping orderShipping);

	/**
	 * 获取物流动态
	 * 
	 * @param deliveryCorpCode
	 *            物流公司代码
	 * @param trackingNo
	 *            运单号
	 * @return 物流动态
	 */
	List<Map<String, String>> getTransitSteps(String deliveryCorpCode, String trackingNo);
	/**
	 * 根据订单id查找订单发货
	 *
	 * @param orderId
	 *
	 * @return 订单发货，若不存在则返回null
	 */
	OrderShipping findByOrderId(Long orderId);

}