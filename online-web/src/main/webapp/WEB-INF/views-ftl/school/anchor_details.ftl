<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="X-UA-Compatible" content="IEedge"/>
    <meta charset="UTF-8">
    <title>熊猫中医云课堂 - 线上中医教育</title>
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
    <link href="/web/bootstrap-select/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/web/css/mylogin.css"/>
    <!--字体图标样式-->
    <link rel="stylesheet" href="/web/fonts/style.css"/>
    <!--分页样式-->
    <link rel="stylesheet" href="/web/css/ftl-page.css"/>
    <!--分页样式-->
    <link rel="stylesheet" href="/web/css/school/anchor-details.css"/>
</head>
<body>
<header>
<#include "header-body.ftl">
</header>
<div class="wrap-top">
    <div class="main-top">
        <div class="head-portrait z">
            <img src="${lecturerInfo.small_head_photo}?imageMogr2/thumbnail/!150x150r|imageMogr2/gravity/Center/crop/150x150"/>

        </div>
    <#--
        星标志
        <span class="icon-adopt"></span>
    -->

        <div class="anchor-status z">
            <h2>${lecturerInfo.name?default('')}</h2>
            <ul class="follow-box cl">
                <li>关注<span id="focusCount">${focusCount}</span></li>
                <li>|</li>
                <li>粉丝<span id="fansCount">${fansCount}</span></li>
            </ul>
        <#if isFours == 0>
            <button type="button" class="isAdd-follow">
                <img src="../../web/images/icon-up.png"/>
                <span>加关注</span>
            </button>
        <#elseif isFours == 1>
            <button type="button" class="isAdd-follow  isAdd-active">
                <img src="../../web/images/icon-down.png"/>
                <span>已关注</span>
            </button>
        </#if>
        </div>
    </div>
</div>

<div class="wp">
    <div class="main">
        <!--左侧详情/评价/常见问题-->
        <div class="content-inf z">
            <!--nav-->
            <div class="wrap-sidebar">
                <ul>
                    <li><a href="${webUrlParam}/courses">课程</a></li>
                    <li><a href="${webUrlParam}/info">介绍</a></li>
                    <li><a href="${webUrlParam}/comment">评价（${criticizeCount}）</a></li>
                </ul>
            </div>
            <!--content-->
            <!--课程-->
            <div class="sidebar-content" style="padding: 0 0 30px;">
            <#if courseList?? && courseList.records?size gt 0>
                <#if type == 'courses' >
                    <#include "anchor_course.ftl">
                </#if>
            <#else>
                <!--无数据时显示背景图-->
                <div class="all-null anchor-null">
                    <div class="null-img">
                        <img src="/web/images/icon-nodata.png"/>
                    </div>
                    <p>暂无数据</p>
                </div>
            </#if>
            </div>

            <!--介绍-->
            <div class="sidebar-content hide" style="background: #F8F8F8;padding: 0;">
                <div class="anchor-introduce">
                <p>
                <#if lecturerInfo.detail??>
                ${lecturerInfo.detail}
                <#else>
                    <p>暂无主讲人介绍</p>
                </#if>

                    </p>
                </div>

            <#if hospital??>
                <div class="anchor-hospital">
                    <#if lecturerInfo.type == 1>
                        <h5>坐诊医馆</h5>
                    <#elseif lecturerInfo.type == 2>
                        <h5>医馆</h5>
                    </#if>
                    <div class="hospital-img z">
                        <#if hospital?? && hospital.headPortrait??>
                            <img src="${hospital.headPortrait}?imageMogr2/thumbnail/!270x152r|imageMogr2/gravity/Center/crop/270x152"/>
                        <#else>
                            <img src="${webUrl}/web/images/defaultHead/18.png"/>
                        </#if>
                    </div>
                    <div class="hospital-inf y">
                        <div class="hospital-status">
                            <#if hospital.name??>
                                <p>医馆名称：${hospital.name?default("")}</p>
                            </#if>
							<#if hospital.tel??>
								<p>预约电话：${hospital.tel?default("")}</p>
							</#if>
                            <#if lecturerInfo.type == 1 && lecturerInfo.workTime??>
                                <p>坐诊时间：${lecturerInfo.workTime?default("")}</p>
                            </#if>
                        </div>
                        <div class="address-box">
                            <#if hospital??>
                                <p class="address z">
                                    <span>地</span>
                                    <span>址：</span>
                                </p>
                                <p class="address-text z">
                                    ${hospital.province?default("")}${hospital.city?default("")}${hospital.detailedAddress?default("")}
                                </p>
                            </#if>
                        </div>
                    </div>
                </div>
            </#if>

            <#if lecturerInfo.video??>
                <div class="anchor-video">
                    <h5>主播视频介绍</h5>
                    <div class="save-video">
                    </div>
                </div>
            </#if>
            </div>
            <!--评价-->
            <div class="sidebar-content hide">
            <#if type == 'comment' >
	  			<#include "common/comment.ftl">
			 </#if>
            </div>
        </div>


        <!--右侧推荐课程-->
        <div class="wrap-recommend y">
            <h3>推荐课程</h3>
        <#if recommendCourse?? && recommendCourse?size gt 0 >
            <#include "common/recommend_course.ftl">
        </#if>
        </div>
    </div>
</div>


<script src="/web/js/jquery-1.12.1.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript" src="/web/js/artTemplate.js"></script>
<script src="/web/js/bootstrap.js" type="text/javascript" charset="utf-8"></script>

<!--公共头部和底部-->
<script src="/web/js/common/common.js" type="text/javascript" charset="utf-8"></script>
<script src="/web/html/school/school-header/header.js" type="text/javascript" charset="utf-8"></script>
<!--公共头部和底部结束-->
<script type="text/javascript">
    var userId = "${userId}";
    var courseId = 0;
    var collection = 0;
    <#-- 因为评论主播时不用显示星星的，所以这里就直接默认：不显示就行 -->
    var commentCode = 2;

    var type = "${type}";
    var video = "";
    <#if lecturerInfo.video??>
    video = "${lecturerInfo.video}";
    </#if>
    console.error("type:" + type + ",userId:" + userId + ",video:" + video);
</script>
<script src="/web/js/school/anchor-details.js" type="text/javascript" charset="utf-8"></script>
<script src="/web/js/school/comment.js" type="text/javascript" charset="utf-8"></script>
<#include "../footer.ftl">

</body>
</html>