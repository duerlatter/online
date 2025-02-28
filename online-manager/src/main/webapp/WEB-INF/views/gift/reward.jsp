<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%><%@ include file="../common/jstl_taglib.jsp"%>
<link href="/css/jquery-ui-timepicker-addon.css" type="text/css" />	
<link href="/js/layer/skin/layer.css" type="text/css" />	
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
    
/*  	.vertical-tab > li > a {
        border: solid #ccc;
        border-width: 1px 1px 1px 1px;
        background-color: #ffffff; 
         border-right: 1px solid #ffffff; 
        border-right: 1px solid #ccc;
        z-index: 2;
    } */
    
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
        width: 92%;
        padding: 5px;
        margin-left: -1px;
        margin-bottom: 2px;
        border-radius: 0px 4px 4px 4px;
        border: solid 1px #ccc;
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
		$('.page-content-area').ace_ajax('loadScripts', scripts, function() {
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
	当前位置：云课堂管理<small> <i class="ace-icon fa fa-angle-double-right"></i>
	</small> <span> 打赏管理 </span>
</div>

<div style="height: 100%;" class="clearfix">
 
    <!-- Tab panes -->
    <div class="tab-content vertical-tab-content">
        <div role="tabpanel" class="tab-pane active" id="home">
        	<div class="mainrighttab tabresourse bordernone" id="courseDiv">
				<p class="col-xs-4" style="padding: 0;">
					<button class="btn btn-sm btn-success fencheng_bx" title="新增">
						<i class="glyphicon glyphicon-plus"></i> 分成设置
					</button>
				</p>
			
			<div class="searchDivClass" id="searchDiv">
			        <div class="profile-info-row" >
			
			            <table frame=void >
			                <tr>
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
			
			
				<div class="row">
					<div class="col-xs-12">
						<table id="courseTable"
							class="table table-striped table-bordered table-hover">
						</table>
					</div>
				</div>
			</div>
        </div>
        
	<!-- 增加form -->
	<div id="dialogAddCourseDiv"></div>
	<div id="addCourseDialog" class="hide">
		<form id="addCourse-form" class="form-horizontal"  method="post" action="" style="margin-top: 15px;">
	        
	        <div class="form-group" id="edit-originalCost" style="margin-top: 15px;">
				 <label class="col-sm-3 control-label no-padding-right" for="courseName"><font color="red">*</font>金额: </label>
				 <div class="col-sm-6">
				 	<input type="text" name="price" maxlength="9"  class="col-xs-10 col-sm-12 {required:true,number:true,range:[0,99999]} placeholder="0为自由输入金额">
	             </div>
			</div>
	             <label class="col-sm-1 control-label no-padding-right" for="courseName">0为自由输入金额</label>
			<div class="form-group" style="margin-top: 18px;" >
				 <label class="col-sm-3 control-label no-padding-right" for="directId"><font color="red">*</font>平台分成: </label>
				 <div class="col-sm-6" >
				 	<input type="text" name="brokerage" id="brokerage" maxlength="100" class="col-xs-10 col-sm-12 {required:true,number:true,range:[0,99999]}">
	             </div>
	             <label class="col-sm-1 control-label no-padding-right" for="courseName">%</label>
			</div>
	
		</form>
	</div>
	
	<!-- 修改form -->
	<div id="dialogEditCourseDiv"></div>
	<div id="EditCourseDialog" class="hide">
		<form class="form-horizontal" id="updateCourse-form" method="post" action="" style="margin-top: 15px;">
			<input type="hidden" id="editCourse_id"  name="id" class="col-xs-10 col-sm-8 {required:true}">
			        
	        <div class="form-group" id="edit-originalCost" style="margin-top: 15px;">
				 <label class="col-sm-3 control-label no-padding-right" for="courseName"><font color="red">*</font>金额: </label>
				 <div class="col-sm-6">
				 	<input type="text" name="price" id="price_edit"  maxlength="9"  class="col-xs-10 col-sm-12 {required:true,number:true,range:[0,99999]}">
	             </div>
			</div>
	             <label style="margin-left: 45%;" for="courseName">0为自由输入金额</label>
	         
			<div class="form-group" style="margin-top: 18px;" >
				 <label class="col-sm-3 control-label no-padding-right" for="directId"><font color="red">*</font>平台分成: </label>
				 <div class="col-sm-6" >
				 	<input type="text" name="brokerage" id="brokerage_edit" maxlength="100" class="col-xs-10 col-sm-12 {required:true,number:true,range:[0,99999]}">
	             </div>
	             <label class="col-sm-1 control-label no-padding-right" for="courseName">%</label>
			</div>
		</form>
	</div>
	
	<!-- 设置平台分成form -->
	<div id="dialogEditFcDiv"></div>
	<div id="FcDialog" class="hide">
		<form class="form-horizontal" id="updateBrokerage-form" method="post" action="" style="margin-top: 15px;">
			<input type="hidden" id="ids"  name="ids" class="col-xs-10 col-sm-8 {required:true}">
			<div class="form-group"  style="margin-top: 18px;" >
				 <label class="col-sm-3 control-label no-padding-right" for="courseName"><font color="red">*</font>分成比例: </label>
				 <div class="col-sm-6">
				 		<input type="text" name="brokerage" id="brokerage" class="col-xs-10 col-sm-12 {required:true,number:true,range:[0.01,100.00]}">
	             </div>
				 <label class="col-sm-1 control-label no-padding-right" for="courseName">%</label>
			</div>
			<div class="form-group"  style="margin-top: 18px;" >
				 <label class=" control-label no-padding-right" for="courseName">根据用户收到礼物价值，平台将从中征收的分成金额比例 </label>
				
			</div>
			
		</form>
	</div>
</div>

<script type="text/javascript">
			var availableTags = [
			                 	"ActionScript",
			                 	"AppleScript",
			                 	"Asp",
			                 	"BASIC",
			                 	"C",
			                 	"C++"
			                 ];
            $( "#autocomplete" ).autocomplete({
            	source: availableTags
            });			
			
</script>
<script type="text/javascript" src="/js/gift/reward.js?v=ipandatcm_1.3"></script>