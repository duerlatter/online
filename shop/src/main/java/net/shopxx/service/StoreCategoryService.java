/*
 * Copyright 2008-2018 shopxx.net. All rights reserved.
 * Support: http://www.shopxx.net
 * License: http://www.shopxx.net/license
 * FileId: j4jY50gjLEWEjCAaP+l72yMGxHufJ3I/
 */
package net.shopxx.service;

import net.shopxx.entity.StoreCategory;

/**
 * Service - 店铺分类
 * 
 * @author ixincheng
 * @version 6.1
 */
public interface StoreCategoryService extends BaseService<StoreCategory, Long> {

	/**
	 * 判断名称是否存在
	 * 
	 * @param name
	 *            名称(忽略大小写)
	 * @return 名称是否存在
	 */
	boolean nameExists(String name);

}