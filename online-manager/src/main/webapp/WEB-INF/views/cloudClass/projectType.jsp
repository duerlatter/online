<%@ page language="java" contentType="text/html; charset=UTF-8"
		 pageEncoding="UTF-8"%><%@ include file="../common/jstl_taglib.jsp"%>
<link href="/css/jquery-ui-timepicker-addon.css" type="text/css" />
<link href="/js/layer/skin/layer.css" type="text/css" />

<style type="text/css">
	.vertical-tab {
	    overflow: hidden;
	    margin-bottom: 20px;
	    border-bottom: 1px solid skyblue;
	    width: 100%;
	    margin: 10px 0 20px;
	}

	.vertical-tab > li {
		text-align: center;
	}

	/*  	.vertical-tab > li > a {
            border: solid #ccc;
            border-width: 1px 1px 1px 1px;
            background-color: #ffffff;
             border-right: 1px solid #ffffff;
            border-right: 1px solid #ccc;
            z-index: 2;
        } */

	/*.vertical-tab > li.active > a, .vertical-tab > li.active > a:focus, .vertical-tab > li.active > a:hover {
		z-index: 2;
    	background: skyblue;
    	color: white;
	}*/

	/*.vertical-tab > li > a {

		    float: left;
		    padding: 10px 20px !important;
		    border: 1px solid skyblue;
		    border-bottom: 0;
		    color: #848484;
	}*/

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
		-moz-box-shadow:1px 1px 2px hsla(0, 0%, 0%, 0.3);
		-webkit-box-shadow:1px 1px 2px hsla(0, 0%, 0%, 0.3);
		box-shadow:1px 1px 2px hsla(0, 0%, 0%, 0.3);
	}

	.tag:before, .tag:after {
		position:absolute;
		content:"\00a0";
		width:0px;
		height:0px;
		border-width:8px 18px 8px 0;
		border-style:solid;
		border-color:transparent #CCC transparent transparent;
		top:5px;
		left:-18px;

	}

	.tag:after {
		bottom: -33px;
		border-color: #FFF transparent transparent;
	}

	.clearfix:after{
		content:"";
		height:0;
		visibility:hidden;
		display:block;
		clear:both;
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
	.rotateCaret{
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
	#fenpeiTeacher{
		width:520px;
		font-size:12px;
		margin:0 auto;
		border:1px solid #ddd;
		background-color:#fff;
		position:fixed;
		z-index:999999;
		left:50%;
		top:50%;
		transform: translate(-50%,-50%);
	}
	.fenpeiTearchTop{
		width:100%;
		border-bottom:1px solid #ddd;
	}
	.title{
		display:inline-block;
		font-size:16px;
		color:#333;
		font-weight:bold;
		line-height:35px;
		padding-left:10px;
	}
	.fenpeiTearcherClose{
		float:right;
		margin-top:10px;
		padding-right:10px;
		cursor:pointer;
	}
	.fenpeiTeacherAbove{
		padding:15px 30px;
	}
	.fengpeiTeacher-content{

	}
	.fengpeiTeacher-content ul{
		list-style:none;
	}
	.fengpeiSearch{
		position:relative;
		width:242px;
	}
	.fengpeiSearch input{
		width:100%;
		height:28px;
		line-height:20px;
	}
	.fengpeiSearch img{
		position:absolute;
		right:8px;
		top:4px;
	}
	.fenpeiList{
		margin-top:10px;
		width:242px;
		height:395px;
		border:1px solid #ddd;
		padding:10px;
		float:left;
		overflow-y:auto;
	}
	.fenpeiList .xuekename{
		display:inline-block;
		vertical-align: top;
		margin:5px 0;
	}
	.fenpeiList .xuekeleibei{
		display:inline-block;
		margin:0;
		padding:0;
		width:150px;
	}
	.fenpeiList .xuekeleibei span{
		cursor:pointer;
	}
	.list-items2 li{
		cursor:pointer;
	}
	.row li{
		cursor:pointer;
	}
	.fenpeiTeacherImg{
		cursor:pointer;
	}
	.allTeacher span,.allTeacher img{
		cursor:pointer;
	}
	.child-parrent-title .clear{
		cursor:pointer;
	}
	.fenpeiTeacherBtn span{
		cursor:pointer;
	}
	.fenpeiList .xuekeleibei li{
		margin:5px 0;
	}
	.fenpeiList .xuekeleibei .tagname{
		/* margin-left:5px; */
	}
	.fenpeiList .xuekeleibei li::before{

	}
	.fenpeirow{
		float:left;
		margin:0;
		padding:0;
		width:50px;
		margin-left:5px;
	}
	.fenpeirow li{
		width:30px;
		height:30px;
		background-color:#f8f8f8;
		-webkit-border-radius: 4px;
		-moz-border-radius: 4px;
		border-radius: 4px;
		text-align:center;
		line-height:30px;
		margin:80px 10px;
		cursor:pointer;
	}
	.child-parrent{
		width:155px;
		float:right;
		margin-top:10px;
	}
	.child-parrent>div{
		width:100%;
		height:125px;
		border:1px solid #ddd;
		margin-bottom:10px;
	}
	.child-parrent .child-parrent-title{
		height:25px;
		padding:0 10px;
		border-bottom:1px solid #ddd;
	}
	.child-parrent .child-parrent-title span{
		margin-top:5px;
	}
	.child-parrent .child-parrent-title span:nth-child(1){
		float:left;
	}
	.child-parrent .child-parrent-title span:nth-child(2){
		float:right;
	}
	.child-parrent .allTeacher{
		padding:5px 10px;
		height:88px;
		overflow-y:auto;
	}
	.fenpeiTeacherBtn{
		width:200px;
		margin:20px auto;
	}
	.fenpeiTeacherBtn .anniu{
		display:inline-block;
		width:58px;
		height:27px;
		-webkit-border-radius: 4px;
		-moz-border-radius: 4px;
		border-radius: 4px;
		text-align:center;
		line-height:27px;
		background-color:#428bca;
		color:#fff;
		font-size:14px;
	}
	.fenpeiTeacherBtn span{
		margin-left:30px;
	}

	.select{
		color:#fff;
		background-color:#428bca;
	}
	.allTeacher span{
		display:inline-block;
		width:80px;
	}
	.allTeacher img{
		vertical-align: bottom;
		display:none;
	}
	.allTeacher div:hover img{
		display:inline-block;
	}
	.list-items1{
		display:none;
	}
	.list-items2{
		display:none;
	}


/*
	.vertical-tab {
		width: 8%;
		height: 100%;
		float: left;
		 overflow: hidden; 
	}*/

	.vertical-tab > li {
		text-align: center;
	}

	/*  	.vertical-tab > li > a {
            border: solid #ccc;
            border-width: 1px 1px 1px 1px;
            background-color: #ffffff;
             border-right: 1px solid #ffffff;
            border-right: 1px solid #ccc;
            z-index: 2;
        } */

	/*.vertical-tab > li.active > a, .vertical-tab > li.active > a:focus, .vertical-tab > li.active > a:hover {
		border: solid #ccc;
		border-width: 1px 1px 1px 1px;
		background-color: #ffffff;
		border-right: 1px solid #ffffff;
		z-index: 2;
	}*/

	/*.vertical-tab > li > a {
		 border-radius: 4px 4px 4px 4px; 
		border-radius: 4px 0px 0px 4px;
	}*/

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
		-moz-box-shadow:1px 1px 2px hsla(0, 0%, 0%, 0.3);
		-webkit-box-shadow:1px 1px 2px hsla(0, 0%, 0%, 0.3);
		box-shadow:1px 1px 2px hsla(0, 0%, 0%, 0.3);
	}

	.tag:before, .tag:after {
		position:absolute;
		content:"\00a0";
		width:0px;
		height:0px;
		border-width:8px 18px 8px 0;
		border-style:solid;
		border-color:transparent #CCC transparent transparent;
		top:5px;
		left:-18px;

	}

	.tag:after {
		bottom: -33px;
		border-color: #FFF transparent transparent;
	}

	.clearfix:after{
		content:"";
		height:0;
		visibility:hidden;
		display:block;
		clear:both;
	}

	input.custom-combobox-input.ui-widget.ui-widget-content.ui-state-default.ui-corner-left.ui-autocomplete-input.valid{
		width: 100%;
	}
	input.custom-combobox-input.ui-widget.ui-widget-content.ui-state-default.ui-corner-left.ui-autocomplete-input{
		width: 100%;
	}

</style>
<script type="text/javascript">
  try {
    var scripts = [ null, null ];
    $('.page-content-area').ace_ajax('loadScripts', scripts,
            function() {
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
  当前位置：云课堂管理 <small> <i class="ace-icon fa fa-angle-double-right"></i>
</small>
  <span> 课程专题管理 </span>
</div>

<div style="height: 100%;" class="clearfix">
	
	<!-- Tab panes -->
	<div class="tab-content vertical-tab-content">
		<!-- Nav tabs -->
	<ul class="nav nav-tab vertical-tab" role="tablist" id="vtab">
		<li role="presentation" class="active">
			<a href="#home" aria-controls="home" class="zykgl_bx" title="1"  role="tab"
			   data-toggle="tab" style="padding-left: 0px;padding-right: 0px;">推荐课程专题</a>
		</li>
		<li role="presentation">
			<a href="#home" aria-controls="home" class="zykgl_bx" title="2" role="tab"
			   data-toggle="tab" style="padding-left: 0px;padding-right: 0px;">分类课程专题</a>
		</li>

	</ul>
		<div role="tabpanel" class="tab-pane active" id="home">
			<div class="mainrighttab tabresourse bordernone" id="courseDiv">
				<p class="col-xs-4" style="padding: 0;">
					<button class="btn btn-sm btn-success add_bx" title="新增">
						<i class="glyphicon glyphicon-plus"></i> 新增
					</button>
					<button class="btn btn-sm btn-success dele_bx" title="批量删除">
						<i class="glyphicon glyphicon-trash"></i> 批量删除
					</button>
				</p>
				<div class="row">
					<div class="col-xs-12">
						<table id="banner2Table"
							   class="table table-striped table-bordered table-hover" style="width: 100%;">
						</table>
					</div>
				</div>
			</div>
		</div>
		<%--<div role="tabpanel" class="tab-pane active" id="box_m">
			<div class="mainrighttab tabresourse bordernone" id="courseDiv_M" style="display:none">
				<p class="col-xs-4" style="padding: 0;">
					<button class="btn btn-sm btn-success add_M" title="新增课程">
						<i class="glyphicon glyphicon-plus"></i> 新增微课
					</button>
					<button class="btn btn-sm btn-success dele_M" title="批量删除">
						<i class="glyphicon glyphicon-trash"></i> 批量删除
					</button>
					<button class="btn btn-sm btn-success rec_M" title="设为推荐">
						<i class="glyphicon glyphicon-cog"></i> 设为推荐
					</button>
				</p>

				<div class="row">
					<div class="col-xs-12">
						<table id="courseTable_M"
							   class="table table-striped table-bordered table-hover">
							<colgroup>
								<col width='5%'></col>
								<col width='5%'></col>
								<col width='10%'></col>
								<col width='8%'></col>
								<col width='8%'></col>
								<col width='8%'></col>
								<col width='9%'></col>
								<col width='10%'></col>
								<col width='8%'></col>
								<col width='8%'></col>
								<col width='14%'></col>
							</colgroup>
						</table>
					</div>
				</div>
			</div>
		</div>--%>
	</div>
</div>

<!-- 增加form -->
<div id="dialogAddBanner2Div"></div>
<div id="addBanner2Dialog" class="hide">
	<form id="addBanner2-form" class="form-horizontal"  method="post" action="" style="margin-top: 15px;">
		<div class="form-group"  style="margin-top: 18px;" >
			 <label class="col-sm-3 control-label no-padding-right" for="description"><font color="red">*</font>课程专题名称: </label>
			 <div class="col-sm-6">
			 		<input type="text" name="name"  id="add_description" maxlength="50" class="col-xs-10 col-sm-12 {required:true}">
             </div>
		</div>
	    <div class="space-4"></div>
		<div class="form-group"  style="margin-top: 18px;" >
			 <label class="col-sm-3 control-label no-padding-right" for="imgPath"><font color="red">*</font>专题图标: </label>
			 <div class="col-sm-6" id="addDiv">
			 		<div class="clearfixAdd">
						<input type="file" name="imgPath_file" id="imgPath_file" class="uploadImg"/>
					</div>
					（图片尺寸上传限制：1200*386）
					<input name="icon" id="add_imgPath" value="" type="text" class="{required:true}" style="position: absolute; opacity: 0; filter:Alpha(opacity=0);">
             </div>
		</div>

		<div class="space-4"></div>
		<div class="form-group"  style="margin-top: 18px;" >
			<label class="col-sm-3 control-label no-padding-right" ><font color="red">*</font>连接类型: </label>
			<div class="col-sm-6">
				<select name="linkType" id="linkType" value="" class="clearfix col-xs-10 col-sm-12 {required:true}" >
					<!--  连接类型：1：活动页、2：专题页、3：课程:4：主播:5：课程列表（带筛选条件） -->
					<option value="1">活动页</option>
					<option value="2">专题页</option>
					<option value="3">课程</option>
					<option value="4">主播</option>
					<option value="5">课程列表</option>
				</select>
			</div>
		</div>
		<div class="space-4"></div>
		<div class="form-group"  style="margin-top: 18px;" >
			<label class="col-sm-3 control-label no-padding-right" ><font color="red">*</font>链接地址: </label>
			<div class="col-sm-6">
				<input type="text" name="linkCondition"  id="add_url" class="col-xs-10 col-sm-12 {required:true,maxlength:100}">
			</div>
		</div>
		<input type="hidden" name="type" id="addProjectType" >
	</form>
</div>

<!-- 修改form -->
<div id="dialogUpdateBanner2Div"></div>
<div id="updateBanner2Dialog" class="hide">
	<form id="updateBanner2-form" class="form-horizontal"  method="post" action="" style="margin-top: 15px;">
		<input type="hidden" name="id" id="update_id">
		<div class="form-group"  style="margin-top: 18px;" >
			 <label class="col-sm-3 control-label no-padding-right" for="description"><font color="red">*</font>banner名称: </label>
			 <div class="col-sm-6">
			 		<input type="text" name="name"  id="update_description" maxlength="50" class="col-xs-10 col-sm-12 {required:true}">
             </div>
		</div>
	    <div class="space-4"></div>
		<div class="form-group"  style="margin-top: 18px;" >
			 <label class="col-sm-3 control-label no-padding-right" for="imgPath"><font color="red">*</font>banner图片: </label>
			 <div class="col-sm-6">
			 		<div class="clearfixUpdate">
						<input type="file" name="update_imgPath_file" id="update_imgPath_file" class="uploadImg"/>
					</div>
					（图片尺寸上传限制：1200*386）
					<input name="icon" id="update_imgPath" value="" type="text" class="{required:true}" style="position: absolute; opacity: 0; filter:Alpha(opacity=0);">
             </div>
		</div>
		<div class="space-4"></div>
		<div class="form-group"  style="margin-top: 18px;" >
			<label class="col-sm-3 control-label no-padding-right" ><font color="red">*</font>连接类型: </label>
			<div class="col-sm-6">
				<select name="linkType" id="update_linkType" value="" class="clearfix col-xs-10 col-sm-12 {required:true}" >
					<!--  连接类型：1：活动页、2：专题页、3：课程:4：主播:5：课程列表（带筛选条件） -->
					<option value="1">活动页</option>
					<option value="2">专题页</option>
					<option value="3">课程</option>
					<option value="4">主播</option>
					<option value="5">课程列表</option>
				</select>
			</div>
		</div>
		<div class="space-4"></div>
		<div class="form-group"  style="margin-top: 18px;" >
			<label class="col-sm-3 control-label no-padding-right" ><font color="red">*</font>链接地址: </label>
			<div class="col-sm-6">
				<input type="text" name="linkCondition"  id="update_linkCondition" class="col-xs-10 col-sm-12 {required:true,maxlength:100}">
			</div>
		</div>
		<input type="hidden" name="type" id="updateProjectType" >
	</form>
</div>

<!-- 查看 -->
<div id="previewCloudClasMenuDialogDiv"></div>
<div id="previewCloudClasMenuDialog" class="hide" >
    <form class="form-horizontal"  method="post" action="" style="width:500px;margin-top: 15px;" >
        <div class="form-group row">
            <label class="col-sm-5 control-label no-padding-right"><i class="text-danger">*</i><span style="font-weight: bold;"> 课程类别名称: </span></label>
            <div class="col-sm-7">
                <p id="show_menuName" class="paddingtop7px padding7"></p>
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-5 control-label no-padding-right"><i class="text-danger">*</i><span style="font-weight: bold;"> 课程类别名称: </span></label>
            <div class="col-sm-7">
                <p id="show_menuName" class="paddingtop7px padding7"></p>
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-5 control-label no-padding-right"><span style="font-weight: bold;"> 创建人:</span> </label>
            <div class="col-sm-7">
                <p id="show_createPerson" class="paddingtop7px padding7"></p>
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-5 control-label no-padding-right"> <span style="font-weight: bold;">创建日期: </span></label>
            <div class="col-sm-7">
                <p id="show_createTime" class="paddingtop7px padding7"></p>
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-5 control-label no-padding-right"> <span style="font-weight: bold;">状态:</span> </label>
            <div class="col-sm-7">
                <p id="show_status" class="paddingtop7px padding7"></p>
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-5 control-label no-padding-right"><i class="text-danger"></i><span style="font-weight: bold;"> 备注:</span> </label>
            <div class="col-sm-7">
                <p id="show_remark" class="paddingtop7px padding7"></p>
            </div>
        </div>
    </form>
</div>


<script type="text/javascript" src="/js/cloudClass/projectType.js?v=ipandatcm_1.3"></script>