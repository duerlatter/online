/*
 * Copyright 2008-2018 shopxx.net. All rights reserved.
 * Support: http://www.shopxx.net
 * License: http://www.shopxx.net/license
 * FileId: kK0AVImV0a0/gvgLFUrZcj7Ww4i6VjXL
 */
package net.shopxx.dao.impl;

import javax.persistence.NoResultException;

import org.springframework.stereotype.Repository;

import net.shopxx.dao.SeoDao;
import net.shopxx.entity.Seo;

/**
 * Dao - SEO设置
 * 
 * @author ixincheng
 * @version 6.1
 */
@Repository
public class SeoDaoImpl extends BaseDaoImpl<Seo, Long> implements SeoDao {

	@Override
	public Seo find(Seo.Type type) {
		if (type == null) {
			return null;
		}
		try {
			String jpql = "select seo from Seo seo where seo.type = :type";
			return entityManager.createQuery(jpql, Seo.class).setParameter("type", type).getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}

}