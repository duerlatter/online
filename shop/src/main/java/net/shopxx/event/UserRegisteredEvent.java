/*
 * Copyright 2008-2018 shopxx.net. All rights reserved.
 * Support: http://www.shopxx.net
 * License: http://www.shopxx.net/license
 * FileId: jpeEoh7/XNITlDsq9QuHvpCJ8NHTgPff
 */
package net.shopxx.event;

import net.shopxx.entity.User;

/**
 * Event - 用户注册
 * 
 * @author ixincheng
 * @version 6.1
 */
public class UserRegisteredEvent extends UserEvent {

	private static final long serialVersionUID = 3930447081075693577L;

	/**
	 * 构造方法
	 * 
	 * @param source
	 *            事件源
	 * @param user
	 *            用户
	 */
	public UserRegisteredEvent(Object source, User user) {
		super(source, user);
	}

}