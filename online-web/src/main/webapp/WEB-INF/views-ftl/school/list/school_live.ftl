<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="X-UA-Compatible" content="IEedge"/>
    <meta charset="UTF-8">
    <title>熊猫中医学堂 - 中医药传承创新平台</title>
    <link rel="shortcut icon" href="/favicon.ico"/>
    <meta name="keywords" content="中医教育,中医传承,中医线下教育,海口中医养生,国粹,传承,中医,中药,心承,熊猫中医"/>
    <meta name="description"
          content="熊猫中医云课堂为。课程大纲全新优化，内容有广度、有深度，顶尖讲师全程直播授课。专注整合优势教学资源、打造适合在线学习并能保证教学结果的优质教学产品，同时打造和运营一整套教育生态软件体系，为用户提供满足自身成长和发展要求的有效服务。"/>
    <meta name="renderer" content="webkit">
    <meta name="baidu-site-verification" content="UHaAQAeAQF"/>
    <!--公共头部和底部样式-->
    <link rel="stylesheet" href="/web/html/school/school-header/header.css"/>
    <link rel="stylesheet" href="/web/css/footer.css"/>
    <link rel="stylesheet" href="/web/font/iconfont.css"/>
    <!--公共头部和底部样式结束-->
    <!--登陆的bootstrap样式-->
    <link rel="stylesheet" href="/web/css/mylogin.css"/>
    <link href="/web/bootstrap-select/bootstrap.min.css" rel="stylesheet">

    <!--登陆的bootstrap样式-->
    <link rel="stylesheet" href="/web/css/school/school-live.css"/>
</head>
<body>
<header>
<#include "../header-body.ftl">
</header>
<!--左侧精品、免费、最新、养生课程-->
<div class="wp">
    <div class="wrap-left z">

    <#if bannerList?? && bannerList?size gt 0>
        <div class="wrap-banner">
            <#include "../common/banner_common.ftl">
        </div>
    </#if>

        <!--精品课程、免费课程、最新课程、养生课程、-->


    <#list courseTypeList as courseTypeItem>
        <div class="main">
            <div class="content-class">
                <div class="wrap-title">
                <#-- 课程的小标题-->
                    <span>${courseTypeItem.title}</span>
                <#-- 课程列表 页跳转  带上跳转条件 -->
                    <#if courseTypeItem.title?? && courseTypeItem.title == "直播课程">
                    <p><a href="${webUrl}/courses/list?courseType=3&lineState=2" style="color: #00bc12;">更多</a>
                    <#else>
                    <p><a href="${webUrl}/courses/list?courseType=3&lineState=${courseTypeItem.lineState}"
                          style="color: #00bc12;">更多</a>
                    </#if>
                    <img src="/web/images/right_more.png" alt="箭头"/> </p>
                </div>

                <#list courseTypeItem.courseList as courseItem>
                    <#include "../common/list_course.ftl">
                </#list>
            </div>
        </div>
    </#list>

    </div>

    <!--右侧成为主播、搜索、名师推荐-->
    <div class="wrap-right y">
    <#if doctorList?? && doctorList?size gt 0>
        <div class="wrap-docter">
            <span>名师推荐</span>
            <#include "../common/famous_doctor_common.ftl">
        </div>
    </#if>
    </div>
</div>

<script src="/web/js/jquery-1.12.1.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript" src="/web/js/artTemplate.js"></script>
<script src="/web/js/bootstrap.js" type="text/javascript" charset="utf-8"></script>

<!--公共头部和底部-->
<script src="/web/js/common/common.js" type="text/javascript" charset="utf-8"></script>
<script src="/web/html/school/school-header/header.js" type="text/javascript" charset="utf-8"></script>
<!--公共头部和底部结束-->

<!--登陆结束-->
<script src="/web/js/school/school-live.js" type="text/javascript" charset="utf-8"></script>
<#include "../../footer.ftl">
</body>
</html>