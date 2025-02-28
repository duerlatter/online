<!DOCTYPE html>
<html lang="en">

<head>
    <!--[if IE 9]>
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE9">

    <![endif]-->
    <meta http-equiv="X-UA-Compatible" content="IEedge"/>
    <meta charset="UTF-8">
    <title>熊猫中医 - 中医药传承创新平台</title>
    <link rel="shortcut icon" href="favicon.ico"/>
    <meta name="keywords" content="中医教育,中医传承,中医线下教育,海口中医养生,国粹,传承,中医,中药,心承,熊猫中医"/>
    <meta name="description" content="熊猫中医是中医药的学习传承平台：学中医、懂中医、用中医，让中医服务于家庭、个人，让中国古代科学瑰宝为现代人类的健康保驾护航。"/>
    <meta name="renderer" content="webkit">
    <meta name="baidu-site-verification" content="UHaAQAeAQF"/>
    <link rel="stylesheet" href="/web/css/bootstrap.min.css">
    <link rel="stylesheet" href="/web/css/bootstrap-theme.min.css">
    <link rel="stylesheet" href="/web/css/mylogin.css"/>
    <link rel="stylesheet" href="/web/css/componet.css"/>
    <link rel="stylesheet" href="/web/css/index2.css?v=ipandatcm_1.3"/>
    <link rel="stylesheet" href="/web/css/header.css"/>
    <link rel="stylesheet" href="/web/css/footer.css"/>
    <link rel="stylesheet" href="/web/font/iconfont.css"/>
    <!--<link rel="stylesheet" href="/web/css/index-9a525196fb.css" type="text/css">-->
</head>

<script src="/web/js/jquery-1.12.1.js" type="text/javascript" charset="utf-8"></script>
<script>
    (function() {
        //解析url地址
        var config = $.ajax({url:"/config.json",async:false}).responseJSON;
        var browser = {
            versions: function () {
                var u = navigator.userAgent, app = navigator.appVersion;
                return {//移动终端浏览器版本信息
                    trident: u.indexOf('Trident') > -1, //IE内核
                    presto: u.indexOf('Presto') > -1, //opera内核
                    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                    iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                    iPad: u.indexOf('iPad') > -1, //是否iPad
                    webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                    weixin: u.indexOf('MicroMessenger') > -1, //是否微信
                    qq: u.match(/\sQQ/i) == " qq" //是否QQ
                };
            }(),
            language: (navigator.browserLanguage || navigator.language).toLowerCase()
        }
        var wxurl;
        if (browser.versions.mobile || browser.versions.ios || browser.versions.android ||
                browser.versions.iPhone || browser.versions.iPad) {
            wxurl = config.wechat;
            window.location = "http://" + wxurl;
        } else if (document.location.host == 'www.ixincheng.com') {
            window.location = "http://" + config.pc;
        }
    })();
</script>
<header>
<#include "header-body.ftl">
</header>
<body>
<!-- <div class="dianwo">点我</div> -->
<div class="popover_order">
    <div class="popover_order_bg"></div>
    <div class="order">
        <div class="order_close"><span style="font-size: 32px;position: absolute;right: 10px;">X</span></div>
        <div class="both"></div>
        <div class="order_size">请输入预约手机号</div>
        <div class="order_cell">
            <span>手机号</span>
            <input type="hidden" id="subscribeId"/>
            <input type="text" class="phone" placeholder="输入11位阿拉伯数字"
                   onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;if(event.keyCode==13) {btnValidate.click();return false;}"/>
            <div id="tips" style="top: 154px; display:none ;"><span
                    style="margin-left: 21%;font-size: 15px;color: red;"></span></div>
        </div>

        <input type="button" class="order_affirm" value="确认" id='btnValidate'>
    </div>
</div>
<div id="content_body">
    <div class="left_content">

    <#if bannerList??>

        <!--轮播图-->
        <div id="banner" class="clearfix">
            <div class="slider-container">
                <ul id="slider" class="slider">
                    <#if bannerList??>
                        <#list bannerList as bannerItem >
                            <li class="cur"
                                data-img="${bannerItem.imgPath}"
                                <#if bannerItem_index == 0>
                                style="display: none;"
                                </#if>  >
                                <a id="aImg${bannerItem_index}" data-indexid="${bannerItem.id}" target="_blank" href="${bannerItem.imgHref}"
                                   style="background: url(&quot;${bannerItem.imgPath}&quot;) center top no-repeat;">
                                </a>
                            </li>
                        </#list>
                    </#if>
                </ul>
                <#if bannerList?? && bannerList?size == 1>
                    <div id="left" style="display:none"><em></em></div>
                    <div id="right" style="display:none"><em></em></div>
                <#elseif bannerList?? && bannerList?size gt 1>
                    <div id="left"><em></em></div>
                    <div id="right"><em></em></div>
                </#if>
                <div id="selector" class="selector">
                    <#if bannerList??>
                        <#list bannerList as bannerItem >
                            <#if bannerItem_index == 0>
                                <span class="cur"></span>
                            <#else>
                                <span></span>
                            </#if>
                        </#list>
                    </#if>
                </div>
            </div>
        </div>
    </#if>

        <!--在线课程部分-->
    <#if courseTypeList.listLive?size gt 0 >

        <div class="online_course">
            <div class="course_title"><span class="title">在线课程</span>
                <a href="${webUrl}/courses/list?courseType=0" target="_blank" class="more">更多<img
                        src="/web/images/right_more.png" alt="箭头"></a>
            </div>
            <ul class="online_course_list clearfix">
                <#list courseTypeList.listLive as courseItem>
                    <#include "school/common/list_course_li.ftl">
                </#list>
            </ul>
        </div>
    </#if>

    <#if courseTypeList.listReal?size gt 0 >
        <!--线下课程部分-->
        <div class="underline_course">
            <div class="course_title"><span class="title">线下课程</span>
                <a href="${webUrl}/courses/list?courseType=4" class="more" target="_blank">更多<img
                        src="/web/images/right_more.png" alt="箭头"></a>
            </div>
            <ul class="online_course_list clearfix">
                <#list courseTypeList.listReal as courseItem>
                    <#include "school/common/list_course_li.ftl">
                </#list>
            </ul>
        </div>
    </#if>

    <#if doctorList?size gt 0 >
        <!--名家坐诊部分-->
        <div class="famous_doctor" style="padding: 20px 20px 0;">
            <div class="course_title"><span class="title">名家坐诊</span>
                <a href="${webUrl}/doctors/list" class="more" target="_blank">更多<img src="/web/images/right_more.png"
                                                                                     alt="箭头"></a>
            </div>
            <ul class="famous_doctor_list clearfix">
                <#list doctorList as doctor>
                    <li class="doctorTpl">
                        <a href="${webUrl}/doctors/${doctor.id}" target="_blank"></a>
                        <img src="${doctor.headPortrait!defaultDoctorHeadImg}?imageMogr2/thumbnail/!70x70r|imageMogr2/gravity/Center/crop/70x70" alt="${doctor.name}">
                        <h5>${doctor.name}&nbsp;<span>${doctor.title?default('')}</span></h5>
                        <#if doctor.workTime?? && doctor.workTime != "暂无">
                            <p>${doctor.workTime?default('')}</p>
                        </#if>
                        <p>${doctor.province?default('')}&nbsp;${doctor.city?default('')}&nbsp; </p>
                    </li>
                </#list>
            </ul>
        </div>
    </#if>
        <!--头条新闻部分开始-->

    <#if articles.records?size gt 0 >
        <div class="topLine_news" style="padding-bottom: 0;">
            <div class="course_title" style="margin-bottom: 0;"><span class="title">头条新闻</span>
                <a href="${webUrl}/headline/1" class="more" target="_blank">更多<img src="/web/images/right_more.png"
                                                                                   alt="箭头"></a>
            </div>
            <ul class="topLine_news_list">
                <#list articles.records as article>
                    <li class="newsTpl clearfix">
                        <a href="${webUrl}/headline/details/${article.id}" target="_blank">
                            <img class="forum-info-left" src="${article.imgPath}?imageMogr2/thumbnail/!260x147r|imageMogr2/gravity/Center/crop/260x147" alt="">
                        </a>
                        <div class="forum-info-right">
                            <div class="forum-info-title">
                                <a href="${webUrl}/headline/details/${article.id}" target="_blank">${article.title}</a>
                            </div>
                            <div class="forum-info-content dot-ellipsis">
                            ${article.content}
                            </div>
                            <div class="forum-info-tags">
                                <span>${article.author!''}<em></em>${(article.createTime?string("yyyy-MM-dd"))!}</span>
                            </div>
                        </div>
                    </li>
                </#list>
            </ul>
        </div>
    </#if>

        <!--底部的医馆部分-->
    <#if hospitalList.records?size gt 0>
        <div class="hospital_part" style="padding-bottom: 0;">
            <div class="course_title"><span class="title">医馆</span>
                <a href="${webUrl}/clinics/list" class="more" target="_blank">更多<img src="/web/images/right_more.png"
                                                                                     alt="箭头"></a>
            </div>
            <ul class="hostpital_list">

                <#list hospitalList.records as clinic>
                    <li class="hospitalTpl">
                        <a href="${webUrl}/clinics/${clinic.id}" id="${clinic.id}" target="_blank"></a>
                        <#if clinic.frontImg??>
                            <img src="${clinic.frontImg}?imageMogr2/thumbnail/!258x147r|imageMogr2/gravity/Center/crop/258x147" style="width: 100%;height: 147px;"
                                 alt="${clinic.name}">
                        <#else>
                            <img src="/web/images/hospitalDefault.png" style="width: 100%;height: 147px;"
                                 alt="${clinic.name}">
                        </#if>

                        <div class="hospital_inf">
                            <span class="hospital_name">${clinic.name}</span>

                            <#if clinic.authentication==true>
                                <span class="hospital_pass">已认证</span>
                            </#if>
                            <div class="hospital_address"><em></em>
                                <span>${clinic.province}&nbsp;&nbsp;${clinic.city}</span>
                            </div>
                            <div class="hospital_star">
                                <#if clinic.score??>
                                    <#list 1..clinic.score/1 as t>
                                        <em class="full_star"></em>
                                    </#list>
                                    <#if (5-(clinic.score/1)) gt 0>
                                        <#list 1..(5-(clinic.score/1)) as t>
                                            <em class="gray_star"></em>
                                        </#list>
                                    </#if>
                                <#else >
                                    <#list 1..5 as t>
                                        <em class="gray_star"></em>
                                    </#list>
                                </#if>
                            </div>
                        </div>
                    </li>
                </#list>
            </ul>
        </div>
    </#if>

    </div>
    <div class="right_content clearfix">


        <!--名医部分-->
    <#if doctorCourseList?size gt 0>
        <div class="famousDocter">
            <div class="right_title"><span class="title">名医</span></div>
            <ul>
                <#list doctorCourseList as doctor>
                    <li class="doctorInfTpl clearfix">
                        <div class="touxiang">
                            <a href="${webUrl}/doctors/${doctor.id}" style="color: #0C0C0C" target="_blank">
                                <#if doctor.headPortrait??>
                                    <img src="${doctor.headPortrait}?imageMogr2/thumbnail/!60x60r|imageMogr2/gravity/Center/crop/60x60" alt="${doctor.name}"/>
                                <#else>
                                    <img src="${webUrl}/web/images/defaultHead/18.png?imageMogr2/thumbnail/!60x60r|imageMogr2/gravity/Center/crop/60x60" alt="${doctor.name}"/>
                                </#if>
                            </a>
                        </div>
                        <div class="zuozhe_inf">
									<span><a href="/doctors/${doctor.id}" style="color: #0C0C0C;float: left;"
                                             target="_blank">${doctor.name} </a>
									<span class="address-show">
									  ${doctor.province?default('')}&nbsp;${doctor.city?default('')}
									 </span></span>
                            <#if doctor.gradeName??>
                                <p>课程：${doctor.gradeName?default('')}</p>
                            </#if>
                        </div>
                    </li>
                </#list>
            </ul>
        </div>

    </#if>

        <!--大家专栏部分-->
    <#if (hotSpecialColumnAuthors?size gt 0)>

        <div class="columnist">
            <div class="right_title"><span class="title">大家专栏</span></div>
            <ul>
                <#list hotSpecialColumnAuthors as hotSpecialColumnAuthor>

                    <li class="doctorInfTpl clearfix">
                        <div class="touxiang">
                            <a href="${webUrl}/doctors/${hotSpecialColumnAuthor.doctorId}" style="color: #0C0C0C"
                               target="_blank">
                                <#if hotSpecialColumnAuthor.headPortrait??>
                                    <img src="${hotSpecialColumnAuthor.headPortrait}?imageMogr2/thumbnail/!60x60r|imageMogr2/gravity/Center/crop/60x60" alt=""/>
                                <#else>
                                    <img src="${webUrl}/web/images/defaultHead/18.png?imageMogr2/thumbnail/!60x60r|imageMogr2/gravity/Center/crop/60x60" alt=""/>
                                </#if>
                            </a>
                        </div>
                        <div class="zuozhe_inf">
									<span>
									<a href="${webUrl}/doctors/${hotSpecialColumnAuthor.doctorId}"
                                       style="color: #0C0C0C"
                                       target="_blank">${hotSpecialColumnAuthor.doctorName}</a></span>
                            <p><a href="${webUrl}/headline/details/${hotSpecialColumnAuthor.id}" style="color: #0C0C0C"
                                  target="_blank">${hotSpecialColumnAuthor.title}</a></p>
                        </div>
                    </li>
                </#list>

            </ul>
        </div>
    </#if>

        <!-- 坐诊医生招募   先注释  -->

    <#--
        <#if (recruits?? && recruits?size gt 0)>
            <div class="recruitment_information">
                <div class="right_title"><span class="title">坐诊医生招募</span></div>

                <ul class="recruitment_information_list">

                    <#list recruits as recruit>
                    <li class="recruitment_informationTpl">
                        <h4><a href="${webUrl}/clinics/${recruit.hospitalId}"
                            style="color: #000;" target="_blank">${recruit.position}</a></h4>
                        <a href="${webUrl}/clinics/${recruit.hospitalId}" target="_blank">
                        ${recruit.city} &nbsp;&nbsp;${recruit.hospitalName}
                        </a>
                    </li>
                    </#list>

                </ul>
            </div>
        </#if>
    -->
    </div>

</div>
<script src="/web/js/lazyload/jquery.lazyload.js?v=1.9.1"></script>
<script type="text/javascript" src="/web/js/artTemplate.js"></script>
<script type="text/javascript" src="/web/js/jquery.SuperSlide.2.1.1.js"></script>
<script src="/web/js/bootstrap.js" type="text/javascript" charset="utf-8"></script>
<script src="/web/js/jquery.form.min.js" type="text/javascript" charset="utf-8"></script>
<script src="/web/js/md5.js" type="text/javascript" charset="UTF-8"></script>
<script src="/web/js/html5.js" type="text/javascript" charset="utf-8"></script>
<!-----引用layer------>
<script type="text/javascript" src="/web/layer-v2.1/layer/layer.js"></script>
<!-----引用layer------>
<script type="text/javascript" src="/web/js/helpers.js"></script>
<script src="/web/js/common/common.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript" charset="utf-8">
    home = true;
</script>
<script src="/web/js/header-top.js?v=ipandatcm_1.3" type="text/javascript" charset="utf-8"></script>

<script type="text/javascript" src="/web/js/jquery.pagination.js"></script>
<script type="text/javascript" src="/web/js/bootstrap-paginator.min.js"></script>
<script src="/web/js/placeHolder.js"></script>
<#include "footer.ftl">

</body>

</html>
<script type="text/javascript" charset="utf-8">
    function lazyCkeck() {
        $("img.lazy").lazyload({
            //placeholder : "web/images/load26.gif",
            //effect: "fadeIn",
            skip_invisible: false,
            threshold: 1500, //预加载，在图片距离屏幕180px时提前载入
        });
    }
</script>

<script src="/web/js/index2.js?v=ipandatcm_1.3" type="text/javascript" charset="utf-8"></script>

<script>
    $(document).ready(function () {
        $(".video_img").click(function () {
            $(".video_embed").show();
        });
    });
</script>

<script type="text/javascript">
    var yyFlag = false;
    $(function () {
        $('input').placeholder();
    });

    $(function () {
        $(".order_close").click(function () {
            $(".popover_order").css('display', 'none');
        });

        function check() {
            var regPhone = /^1[3-5678]\d{9}$/;
            if ($(".phone").val().trim().length === 0) {
                $(".phone").css("border", "1px solid #ff4012");
                $("#tips span").html("请输入手机号");
                $("#tips").show();
                yyFlag = false;
            } else if (!(regPhone.test($(".phone").val().trim()))) {
                $(".phone").css("border", "1px solid #ff4012");
                $("#tips span").html("手机号格式不正确");
                $("#tips").show();
                yyFlag = false;
            } else {
                $("#tips").hide();
                $(".phone").css("border", "1px solid #2cb82c");
                $(".cyinput1").css("border", "");
                yyFlag = true;
            }
        }

        $(".phone").blur(function () {
            check();
        });
        $(".order_affirm").click(function () {
            check();
            if (yyFlag) {
                var phone = $(".phone").val();
                var subscribeId = $("#subscribeId").val();
                RequestService("/course/subscribe", "GET", {
                    mobile: phone,
                    courseId: subscribeId
                }, function (data) {
                    console.info(data);
                    if (data.success) {
                        $(".popover_order").css('display', 'none');
                        RequestService("/online/live/getLiveTrailer", "GET", {
                            num: 4
                        }, function (data) {
                            $(".w_ul_ul").html(template.compile(liveTrailerTemplate)({
                                items: data.resultObject
                            }))
                            subscribeInit();
                        });
                        rTips(data.resultObject);
                    } else {
                        $(".popover_order").css('display', 'none');
                        rTips();

                    }
                })
            }
        });

    })
</script>