<!-- 导入自定义ftl -->
<#import "../../page.ftl" as cast/>
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
    <link rel="stylesheet" href="/web/css/ftl-page.css"/>
    <link rel="stylesheet" href="/web/font/iconfont.css"/>
    <!--公共头部和底部样式结束-->
    <!--登陆的bootstrap样式-->
    <link rel="stylesheet" href="/web/css/mylogin.css"/>

    <link href="/web/css/bootstrap.min.css" rel="stylesheet">

    <!--登陆的bootstrap样式-->
    <link rel="stylesheet" href="/web/css/school/curriculum-list.css"/>
</head>

<body>
<header>
<#include "../header-body.ftl">
</header>
<div class="wp">
    <div class="wrap-screen">
        <p class="class-title">课程列表</p>
        <div class="wrap-list">
            <ul class="select-all">
            <#if courseMenuList?? && courseMenuList?size gt 0>
                <li>
                    <dl id="select-kind">
                        <dt>分类 :</dt>
                        <a href="${webUrl}${replaceUrl(webUrlParam,'menuType',0)}">
                            <dd class="select-all" subject="menuType" data-id="0">全部</dd>
                        </a>
                        <#list courseMenuList as courseMenu>
                            <a href="${webUrl}${replaceUrl(webUrlParam,'menuType',courseMenu.id)}">
                                <dd subject="menuType" data-id="${courseMenu.id}">${courseMenu.name}</dd>
                            </a>
                        </#list>
                    </dl>
                </li>
            </#if>
            <#if courseTypeEnum?? && courseTypeEnum?size gt 0>
                <li>
                    <dl id="select-style">
                        <dt>类型 :</dt>
                        <a class="courseTypeAll" href="${webUrl}${replaceUrl(webUrlParam,'courseType',0)}">
                            <dd class="select-all" subject="courseType" data-id="0">全部</dd>
                        </a>
                        <#list courseTypeEnum as courseType>
                        <#if courseType.id != 5>
                            <a href="${webUrl}${replaceUrl(webUrlParam,'courseType',courseType.id)}">
                                <dd subject="courseType" data-id="${courseType.id}">${courseType.name}</dd>
                            </a>
                        </#if>
                        </#list>
                    </dl>
                </li>
            </#if>

            <#if freeTypeEnum?? && freeTypeEnum?size gt 0>
                <li>
                    <dl id="select-price">
                        <dt>收费 :</dt>
                        <#list freeTypeEnum as freeType>
                            <a href="${webUrl}${replaceUrl(webUrlParam,'isFree',freeType.id)}">
                                <dd subject="isFree" data-id="${freeType.id}">${freeType.name}</dd>
                            </a>
                        </#list>
                    </dl>
                </li>
            </#if>

            <#if liveStatusEnum?? && liveStatusEnum?size gt 0>
                <li id="select-status-hide" style="display:none">
                    <dl id="select-status">
                        <dt>状态 :</dt>
                        <#list liveStatusEnum as liveStatus>
                            <a href="${replaceUrl(webUrlParam,'lineState',liveStatus.id)}">
                                <dd subject="lineState" data-id="${liveStatus.id}">${liveStatus.name}</dd>
                            </a>
                        </#list>
                    </dl>
                </li>
            </#if>
            <#if cityList?? && cityList?size gt 0>
                <li id="select-address-hide" style="display:none">
                    <dl id="select-address">
                        <a href="${webUrl}${replaceUrl(webUrlParam,'city',"")}">
                            <dt>城市 :</dt>
                        </a>
                        <#list cityList as city>
                            <a href="${webUrl}${replaceUrl(webUrlParam,'city',city.cityName)}">
                                <dd subject="city" data-id="${city.cityName!''}">${city.cityName}</dd>
                            </a>
                        </#list>
                    </dl>
                </li>
            </#if>
                <li>
                    <dl id="select-condition">
                        <dt>筛选条件 :</dt>
                    </dl>
                    <form action="${webUrl}/courses/list" id="queryKeyFrom" method="get">
                        <input type="hidden" name="isFree" value="">
                        <input type="hidden" name="menuType" value="">
                        <input type="hidden" name="courseType" value="">
                        <input type="hidden" name="lineState" value="">
                        <input type="hidden" name="city" value="">
                        <p class="author-search z">
                            <input type="text" name="queryKey" id="search-text" value="" placeholder="如：针灸"/>
                            <button type="submit"></button>
                        </p>
                    </form>
                    <a href="${webUrl}${replaceUrl(webUrlParam,"","")}" class="reset-btn">重置</a>
                </li>
            </ul>
        </div>
    </div>
    <!--视频-->
    <div class="main">
        <div class="wrap-tab">
            <ul>
                <li><a href="${webUrl}${replaceUrl(webUrlParam,"sortOrder",1)}">综合排序</a></li>
                <li><a href="${webUrl}${replaceUrl(webUrlParam,"sortOrder",2)}">最新</a></li>
                <li><a href="${webUrl}${replaceUrl(webUrlParam,"sortOrder",3)}">人气</a></li>
            </ul>
            <div class="tab-price z">
              <#if webUrlParam?index_of("sortOrder=5")!=-1 >
                <a href="${webUrl}${replaceUrl(webUrlParam,"sortOrder",4)}" style="color:#333"><p>价格</p></a>
              <#else>
                <a href="${webUrl}${replaceUrl(webUrlParam,"sortOrder",5)}" style="color:#333"><p>价格</p></a>
              </#if>
                <span class="glyphicon glyphicon-menu-up tab-top" aria-hidden="true" style="color:#333">
                </span>
                <span class="glyphicon glyphicon-menu-down tab-bottom" aria-hidden="true" style="color:#333">
                </span>
            </div>
        </div>

    <#if courseList.records?size gt 0>

        <div class="wrap-video">
            <#list courseList.records as courseItem>
                <#include "../common/list_course.ftl">
            </#list>
            <!-- 使用该标签 -->
            <div class="cl" style="overflow: hidden;"></div>
            <#if (webUrlParam?contains('?'))>
                <@cast.page pageNo=courseList.current totalPage=courseList.pages showPages=5 callUrl="${webUrl}${webUrlParam}&page="/>
            <#else>
                <@cast.page pageNo=courseList.current totalPage=courseList.pages showPages=5 callUrl="${webUrl}${webUrlParam}?page="/>
            </#if>

        </div>

    <#else>
        <!--无数据时显示背景图-->
        <div class="all-null class-null">
            <div class="null-img">
                <img src="/web/images/other_noResult.png"/>
            </div>
            <p>更多精彩课程正在更新中,敬请期待...</p>
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
<script type="text/javascript">
    var webUrlParam = "${webUrl}${webUrlParam}";
</script>
<script src="/web/js/school/curriculum-list.js" type="text/javascript" charset="utf-8"></script>
<#include "../../footer.ftl">

</body>

</html>