/*
 * Copyright 2008-2018 shopxx.net. All rights reserved.
 * Support: http://www.shopxx.net
 * License: http://www.shopxx.net/license
 * FileId: KIjXAOJBJkdwTh55d2QFVzBBSByROHW9
 */
package net.shopxx.security;

import javax.inject.Inject;

import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import net.shopxx.entity.User;
import net.shopxx.service.UserService;

/**
 * Security - 当前用户MethodArgumentResolver
 * 
 * @author ixincheng
 * @version 6.1
 */
public class CurrentUserMethodArgumentResolver implements HandlerMethodArgumentResolver {

	@Inject
	private UserService userService;

	/**
	 * 支持参数
	 * 
	 * @param methodParameter
	 *            MethodParameter
	 * @return 是否支持参数
	 */
	@Override
	public boolean supportsParameter(MethodParameter methodParameter) {
		return methodParameter.hasParameterAnnotation(CurrentUser.class) && User.class.isAssignableFrom(methodParameter.getParameterType());
	}

	/**
	 * 解析变量
	 * 
	 * @param methodParameter
	 *            MethodParameter
	 * @param modelAndViewContainer
	 *            ModelAndViewContainer
	 * @param nativeWebRequest
	 *            NativeWebRequest
	 * @param webDataBinderFactory
	 *            WebDataBinderFactory
	 * @return 变量
	 */
	@SuppressWarnings("unchecked")
	@Override
	public Object resolveArgument(MethodParameter methodParameter, ModelAndViewContainer modelAndViewContainer, NativeWebRequest nativeWebRequest, WebDataBinderFactory webDataBinderFactory) throws Exception {
		return userService.getCurrent((Class<User>) methodParameter.getParameterType());
	}

}