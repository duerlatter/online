/*
 * Copyright 2008-2018 shopxx.net. All rights reserved.
 * Support: http://www.shopxx.net
 * License: http://www.shopxx.net/license
 * FileId: Fr+HkyLggrjUsowIMDAyGzrXMN3A2eD1
 */
package net.shopxx.event;

import org.springframework.context.ApplicationEvent;

import net.shopxx.entity.User;

/**
 * Event - 用户
 * 
 * @author ixincheng
 * @version 6.1
 */
public abstract class UserEvent extends ApplicationEvent {

	private static final long serialVersionUID = 7432438231982667326L;

	/**
	 * 用户
	 */
	private User user;

	/**
	 * 构造方法
	 * 
	 * @param source
	 *            事件源
	 * @param user
	 *            用户
	 */
	public UserEvent(Object source, User user) {
		super(source);
		this.user = user;
	}

	/**
	 * 获取用户
	 * 
	 * @return 用户
	 */
	public User getUser() {
		return user;
	}

}