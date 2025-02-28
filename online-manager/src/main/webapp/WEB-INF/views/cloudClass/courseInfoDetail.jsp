<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<link href="/css/jquery-ui-timepicker-addon.css" type="text/css" />
<link href="/js/layer/skin/layer.css" type="text/css" />	
<style>
	#text-myset p{
		word-wrap : break-word ;
	}
	.lable-myset-title{
		width: 130px;
		font-size: 16px;
	}
	.z{
		float: left;
	}
	.my-set-content{
		width: 150px;
		text-align: left !important;
		font-size: 16px;
	}
	.author-text p{
		font-size: 16px !important;
		text-align: left !important;
	}
	.author-text span{
		font-size: 16px !important;
		text-align: left !important;
	}
	.author-text img{
		display: block;
	}
</style>
<script type="text/javascript" src="js/cloudClass/courseApplyDetail.js"></script>
<script type="text/javascript">
	try {
		var scripts = [ null, null ];
		$('.page-content-area').ace_ajax('loadScripts', scripts,
				function() {
				});
	} catch (e) {
		
	}

	var courseForm = "${courseForm}";
</script>
<script src="/js/layer/layer.js"></script>
<script src="/js/jquery-ui-timepicker-zh-CN.js" type="text/javascript"></script>
<div class="page-header">
  当前位置：云课堂管理<small> <i class="ace-icon fa fa-angle-double-right"></i>
			</small> 
			课程管理<small> <i class="ace-icon fa fa-angle-double-right"></i>
		</small>
  <span>课程详情 </span>
</div>
<!-- 修改 form -->
<div id="dialogArticleDiv"></div>
<div id="addArticleDialog" >

	<form id="addArticle-form" class="form-horizontal"  method="post" action="" >
		<div class="form-group" style="margin-top:6px;">
			<label class="control-label no-padding-right lable-myset-title z">封面：</label>
			<div class="" >
				<img src="${course.smallImgPath}"  height="450" width="800" alt="课程封面" />
			</div>
		</div>
		<c:choose>
			<c:when test="${!course.collection && course.type==2}">
				<div class="form-group" style="margin-top:6px;">
					<label class=" control-label no-padding-right lable-myset-title  z">视频：</label>
					<div class="z" >
						${course.playCode}
					</div>
				</div>
			</c:when>
		</c:choose>

		<div class="form-group" style="margin-top:30px; padding-top: 18px; border-top: 1px solid #ededed;">
			<label class=" control-label no-padding-right lable-myset-title z">主标题：</label>
			<div class="" >
			
					<label class=" control-label no-padding-right my-set-content z">${course.gradeName}</label>
				
			</div>

			<label class="control-label no-padding-right lable-myset-title z">副标题：</label>
			<div class="" >
			
					<label class=" control-label no-padding-right my-set-content z">${course.subtitle}</label>
				
			</div>

			<label class="control-label no-padding-right lable-myset-title z">课程类型：</label>
			<div class="" >
			
					<c:choose>
						<c:when test="${course.type== '3'}">
							<label class="control-label no-padding-right my-set-content z">线下课</label>
						</c:when>
						<c:when test="${course.type== '1'}">
							<label class="control-label no-padding-right my-set-content z">直播</label>
						</c:when>
						<c:otherwise>
							<label class="control-label no-padding-right my-set-content z">点播</label>
						</c:otherwise>
					</c:choose>				
			</div>
			
			<label class="control-label no-padding-right lable-myset-title z">课程分类：</label>
			<div class="" >

					<label class="control-label no-padding-right my-set-content z">${course.courseMenu}</label>

			</div>
		</div>
		<div class="clearfix"></div>
		<div class="form-group" style="margin-top:6px;">
			<label class="control-label no-padding-right lable-myset-title z">主讲人：</label>
			<div class="" >
					<label class="control-label no-padding-right my-set-content z">${course.lecturer}</label>
			</div>
<c:choose>
	<c:when test="${course.type== '2'}">
			<label class="control-label no-padding-right lable-myset-title z">多媒体类型：</label>
			<div class="" >

					<c:choose>
						<c:when test="${course.multimediaType== '1'}">
							<label class="control-label no-padding-right my-set-content z">视频</label>
						</c:when>
						<c:when test="${course.multimediaType== '2'}">
							<label class="control-label no-padding-right my-set-content z">音频</label>
						</c:when>
					</c:choose>

			</div>
	</c:when>
</c:choose>
			<label class="control-label no-padding-right lable-myset-title z">课程单价：</label>
			<div class="" >
				
					<label class="control-label no-padding-right my-set-content z">${course.currentPrice}熊猫币</label>
			
			</div>
		</div>
		<div class="form-group" style="margin-top:6px;">
			<c:choose>
				<c:when test="${!course.collection}">
					<label class="control-label no-padding-right lable-myset-title z">课程时长：</label>
					<div class="" >
					
							<label class="control-label no-padding-right my-set-content z">${course.courseLength}分钟</label>
						
					</div>
				</c:when>
			</c:choose>
			<c:choose>
				<c:when test="${course.type!= '2'}">
					<label class="control-label no-padding-right lable-myset-title z">课程开始时间：</label>
					<div class="" >

							<label style="width: 300px;" class="control-label no-padding-right my-set-content z"><fmt:formatDate value="${course.startTime}" pattern="yyyy-MM-dd HH:mm:ss"/></label>

					</div>
				</c:when>
			</c:choose>
			<c:choose>
				<c:when test="${course.type== '3'}">
					<label class="control-label no-padding-right lable-myset-title z">课程结束时间：</label>
					<div class="" >

							<label  style="width: 300px;" class="control-label no-padding-right my-set-content z"><fmt:formatDate value="${course.endTime}" pattern="yyyy-MM-dd HH:mm:ss"/></label>

					</div>
				</c:when>
			</c:choose>
			<c:choose>
				<c:when test="${course.collection}">
					<label class="control-label no-padding-right z">总集数：</label>
					<div class="" >
						<div class="clearfix" style="width: 240px;">
							<label class="control-label no-padding-right">${course.courseNumber}</label>
						</div>
					</div>
				</c:when>

			</c:choose>

		</div>



		<div class="form-group " style="margin-top:30px;margin-bottom:20px;padding-top: 18px; border-top: 1px solid #ededed;">
			<label class="col-sm-1 control-label no-padding-right lable-myset-title z" >主播介绍：</label>
			<div class="col-lg-10 author-text" style="padding-left: 0;">
					<p>${course.lecturerDescription}</p>
			</div>
		</div>

		<div class="form-group" style="margin-top:18px;">
			<label class="col-sm-1 control-label no-padding-right lable-myset-title">课程简介：</label>
			<div class="col-lg-10 author-text" style="padding-left: 0;">

					<p>${course.courseDetail}</p>

			</div>
		</div>
<c:choose>
	<c:when test="${course.collection}">
		<div class="form-group" style="margin-top:18px;">
			<label class="col-sm-1 control-label no-padding-right">课程大纲：</label>
			<div class="col-sm-1" >
				<div class="clearfix" style="width: 1000px;">
					<p >${course.courseOutline}</p>
				</div>
			</div>
		</div>
	</c:when>
</c:choose>

	
	</form>
	<c:choose>
		<c:when test="${course.collection}">
			<table class="table table-bordered">
				<caption>包含课程</caption>
				<thead>
				<tr>
					<th>课程名称</th>
					<th>主播</th>
					<th>价格</th>
				</tr>
				</thead>
				<tbody>
				<c:forEach items="${course.courseInfoList}" var="cai" varStatus="vs">
					<tr>
						<td align = "center"><a id="aImg0" target="_blank" href='/home#cloudclass/course/courseInfoDetail?id=${cai.id}' style="color: blue">${cai.gradeName}</a></td>
						<td align = "center">${cai.lecturer}</td>
						<td align = "center">${cai.currentPrice}</td>
					</tr>
				</c:forEach>
				</tbody>
			</table>
		</c:when>
	</c:choose>

</div>

