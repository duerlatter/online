/*
 * Copyright 2008-2018 shopxx.net. All rights reserved.
 * Support: http://www.shopxx.net
 * License: http://www.shopxx.net/license
 * FileId: RYU29PBufmKC9Gk6GdXsqVZ+gYrRCoaD
 */
package net.shopxx.dao.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.Query;
import javax.persistence.criteria.*;

import org.springframework.stereotype.Repository;

import net.shopxx.Page;
import net.shopxx.Pageable;
import net.shopxx.dao.StoreDao;
import net.shopxx.entity.*;
import net.shopxx.entity.Store.Status;
import net.shopxx.entity.Store.Type;

/**
 * Dao - 店铺
 *
 * @author ixincheng
 * @version 6.1
 */
@Repository
public class StoreDaoImpl extends BaseDaoImpl<Store, Long> implements StoreDao {

    @Override
    public List<Store> findList(Type type, Status status, Boolean isEnabled, Boolean hasExpired, Integer first, Integer count) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Store> criteriaQuery = criteriaBuilder.createQuery(Store.class);
        Root<Store> root = criteriaQuery.from(Store.class);
        criteriaQuery.select(root);
        Predicate restrictions = criteriaBuilder.conjunction();
        if (type != null) {
            restrictions = criteriaBuilder.and(restrictions, criteriaBuilder.equal(root.get("type"), type));
        }
        if (status != null) {
            restrictions = criteriaBuilder.and(restrictions, criteriaBuilder.equal(root.get("status"), status));
        }
        if (isEnabled != null) {
            restrictions = criteriaBuilder.and(restrictions, criteriaBuilder.equal(root.get("isEnabled"), isEnabled));
        }
        if (hasExpired != null) {
            if (hasExpired) {
                restrictions = criteriaBuilder.and(restrictions, root.get("endDate").isNotNull(), criteriaBuilder.lessThanOrEqualTo(root.<Date>get("endDate"), new Date()));
            } else {
                restrictions = criteriaBuilder.and(restrictions, criteriaBuilder.or(root.get("endDate").isNull(), criteriaBuilder.greaterThan(root.<Date>get("endDate"), new Date())));
            }
        }
        criteriaQuery.where(restrictions);
        return findList(criteriaQuery, first, count);
    }

    @Override
    public List<ProductCategory> findProductCategoryList(Store store, CategoryApplication.Status status) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<ProductCategory> criteriaQuery = criteriaBuilder.createQuery(ProductCategory.class);
        Root<ProductCategory> root = criteriaQuery.from(ProductCategory.class);
        criteriaQuery.select(root);
        Predicate restrictions = criteriaBuilder.conjunction();
        Join<ProductCategory, CategoryApplication> join = root.join("categoryApplications");
        if (store != null) {
            restrictions = criteriaBuilder.and(restrictions, criteriaBuilder.equal(join.get("store"), store));
        }
        if (status != null) {
            restrictions = criteriaBuilder.and(restrictions, criteriaBuilder.equal(join.get("status"), status));
        }
        criteriaQuery.where(restrictions);
        return entityManager.createQuery(criteriaQuery).getResultList();
    }

    @Override
    public Page<Store> findPage(Store.Type type, Store.Status status, Boolean isEnabled, Boolean hasExpired, Pageable pageable) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Store> criteriaQuery = criteriaBuilder.createQuery(Store.class);
        Root<Store> root = criteriaQuery.from(Store.class);
        criteriaQuery.select(root);
        Predicate restrictions = criteriaBuilder.conjunction();
        if (type != null) {
            restrictions = criteriaBuilder.and(restrictions, criteriaBuilder.equal(root.get("type"), type));
        }
        if (status != null) {
            restrictions = criteriaBuilder.and(restrictions, criteriaBuilder.equal(root.get("status"), status));
        }
        if (isEnabled != null) {
            restrictions = criteriaBuilder.and(restrictions, criteriaBuilder.equal(root.get("isEnabled"), isEnabled));
        }
        if (hasExpired != null) {
            if (hasExpired) {
                restrictions = criteriaBuilder.and(restrictions, root.get("endDate").isNotNull(), criteriaBuilder.lessThanOrEqualTo(root.<Date>get("endDate"), new Date()));
            } else {
                restrictions = criteriaBuilder.and(restrictions, criteriaBuilder.or(root.get("endDate").isNull(), criteriaBuilder.greaterThan(root.<Date>get("endDate"), new Date())));
            }
        }
        criteriaQuery.where(restrictions);
        return super.findPage(criteriaQuery, pageable);
    }

    @Override
    public BigDecimal bailPaidTotalAmount() {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<BigDecimal> criteriaQuery = criteriaBuilder.createQuery(BigDecimal.class);
        Root<Store> root = criteriaQuery.from(Store.class);
        criteriaQuery.select(criteriaBuilder.sum(root.<BigDecimal>get("bailPaid")));
        BigDecimal result = entityManager.createQuery(criteriaQuery).getSingleResult();
        return result != null ? result : BigDecimal.ZERO;
    }

    @Override
    public BigDecimal bailPaidTotalAmount(Date beginDate, Date endDate) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<BigDecimal> criteriaQuery = criteriaBuilder.createQuery(BigDecimal.class);
        Root<PaymentTransaction> root = criteriaQuery.from(PaymentTransaction.class);
        criteriaQuery.select(criteriaBuilder.sum(criteriaBuilder.diff(root.<BigDecimal>get("amount"), root.<BigDecimal>get("fee"))));
        Predicate restrictions = criteriaBuilder.conjunction();
        restrictions = criteriaBuilder.and(restrictions, criteriaBuilder.equal(root.get("type"), PaymentTransaction.Type.BAIL_PAYMENT), criteriaBuilder.equal(root.get("isSuccess"), true));
        if (beginDate != null) {
            restrictions = criteriaBuilder.and(restrictions, criteriaBuilder.greaterThanOrEqualTo(root.<Date>get("createdDate"), beginDate));
        }
        if (endDate != null) {
            restrictions = criteriaBuilder.and(restrictions, criteriaBuilder.lessThanOrEqualTo(root.<Date>get("createdDate"), endDate));
        }
        criteriaQuery.where(restrictions);
        BigDecimal result = entityManager.createQuery(criteriaQuery).getSingleResult();
        return result != null ? result : BigDecimal.ZERO;
    }

    @Override
    public Long count(Store.Type type, Store.Status status, Boolean isEnabled, Boolean hasExpired) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Store> criteriaQuery = criteriaBuilder.createQuery(Store.class);
        Root<Store> root = criteriaQuery.from(Store.class);
        criteriaQuery.select(root);
        Predicate restrictions = criteriaBuilder.conjunction();
        if (type != null) {
            restrictions = criteriaBuilder.and(restrictions, criteriaBuilder.equal(root.get("type"), type));
        }
        if (status != null) {
            restrictions = criteriaBuilder.and(restrictions, criteriaBuilder.equal(root.get("status"), status));
        }
        if (isEnabled != null) {
            restrictions = criteriaBuilder.and(restrictions, criteriaBuilder.equal(root.get("isEnabled"), isEnabled));
        }
        if (hasExpired != null) {
            if (hasExpired) {
                restrictions = criteriaBuilder.and(restrictions, root.get("endDate").isNotNull(), criteriaBuilder.lessThanOrEqualTo(root.<Date>get("endDate"), new Date()));
            } else {
                restrictions = criteriaBuilder.and(restrictions, criteriaBuilder.or(root.get("endDate").isNull(), criteriaBuilder.greaterThan(root.<Date>get("endDate"), new Date())));
            }
        }
        criteriaQuery.where(restrictions);
        return super.count(criteriaQuery, null);
    }

    @Override
    public List<Long> findByDoctorId(String doctorId) {
        String sql = "SELECT s.id\n" +
                "\tFROM Store s JOIN Users u ON s.business_id = u.id\n" +
                "\tWHERE u.doctor_id = :doctorId";
        Query nativeQuery = entityManager.createNativeQuery(sql);
        nativeQuery.setParameter("doctorId", doctorId);
        List<Long> resultList = (List<Long>)nativeQuery.getResultList();
        return resultList;
    }


	@Override
	public List<Store> findStoreByBusinesss(List<Business> businesss) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Store> criteriaQuery = criteriaBuilder.createQuery(Store.class);
        Root<Store> root = criteriaQuery.from(Store.class);
        criteriaQuery.select(root);
        Predicate restrictions = criteriaBuilder.conjunction();
  
//        if (status != null) {
//            restrictions = criteriaBuilder.and(restrictions, criteriaBuilder.equal(root.get("status"), status));
//        }
//        if (isEnabled != null) {
//            restrictions = criteriaBuilder.and(restrictions, criteriaBuilder.equal(root.get("isEnabled"), isEnabled));
//        }
//        if (hasExpired != null) {
//            if (hasExpired) {
//                restrictions = criteriaBuilder.and(restrictions, root.get("endDate").isNotNull(), criteriaBuilder.lessThanOrEqualTo(root.<Date>get("endDate"), new Date()));
//            } else {
//                restrictions = criteriaBuilder.and(restrictions, criteriaBuilder.or(root.get("endDate").isNull(), criteriaBuilder.greaterThan(root.<Date>get("endDate"), new Date())));
//            }
//        }
        //restrictions = criteriaBuilder.and(restrictions, criteriaBuilder.in(root.get("store")).value(list));
        
        restrictions = criteriaBuilder.and(restrictions, criteriaBuilder.in(root.get("business")).value(businesss));
        criteriaQuery.where(restrictions);
        return findList(criteriaQuery);
	}
}