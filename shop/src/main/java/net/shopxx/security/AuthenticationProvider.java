/*
 * Copyright 2008-2018 shopxx.net. All rights reserved.
 * Support: http://www.shopxx.net
 * License: http://www.shopxx.net/license
 * FileId: dUQUlh6N5mDOn6dSpOmDvrMK81ZP8FFl
 */
package net.shopxx.security;

import java.util.Set;

import net.shopxx.entity.User;

/**
 * Security - 认证Provider
 * 
 * @author ixincheng
 * @version 6.1
 */
public interface AuthenticationProvider {

	/**
	 * 获取用户
	 * 
	 * @param principal
	 *            身份
	 * @return 用户
	 */
	User getUser(Object principal);

	/**
	 * 获取权限
	 * 
	 * @param user
	 *            用户
	 * @return 权限
	 */
	Set<String> getPermissions(User user);

	/**
	 * 是否支持
	 * 
	 * @param userClass
	 *            用户类型
	 * @return 是否支持
	 */
	boolean supports(Class<?> userClass);

}