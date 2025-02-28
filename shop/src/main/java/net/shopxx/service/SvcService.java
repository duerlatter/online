/*
 * Copyright 2008-2018 shopxx.net. All rights reserved.
 * Support: http://www.shopxx.net
 * License: http://www.shopxx.net/license
 * FileId: eiGa5YsLA21bRa5okP9YkFZFljmam6Rn
 */
package net.shopxx.service;

import net.shopxx.entity.Store;
import net.shopxx.entity.StoreRank;
import net.shopxx.entity.Svc;

/**
 * Service - 服务
 * 
 * @author ixincheng
 * @version 6.1
 */
public interface SvcService extends BaseService<Svc, Long> {

	/**
	 * 根据编号查找服务
	 * 
	 * @param sn
	 *            编号(忽略大小写)
	 * @return 服务，若不存在则返回null
	 */
	Svc findBySn(String sn);

	/**
	 * 查找最新服务
	 * 
	 * @param store
	 *            店铺
	 * @param promotionPluginId
	 *            促销插件Id
	 * @param storeRank
	 *            店铺等级
	 * @return 最新服务
	 */
	Svc findTheLatest(Store store, String promotionPluginId, StoreRank storeRank);

}