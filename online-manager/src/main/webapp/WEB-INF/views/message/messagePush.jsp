<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ include file="../common/jstl_taglib.jsp" %>
<link href="/css/jquery-ui-timepicker-addon.css" type="text/css"/>
<link href="/js/layer/skin/layer.css" type="text/css"/>
<link rel="stylesheet" type="text/css" href="bootstrap/assets/css/bootstrap-select.css"/>
<script type="text/javascript" src="bootstrap/assets/js/bootstrap-select.js"></script>

<style type="text/css">
    .vertical-tab {
        width: 8%;
        height: 100%;
        float: left;
        /* overflow: hidden; */
    }

    .vertical-tab > li {
        text-align: center;
    }

    .vertical-tab > li.active > a, .vertical-tab > li.active > a:focus, .vertical-tab > li.active > a:hover {
        border: solid #ccc;
        border-width: 1px 1px 1px 1px;
        background-color: #ffffff;
        border-right: 1px solid #ffffff;
        z-index: 2;
    }

    .vertical-tab > li > a {
        /* border-radius: 4px 4px 4px 4px; */
        border-radius: 4px 0px 0px 4px;
    }

    .vertical-tab-content {
        float: left;
        width: 90%;
        padding: 5px;
        margin-left: -1px;
        margin-bottom: 2px;
        border-radius: 0px 4px 4px 4px;
        /*border: solid 1px #ccc;*/
        color: #666;
    }

    .send {
        position: relative;
        width: 90%;
        background: #FFFFFF;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px; /* 圆角 */
        border: 1px solid #ccc;
    }

    .tag {
        width: 300px;
        min-height: 30px;
        border: 1px solid #ccc;
        position: relative;
        padding: 10px;
        background-color: #ccc;
        border-radius: 4px;
        margin-left: 30px;
        -moz-box-shadow: 1px 1px 2px hsla(0, 0%, 0%, 0.3);
        -webkit-box-shadow: 1px 1px 2px hsla(0, 0%, 0%, 0.3);
        box-shadow: 1px 1px 2px hsla(0, 0%, 0%, 0.3);
    }

    .tag:before, .tag:after {
        position: absolute;
        content: "\00a0";
        width: 0px;
        height: 0px;
        border-width: 8px 18px 8px 0;
        border-style: solid;
        border-color: transparent #CCC transparent transparent;
        top: 5px;
        left: -18px;

    }

    .tag:after {
        bottom: -33px;
        border-color: #FFF transparent transparent;
    }

    .clearfix:after {
        content: "";
        height: 0;
        visibility: hidden;
        display: block;
        clear: both;
    }

</style>

<style>
    .caret {
        display: inline-block;
        width: 0;
        height: 0;
        margin-left: 2px;
        vertical-align: middle;
        border-top: 4px dashed;
        border-top: 4px solid \9;
        border-right: 4px solid transparent;
        border-left: 4px solid transparent;
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    .rotateCaret {
        display: inline-block;
        width: 0;
        height: 0;
        /*  margin-left: 2px; */
        vertical-align: middle;
        border-top: 4px dashed;
        border-top: 4px solid \9;
        border-right: 4px solid transparent;
        border-left: 4px solid transparent;
        -webkit-transform: rotate(-90deg);
        -moz-transform: rotate(-90deg);
        -ms-transform: rotate(-90deg);
        -o-transform: rotate(-90deg);
        transform: rotate(-90deg);
    }

    .clearfix:after {
        content: '';
        height: 0;
        visibility: hidden;
        display: block;
        clear: both;
    }

    .zhezhao {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #666;
        opacity: 0.5;
        z-index: 99999;
    }

    #fenpeiTeacher {
        width: 520px;
        font-size: 12px;
        margin: 0 auto;
        border: 1px solid #ddd;
        background-color: #fff;
        position: fixed;
        z-index: 999999;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .fenpeiTearchTop {
        width: 100%;
        border-bottom: 1px solid #ddd;
    }

    .title {
        display: inline-block;
        font-size: 16px;
        color: #333;
        font-weight: bold;
        line-height: 35px;
        padding-left: 10px;
    }

    .fenpeiTearcherClose {
        float: right;
        margin-top: 10px;
        padding-right: 10px;
        cursor: pointer;
    }

    .fenpeiTeacherAbove {
        padding: 15px 30px;
    }

    .fengpeiTeacher-content {

    }

    .fengpeiTeacher-content ul {
        list-style: none;
    }

    .fengpeiSearch {
        position: relative;
        width: 242px;
    }

    .fengpeiSearch input {
        width: 100%;
        height: 28px;
        line-height: 20px;
    }

    .fengpeiSearch img {
        position: absolute;
        right: 8px;
        top: 4px;
    }

    .fenpeiList {
        margin-top: 10px;
        width: 242px;
        height: 395px;
        border: 1px solid #ddd;
        padding: 10px;
        float: left;
        overflow-y: auto;
    }

    .fenpeiList .xuekename {
        display: inline-block;
        vertical-align: top;
        margin: 5px 0;
    }

    .fenpeiList .xuekeleibei {
        display: inline-block;
        margin: 0;
        padding: 0;
        width: 150px;
    }

    .fenpeiList .xuekeleibei span {
        cursor: pointer;
    }

    .list-items2 li {
        cursor: pointer;
    }

    .row li {
        cursor: pointer;
    }

    .fenpeiTeacherImg {
        cursor: pointer;
    }

    .allTeacher span, .allTeacher img {
        cursor: pointer;
    }

    .child-parrent-title .clear {
        cursor: pointer;
    }

    .fenpeiTeacherBtn span {
        cursor: pointer;
    }

    .fenpeiList .xuekeleibei li {
        margin: 5px 0;
    }

    .fenpeiList .xuekeleibei .tagname {
        /* margin-left:5px; */
    }

    .fenpeiList .xuekeleibei li::before {

    }

    .fenpeirow {
        float: left;
        margin: 0;
        padding: 0;
        width: 50px;
        margin-left: 5px;
    }

    .fenpeirow li {
        width: 30px;
        height: 30px;
        background-color: #f8f8f8;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        text-align: center;
        line-height: 30px;
        margin: 80px 10px;
        cursor: pointer;
    }

    .child-parrent {
        width: 155px;
        float: right;
        margin-top: 10px;
    }

    .child-parrent > div {
        width: 100%;
        height: 125px;
        border: 1px solid #ddd;
        margin-bottom: 10px;
    }

    .child-parrent .child-parrent-title {
        height: 25px;
        padding: 0 10px;
        border-bottom: 1px solid #ddd;
    }

    .child-parrent .child-parrent-title span {
        margin-top: 5px;
    }

    .child-parrent .child-parrent-title span:nth-child(1) {
        float: left;
    }

    .child-parrent .child-parrent-title span:nth-child(2) {
        float: right;
    }

    .child-parrent .allTeacher {
        padding: 5px 10px;
        height: 88px;
        overflow-y: auto;
    }

    .fenpeiTeacherBtn {
        width: 200px;
        margin: 20px auto;
    }

    .fenpeiTeacherBtn .anniu {
        display: inline-block;
        width: 58px;
        height: 27px;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        text-align: center;
        line-height: 27px;
        background-color: #428bca;
        color: #fff;
        font-size: 14px;
    }

    .fenpeiTeacherBtn span {
        margin-left: 30px;
    }

    .select {
        color: #fff;
        background-color: #428bca;
    }

    .allTeacher span {
        display: inline-block;
        width: 80px;
    }

    .allTeacher img {
        vertical-align: bottom;
        display: none;
    }

    .allTeacher div:hover img {
        display: inline-block;
    }

    .list-items1 {
        display: none;
    }

    .list-items2 {
        display: none;
    }

    .vertical-tab {
        width: 8%;
        height: 100%;
        float: left;
        /* overflow: hidden; */
    }

    .vertical-tab > li {
        text-align: center;
    }

    .vertical-tab > li.active > a, .vertical-tab > li.active > a:focus, .vertical-tab > li.active > a:hover {
        border: solid #ccc;
        border-width: 1px 1px 1px 1px;
        background-color: #ffffff;
        border-right: 1px solid #ffffff;
        z-index: 2;
    }

    .vertical-tab > li > a {
        /* border-radius: 4px 4px 4px 4px; */
        border-radius: 4px 0px 0px 4px;
    }

    .vertical-tab-content {
        float: left;
        width: 90%;
        padding: 5px;
        margin-left: -1px;
        margin-bottom: 2px;
        border-radius: 0px 4px 4px 4px;
        /*border: solid 1px #ccc;*/
        color: #666;
    }

    .send {
        position: relative;
        width: 90%;
        background: #FFFFFF;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px; /* 圆角 */
        border: 1px solid #ccc;
    }

    .tag {
        width: 300px;
        min-height: 30px;
        border: 1px solid #ccc;
        position: relative;
        padding: 10px;
        background-color: #ccc;
        border-radius: 4px;
        margin-left: 30px;
        -moz-box-shadow: 1px 1px 2px hsla(0, 0%, 0%, 0.3);
        -webkit-box-shadow: 1px 1px 2px hsla(0, 0%, 0%, 0.3);
        box-shadow: 1px 1px 2px hsla(0, 0%, 0%, 0.3);
    }

    .tag:before, .tag:after {
        position: absolute;
        content: "\00a0";
        width: 0px;
        height: 0px;
        border-width: 8px 18px 8px 0;
        border-style: solid;
        border-color: transparent #CCC transparent transparent;
        top: 5px;
        left: -18px;

    }

    .tag:after {
        bottom: -33px;
        border-color: #FFF transparent transparent;
    }

    .clearfix:after {
        content: "";
        height: 0;
        visibility: hidden;
        display: block;
        clear: both;
    }

    input.custom-combobox-input.ui-widget.ui-widget-content.ui-state-default.ui-corner-left.ui-autocomplete-input.valid {
        width: 100%;
    }

    input.custom-combobox-input.ui-widget.ui-widget-content.ui-state-default.ui-corner-left.ui-autocomplete-input {
        width: 100%;
    }

</style>
<script type="text/javascript">
    try {
        var scripts = [null, null];
        $('.page-content-area').ace_ajax('loadScripts', scripts,
            function () {
            });
    } catch (e) {
    }
    $(function () {
        $('#vtab li').click(function () {
            tops = $(this).offset().top - $('#vtab').offset().top + $('#vtab').scrollTop() - $('#vtab').height() / 4;
            console.log(tops);
            $('#vtab').animate({
                scrollTop: tops
            }, 'slow');
        });
    });
</script>
<script src="/js/layer/layer.js"></script>
<script src="/js/jquery-ui-timepicker-zh-CN.js" type="text/javascript"></script>
<div class="page-header">
    当前位置：消息管理
    <small><i class="ace-icon fa fa-angle-double-right"></i>
    </small>
    <span> 系统消息 </span>
</div>

<div style="height: 100%;" class="clearfix">

    <!-- Tab panes -->
    <div class="tab-content vertical-tab-content">
        <div role="tabpanel" class="tab-pane active" id="home">
            <div class="mainrighttab tabresourse bordernone" id="courseDiv">
                <p class="col-xs-4" style="padding: 0;">
                    <button class="btn btn-sm btn-success add_bx" title="新增">
                        <i class="glyphicon glyphicon-plus"></i> 新增
                    </button>

                </p>
                <div class="row">
                    <div class="col-xs-12">
                        <table id="messagePushTable"
                               class="table table-striped table-bordered table-hover" style="width: 100%;">
                        </table>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>

<!-- 增加form -->
<div id="dialogAddBanner2Div"></div>
<div id="addBanner2Dialog" class="hide">
    <form id="addBanner2-form" class="form-horizontal" method="post" action="" style="margin-top: 15px;">
        <%--<div class="form-group" style="margin-top: 18px;">--%>
            <%--<label class="col-sm-3 control-label no-padding-right" for="add_context"><font color="red">*</font>推送标题:--%>
            <%--</label>--%>
            <%--<div class="col-sm-6">--%>
                <%--<input name="title" id="add_title" class="clearfix {required:true,maxlength:30}"/>--%>
            <%--</div>--%>
        <%--</div>--%>
        <div class="form-group" style="margin-top: 18px;">
            <label class="col-sm-3 control-label no-padding-right" for="add_context"><font color="red">*</font>推送内容:
            </label>
            <div class="col-sm-6">
                <textarea name="content" id="add_context" value="" rows="3"
                          style="resize:none;width: 100%; font-size: 12px;" maxlength="74"
                          class="clearfix {required:true,maxlength:74}"></textarea>
            </div>
        </div>
        <div class="form-group" style="margin-top: 18px;">
            <label class="col-sm-3 control-label no-padding-right" for="add_pushTime"><font color="red">*</font>推送时间:
            </label>
            <div class="col-sm-6">
                <input type="text" name="pushTime" id="add_pushTime" maxlength="20" readonly="readonly"
                       class="datetime-picker col-xs-10 col-sm-8 {required:true,date:true,rangelength:[10,19]}">
            </div>
        </div>
        <div class="form-group" style="margin-top: 18px;">
            <label class="col-sm-3 control-label no-padding-right" for="add_pushUser"><font color="red">*</font>推送用户:
            </label>
            <div class="col-sm-6" style="margin-top: 6px;">
                <label style="margin:0 15px 0 0;"><input name="pushType" type="radio" value="0" checked/>所有人 </label>
                <label style="margin-bottom: 0;"><input name="pushType" type="radio" value="1"/>指定用户</label>
                <div class="J-input-user" style="display: none">
                    <label>推送对象导入:<a href="/template/inputUser.xls">点击下载模板</a> </label>
                    <div>
                        <input type="file" name="pushUserFile" accept=".xls" id="J-pushUserFile">
                    </div>
                </div>
            </div>
        </div>

        <div class="form-group" style="margin-top: 18px;">
            <input type="hidden" name="detailId" id="J-detailId">
            <label class="col-sm-3 control-label no-padding-right">跳转: <button class="J-no-target no-jump-link">不跳转</button></label>
            <div class="col-sm-18" style="margin-top: 9px;">
                <div class="col-sm-2">
                    <label>课程:
                    	<input name="routeType" type="radio" value="COMMON_COURSE_DETAIL_PAGE">
                	</label>
                </div>
                <div class="col-sm-2">
                    <label>医师/主播:
                    	<input name="routeType" type="radio" value="ANCHOR_INDEX">
                	</label>
                </div>
                <div class="col-sm-2">
                    <label>医师动态:
                    	<input name="routeType" type="radio" value="DOCTOR_POST">
                	</label>
                </div>
                <div class="col-sm-2">
                    <label>外部url地址:
                    	<input name="routeType" type="radio" value="H5">
               		</label>
                </div>
            </div>
        </div>
        <div class="form-group" style="align-content: center">
            <label class="col-sm-3 control-label no-padding-right"></label>
            <div class="course-detail col-sm-6" style="display: none">
                <select name="menuType" id="J-menu">
                    <c:forEach var="menu" items="${menus}">
                        <option value="${menu.id}">${menu.name}</option>
                    </c:forEach>
                </select>
                <select id="J-course" style="min-width: 80px">
                    <c:forEach var="course" items="${courses}">
                        <option value="${course.id}">
                                ${course.courseName}
                        </option>
                    </c:forEach>
                </select>
            </div>
            <div class="anchor-detail" style="display: none;float: left;margin-left: 15px;">
                <select name="anchorId" id="J-anchor">
                    <c:forEach var="anchor" items="${anchors}">
                        <option value="${anchor.userId}">
                                ${anchor.name}
                        </option>
                    </c:forEach>
                </select>
            </div>
            <div class="doctor-detail" style="display: none;float: left;margin-left: 15px;">
                <select  id="J-doctor">
                    <c:forEach var="anchor" items="${anchors}">
                        <option value="${anchor.refId}">
                                ${anchor.name}
                        </option>
                    </c:forEach>
                </select>
            </div>
            <div class="outer-link" style="display: none;float: left;margin-left: 15px;">
                <input type="url" name="url" id="J-link">
            </div>
        </div>
    </form>
</div>


<script type="text/javascript" src="/js/message/messagePush.js?v=1.7"></script>
