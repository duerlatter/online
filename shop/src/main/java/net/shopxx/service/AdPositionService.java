/*
 * Copyright 2008-2018 shopxx.net. All rights reserved.
 * Support: http://www.shopxx.net
 * License: http://www.shopxx.net/license
 * FileId: KB2KStjLui2gTQjprli5Sp8frp8MWxx3
 */
package net.shopxx.service;

import net.shopxx.entity.AdPosition;

/**
 * Service - 广告位
 * 
 * @author ixincheng
 * @version 6.1
 */
public interface AdPositionService extends BaseService<AdPosition, Long> {

	/**
	 * 查找广告位
	 * 
	 * @param id
	 *            ID
	 * @param useCache
	 *            是否使用缓存
	 * @return 广告位
	 */
	AdPosition find(Long id, boolean useCache);

}