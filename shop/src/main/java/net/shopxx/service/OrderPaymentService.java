/*
 * Copyright 2008-2018 shopxx.net. All rights reserved.
 * Support: http://www.shopxx.net
 * License: http://www.shopxx.net/license
 * FileId: ZNzYhxEeOo2KGFX+NMbeio4fsJr0jW81
 */
package net.shopxx.service;

import net.shopxx.entity.OrderPayment;

/**
 * Service - 订单支付
 * 
 * @author ixincheng
 * @version 6.1
 */
public interface OrderPaymentService extends BaseService<OrderPayment, Long> {

	/**
	 * 根据编号查找订单支付
	 * 
	 * @param sn
	 *            编号(忽略大小写)
	 * @return 订单支付，若不存在则返回null
	 */
	OrderPayment findBySn(String sn);

}