/*
 * Copyright 2008-2018 shopxx.net. All rights reserved.
 * Support: http://www.shopxx.net
 * License: http://www.shopxx.net/license
 * FileId: nklnu1bE0Aq1iP8kRJV1QvUm+i+PH/QF
 */
package net.shopxx.dao;

import java.util.Collection;

import net.shopxx.entity.PaymentTransaction;
import net.shopxx.plugin.PaymentPlugin;

/**
 * Dao - 支付事务
 * 
 * @author ixincheng
 * @version 6.1
 */
public interface PaymentTransactionDao extends BaseDao<PaymentTransaction, Long> {

	/**
	 * 查找可用支付事务
	 * 
	 * @param lineItem
	 *            支付明细
	 * @param paymentPlugin
	 *            支付插件
	 * @return 可用支付事务，若不存在则返回null
	 */
	PaymentTransaction findAvailable(PaymentTransaction.LineItem lineItem, PaymentPlugin paymentPlugin);

	/**
	 * 查找可用父支付事务
	 * 
	 * @param lineItems
	 *            支付明细
	 * @param paymentPlugin
	 *            支付插件
	 * @return 可用父支付事务，若不存在则返回null
	 */
	PaymentTransaction findAvailableParent(Collection<PaymentTransaction.LineItem> lineItems, PaymentPlugin paymentPlugin);

}