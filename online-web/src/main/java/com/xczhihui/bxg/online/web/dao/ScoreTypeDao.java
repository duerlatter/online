package com.xczhihui.bxg.online.web.dao;

import java.util.List;

import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.xczhihui.bxg.online.common.domain.ScoreType;
import com.xczhihui.bxg.online.web.base.common.Constant;
import com.xczhihui.common.support.dao.SimpleHibernateDao;

/**
 * 投诉
 *
 * @author majian
 */
@Repository
public class ScoreTypeDao extends SimpleHibernateDao {


    public ScoreType findById(String id) {
        DetachedCriteria dc = DetachedCriteria.forClass(ScoreType.class);
        dc.add(Restrictions.eq("id", id));
        dc.add(Restrictions.eq("isDelete", Constant._NOT_DELETED));
        return this.findEntity(dc);
    }

    public List<ScoreType> findAll() {
        //return findByHQL("select * from ScoreType",null);
        return getAll(ScoreType.class);
    }

}
