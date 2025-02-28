<!DOCTYPE html>
<html>
<head lang="en">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IEedge">

    <title>熊猫中医名医-中医药传承创新平台</title>
    <link rel="shortcut icon" href="/favicon.ico">
    <meta name="keywords" content="中医教育,中医传承,中医线下教育,海口中医养生,国粹,传承,中医,中药,心承,熊猫中医">
    <meta name="description" content="熊猫中医是中医药的学习传承平台：学中医、懂中医、用中医，让中医服务于家庭、个人，让中国古代科学瑰宝为现代人类的健康保驾护航。">
    <meta name="renderer" content="webkit">
    <link rel="stylesheet" href="/web/css/bootstrap.min.css">
    <link rel="stylesheet" href="/web/css/bootstrap-theme.min.css">
    <link rel="stylesheet" href="/web/css/mylogin.css"/>
    <link rel="stylesheet" href="/web/css/componet.css"/>
    <link rel="stylesheet" href="/web/css/header.css"/>
    <link rel="stylesheet" href="/web/css/doctor.css?v=ipandatcm_1.2.1"/>
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

<div id="tip" style="display: none;">
    您已完成了医馆注册，不能进行医师注册!
</div>


<div id="forum" class="clearfix">
    <div class="forum-banner" style="position: relative;z-index: 999;">
        <div class="banner">
            <ul id="slider" class="slider">
            <#list banners as banner>
                <#if banner_index==0>
                <li style="z-index: 2;">
                <a href="${banner.imgHref}" data-indexId="${banner.id}" target="_blank"
                   style="background:url(${banner.imgPath})no-repeat top center;background-size:100% 100%">
                <#else>
                <li>
                <a href="${banner.imgHref}" target="_blank" data-indexId="${banner.id}"
                   style="background:url(${banner.imgPath})no-repeat top center;">
                </#if>
                <div class="image-overlay">
                </div>
            </a>
            </li>
            </#list>
            </ul>
            <div id="left">
                <em></em>
            </div>
            <div id="right">
                <em></em>
            </div>
            <div id="selector" class="selector">
            <#list banners as banner>
                <#if banner_index==0>
                    <span class="cur"></span>
                <#else>
                    <span class=""></span>
                </#if>
            </#list>
            </div>
        </div>
        <div class="hot-article hide">
            <span class="hot-article-title">每周免费预约大师号</span>
            <p class="appointment">参与有百分之一的机会获得近期大师预约号</p>
            <div class="hot-article-list">
                <!-- TODO -->

                <div class="appointments clearfix">
                    <ul class="appointment_left">
                        <li class="appointment_doctor_pic"></li>
                        <li class="last_time">揭晓倒计时</li>
                        <li class="Count_down">14：33：30</li>
                    </ul>
                    <ul class="appointment_right">
                        <li>国医大师<span class="doctor_name">段富津</span></li>
                        <li class="appointment_doc_address"><span>黑龙江</span><span>哈尔滨</span></li>
                        <li class="appointment_doc_school"><em></em>哈尔滨中医药大学</li>
                        <li class="appointment_time"><em></em>2017.12.12下午</li>
                        <li class="appointment_btn">
                            <button>免费预约</button>
                        </li>
                    </ul>
                </div>

                <div class="appointments clearfix">
                    <ul class="appointment_left">
                        <li class="appointment_doctor_pic"></li>
                        <li class="last_time">揭晓倒计时</li>
                        <li class="Count_down">14：33：30</li>
                    </ul>
                    <ul class="appointment_right">
                        <li>国医大师<span class="doctor_name">段富津</span></li>
                        <li class="appointment_doc_address"><span>黑龙江</span><span>哈尔滨</span></li>
                        <li class="appointment_doc_school"><em></em>哈尔滨中医药大学</li>
                        <li class="appointment_time"><em></em>2017.12.12下午</li>
                        <li class="appointment_btn">
                            <button>免费预约</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="forum-content clearfix">
        <div class="forum-content-left">
           <#list doctorTypeList as doctorTypeItem>
	           <div class="doctor_list clearfix" id="doc_lis${doctorTypeItem_index+1}">
	                <h2>${doctorTypeItem.text}</h2>
	                <a href="${webUrl}/doctors/list?type=${doctorTypeItem.code}" target="_blank">更多<span class="glyphicon glyphicon-menu-right"
	                                                                                aria-hidden="true"></span></a>
	                <ul class="doctor_inf" id="guoyi">
	                <#list doctorTypeItem.doctors as doctor>
	                    <li>
	                        <a href="${webUrl}/doctors/${doctor.id}" target="_blank"></a>
	                        <img src="${doctor.headPortrait!''}?imageMogr2/thumbnail/!70x70r|imageMogr2/gravity/Center/crop/70x70" alt="${doctor.name}">
	                        <h5>${doctor.name}&nbsp;<span>${doctor.title!''}</span></h5>
	                        <@workTime text=doctor.workTime!'' />
	                        <p>${doctor.province!''}&nbsp;${doctor.city!''}&nbsp; </p>
	                    </li>
	                </#list>
	                </ul>
	            </div>	
           </#list>
        </div>
        <div class="forum-content-right">

            <div class="forum-hosJoin hide">
                <p>期待有志于传承和发展中医药的医师加入</p>
                <a href="javascript:;" id="toDocJoin">医师入驻</a>
            </div>


            <div class="forum-hot-tag">
                <div class="forum-hot-tag-title">医师搜索</div>
                <div class="search_hos_box clearfix">
                    <form action="/doctors/list" method="get">
                        <button type="submit" value="Submit" class="search_hos_btn">搜索</button>
                        <input class="search_hos" type="text" name="name"
                               placeholder="${defaultSearch?default('请输入关键字搜索医师')}">
                    </form>
                </div>
                <p>按热门科室搜索</p>
                <ul class="forum-hot-tagGround">
                <#list hotDepartments as hotDepartment>
                    <li>
                        <a href="${webUrl}/doctors/list?departmentId=${hotDepartment.id}"
                           target="_blank">${hotDepartment.name}</a>
                    </li>
                </#list>
                </ul>
            </div>


            <!-- 名师报道 -->
        <#if (recentlyWritings?size gt 0)>
            <div class="school_teacher ">
                <div>
                    <h4>名医报道</h4>
                    <a href="${webUrl}/headline/list/7" target="_blank">
                        <span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span>
                    </a>
                </div>

                <ul class="teacher_picList clearfix" id="doctor_baodao">
                    <#list recentlyNewsReports as recentlyNewsReport>
                        <li>
                            <a href="${webUrl}/headline/details/${recentlyNewsReport.id}"
                               target="_blank">${recentlyNewsReport.title}</a>
                        </li>
                    </#list>
                </ul>
            </div>
        </#if>

        <#if (recentlyWritings?size gt 0)>
            <!-- 名医书籍 -->
            <div class="teacher_books">
                <div id="">
                    <h4>名医著作</h4>
                    <a href="${webUrl}/doctors/writing">
                        <span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span>
                    </a>
                </div>

                <ul class="book_list clearfix" id="boos_list">
                    <#list recentlyWritings as recentlyWriting>
                        <li>
                            <a href="/headline/details/${recentlyWriting.id}" style="color: #0C0C0C;display: inline;">
                                <img src="${recentlyWriting.imgPath}?imageMogr2/thumbnail/!80x100r|imageMogr2/gravity/Center/crop/80x100" alt="">
                            </a>
                            <div>
                                <a href="/headline/details/${recentlyWriting.id}" style="color: #0C0C0C">
                                    <span class="book_name">${recentlyWriting.title!""}</span>
                                    <h5 class="book_author">${recentlyWriting.author!""}</h5>
                                </a>
                            </div>
                        </li>

                    </#list>
                </ul>

            </div>
        </#if>
        </div>

    </div>
</div>
<#include "../footer.ftl">
</body>
<script src="/web/js/jquery.pagination.js"></script>
<script src="/web/js/placeHolder.js"></script>
<script src="/web/js/banner.js?v=ipandatcm_1.3" type="text/javascript" charset="utf-8"></script>
<script type="application/javascript">
    $(function () {
        $(".doctor-tab").addClass("select");

        //登入之后进行判断 右侧医师入驻入口是否有
        RequestService("/medical/common/isDoctorOrHospital", "GET", null, function (data) {
            if (data.success == true) {
                var isDoctorOrHospital = data.resultObject.isDoctorOrHospital;
                //判断
                if (isDoctorOrHospital == 1 || isDoctorOrHospital == -1 || isDoctorOrHospital == 2 || isDoctorOrHospital == -2) {
                    //医师认证成功
                    $('.forum-hosJoin').addClass('hide');
                } else {
                    $('.forum-hosJoin').removeClass('hide');
                }
            } else if (data.success == false) {
                $('.forum-hosJoin').removeClass('hide');
            }
        });
        //医师页面的医师入驻入口点击跳转效果
        $('#toDocJoin').click(function () {
            regDoctor();
        });
    });
</script>
