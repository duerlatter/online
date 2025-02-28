/*
 * Copyright 2008-2018 shopxx.net. All rights reserved.
 * Support: http://www.shopxx.net
 * License: http://www.shopxx.net/license
 * FileId: Sv8Zb7g5P93yoDNwhyWlTb/gox0ML84B
 */
package net.shopxx.dao;

import java.util.List;

import net.shopxx.entity.FriendLink;

/**
 * Dao - 友情链接
 * 
 * @author ixincheng
 * @version 6.1
 */
public interface FriendLinkDao extends BaseDao<FriendLink, Long> {

	/**
	 * 查找友情链接
	 * 
	 * @param type
	 *            类型
	 * @return 友情链接
	 */
	List<FriendLink> findList(FriendLink.Type type);

}