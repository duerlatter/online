/*
 * Copyright 2008-2018 shopxx.net. All rights reserved.
 * Support: http://www.shopxx.net
 * License: http://www.shopxx.net/license
 * FileId: cr8wjJdhPGYkQ3B12eodwq59edVF+ZQb
 */
package net.shopxx.service;

import java.util.List;

import net.shopxx.Filter;
import net.shopxx.Order;
import net.shopxx.entity.FriendLink;

/**
 * Service - 友情链接
 * 
 * @author ixincheng
 * @version 6.1
 */
public interface FriendLinkService extends BaseService<FriendLink, Long> {

	/**
	 * 查找友情链接
	 * 
	 * @param type
	 *            类型
	 * @return 友情链接
	 */
	List<FriendLink> findList(FriendLink.Type type);

	/**
	 * 查找友情链接
	 * 
	 * @param count
	 *            数量
	 * @param filters
	 *            筛选
	 * @param orders
	 *            排序
	 * @param useCache
	 *            是否使用缓存
	 * @return 友情链接
	 */
	List<FriendLink> findList(Integer count, List<Filter> filters, List<Order> orders, boolean useCache);

}