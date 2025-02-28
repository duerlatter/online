package com.xczhihui.medical.hospital.service.impl;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServerException;

import com.xczhihui.common.solr.utils.SolrPages;
import com.xczhihui.common.solr.utils.SolrUtils;
import com.xczhihui.medical.doctor.vo.MedicalDoctorSolrVO;


public class SolrTest {

    private boolean doctor;

    public static void main(String[] args) throws IOException, SolrServerException {
        testQuery();
    }

    public static void testQuery() throws IOException, SolrServerException {
        SolrUtils solrUtils = new SolrUtils("http://127.0.0.1:8983/solr", "doctors", null, null);
        Map<String, SolrQuery.ORDER> sortMap = new HashMap<>();
        String searchStr = "name:";
        SolrPages pages = solrUtils.getByPage(searchStr, 1, 10, MedicalDoctorSolrVO.class, sortMap);
    }
}