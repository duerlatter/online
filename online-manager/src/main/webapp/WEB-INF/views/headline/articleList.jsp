<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<link href="/css/jquery-ui-timepicker-addon.css" type="text/css" />
<link href="/js/layer/skin/layer.css" type="text/css" />	
<script type="text/javascript">
  try {
    var scripts = [ null, null ];
    $('.page-content-area').ace_ajax('loadScripts', scripts,
            function() {
            });
  } catch (e) {
  }
  var weburl = '${weburl}';
</script>
<script type="text/javascript" src="/js/headline/articleList.js?v=ipandatcm_1.3"></script>
<script src="/js/layer/layer.js"></script>
<script src="/js/jquery-ui-timepicker-zh-CN.js" type="text/javascript"></script>
<div class="page-header">
  当前位置：头条管理<small> <i class="ace-icon fa fa-angle-double-right"></i>
</small>
  <span>文章管理 </span>
</div>

<div class="mainrighttab tabresourse bordernone">
	<p class="col-xs-3" style="padding: 0;width:20%">
		<button class="btn btn-sm btn-success add_bx" title="新增文章">
			<i class="glyphicon glyphicon-plus"></i> 新增文章
		</button>
		<button class="btn btn-sm btn-success dele_bx" title="批量删除">
			<i class="glyphicon glyphicon-trash"></i> 批量删除
		</button>
	</p>
	
	<!-- 条件查询 -->
	<div class="searchDivClass" id="searchDiv">
        <div class="profile-info-row" >
        	 <table frame=void >
                <tr>
                   <td>
	                   <div class="profile-info-value searchTr">
		                    <input type="text" placeholder = "关键词" class="propertyValue1" id="search_title" style="width: 150px;">
					        <input type="hidden" value="search_title" class="propertyName"/>
	                  	</div>
                   </td>
                   <td>
	              		<div class="profile-info-value searchTr">
	              			<select name="menuName" id="search_type" value="" class="propertyValue1"  >
			               		<option value="">分类</option>
			               		<c:forEach var="type" items="${articleTypes}">
			                        <option value="${type.id}">${type.name}</option>
			                    </c:forEach>
			               </select>
                            <input type="hidden" value="search_type" class="propertyName"/>
	              		</div>
                   </td>
                    <td>
                        <div class="profile-info-value searchTr">
                            <select id="statusSearch" name="status" class="propertyValue1">
                                <option  value="" >状态</option>
                                <option  value="0" >已禁用</option>
                                <option  value="1" >已启用</option>
                            </select>
                        	<input type="hidden" value="statusSearch" class="propertyName"/>
                        </div>
                    </td>
                   <td>
                    <div class="profile-info-value searchTr">
                        <input type="text" class="datetime-picker propertyValue1"  id="startTime" name="startTime" placeholder = "开始日期" style="width:130px"/>
                        <input type="hidden" value="startTime" class="propertyName"/>
                    </div>
                </td>
                <td>
                    <div class="profile-info-value">
                    	    至 
                    </div>
                </td>
                <td>
                    <div class="profile-info-value searchTr">
                        <input type="text" class="datetime-picker propertyValue1"  id="stopTime" name="stopTime" placeholder = "结束日期" style="width:130px"/>
                        <input type="hidden" value="stopTime" class="propertyName"/>
                    </div>
                </td>
                <td>
                    <button id="searchBtn" type="button" class="btn btn-sm  btn-primary "
                            onclick="search();">
                        <i class="ace-icon fa fa-search icon-on-right bigger-110"></i>
                    </button>
                </td>
                </tr>
             </table>        
        </div>
    </div>
    
    <!-- 文章列表 -->
    <div class="row">
		<div class="col-xs-12">
			<table id="articleTable" class="table table-striped table-bordered table-hover">
			
			</table>
		</div>
	</div>
    <!-- 查看 -->
    <div id="childMenuDialogDiv"></div>
    <div id="childMenuDialog" class="hide" >
        <form class='form-horizontal' id="childMenu-form"  method="post"  action="">
            <input type="hidden" name="id" id="parentId"/>
            <div class='form-group'>
                <div class='col-sm-3 control-label no-padding-right'><b>文章名称:</b></div>
                <div id="child_MenuName" class='col-sm-8 paddingtop7px padding7'></div>
            </div>
            <div class='form-group'>
                <div class='col-sm-3 control-label no-padding-right'><b>医师列表:</b></div>
                <div class='col-sm-8'>
                    <%--<input type="hidden" name="nouse" id="nouse" value="nouse" autofocus="autofocus">--%>
                    <table id="childMenus">

                    </table>
                </div>
            </div>
        </form>
    </div>

    <!-- 修改推荐值form -->
    <div id="dialogUpdateRecommendSortDiv"></div>
    <div id="UpdateRecommendSortDialog" class="hide">
        <form class="form-horizontal" id="UpdateRecommendSortFrom" method="post" action="" style="margin-top: 15px;">
            <input type="hidden" name="id" id="UpdateRecommendSort_id">
            <div class="form-group"  style="margin-top: 18px;" >
                <label class="col-sm-3 control-label no-padding-right" for="recommendSort"><font color="red">*</font>推荐值: </label>
                <div class="col-sm-6">
                    <input type="text" name="recommendSort"  id="recommendSort" onkeyup="value=value.replace(/[^\d]/g,'')" class="col-xs-10 col-sm-12 {required:true}">
                </div>
            </div>
            <div class="form-group"  style="margin-top: 18px;" >
                <label class="col-sm-3 control-label no-padding-right" for="recommendTime"><font color="red">*</font>推荐时效: </label>
                <div class="col-sm-6 searchTr">
                    <input type="text" class="datetime-picker propertyValue1 {required:true}"  id="recommendTime" name="recommendTime" placeholder = "推荐时效" style="width:150px"/>
                </div>
            </div>
        </form>
    </div>
</div>
