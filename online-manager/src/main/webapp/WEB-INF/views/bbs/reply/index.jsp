<%@ page language="java" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<link href="/css/jquery-ui-timepicker-addon.css" type="text/css"/>
<link href="/js/layer/skin/layer.css" type="text/css"/>
<script type="text/javascript">
    try {
        var scripts = [null, null];
        $('.page-content-area').ace_ajax('loadScripts', scripts,
            function () {
            });
    } catch (e) {
    }
</script>
<script src="/js/layer/layer.js"></script>
<script src="/js/jquery-ui-timepicker-zh-CN.js" type="text/javascript"></script>
<div class="page-header">
    当前位置：BBS管理
    <small><i class="ace-icon fa fa-angle-double-right"></i>
    </small>
    <span>回复管理 </span>
</div>

<div class="mainrighttab tabresourse bordernone">
    <button class="btn btn-sm btn-danger delete_bx" title="删除/取消">
        <i class="glyphicon glyphicon-trash"></i> 删除/取消
    </button>

    <!-- 条件查询 -->
    <div class="searchDivClass" id="searchDiv">
        <div class="profile-info-row">
            <table frame=void>
                <tr>
                    <td>
                        <div class="profile-info-value searchTr">
                            <input type="text" placeholder="编号" class="propertyValue1" id="id"
                                   style="width: 150px;">
                            <input type="hidden" value="id" class="propertyName"/>
                        </div>
                    </td>
                    <td>
                        <div class="profile-info-value searchTr">
                            <input type="text" placeholder="内容" class="propertyValue1" id="title"
                                   style="width: 150px;">
                            <input type="hidden" value="content" class="propertyName"/>
                        </div>
                    </td>
                    <td>
                        <div class="profile-info-value searchTr">
                            <input type="text" placeholder="用户id" class="propertyValue1" id="userId"
                                   style="width: 150px;">
                            <input type="hidden" value="userId" class="propertyName"/>
                        </div>
                    </td>
                    <td>
                        <div class="profile-info-value searchTr">
                            <select id="isDelete" name="isDelete" class="propertyValue1">
                                <option value="false">有效</option>
                                <option value="true">无效</option>
                            </select>
                            <input type="hidden" value="isDelete" class="propertyName"/>
                        </div>
                    </td>
                    <td>
                        <button id="searchBtn" type="button" class="btn btn-sm btn-primary"
                                onclick="search();">
                            <i class="ace-icon fa fa-search icon-on-right bigger-110"></i>
                        </button>
                    </td>
                </tr>
            </table>
        </div>
    </div>

    <!-- 回复列表 -->
    <div class="row">
        <div class="col-xs-12">
            <table id="replyTable" class="table table-striped table-bordered table-hover">

            </table>
        </div>
    </div>
</div>

<script type="text/javascript" src="/js/bbs/reply/reply.js?v=ipandatcm_1.3"></script>