var scoreTypeTable;
var roleForm;
var searchCase;
var seed=1;
var searchCase = new Array();
$(function(){
    createDatePicker($(".datetime-picker"),"yy-mm-dd");
	document.onkeydown=function(event){
		if(event.keyCode==13){
			return false
		}
	}
	
	//课程推荐列表
	var checkbox = '<input type="checkbox" class="ace" onclick="chooseAll(this)" /> <span class="lbl"></span>';
	var objData = [{ "title": checkbox,"class":"center","width":"60px","sortable":false,"data": 'id' ,"mRender":function(data,display,row){
				        return '<input type="checkbox" value='+data+' class="ace" /><span class="lbl"></span>';
				    }},
        { "title": "课程ID", "class": "center","width":"5%","sortable": false,"data":'id' },
        { "title": "课程名称", "class":"center","width":"9%","sortable":false,"data": 'courseName' },
        { "title": "所属学科", "class":"center","width":"6%","sortable":false,"data": 'xMenuName' },
        { "title": "课程大分类", "class":"center","width":"6%","sortable":false,"data": 'type' ,"mRender":function (data, display, row) {

    			if(data==1 ){  //课程分类 1:公开直播课（1.直播2.点播3.线下课）
    				return "直播课";
    			}else if(data== 2){
    				return "点播";
    			}else if(data== 3){
    				return "线下课";
    			}
    	} }, 
        { "title": "资源类型", "class":"center","width":"6%","sortable":false,"data": 'multimediaType' ,"mRender":function (data, display, row) {
        	
        		if(row.type == 2){
        			 if(data == 1){
                         return "视频";
                     }
                     return "音频";
        		}
            }},
        { "title": "直播状态", "class":"center","width":"6%","sortable":false,"data": 'liveStatus' ,"mRender":function (data, display, row) {

    		
    			if(row.type == 1){
    				if(data==1 ){  //直播状态1.直播中，2预告，3直播结束
    					return "直播中";
    				}else if(data== 2){
    					return "预告";
    				}else if(data== 3){
    					return "结束";
    				}else if(data== 4){
    					return "即将直播";
    				}else if(data== 5){
    					return "准备直播 ";
    				}else if(data== 6){
    					return "异常直播";
    				}
    			}
    		
    			
    		} },    
        { "title": "上传人", "class":"center","width":"8%","sortable":false,"data": 'lecturerName'},
        { "title": "主播", "class":"center","width":"8%","sortable":false,"data": 'lecturer'},
        { "title": "课程来源", "class":"center","width":"8%","sortable":false,"data": 'clientName'},
        { "title": "创建时间", "class":"center","width":"10%", "sortable":false,"data": 'createTime' },
        { "title": "发布时间", "class":"center","width":"10%", "sortable":false,"data": 'releaseTime' },
        { "title": "推荐时效", "class":"center","width":"10%","sortable":false,"data": 'sortUpdateTime',"mRender":function (data, display, row) {
            if(row.recommendSort == null||row.recommendSort == 0)return null;
            return data;
        }},
        { "title": "推荐值", "class":"center","width":"5%", "sortable":false,"data": 'recommendSort',"mRender":function (data, display, row) {
            if(data == null)return 0;
            return data;
        }},
        
        { "title": "状态", "class":"center","width":"8%","sortable":false,"data": 'status',"mRender":function (data, display, row) {
			return row.status=="1"?"已启用":"已禁用";
			}
		},
        { "sortable": false,"class": "center","width":"8%","title":"操作","mRender":function (data, display, row) {
				return '<div class="hidden-sm hidden-xs action-buttons">'+
                    '<a class="blue" href="javascript:void(-1);" title="设置推荐值" onclick="updateRecommendSort(this)"><i class="ace-icon fa fa-pencil bigger-130"></i></a>';

			}
		}
		      		];
	//课程分类
	scoreTypeTable = initTables("scoreTypeTable",basePath+"/essencerecommend/course/list",objData,true,true,2,null,searchCase,function(data){
			var iDisplayStart = data._iDisplayStart;
			var countNum = data._iRecordsTotal;//总条数
			pageSize = data._iDisplayLength;//每页显示条数
			currentPage = iDisplayStart / pageSize +1;//页码
			var countPage;
			if(countNum%pageSize == 0){
				countPage = parseInt(countNum/pageSize);
			}else{
				countPage = parseInt(countNum/pageSize) + 1;
			}
			$("[name='upa']").each(function(index){
				if(index == 0){
					$(this).css("pointer-events","none").removeClass("blue").addClass("gray");
				}
			});
			$("[name='downa']").each(function(index){
				if(index == $("[name='downa']").size()-1){
					$(this).css("pointer-events","none").removeClass("blue").addClass("gray");
				}
			});
	});
	
	//下线时间 时间控件
    $('#recommendTime').datetimepicker({
        showSecond: true,
        changeMonth: true,
        changeYear: true,
        language: 'zh-CN',
        dateFormat:'yy-mm-dd',
        monthNamesShort: [ "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12" ],
        timeFormat: 'HH:mm:ss',
        minDate:new Date(),
        onSelect: function( startDate ) {
        }
    });
	$(".all_recommend_course").show();
	$(".jp_course").hide();
	$(".course_menu_id").hide();
});



/**
 * 点击课程推荐管理  -- 查询出所有的没有被禁用的课程
 */
$(".all_bx").click(function(){

    var json = new Array();
    var startTime = $("#startTime").val(); //开始时间
    var stopTime = $("#stopTime").val(); //结束时间
    if(startTime != "" || stopTime != "") {

        if (startTime != "" && stopTime != "" && startTime > stopTime) {
            alertInfo("开始日期不能大于结束日期");
            return;
        }
        json.push('{"tempMatchType":"7","propertyName":"startTime","propertyValue1":"' + startTime + '","tempType":"String"}');
        json.push('{"tempMatchType":"6","propertyName":"stopTime","propertyValue1":"' + stopTime + '","tempType":"String"}');
    }

	$(".all_recommend_course").show();
    searchButton(scoreTypeTable,json);
});

/**
 * Description：设置推荐值
 * @Date: 2018/3/9 14:11
 **/
function updateRecommendSort(obj){
    var oo = $(obj).parent().parent().parent();
    var row = scoreTypeTable.fnGetData(oo);
    $("#UpdateRecommendSort_id").val(row.id);
    var dialog = openDialog("UpdateRecommendSortDialog","dialogUpdateRecommendSortDiv","修改推荐值",350,300,true,"确定",function(){
        if($("#UpdateRecommendSortFrom").valid()){
            mask();
            $("#UpdateRecommendSortFrom").attr("action", basePath+"/cloudclass/course/updateRecommendSort");
            $("#UpdateRecommendSortFrom").ajaxSubmit(function(data){
                data = getJsonData(data);
                unmask();
                if(data.success){
                    $("#recommendSort").val("");
                    $("#recommendTime").val("");
                    $("#UpdateRecommendSortDialog").dialog("close");
                    layer.msg(data.resultObject);
                        freshTable(scoreTypeTable);
                }else{
                    alertInfo(data.errorMessage);
                }
            });
        }
    });
};
