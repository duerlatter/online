/*
 * Copyright 2008-2018 shopxx.net. All rights reserved.
 * Support: http://www.shopxx.net
 * License: http://www.shopxx.net/license
 * FileId: 6um+ke9rxdG26vogi2bNrRLN8PqhCjF2
 */
package net.shopxx.controller.admin;

import javax.inject.Inject;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import net.shopxx.Results;
import net.shopxx.entity.MessageConfig;
import net.shopxx.service.MessageConfigService;

/**
 * Controller - 消息配置
 * 
 * @author ixincheng
 * @version 6.1
 */
@Controller("adminMessageConfigController")
@RequestMapping("/admin/message_config")
public class MessageConfigController extends BaseController {

	@Inject
	private MessageConfigService messageConfigService;

	/**
	 * 编辑
	 */
	@GetMapping("/edit")
	public String edit(Long id, ModelMap model) {
		model.addAttribute("messageConfig", messageConfigService.find(id));
		return "admin/message_config/edit";
	}

	/**
	 * 更新
	 */
	@PostMapping("/update")
	public ResponseEntity<?> update(MessageConfig messageConfig) {
		if (!isValid(messageConfig)) {
			return Results.UNPROCESSABLE_ENTITY;
		}
		messageConfigService.update(messageConfig, "type");
		return Results.OK;
	}

	/**
	 * 列表
	 */
	@GetMapping("/list")
	public String list(ModelMap model) {
		model.addAttribute("messageConfigs", messageConfigService.findAll());
		return "admin/message_config/list";
	}

}