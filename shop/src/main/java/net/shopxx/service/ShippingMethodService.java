/*
 * Copyright 2008-2018 shopxx.net. All rights reserved.
 * Support: http://www.shopxx.net
 * License: http://www.shopxx.net/license
 * FileId: XTZOJf/fG8E4YotZHmUqEycIj625UnhG
 */
package net.shopxx.service;

import java.math.BigDecimal;

import net.shopxx.entity.Area;
import net.shopxx.entity.Receiver;
import net.shopxx.entity.ShippingMethod;
import net.shopxx.entity.Store;

/**
 * Service - 配送方式
 * 
 * @author ixincheng
 * @version 6.1
 */
public interface ShippingMethodService extends BaseService<ShippingMethod, Long> {

	/**
	 * 计算运费
	 * 
	 * @param shippingMethod
	 *            配送方式
	 * @param store
	 *            店铺
	 * @param area
	 *            地区
	 * @param weight
	 *            重量
	 * @return 运费
	 */
	BigDecimal calculateFreight(ShippingMethod shippingMethod, Store store, Area area, Integer weight);

	/**
	 * 计算运费
	 * 
	 * @param shippingMethod
	 *            配送方式
	 * @param store
	 *            店铺
	 * @param receiver
	 *            收货地址
	 * @param weight
	 *            重量
	 * @return 运费
	 */
	BigDecimal calculateFreight(ShippingMethod shippingMethod, Store store, Receiver receiver, Integer weight);
}