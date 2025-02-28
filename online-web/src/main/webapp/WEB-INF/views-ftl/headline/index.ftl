<!DOCTYPE html>
<html>
<head lang="en">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!--[if IE 9]>
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE9">
    <![endif]-->
    <meta http-equiv="X-UA-Compatible" content="IEedge">

    <title>熊猫中医头条 - 中医药传承创新平台</title>
    <link rel="shortcut icon" href="/favicon.ico">
    <meta name="keywords" content="中医教育,中医传承,中医线下教育,海口中医养生,国粹,传承,中医,中药,心承,熊猫中医">
    <meta name="description" content="熊猫中医是中医药的学习传承平台：学中医、懂中医、用中医，让中医服务于家庭、个人，让中国古代科学瑰宝为现代人类的健康保驾护航。">
    <meta name="renderer" content="webkit">
    <link rel="stylesheet" href="/web/css/bootstrap.min.css">
    <link rel="stylesheet" href="/web/css/bootstrap-theme.min.css">
    <link rel="stylesheet" href="/web/css/mylogin.css"/>
    <link rel="stylesheet" href="/web/css/componet.css"/>
    <link rel="stylesheet" href="/web/css/header.css"/>
    <link rel="stylesheet" href="/web/css/news.css"/>
    <link rel="stylesheet" href="/web/css/footer.css"/>
    <link rel="stylesheet" href="/web/font/iconfont.css"/>

    <script src="/web/js/jquery-1.12.1.js" type="text/javascript" charset="utf-8"></script>
    <script type="text/javascript" src="/web/js/artTemplate.js"></script>
    <script type="text/javascript" src="/web/js/jquery.SuperSlide.2.1.1.js"></script>
    <script src="/web/js/bootstrap.js" type="text/javascript" charset="utf-8"></script>
    <script src="/web/js/common/common.js" type="text/javascript" charset="utf-8"></script>
    <script src="/web/js/header-top.js" type="text/javascript" charset="utf-8"></script>
</head>
<body>
<!--提示-->
<div class="webSiteNotice" style="display:none;">
    <div class="innerBox clearfix">
        <i class="iconfont icon-xiaoxilaba xiaoxilaba"></i>
        <span class="noticeInfo"></span>
        <i class="iconfont icon-guanbi noticeClose"></i>
    </div>
</div>
<header>
<#include "../header-body.ftl">
</header>

<div id="forum" class="clearfix">
<div class="forum-banner " style="position: relative;z-index: 999;">
    <div class="banner">
        <ul id="slider" class="slider">
        <#list banners as banner>
            <#if banner_index==0>
                <li style="z-index: 2">
                    <a href="${banner.imgHref}" target="_blank" data-indexId = "${banner.id}"
                       style="background:url(${banner.imgPath})no-repeat top center">
                        <div class="image-overlay"></div>
                    </a>
                </li>
            <#else >
                <li>
                    <a href="${banner.imgHref}" target="_blank" data-indexId = "${banner.id}"
                       style="background:url(${banner.imgPath})no-repeat top center">
                        <div class="image-overlay"></div>
                    </a>
                </li>
            </#if>
        </#list>
        </ul>
        <div id="left"><em></em></div>
        <div id="right"><em></em></div>
        <div id="selector" class="selector">
        <#list banners as banner>
            <#if banner_index==0>
                <span class='cur'></span>
            <#else >
                <span></span>
            </#if>
        </#list>
        </div>
    </div>
<#if hotArticle?? && hotArticle?size gt 0>
    <div class="hot-article hide">
        <span class="hot-article-title">推荐阅读</span>
        <ul class="hot-article-list">
            <#list hotArticle as ha>
                <#if ha_index <=2>
                    <li>
                        <a href="${webUrl}/headline/details/${ha.id}" target="_blank">
                            <span title="${ha.title}">${ha.title}</span>
                        </a>
                    </li>
                <#else >
                    <li>
                        <a href="${webUrl}/headline/details/${ha.id}" target="_blank">
                            <span title="${ha.title}">${ha.title}</span>
                        </a>
                    </li>
                </#if>
            </#list>
        </ul>
    </div>
</div>
</#if>

    <div class="forum-content clearfix">
        <div class="forum-content-left">
            <div class="forum-type" style="height:62px;">
                <ul class="forum-content-tag clearfix">
                <#list articleType as at>
                    <#if at.id==echoMap.type>
                        <a href="${webUrl}/headline/${at.id}" style="display: block;">
                            <li class="select"><em class="select"></em>${at.name}</li>
                        </a>
                    <#else >
                        <a href="${webUrl}/headline/${at.id}" style="display: block;">
                            <li><em class="select1"></em>${at.name}</li>
                        </a>
                    </#if>
                </#list>
                </ul>
            </div>
            <div class="forum-content-info">
            <#list articles.records as article>
                <div class="forum-info clearfix">
                    <a href="${webUrl}/headline/details/${article.id}" target="_blank">
                        <img class="forum-info-left" src="${article.imgPath}?imageMogr2/thumbnail/!260x147r|imageMogr2/gravity/Center/crop/260x147" alt=""/>
                    </a>
                    <div class="forum-info-right">
                        <div class="forum-info-title">
                            <a href="${webUrl}/headline/details/${article.id}" target="_blank">${article.title}</a>
                        </div>
                        <div class="forum-info-content dot-ellipsis">
                        	${article.content}
                        </div>
                        <div class="forum-info-tags">
                            <span>${article.author!''}<em></em>${(article.createTime?string("yyyy-MM-dd HH:mm"))!}</span>
                        </div>
                    </div>
                </div>
            </#list>
            </div>
            <#if articles.total gt 6>
            <a href="${webUrl}/headline/list/${echoMap.type}" class="more-news">更多</a>
            </#if>
        </div>
    <div class="forum-content-right" style="position: absolute; left: 880px;">
        <!--推荐专栏作者-->
        <div class="zhuanlan_zuozhe hide" id="zhuanlan_bigbox">
            <h4>推荐专栏作者</h4>
            <ul id="zhuanlan_zuozhe">
                <!--<li class="clearfix">
                    <div class="zuozhe_touxaing">
                        <img src="../images/doctor_detail/touxiang.png" alt="" />
                    </div>
                    <div class="zuozhe_inf">
                        <span>鹿明中医</span>
                        <p>关注中医药发展创业</p>
                    </div>
                </li>

                <li class="clearfix">
                    <div class="zuozhe_touxaing">
                        <img src="../images/doctor_detail/touxiang.png" alt="" />
                    </div>
                    <div class="zuozhe_inf">
                        <span>鹿明中医</span>
                        <p>关注中医药发展创业</p>
                    </div>
                </li>

                <li class="clearfix">
                    <div class="zuozhe_touxaing">
                        <img src="../images/doctor_detail/touxiang.png" alt="" />
                    </div>
                    <div class="zuozhe_inf">
                        <span>鹿明中医</span>
                        <p>关注中医药发展创业</p>
                    </div>
                </li>

                <li class="clearfix">
                    <div class="zuozhe_touxaing">
                        <img src="../images/doctor_detail/touxiang.png" alt="" />
                    </div>
                    <div class="zuozhe_inf">
                        <span>鹿明中医</span>
                        <p>关注中医药发展创业</p>
                    </div>
                </li>-->
            </ul>
        </div>
    <#if (hotSpecialColumnAuthors?size > 0)>
        <div class="zhuanlan_zuozhe" id="zhuanlan_bigbox">
            <h4>大家专栏</h4>
            <ul id="zhuanlan_zuozhe">
                <#list hotSpecialColumnAuthors as hotSpecialColumnAuthor>
                    <li class="clearfix">
                        <div class="touxiang">
                        	<a href="/doctors/${hotSpecialColumnAuthor.doctorId}" style="color: #0C0C0C"target="_blank">
                            <img src="${hotSpecialColumnAuthor.headPortrait!defaultDoctorHeadImg}?imageMogr2/thumbnail/!60x60r|imageMogr2/gravity/Center/crop/60x60" alt=""/>
                            </a>
                        </div>
                     	<div class="zuozhe_inf">
							<span>
                                <a  href="${webUrl}/doctors/${hotSpecialColumnAuthor.doctorId}" style="color: #0C0C0C"
                                    target="_blank">${hotSpecialColumnAuthor.doctorName}</a></span>
                            <p><a  href="${webUrl}/headline/details/${hotSpecialColumnAuthor.id}" style="color: #0C0C0C"
                                   target="_blank">${hotSpecialColumnAuthor.title}</a></p>
							<#--<a  href="/doctors/${hotSpecialColumnAuthor.doctorId}" style="color: #0C0C0C" -->
							<#--target="_blank">${hotSpecialColumnAuthor.title}</a></span>-->
							<#--<p>${hotSpecialColumnAuthor.doctorName}</p>-->
						</div>
                    </li>
                </#list>
            </ul>
        </div>
    </#if>
    <#if hotArticle?? && hotArticle?size gt 0>
        <div class="hot-article">
            <span class="hot-article-title">推荐阅读</span>
            <ul class="hot-article-list">
                <#list hotArticle as ha>
                    <li>
                        <a href="${webUrl}/headline/details/${ha.id}" target="_blank">
                            <#if ha_index <= 2>
                                <p class="setSelect">${ha_index+1}</p>
                            <#else>
                                <p>${ha_index+1}</p>
                            </#if>
                            <span title="${ha.title}">${ha.title}</span>
                        </a>
                    </li>
                </#list>
            </ul>
        </div>
    </div>
    </#if>
    </div>
</div>
<#include "../footer.ftl">
</body>
<script src="/web/js/jquery.pagination.js"></script>
<script src="/web/js/placeHolder.js"></script>
<script src="/web/js/banner.js?v=ipandatcm_1.3" type="text/javascript" charset="utf-8"></script>
<script type="application/javascript">
	
    $(function () {
        $(".headline").addClass("select");
    });


    //头条tap栏的长度判断最多为7个
    var headTab = $(".forum-content-tag a").length;
    if (headTab > 7) {
        $(".forum-content-tag a:gt(6)").remove();
    }
</script>