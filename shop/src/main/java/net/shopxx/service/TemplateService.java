/*
 * Copyright 2008-2018 shopxx.net. All rights reserved.
 * Support: http://www.shopxx.net
 * License: http://www.shopxx.net/license
 * FileId: Gp9ACUpfX60LuexucUD+teBgLHZyimkj
 */
package net.shopxx.service;

import net.shopxx.TemplateConfig;

/**
 * Service - 模板
 * 
 * @author ixincheng
 * @version 6.1
 */
public interface TemplateService {

	/**
	 * 读取模板文件内容
	 * 
	 * @param templateConfigId
	 *            模板配置ID
	 * @return 模板文件内容
	 */
	String read(String templateConfigId);

	/**
	 * 读取模板文件内容
	 * 
	 * @param templateConfig
	 *            模板配置
	 * @return 模板文件内容
	 */
	String read(TemplateConfig templateConfig);

	/**
	 * 写入模板文件内容
	 * 
	 * @param templateConfigId
	 *            模板配置ID
	 * @param content
	 *            模板文件内容
	 */
	void write(String templateConfigId, String content);

	/**
	 * 写入模板文件内容
	 * 
	 * @param templateConfig
	 *            模板配置
	 * @param content
	 *            模板文件内容
	 */
	void write(TemplateConfig templateConfig, String content);

}