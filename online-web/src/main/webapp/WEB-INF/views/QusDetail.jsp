<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en" xmlns=http://www.w3.org/1999/xhtml xmlns:bd=http://www.baidu.com/2010/xbdml>
<head>
    <!--[if IE 9]>
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE9">
    <![endif]-->
    <meta http-equiv="X-UA-Compatible" content="IEedge"/>
    <meta charset="UTF-8">
    <meta HTTP-EQUIV="pragma" CONTENT="no-cache">
    <meta HTTP-EQUIV="Cache-Control" CONTENT="no-cache, must-revalidate">
    <meta HTTP-EQUIV="expires" CONTENT="0">
    <title>问答 - 熊猫中医</title>
    <link rel="shortcut icon" href="/favicon.ico"/>
    <meta name="keywords"
          content="中医教育,中医传承,中医线下教育,海口中医养生,国粹,传承,中医,中药,心承,熊猫中医"/>
    <meta name="description"
          content="熊猫中医是中医药的学习传承平台：学中医、懂中医、用中医，让中医服务于家庭、个人，让中国古代科学瑰宝为现代人类的健康保驾护航。"/>
</head>
<link rel="stylesheet" href="/web/css/bootstrap.min.css">
<link rel="stylesheet" href="/web/css/bootstrap-theme.min.css">
<link rel="stylesheet" href="/web/css/mylogin.css"/>
<link rel="stylesheet" href="/web/css/componet.css"/>
<link rel="stylesheet" href="/web/css/header.css">

<link rel="stylesheet" href="/web/css/footer.css">
<link rel="stylesheet" href="/web/font/iconfont.css">
<link rel="stylesheet" href="/web/css/qusAndAnsDetails.css"/>
<link rel="stylesheet" href="/web/css/modal.css"/>
<link rel="stylesheet" type="text/css" href="/web/simditor-1.0.5/styles/font-awesome.css"/>
<link rel="stylesheet" type="text/css" href="/web/simditor-1.0.5/styles/simditor.css"/>
<link rel="stylesheet" href="/web/font/iconfont.css"/>

<script src="/web/js/jquery.min.js" type="text/javascript" charset="utf-8"></script>
<script src="/web/js/jquery.pagination.js" type="text/javascript" charset="UTF-8"></script>
<script type="text/javascript" src="/web/layer-v2.1/layer/layer.js"></script>
<script type="text/javascript" src="/web/js/artTemplate.js"></script>
<script src="/web/js/bootstrap.js" type="text/javascript" charset="utf-8"></script>
<script src="/web/js/jquery.form.min.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript" src="/web/js/ajaxfileupload.js"></script>


<script src="/web/js/common/common.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript" src="/web/js/helpers.js"></script>
<script src="/web/js/html5.js" type="text/javascript" charset="utf-8"></script>
<script src="/web/js/modal.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript" src="/web/simditor-1.0.5/scripts/js/module.js"></script>
<script type="text/javascript" src="/web/simditor-1.0.5/scripts/js/simditor-all.js"></script>
<script type="text/javascript" src="/web/simditor-1.0.5/scripts/js/uploader.js"></script>
<script type="text/javascript" src="/web/js/jquery.dotdotdot.js"></script>

<body>
<div class="zhezao"></div>
<div id="main">

    <div class="nav-bread-top">
        <!--<span class="glyphicon my-glyphicon-home" aria-hidden="true"></span>-->
        <!--  <a href="/">首页</a>
          <span class="glyphiconRight"><span> > </span></span>-->
        <a href="/questions">问道</a>
        <span class="glyphiconRight"><span> > </span></span>
        <span class="curr"></span>
    </div>
    <div class="quesDetail-bottom clearfix">
        <div class="quesDetail-left">
            <!--我的回答-->
            <div class="quesDetail-left-first">

                <!--<div class="good-answer-comment" style="display: block;">

                    <div class="comment-top">
                        <div data-commentid="1" class="commentId"><span class="user-nickname">{{$val.create_person}}：</span><span class="user-content">{{$val.content}}</span>
                            <p><span class="comment-time">{{$val.create_time}}</span><span class="dianzan">赞({{$val.praise_sum})</span><span class="reply-btn">回复</span><span class="reply-delete">删除</span></p>
                        </div>
                    </div>
                    <div class="reply"><input type="text" placeholder="回复 13811599288：">
                        <div data-commentid="1" class="commentId"><span class="user-nickname">$val.create_person}}：</span>
                            <span class="reply-btn">回复</span><span class="reply-delete">删除</span>
                        </div>
                    </div>

                    <div class="footer">
                        <div class="pages" style="">
                            <div class="Pagination"></div>
                            <div class="searchPage"><span class="page-sum">共<strong class="allPage">15</strong>页</span><span class="page-go">跳转<input type="text">页</span><a href="javascript:;" class="page-btn">GO</a>
                            </div>
                        </div>
                    </div>


                    <div class="comment-bottom clearfix"><input class="writeComment" type="text" placeholder="写下你的评论...">
                        <div class="comment-btn">评论</div>
                    </div>
                </div>-->

            </div>
            <!--精彩回答-->

            <!-- yuruixin20170910 -->
            <!-- <div class="official" style="display: none;">
                <p>官方回复</p>
                <div class="officialBody clearfix"></div>
                <p class="officialBtn"><span class="redErrey errey1">回复不能为空</span><span class="officialBtn-no">取消</span><span class="officialBtn-yes">确定</span></p>
                <p class="bianjiOfficialBtn"><span class="redErrey errey2">回复不能为空</span><span class="bianjiOfficialBtn-no">取消</span><span class="bianjiOfficialBtn-yes">确定</span></p>
            </div> -->
            <div class="quesDetail-left-second clearfix" style="display:none">
                <div class="good-Answer">
                    <img src="/web/images/ansandqus/icon_askdetial.png" alt=""/>
                    <span class="good">精彩回答</span>
                    <span class="nice_good_count"></span>
                </div>
                <div class="goodAnswercontent">

                </div>

            </div>
            <!--评论-->
            <div class="good-answer-comment">

            </div>

            <!--最新回答-->
            <div class="quesDetail-left-third clearfix" style="display: none;">
                <div class="latest-answer">
                    <img src="/web/images/ansandqus/icon_askdetial02.png" alt=""/>
                    <span class="good">最新回答</span>
                    <span class="last_good_count"></span>
                </div>
                <div class="latest-answer-middle">
                    <img class="loadingImg" src="/web/images/ansandqus/loading.gif" alt=""/>
                    <p class="loadingWord">加载中</p>
                </div>

            </div>
            <div class="pages" style="display: none">
                <div id="Pagination"></div>
                <div class="searchPage">
                    <span class="page-sum">共<strong class="allPage">0</strong>页</span>
                    <span class="page-go">跳转<input type="text" style="width: 37px;" min="1" max="">页</span>
                    <a href="javascript:;" class="page-btn">确定</a>
                </div>
            </div>
            <div class="tuijian" style="display: none">

            </div>
        </div>
        <div class="quesDtail-right">
            <div class="simliar">

            </div>
        </div>
        <!--相关课程-->
        <div class="quesDtail-right1 hide">
            <div class="relative-course">

            </div>
        </div>
        <div id="log1" style="overflow:hidden;display:none;">
            <p class="log1-title">推荐课程</p>
            <div id="contents" class="content" style="overflow:hidden;">

            </div>
        </div>
    </div>
</div>
<div class="tousuTrue">
    提交成功
</div>
<div class="huifunull">
    请输入内容
</div>
</body>
</html>
<script type="text/javascript" src="/web/js/header.js" charset="utf-8"></script>
<script type="text/javascript" src="/web/js/qusAndAnsDetail.js"></script>
<script type="text/javascript" src="/web/js/footer.js"></script>
<script src="/web/js/placeHolder.js"></script>
<script type="text/javascript" src="/web/js/base.js"></script>
<script type="text/javascript">
    $(function () {
        $('input').placeholder();
    });
</script>
<script>
  var qid="<%=request.getAttribute("qid")%>";
</script>

