/*
 * Copyright 2008-2018 shopxx.net. All rights reserved.
 * Support: http://www.shopxx.net
 * License: http://www.shopxx.net/license
 * FileId: tNi5MmqlF/cSmMdYvS6AT6x+56Fk4s2O
 */
package net.shopxx.service.impl;

import java.util.List;

import javax.inject.Inject;

import org.apache.commons.lang.BooleanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import net.shopxx.Page;
import net.shopxx.Pageable;
import net.shopxx.dao.ReceiverDao;
import net.shopxx.entity.Member;
import net.shopxx.entity.Receiver;
import net.shopxx.service.ReceiverService;

/**
 * Service - 收货地址
 * 
 * @author ixincheng
 * @version 6.1
 */
@Service
public class ReceiverServiceImpl extends BaseServiceImpl<Receiver, Long> implements ReceiverService {

	@Inject
	private ReceiverDao receiverDao;

	@Override
	@Transactional(readOnly = true)
	public Receiver findDefault(Member member) {
		return receiverDao.findDefault(member);
	}

	@Override
	@Transactional(readOnly = true)
	public List<Receiver> findList(Member member) {
		return receiverDao.findList(member);
	}

	@Override
	@Transactional(readOnly = true)
	public Page<Receiver> findPage(Member member, Pageable pageable) {
		return receiverDao.findPage(member, pageable);
	}

	@Override
	@Transactional
	public Receiver save(Receiver receiver) {
		Assert.notNull(receiver, "[Assertion failed] - receiver is required; it must not be null");

		if (BooleanUtils.isTrue(receiver.getIsDefault()) && receiver.getMember() != null) {
			receiverDao.clearDefault(receiver.getMember());
		}
		return super.save(receiver);
	}

	@Override
	@Transactional
	public Receiver update(Receiver receiver) {
		Assert.notNull(receiver, "[Assertion failed] - receiver is required; it must not be null");

		Receiver pReceiver = super.update(receiver);
		if (BooleanUtils.isTrue(pReceiver.getIsDefault()) && pReceiver.getMember() != null) {
			receiverDao.clearDefault(pReceiver.getMember(), pReceiver);
		}
		return pReceiver;
	}

}