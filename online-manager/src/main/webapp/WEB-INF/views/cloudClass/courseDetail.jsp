<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%><%@ include file="../common/jstl_taglib.jsp"%>
<link href="/css/jquery-ui-timepicker-addon.css" type="text/css" />
<link href="/js/layer/skin/layer.css" type="text/css" />
<style>
.btnGroup a:hover{
	text-decoration: none;
}
.table-school {
  margin-right: 30px;
  overflow: inherit;
}
.table-school .table-school-title {
  overflow: hidden;
}
.table-school .table-school-title .school-nav {
  font-size: 22px;
  color: #333;
}
.table-school .table-school-title .school-nav span {
  font-size: 14px;
  color: #666;
}
.table-school .table-school-title .school-nav-text {
  font-size: 14px;
  color: #666;
  line-height: 26px;
  margin-top: 15px;
  margin-bottom: 0;
}
.table-school .table-school-body .school-chapter {
  margin-top: 20px;
  margin-bottom: 0;
}
.table-school .table-school-body .school-chapter .bcg {
  padding: 4px;
  background-color: #2cb82c;
  font-size: 0;
  position: relative;
  top: -7px;
}
.table-school .table-school-body .school-chapter .school-chapter-text {
  margin-left: 8px;
  color: #333;
  font-size: 18px!important;
}
.table-school .table-school-body .school-chapter .school-chapter-text span {
  margin-right: 12px;
}
.table-school .table-school-body .details-div {
  overflow: hidden;
}
.table-school .table-school-body .details-div .details-div-title {
  width: 100%;
  background-color: #f8f8f8;
  padding: 10px 16px;
  margin: 20px 0 0;
  border: 1px solid #eee;
  border-bottom: 0;
  font-size: 16px;
  color: #333;
}
.table-school .table-school-body .details-div .details-div-body {
  overflow: hidden;
  border-left: 1px solid #eee;
  border-bottom: 1px solid #eee;
}
.table-school .table-school-body .details-div .details-div-body p {
  float: left;
  width: 407.5px;
  border-right: 1px solid #eee;
  border-top: 1px solid #eee;
  padding: 10px 8px;
  margin: 0;
  font-size: 14px;
  color: #666;
  height: 41px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}



.questionName {
  color: #333;
  font-size: 16px;
  margin-bottom: 12px;
}
.problem-answers {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
  line-height: 22px;
}
.problem-answers span {
  color: #2cb82c !important;
}
.span4 { background-color: #EEEEEE; }
.span8 { background-color: #EEEEEE; }
</style>
<script type="text/javascript">
	try {
		var scripts = [ null, null ];
		$('.page-content-area').ace_ajax('loadScripts', scripts, function() {
		});
	} catch (e) {
	}
	var weburl = '${weburl}';
</script>
<script src="/js/layer/layer.js"></script>
<script src="/js/jquery-ui-timepicker-zh-CN.js"
	type="text/javascript"></script>
<div class="page-header row">
		<div class="col-xs-8" style="padding-left: 0px;padding-right: 0px;">
			当前位置：云课堂管理 
			<small> <i class="ace-icon fa fa-angle-double-right"></i></small>
			<span> 课程管理 </span> 
			<small> <i class="ace-icon fa fa-angle-double-right"></i></small> 
			<span id="titleXQ"> 课程详情 </span>
		</div>
</div>
<ul class="nav nav-tabs" role="tablist">
  <%--<li role="presentation"><a href="#home" role="tab" data-toggle="tab">课程介绍</a></li>--%>
  <li role="presentation" class="active"><a href="#profile" role="tab" data-toggle="tab">课程详情</a></li>
  <li role="presentation"><a href="#messages" role="tab" data-toggle="tab">推荐课程</a></li>
</ul>
<!-- Tab panes -->
<div class="tab-content" style="padding-left: 0;">
  <div role="tabpanel" class="tab-pane active" id="profile">
		<!-- 增加form -->
		<div id="detailDiv">
			<form class="form-horizontal" id="courseDetailForm" method="post" action="">
				<input type="hidden" name="courseId" id="courseId" value="${param.courseId}">
				<input type="hidden" name="weburl" id="weburl" value="${weburl}">
				<input type="hidden" name="page" id="page" value="${param.page}">
				<div class="space-4"></div>
				<div class="form-group " style="margin-top:50px;margin-bottom:60px">
					<label class="col-sm-1 control-label no-padding-right" for="courseDetail_content"><font color="red">*</font>主播详情:</label>
					<div class="col-lg-10 " style="height:500px">
						<div class="clearfix">
							<script id="lecturerDescription_content" type="text/plain" style="width:100%;height:100%;"></script>
							<input type="hidden" name="lecturerDescription"  id="lecturerDescription" class="col-xs-10 col-sm-12 {required:true,minlength:1}">
						</div>
					</div>
				</div>
                <div class="space-4"></div>
				<div class="form-group " style="margin-top:50px;margin-bottom:60px">
                    <label class="col-sm-1 control-label no-padding-right" for="courseDetail_content"><font color="red">*</font>课程详情:</label>
                    <div class="col-lg-10 " style="height:500px">
                        <div class="clearfix">
                            <script id="courseDetail_content" type="text/plain" style="width:100%;height:100%;"></script>
							<input type="hidden" name="courseDetail"  id="courseDetail" class="col-xs-10 col-sm-12 {required:true,minlength:1}">
						</div>
					</div>
				</div>
				<div class="space-4"></div>
				<div class="form-group " style="margin-top:50px;margin-bottom:60px">
					<label class="col-sm-1 control-label no-padding-right" for="courseOutline_content"><font color="red">*</font>常见问题:</label>
					<div class="col-lg-10 " style="height:500px">
							<div class="clearfix">
								<script id="commonProblem_content" type="text/plain" style="width:100%;height:100%;"></script>
								<input type="hidden" name="commonProblem"  id="commonProblem" class="col-xs-10 col-sm-12 {required:true,minlength:1}">
							</div>
						</div>
				</div>
			</form>
		</div>
		<div style="width:100%; text-align: center;">
			&nbsp;&nbsp;&nbsp;&nbsp;
			<button class="btn btn-sm btn-success add_bx" id="okbt">
				<i class="glyphicon glyphicon-ok"></i> 确定
			</button>
		</div>
	</div>
  <div role="tabpanel" class="tab-pane" id="messages">
		<div class="mainrighttab tabresourse bordernone" id="courseRecDiv">
			<p class="col-xs-4" >
				<button class="btn btn-sm btn-success" title="新增推荐课程" onclick="addRecCourse()" style="margin-left: -10px">
					<i class="glyphicon glyphicon-plus"></i> 新增推荐课程
				</button>
			</p>
			<div class="searchDivClass" id="searchDivTj">
				<div class="profile-info-value searchTr">
					 <input type="hidden" class="propertyValue1" id="search_showCourseId" value="${param.courseId}">
			         <input type="hidden" value="search_showCourseId" class="propertyName"/>
			         <input type="hidden" value="8" class="tempMatchType"/>
					 <input type="hidden" value="String" class="tempType"/>
		         </div>
			</div>
			<div class="row">
				<div class="col-xs-12">
					<table id="courseRecTable"
						class="table table-striped table-bordered table-hover">
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- 预览 -->
<div id="dialogShowCourseDetailDiv"></div>
<div id="showShowCourseDialog" class="hide">
<div id="ylContent"></div>
</div>

<!-- 增加form -->
<div id="dialogDesDiv"></div>
<div id="desDialog" class="hide">
  <form action="" method="post" class="form-horizontal" role="form" id="addDes-form" onkeydown="if(event.keyCode==13){return false;}">
  	  <input type="hidden" name="desCourseId" id="desCourseId" value="${param.courseId}">
      <div class="space-4"></div>
      <div class="form-group" style="margin-top: 18px;">
          <label class="col-sm-3 control-label no-padding-right"><i class="text-danger">*</i> 故事标题: </label>
          <div class="col-sm-9">
              <input type="text" name="courseTitle" id="courseTitle" maxlength="8" class="propertyValue1 col-xs-8 {required:true}">
          </div>
      </div>
  </form>
</div>
<!-- 修改form -->
<div id="dialogDesDivUpdate"></div>
<div id="desDialogUpdate" class="hide">
  <form action="" method="post" class="form-horizontal" role="form" id="updateDes-form" onkeydown="if(event.keyCode==13){return false;}">
  	  <input type="hidden" name="id" id="update_desId">
  	  <input type="hidden" name="status" id="update_status">
  	  <input type="hidden" name="courseContent" id="update_courseContent">
  	  <input type="hidden" name="courseContentPreview" id="update_courseContentPreview">
      <div class="space-4"></div>
      <div class="form-group" style="margin-top: 18px;">
          <label class="col-sm-3 control-label no-padding-right"><i class="text-danger">*</i> 故事标题: </label>
          <div class="col-sm-9">
              <input type="text" name="courseTitle" id="update_courseTitle" maxlength="8" class="propertyValue1 col-xs-8 {required:true}">
          </div>
      </div>
  </form>
</div>

<!-- 课程列表 -->
<div id="dialogCourseDiv"></div>
<div id="courseDialog" class="hide">
  	<div class="mainrighttab tabresourse bordernone" id="courseDiv">
	<div class="searchDivClass" id="searchDivKclb">
	        <div class="profile-info-row" style="float: left">
	
	            <table frame=void >
	                <tr>
	                    <td>
	                       <div class="profile-info-value searchTr">
	                            <select name="menuName" id="search_menu" value="" class="propertyValue1"  style="width: 150px;">
				               		<option value="">学科</option>
				               		<c:forEach var="menus" items="${menuVo}">
				                        <option value="${menus.id}">${menus.name}</option>
				                    </c:forEach>
				               </select>
	                            <input type="hidden" value="search_menu" class="propertyName"/>
	                        </div>
	                    </td>
	                    <td>
	                       <div class="profile-info-value searchTr">
	                            <select name="courseTypeId" id="search_scoreType" value="" class="propertyValue1" >
				               		<option value="">课程类别</option>
				               		<%-- <c:forEach var="scoreTypes" items="${scoreTypeVo}">
				                        <option value="${scoreTypes.id}">${scoreTypes.name}</option>
				                    </c:forEach> --%>
				               </select>
	                            <input type="hidden" value="search_scoreType" class="propertyName"/>
	                        </div>
	                    </td>
	                    <td>
	                       <div class="profile-info-value searchTr">
	                            <select name="search_courseType" id="search_courseType" value="" class="propertyValue1" >
				               		<option value="">授课方式</option>
				               		<c:forEach var="teachMethods" items="${teachMethodVo}">
				                        <option value="${teachMethods.id}">${teachMethods.name}</option>
				                    </c:forEach>
				               </select>
	                            <input type="hidden" value="search_courseType" class="propertyName"/>
	                        </div>
	                    </td>
<!-- 	                    <td>
	                       <div class="profile-info-value searchTr">
	                            <select name="search_isRecommend" id="search_isRecommend" value="" class="propertyValue1" >
				               		<option value="">是否已推荐</option>
				                        <option value="1">已推荐</option>
				                        <option value="0">未推荐</option>
				               </select>
	                            <input type="hidden" value="search_isRecommend" class="propertyName"/>
	                        </div>
	                    </td>
 -->	                    <td>
	                        <button id="searchBtn" type="button" class="btn btn-sm  btn-primary "
	                                onclick="search();">
	                            <i class="ace-icon fa fa-search icon-on-right bigger-110"></i>
	                        </button>
	                        <div class="profile-info-value searchTr">
		                            <input type="hidden" value="1" id="search_status" name="search_status" class="propertyValue1"/>
		                            <input type="hidden" value="search_status" class="propertyName"/>
		                        </div>
	 							<div class="profile-info-value searchTr">
		                            <input type="hidden" value="${param.courseId}" id="search_courseId" name="search_courseId" class="propertyValue1"/>
		                            <input type="hidden" value="search_courseId" class="propertyName"/>
		                        </div>
	                    </td>
	                </tr>
	            </table>
	        </div>
	    </div>
	
	
		<div class="row">
			<div class="col-xs-8">
				<table id="courseTable"
					class="table table-striped table-bordered table-hover">
				</table>
			</div>
			<div class="col-xs-1" style="padding: 0px;text-align: center;width: 4%;margin-top: 200px">
				 <button type="button" class="btn btn-xs  btn-primary " id="ydRecCourse">
                    →
                 </button>
			</div>
			<div class="col-xs-3">
				<form action="" method="post" role="form" id="addRecCourse-form">
					<div class="panel panel-default" style="min-height: 388px"> 
						<input type="hidden" name="showCourseId" value="${param.courseId}">
					    <div class="panel-body" style="padding:5px;border-bottom: 1px solid #DDDDDD;">
				        	<h4>已选择课程</h4>
					    </div>
					    <ul class="list-group" id="yxzkcRec" style="margin: 0px;">
					    </ul>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript" charset="utf-8" src="/ueditor/ueditor.config.js"></script>
<script type="text/javascript" charset="utf-8" src="/ueditor/ueditor.all.min.js"> </script>
<!--建议手动加在语言，避免在ie下有时因为加载语言失败导致编辑器加载失败-->
<!--这里加载的语言文件会覆盖你在配置项目里添加的语言类型，比如你在配置项目里配置的是英文，这里加载的中文，那最后就是中文-->
<script type="text/javascript" charset="utf-8" src="/ueditor/lang/zh-cn/zh-cn.js"></script>

<script type="text/javascript" src="/js/cloudClass/courseDetail.js?v=ipandatcm_1.3"></script>