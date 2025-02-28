/*
 * Copyright 2008-2018 shopxx.net. All rights reserved.
 * Support: http://www.shopxx.net
 * License: http://www.shopxx.net/license
 * FileId: Eo97baL8kbV3XyRtBJmVulwP5FIPBm0J
 */
package net.shopxx.controller.member;

import javax.inject.Inject;

import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import net.shopxx.Pageable;
import net.shopxx.Results;
import net.shopxx.entity.Member;
import net.shopxx.entity.Receiver;
import net.shopxx.exception.UnauthorizedException;
import net.shopxx.security.CurrentUser;
import net.shopxx.service.AreaService;
import net.shopxx.service.ReceiverService;

/**
 * Controller - 收货地址
 * 
 * @author ixincheng
 * @version 6.1
 */
@Controller("memberReceiverController")
@RequestMapping("/member/receiver")
public class ReceiverController extends BaseController {

	/**
	 * 每页记录数
	 */
	private static final int PAGE_SIZE = 10;

	@Inject
	private AreaService areaService;
	@Inject
	private ReceiverService receiverService;

	/**
	 * 添加属性
	 */
	@ModelAttribute
	public void populateModel(Long receiverId, @CurrentUser Member currentUser, ModelMap model) {
		Receiver receiver = receiverService.find(receiverId);
		if (receiver != null && !currentUser.equals(receiver.getMember())) {
			throw new UnauthorizedException();
		}
		model.addAttribute("receiver", receiver);
	}

	/**
	 * 列表
	 */
	@GetMapping("/list")
	public String list(Integer pageNumber, @CurrentUser Member currentUser, ModelMap model) {
		Pageable pageable = new Pageable(pageNumber, PAGE_SIZE);
		model.addAttribute("page", receiverService.findPage(currentUser, pageable));
		return "member/receiver/list";
	}

	/**
	 * 添加
	 */
	@GetMapping("/add")
	public String add() {
		return "member/receiver/add";
	}

	/**
	 * 保存
	 */
	@PostMapping("/save")
	public ResponseEntity<?> save(@ModelAttribute("receiverForm") Receiver receiverForm, Long areaId, @CurrentUser Member currentUser) {
		receiverForm.setArea(areaService.find(areaId));
		if (!isValid(receiverForm)) {
			return Results.UNPROCESSABLE_ENTITY;
		}
		if (Receiver.MAX_RECEIVER_COUNT != null && currentUser.getReceivers().size() >= Receiver.MAX_RECEIVER_COUNT) {
			return Results.unprocessableEntity("member.receiver.addCountNotAllowed", Receiver.MAX_RECEIVER_COUNT);
		}
		receiverForm.setAreaName(null);
		receiverForm.setMember(currentUser);
		receiverService.save(receiverForm);
		return Results.OK;
	}

	/**
	 * 编辑
	 */
	@GetMapping("/edit")
	public String edit(@ModelAttribute(binding = false) Receiver receiver, ModelMap model) {
		if (receiver == null) {
			return UNPROCESSABLE_ENTITY_VIEW;
		}

		model.addAttribute("receiver", receiver);
		return "member/receiver/edit";
	}

	/**
	 * 更新
	 */
	@PostMapping("/update")
	public ResponseEntity<?> update(@ModelAttribute("receiverForm") Receiver receiverForm, @ModelAttribute(binding = false) Receiver receiver, Long areaId) {
		if (receiver == null) {
			return Results.UNPROCESSABLE_ENTITY;
		}

		receiverForm.setArea(areaService.find(areaId));
		if (!isValid(receiverForm)) {
			return Results.UNPROCESSABLE_ENTITY;
		}
		BeanUtils.copyProperties(receiverForm, receiver, "id", "areaName", "member");
		receiverService.update(receiver);
		return Results.OK;
	}

	/**
	 * 删除
	 */
	@PostMapping("/delete")
	public ResponseEntity<?> delete(@ModelAttribute(binding = false) Receiver receiver) {
		if (receiver == null) {
			return Results.NOT_FOUND;
		}

		receiverService.delete(receiver);
		return Results.OK;
	}

}