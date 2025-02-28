$(function(){
    initMenu();
    $(".course_search").click(function(){
        courseList(1);
    })
    $(".course_collection_search").click(function(){
        courseCollectionList(1);
    })
    $(".course_resource_search").click(function(){
        courseResourceList(1);
    })
    $(".addCourse").click(function(){
        saveCourse();
    });
    

//  新课程以及专辑校验
function initCourde(sibling){
	$('.'+sibling).addClass('hide');
	$('.'+sibling).siblings("input").removeClass("active-border");
}
	var courseVerification = {
//		课程标题
		course_title : function(){
			initCourde("warning_course_title");
			if ($.trim($(".course_title").val())== "") {
				$('.warning_course_title').removeClass('hide');
				$('.warning_course_title').siblings("input").addClass("active-border");
			}
		},
//		副标题
		course_subtitle : function(){			
			$('.warning_course_subtitle').addClass('hide');
			initCourde("warning_course_subtitle_length");
			if ($.trim($(".course_subtitle").val())== "") {
				$('.warning_course_subtitle').removeClass('hide');
				$('.warning_course_subtitle').siblings("input").addClass("active-border");
				return false;
			}else if($.trim($(".course_subtitle").val()).length > 30){
				$('.warning_course_subtitle_length').removeClass('hide');
				$('.warning_course_subtitle_length').siblings("input").addClass("active-border");
			}
			
		},
//		主讲人
		course_lecturer : function(){
			var authorName=/^[a-zA-Z\u4e00-\u9fa5,，\x20]+$/; //只能输入中文或者逗号
			initCourde("warning_course_lecturer");
			$('.warning_course_lecturer_length').addClass('hide');
			if ($.trim($(".course_lecturer").val())== "") {
				$('.warning_course_lecturer').removeClass('hide');
        		$('.warning_course_lecturer').siblings("input").addClass("active-border");
				return false;
			}else if(!authorName.test($.trim($(".course_lecturer").val()))){
				$('.warning_course_lecturer_length').removeClass('hide');
        		$('.warning_course_lecturer_length').siblings("input").addClass("active-border");
				return false;
			}
			
		},
//		价格
		course_pride : function(){			
			initCourde("warning_course_price");
			$('.warning_course_price_Illegal').addClass('hide');
			if ($.trim($(".course_price").val())== "") {
				$('.warning_course_price').removeClass('hide');
        		$('.warning_course_price').siblings("input").addClass("active-border");
				return false;
			}else if(!numberCk($.trim($(".course_price").val()))){
				$('.warning_course_price_Illegal').removeClass('hide');
				$('.warning_course_price_Illegal').siblings("input").addClass("active-border");
			}
			
		},
//		时长
		course_duration : function(){			
			initCourde("warning_course_length");
			$('.warning_course_length_Illegal').addClass('hide');
			if ($.trim($(".course_length").val())== "") {
				$('.warning_course_length').removeClass('hide');
        		$('.warning_course_length').siblings("input").addClass("active-border");
				return false;
			}else if(!numberCk($.trim($(".course_length").val()))){
				$('.warning_course_length_Illegal').removeClass('hide');
				$('.warning_course_length_Illegal').siblings("input").addClass("active-border");
			}
			
		},
//		详细地址
		course_address : function(){	
			$('.warning_course_address').addClass('hide');
        	$('.warning_course_address').siblings("textarea").removeClass("active-border");
			if ($.trim($(".course_address").val())== "") {
				$('.warning_course_address').removeClass('hide');
        		$('.warning_course_address').siblings("textarea").addClass("active-border");
			}
			
		},
//		专辑校验开始 
//		专辑标题
		course_collection : function(){
			initCourde("warning_collection_title");
			if ($.trim($(".collection_title").val())== "") {
				$('.warning_collection_title').removeClass('hide');
				$('.warning_collection_title').siblings("input").addClass("active-border");
			}
		},
//		专辑副标题
		collection_subtitle : function(){			
			initCourde("warning_collection_subtitle");
			if ($.trim($(".collection_subtitle").val())== "") {
				$('.warning_collection_subtitle').removeClass('hide');
				$('.warning_collection_subtitle').siblings("input").addClass("active-border");
				return false;
			}	
		},
//		主播姓名
		collection_lecturer: function(){
			var collectName=/^[a-zA-Z\u4e00-\u9fa5,，\x20]+$/;
			initCourde("warning_collection_lecturer");
			$('.warning_collection_lecturer_length').addClass('hide');
			if ($.trim($(".collection_lecturer").val())== "") {
				$('.warning_collection_lecturer').removeClass('hide');
				$('.warning_collection_lecturer').siblings("input").addClass("active-border");
				return false;
			}else if($.trim($(".collection_lecturer").val()).substr($.trim($(".collection_lecturer").val()).length-1,1)== "，"){
		        $('.warning_collection_lecturer_length').removeClass('hide');
		        $('.warning_collection_lecturer_length').siblings("input").addClass("active-border");
		        return false;
		   }else if(!collectName.test($.trim($(".collection_lecturer").val()))){
				$('.warning_collection_lecturer_length').removeClass('hide');
				$('.warning_collection_lecturer_length').siblings("input").addClass("active-border");
				return false;
			}
		},
//		专辑总价
		collection_price: function(){			
			initCourde("warning_collection_price");
			$(".warning_collection_price_Illegal").addClass("hide");
			if ($.trim($(".collection_price").val())== "") {
				$('.warning_collection_price').removeClass('hide');
				$('.warning_collection_price').siblings("input").addClass("active-border");
				return false;
			}else if(!numberCk($(".collection_price").val())){
				$('.warning_collection_price_Illegal').removeClass('hide');
        		$('.warning_collection_price_Illegal').siblings("input").addClass("active-border");
			}
		},
//		主播信息		
		collection_nickname: function(){			
			initCourde("warning_anchor_name");
			if ($.trim($("#u_nickname").val())== "") {
				$('.warning_anchor_name').removeClass('hide');
				$('.warning_anchor_name').siblings("input").addClass("active-border");
			}
		}
	}
//	课程
    $(".course_title").blur(function(){
		courseVerification.course_title();
	})
    $(".course_subtitle").blur(function(){
		courseVerification.course_subtitle();
	})
   	$(".course_lecturer").blur(function(){
		courseVerification.course_lecturer();
	})
    $(".course_price").blur(function(){
		courseVerification.course_pride();
	})
    $(".course_length").blur(function(){
		courseVerification.course_duration();
	})
  	$(".course_address").blur(function(){
		courseVerification.course_address();
	})
// 专辑 	
	$(".collection_title").blur(function(){
		courseVerification.course_collection();
	})
	$(".collection_subtitle").blur(function(){
		courseVerification.collection_subtitle();
	})
	$(".collection_lecturer").blur(function(){
		courseVerification.collection_lecturer();
	})
	$(".collection_price").blur(function(){
		courseVerification.collection_price();
	})
	$("#u_nickname").blur(function(){
		courseVerification.collection_nickname();
	})

 //  新课程以及专辑校验结束  

    $("input[name='collection_multimedia_type']").change(function(){
        $(".collection_courses").html("");
        courseArr=[];
    });
    $(".select_time").change(function(){
//
        $(this).val($(this).val());
    });
    
    //课程自动筛选
    $('#course_type').change(function(){
    	$('.course_search').click();
    })
    
      //专辑自动筛选
    $('#course_collection_type').change(function(){
    	$('.course_collection_search').click();
    })
});

//判断字段空值
function isNotBlank(str) {
    if (str == "" || str == null || str == undefined || str == "undefined" || str == "null") {
        return false;
    }
    return true;
}

  //渲染课程列表方法
    function getCourseList(){
    	//控制页面返回课程列表页
    	if($('#curriculum .curriculum_one .zhuanlan_top .button').text() == "返回"){
    		$('#curriculum .curriculum_one .zhuanlan_top .button').click();
    	}
    	
    	$('#course_name').val('')
    	$("#course_type option:first").prop("selected", 'selected');
        courseList(1);
        initResource(1);
        var ue = UE.getEditor('editor',{
            toolbars:[['source', //源代码
                'undo', //撤销
                'redo', //重做
                'bold', //加粗
                'forecolor', //字体颜色
                'backcolor', //背景色
                'indent', //首行缩进
                'removeformat',//清除格式
                'formatmatch', //格式刷
                'blockquote', //引用
                'fontfamily', //字体
                'fontsize', //字号
                'paragraph', //段落格式
                'italic', //斜体
                'underline', //下划线
                'strikethrough', //删除线
                'superscript', //上标
                'subscript', //下标
                'touppercase', //字母大写
                'tolowercase', //字母小写
                'justifyleft', //居左对齐
                'justifyright', //居右对齐
                'justifycenter', //居中对齐
                'justifyjustify',//两端对齐
                'link', //超链接
                'unlink', //取消链接
                'simpleupload', //单图上传
                // 'insertimage', //多图上传
                'emotion', //表情
                'lineheight', //行距
                'fullscreen'
            ] ],
              initialFrameWidth: 540,
        	initialFrameHeight:220,
            elementPathEnabled:false,
            autoHeightEnabled: false,
            autoFloatEnabled: true,
            enableAutoSave:false,
            imagePopup:false,
            autoFloatEnabled:false,
            maximumWords:3000       //允许的最大字符数
        });
        var ue_cd = UE.getEditor('editor_cd',{
            toolbars:[['source', //源代码
                'undo', //撤销
                'redo', //重做
                'bold', //加粗
                'forecolor', //字体颜色
                'backcolor', //背景色
                'indent', //首行缩进
                'removeformat',//清除格式
                'formatmatch', //格式刷
                'blockquote', //引用
                'fontfamily', //字体
                'fontsize', //字号
                'paragraph', //段落格式
                'italic', //斜体
                'underline', //下划线
                'strikethrough', //删除线
                'superscript', //上标
                'subscript', //下标
                'touppercase', //字母大写
                'tolowercase', //字母小写
                'justifyleft', //居左对齐
                'justifyright', //居右对齐
                'justifycenter', //居中对齐
                'justifyjustify',//两端对齐
                'link', //超链接
                'unlink', //取消链接
                'simpleupload', //单图上传
                // 'insertimage', //多图上传
                'emotion', //表情
                'lineheight', //行距
                'fullscreen'
            ] ],
              initialFrameWidth: 540,
        	initialFrameHeight:220,
            elementPathEnabled:false,
            autoHeightEnabled: false,
            autoFloatEnabled: true,
            enableAutoSave:false,
            imagePopup:false,
            autoFloatEnabled:false,
            maximumWords:3000       //允许的最大字符数
        });
//      诊疗直播
		var ue_zl = UE.getEditor('editor-medical',{
            toolbars:[['source', //源代码
                'undo', //撤销
                'redo', //重做
                'bold', //加粗
                'forecolor', //字体颜色
                'backcolor', //背景色
                'indent', //首行缩进
                'removeformat',//清除格式
                'formatmatch', //格式刷
                'blockquote', //引用
                'fontfamily', //字体
                'fontsize', //字号
                'paragraph', //段落格式
                'italic', //斜体
                'underline', //下划线
                'strikethrough', //删除线
                'superscript', //上标
                'subscript', //下标
                'touppercase', //字母大写
                'tolowercase', //字母小写
                'justifyleft', //居左对齐
                'justifyright', //居右对齐
                'justifycenter', //居中对齐
                'justifyjustify',//两端对齐
                'link', //超链接
                'unlink', //取消链接
                'simpleupload', //单图上传
                // 'insertimage', //多图上传
                'emotion', //表情
                'lineheight', //行距
                'fullscreen'
            ] ],
              initialFrameWidth: 540,
        	initialFrameHeight:220,
            elementPathEnabled:false,
            autoHeightEnabled: false,
            autoFloatEnabled: true,
            enableAutoSave:false,
            imagePopup:false,
            autoFloatEnabled:false,
            maximumWords:3000       //允许的最大字符数
        });
    }
    
    
    
  //渲染专辑的方法
  function getZhuanjiList(){
  		//显示专辑部分，隐藏新专辑部分
  	 	$("#zhuanji_bottom2").show();
	    $("#zhuanji_bottom").hide();
	    
  		$('#course_collection_name').val('');
    	$("#course_collection_type option:first").prop("selected", 'selected');
        courseCollectionList(1);
        initCourse(1);
        var editor_collection_details = UE.getEditor('editor_collection_details',{
            toolbars:[['source', //源代码
                'undo', //撤销
                'redo', //重做
                'bold', //加粗
                'forecolor', //字体颜色
                'backcolor', //背景色
                'indent', //首行缩进
                'removeformat',//清除格式
                'formatmatch', //格式刷
                'blockquote', //引用
                'fontfamily', //字体
                'fontsize', //字号
                'paragraph', //段落格式
                'italic', //斜体
                'underline', //下划线
                'strikethrough', //删除线
                'superscript', //上标
                'subscript', //下标
                'touppercase', //字母大写
                'tolowercase', //字母小写
                'justifyleft', //居左对齐
                'justifyright', //居右对齐
                'justifycenter', //居中对齐
                'justifyjustify',//两端对齐
                'link', //超链接
                'unlink', //取消链接
                'simpleupload', //单图上传
                // 'insertimage', //多图上传
                'emotion', //表情
                'lineheight', //行距
                'fullscreen'
            ] ],
             initialFrameWidth: 540,
        	initialFrameHeight:220,
            elementPathEnabled:false,
            autoHeightEnabled: false,
            autoFloatEnabled: true,
            enableAutoSave:false,
            imagePopup:false,
            autoFloatEnabled:false,
            maximumWords:3000       //允许的最大字符数
        });
        var editor_collection_outline = UE.getEditor('editor_collection_outline',{
            toolbars:[['source', //源代码
                'undo', //撤销
                'redo', //重做
                'bold', //加粗
                'forecolor', //字体颜色
                'backcolor', //背景色
                'indent', //首行缩进
                'removeformat',//清除格式
                'formatmatch', //格式刷
                'blockquote', //引用
                'fontfamily', //字体
                'fontsize', //字号
                'paragraph', //段落格式
                'italic', //斜体
                'underline', //下划线
                'strikethrough', //删除线
                'superscript', //上标
                'subscript', //下标
                'touppercase', //字母大写
                'tolowercase', //字母小写
                'justifyleft', //居左对齐
                'justifyright', //居右对齐
                'justifycenter', //居中对齐
                'justifyjustify',//两端对齐
                'link', //超链接
                'unlink', //取消链接
                'simpleupload', //单图上传
                // 'insertimage', //多图上传
                'emotion', //表情
                'lineheight', //行距
                'fullscreen'
            ] ],
            initialFrameWidth: 540,
        	initialFrameHeight:220,
            elementPathEnabled:false,
            autoHeightEnabled: false,
            autoFloatEnabled: true,
            enableAutoSave:false,
            imagePopup:false,
            autoFloatEnabled:false,
            maximumWords:3000       //允许的最大字符数
        });
        var editor_collection_lecturer_description = UE.getEditor('editor_collection_lecturer_description',{
            toolbars:[['source', //源代码
                'undo', //撤销
                'redo', //重做
                'bold', //加粗
                'forecolor', //字体颜色
                'backcolor', //背景色
                'indent', //首行缩进
                'removeformat',//清除格式
                'formatmatch', //格式刷
                'blockquote', //引用
                'fontfamily', //字体
                'fontsize', //字号
                'paragraph', //段落格式
                'italic', //斜体
                'underline', //下划线
                'strikethrough', //删除线
                'superscript', //上标
                'subscript', //下标
                'touppercase', //字母大写
                'tolowercase', //字母小写
                'justifyleft', //居左对齐
                'justifyright', //居右对齐
                'justifycenter', //居中对齐
                'justifyjustify',//两端对齐
                'link', //超链接
                'unlink', //取消链接
                'simpleupload', //单图上传
                // 'insertimage', //多图上传
                'emotion', //表情
                'lineheight', //行距
                'fullscreen'
            ] ],
            initialFrameWidth: 540,
        	initialFrameHeight:220,
            elementPathEnabled:false,
            autoHeightEnabled: false,
            autoFloatEnabled: true,
            enableAutoSave:false,
            imagePopup:false,
            autoFloatEnabled:false,
            maximumWords:3000       //允许的最大字符数
        });
  }


	//渲染直播方法
	function getLiveList(){
		courseLiveList(1);
        initVhallInfo();
	}


//渲染资源方法
function getResourceList(){
	//上传资源隐藏，默认部分显示
	 $(".resource_two").show();
	 $(".resource_one").hide();
	 //资源列表渲染
	 courseResourceList(1);
}


/**
 * Description：课程列表
 * creed: Talk is cheap,show me the code
 * @author name：yuxin <br>email: yuruixin@ixincheng.com
 * @Date: 2018/2/2 0002 下午 9:09
 **/
var launchData;
function courseList(current){
    var courseForm;
    var multimediaType;
    var courseType = $("#course_type").val();
    var courseName = $("#course_name").val();
    if(courseType == 1){
        courseForm = 1;
    }else if(courseType == 2){
        courseForm = 2;
        multimediaType = 1;
    }else if(courseType == 3){
        courseForm = 3;
    }else if(courseType == 4){
        courseForm = 2;
        multimediaType = 2;
    }
    var url ="/anchor/course/getCourseApplyList?size=10&teaching=0&current="+current;
    if(courseForm!=null){
        url += "&courseForm="+courseForm;
    }
    if(multimediaType!=null){
        url += "&multimediaType="+multimediaType;
    }
    if(courseName!=null){
        url += "&title="+courseName;
    }
//
    RequestService(url, "get", null, function(data) {
			launchData=data.resultObject.records;
         if(!data.resultObject || !data.resultObject.records || data.resultObject.records.length == 0){
        $('#kecheng_list').html('<div style="padding-top:40px;text-align:center"><img src="/web/images/other_noResult.png" alt="" /><p style="font-size:16px;color:#999;margin-top:35px">暂无课程</p></div>');
        $('#kecheng_list').removeClass('hide')
        }else{
        	var str = '<thead><tr><td>封面图</td><td>课程名称</td><td>价格</td><td>时长</td><td>类型</td><td>资源类型</td><td>审核状态</td><td>课程状态</td><td>操作</td></tr></thead><tbody id="course_list"></tbody>'
        	$('#kecheng_list').html(str)
        	$('#kecheng_list').removeClass('hide')
        }
        $("#course_list").html(template('course_list_tpl', data.resultObject));
//
        //每次请求完数据就去渲染分页部分
        if (data.resultObject.pages > 1) { //分页判断
            $(".not-data").remove();
            $(".course_pages").css("display", "block");
            $(".course_pages .searchPage .allPage").text(data.resultObject.pages);
            $("#Pagination").pagination(data.resultObject.pages, {
                num_edge_entries: 1, //边缘页数
                num_display_entries: 4, //主体页数
                current_page:current-1,
                callback: function (page) {
                    //翻页功能
                    courseList(page+1);
                }
            });
        } else {
            $(".course_pages").css("display", "none");
        }
    });
}

/**
 * Description：新增课程
 * creed: Talk is cheap,show me the code
 * @author name：yuxin <br>email: yuruixin@ixincheng.com
 * @Date: 2018/2/3 0003 下午 5:56
 **/
//失去焦点校验

function saveCourse(){
    var course = getCourseData();
    if(verifyCourse(course)) {
        if(course.id==null||course.id=='') {
            addCourse(course);
        }else {
            updateCourse(course);
        }
    }
}
//TODO
function addCourse(course){
    $.ajax({
        type: "post",
        url: bath + "/anchor/course/saveCourseApply",
        data:JSON.stringify(course),
        contentType:"application/json",
        async: false,
        success: function(data) {
            console.log(data);
            if(data.success === true) {
                showTip(data.resultObject);
                resetCourseForm(true);
                setTimeout(function(){ getCourseList() }, 2000);
            } else {
                showTip(data.errorMessage)
            }
        }
    });
}

function updateCourse(course){
    $.ajax({
        type: "post",
        url: bath + "/anchor/course/updateCourseApply",
        data:JSON.stringify(course),
        contentType:"application/json",
        async: false,
        success: function(data) {
            if(data.success === true) {
                showTip(data.resultObject);
                resetCourseForm(false);
                setTimeout(function(){ getCourseList()  }, 2000);
            } else {
                showTip(data.errorMessage)
            }
        }
    });
}

function editCourse(caiId,passEdit){
    resetCourseForm(false);
    if(echoCourse(caiId,passEdit)){
        $(".curriculum_two").hide();
        $(".curriculum_one").show();
        clearWarning();
    }else{
        showTip("课程发生变化了，请刷新列表");
    }
}
function clearWarning(){
	$(".curriculum_one input").removeClass("active-border");
	$(".curriculum_one textarea").removeClass("active-border");
	$(".curriculum_one .warning").addClass("hide");
}

function deleteCourse(caiId,collection){
    var title="删除";
    var content="确认删除该课程？";
    if(collection){
        title="删除";
        content="确认删除该专辑？";
    }
    confirmBox1(title,content,function(closefn){
        RequestService("/anchor/course/deleteCourseApplyById?caiId="+caiId, "get", null, function(data) {
            closefn();
            if(data.success){
                showTip(data.resultObject);
                if(collection){
                    courseCollectionList(1);
                }else{
                    courseList(1);
                }
            }else{
                showTip(data.errorMessage);
            }
        });
    });
}
function getCourse4Update(caiId){
    var course;
    RequestService("/anchor/course/getCourseApplyById?caiId="+caiId, "get", null, function(data) {
        course = data.resultObject;
    },false);
    return course;
}
 $("#demo2").iProvincesSelect("init",null);
function echoCourse(caiId,passEdit){
    var course = getCourse4Update(caiId);
    //若该申请已通过，且点进方法的页面显示未通过，给出提示  //暂时关闭该校验
    if(course.status==1 && !passEdit)return false;
    if(course.courseForm == 1 && course.multimediaType == 2){
    	course.courseForm = 4;
    }
    $('#caiId').val(caiId);
    $('.course_title').val(course.title);
    $('.course_subtitle').val(course.subtitle);
    $('#courseImg').html('<img src="">'+'<p>点击图片重新上传</p>');
    $('#courseImg img').attr('src',course.imgPath+"?imageMogr2/thumbnail/!260x147r|imageMogr2/gravity/Center/crop/260x147");
    $('.course_lecturer ').val(course.lecturer);
    if(course.lecturerDescription) {
        UE.getEditor('editor').setContent(course.lecturerDescription);
    }
    // $("input[name='course_form']:checked").val();
    $("input:radio[name=course_form][value="+course.courseForm+"]").prop("checked",true);
    $('#menu_select').val(course.courseMenu);
    $('.course_price').val(course.price);
    $('.course_originalCost').val(course.originalCost);
    if(course.courseDetail) {
        UE.getEditor('editor_cd').setContent(course.courseDetail);
    }

    $('.course_length').val(course.courseLength);
    showCourseAttribute(course.courseForm);
    
    if(course.courseForm==1||course.courseForm==4){
        $('.course_start_time').val(course.startTime);
    }else if(course.courseForm==2){
        initResource(course.multimediaType);
        $("input:radio[name=course_multimedia_type][value="+course.multimediaType+"]").prop("checked",true);
        $('.course_resource').selectpicker('val',(course.resourceId));
    }else if(course.courseForm == 3){
        $('.course_start_time').val(course.startTime);
        $('.course_end_time').val(course.endTime);
        //TODO 省市回显
        //省市区
        var address = course.address.split(" ")[1];
        var p_c = course.address.split(" ")[0];
        p_c = p_c.split("-");
        if(p_c.length==2){
            //省
            for(var i=0;i<$(".course_province option").length;i++){
                if($(".course_province option").eq(i).text()==p_c[0]){
                    $(".course_province option").eq(i).prop("selected",true);
                    break;
                }
            }
            $(".course_city").empty();
            doProvAndCityRelation($(".course_province"));
            for(var i=0;i<$(".course_city option").length;i++){
                if($(".course_city option").eq(i).text()==p_c[1]){
                    $(".course_city option").eq(i).prop("selected",true);
                    break;
                }
            }
        }
        $(".course_address").val(address);
    }
    return true;
}
function resetCourseForm(sp){
    document.getElementById("courseForm").reset();
    $("#course_version").val(new Date().getTime());
    $("input:radio[name=course_form][value=1]").prop("checked",true);
    UE.getEditor('editor').setContent('');
    UE.getEditor('editor_cd').setContent('');
    $("#courseImg").html("");
    $("#caiId").val("");
    $("#citys").empty();
    showCourseAttribute(1);
    initResource(1);

    if(sp){
        showPersonInf();
    }
}

//课程展示主播信息
function showPersonInf(){
   RequestService("/anchor/info", "get",null, function(data) {
    $('.course_lecturer').val(data.resultObject.name);
    if(isBlank(data.resultObject.detail)){
    	data.resultObject.detail="";
    }
   	UE.getEditor('editor').setContent(data.resultObject.detail);
   },false);
    RequestService("/template/course_detail.html", "get",null, function(data) {
        UE.getEditor('editor_cd').setContent(data);
    },false);
}

/**
 * Description：获取新增课程所有参数
 * creed: Talk is cheap,show me the code
 * @author name：yuxin <br>email: yuruixin@ixincheng.com
 * @Date: 2018/2/3 0003 下午 5:54
 **/
var coursePicUrl;
function getCourseData(){
    var course = {};
    var imgCourseLength=$('#courseImg img');
	if(imgCourseLength.length!=0){
		coursePicUrl=imgCourseLength.attr("src").split("?")[0];
	}else{
		coursePicUrl="";
	}
    course.id = $("#caiId").val();
    course.version = $("#course_version").val();
    course.title = $.trim($('.course_title').val());
    course.subtitle = $.trim($('.course_subtitle').val());
    course.imgPath = coursePicUrl;
    course.lecturer = $.trim($('.course_lecturer ').val());
    course.lecturerDescription = getLDContent();
    course.courseForm = $("input[name='course_form']:checked").val();
    course.courseMenu = $.trim($('#menu_select').val());
    course.price = $.trim($('.course_price').val());
    course.originalCost = $.trim($('.course_originalCost').val());
    course.courseDetail = getCDContent();
    course.courseLength = $.trim($('.course_length').val());

    if(course.courseForm==1){ 
        course.startTime = $.trim($('.course_start_time').val());
        course.multimediaType = 1
    }else if(course.courseForm==2){
        course.resourceId = $('.course_resource').val();
        course.multimediaType = $("input[name='course_multimedia_type']:checked").val();
    }else if(course.courseForm == 3){
        course.startTime = $.trim($('.course_start_time').val());
        course.endTime = $.trim($('.course_end_time').val());
        course.province = $(".course_province").find("option:selected").text();
        course.city = $(".course_city").find("option:selected").text();
        course.address = $(".course_address").val();
        if(course.province==''||course.city==''||course.address==''){
            course.address='';
        }else{
            course.address = course.province+"-"+course.city+" "+course.address;
        }
    }else if(course.courseForm == 4){
    	course.startTime = $.trim($('.course_start_time').val());
    	course.courseForm = 1;
    	course.multimediaType = 2;
    }

    return course;
}

/**
 * Description：校验新增课程参数
 * creed: Talk is cheap,show me the code
 * @author name：yuxin <br>email: yuruixin@ixincheng.com
 * @Date: 2018/2/2 0002 下午 9:36
 **/
function verifyCourse(course){
	var authorName=/^[a-zA-Z\u4e00-\u9fa5,，\x20]+$/; //只能输入中文或者逗号
    $(".warning").addClass('hide');
	$(".curriculum_one input").removeClass("active-border");
	$(".curriculum_one textarea").removeClass("active-border");
    //课程标题
    if(course.title == ''){
        $('.warning_course_title').removeClass('hide');
		$('.warning_course_title').siblings("input").addClass("active-border");
        return false;
    }else{
        $('.warning_course_title').addClass('hide');
    }
    if(course.title.length>30){
        $('.warning_course_title_length').removeClass('hide');
        $('.warning_course_title_length').siblings("input").addClass("active-border");
        return false;
    }else{
        $('.warning_course_title_length').addClass('hide');
    }
    //副标题
    if(course.subtitle == ''){
        $('.warning_course_subtitle').removeClass('hide');
        $('.warning_course_subtitle').siblings("input").addClass("active-border");
        return false;
    }else{
        $('.warning_course_subtitle').addClass('hide');
    }
    if(course.subtitle.length>30){
        $('.warning_course_subtitle_length').removeClass('hide');
        $('.warning_course_subtitle_length').siblings("input").addClass("active-border");
        return false;
    }else{
        $('.warning_course_subtitle_length').addClass('hide');
    }
    //封面图
    if(course.imgPath == ''){
        $('.warning_course_imgPath ').removeClass('hide');
        return false;
    }else{
        $('.warning_course_imgPath').addClass('hide');
    }
    //主播姓名
    if(course.lecturer == ''){
        $('.warning_course_lecturer').removeClass('hide');
        $('.warning_course_lecturer').siblings("input").addClass("active-border");
        return false;
    }else if(!authorName.test(course.lecturer)){
    	$('.warning_course_lecturer_length').removeClass('hide');
        $('.warning_course_lecturer_length').siblings("input").addClass("active-border");
    	return false;
    }
    else{
        $('.warning_course_lecturer').addClass('hide');
    }
//  course.lecturer.charAt(course.lecturer.length – 1)== ','
//course.lecturer.substr(course.lecturer.length-1,1)

//结尾不能是逗号限制
//  if( course.lecturer.substr(course.lecturer.length-1,1)== "，"){
//      $('.warning_course_lecturer_length').removeClass('hide');
//      return false;
//  }else{
//      $('.warning_course_lecturer_length').addClass('hide');
//  }
    //主播介绍
    if(course.lecturerDescription == ''){
        $('.warning_course_lecturer_description').removeClass('hide');
        return false;
    }else{
        $('.warning_course_lecturer_description').addClass('hide');
    }
    //请选择开课时间
    if(course.startTime == '' && (course.courseForm==1||course.courseForm==3)){
        $('.warning_course_start_time').removeClass('hide');
        $('.warning_course_start_time').siblings("input").addClass("active-border");        
        return false;
    }else{
        $('.warning_course_start_time').addClass('hide');
    }
    /*if((course.courseForm==1||course.courseForm==3)){
        var startTime =  new Date(course.startTime.replace(/-/g,"/"));
        if(startTime<new Date()){
            $('.warning_course_time1').removeClass('hide');
            return false;
        }else{
            $('.warning_course_time1').addClass('hide');
        }
    }*/
    //请选择结课时间
    if(course.endTime == '' && course.courseForm==3){
        $('.warning_course_end_time').removeClass('hide');
        $('.warning_course_end_time').siblings("input").addClass("active-border");                
        return false;
    }else{
        $('.warning_course_end_time').addClass('hide');
    }
    if(course.startTime != ''&&course.endTime != ''&&course.endTime != null){
        var startTime =  new Date(course.startTime.replace(/-/g,"/"));
        var endTime =  new Date(course.endTime.replace(/-/g,"/"));
        if(startTime>endTime){
            $('.warning_course_time').removeClass('hide');
            return false;
        }else{
            $('.warning_course_time').addClass('hide');
        }
    }
    //授课地址
    if(course.address == '' && course.courseForm==3){
        $('.warning_course_address').removeClass('hide');
         $('.warning_course_address').siblings("textarea").addClass("active-border");                
        
        return false;
    }else{
        $('.warning_course_address').addClass('hide');
    }
    //时长
    if(course.courseLength == '' && (course.courseForm==2||course.courseForm==3)){
        $('.warning_course_length').removeClass('hide');
         $('.warning_course_length').siblings("input").addClass("active-border");                
        return false;
    }else{
        $('.warning_course_length').addClass('hide');
    }
    //时长数值校验
    if(!numberCk(course.courseLength) && (course.courseForm==2||course.courseForm==3)){
        $('.warning_course_length_Illegal').removeClass('hide');
         $('.warning_course_length_Illegal').siblings("input").addClass("active-border");                
        
        return false;
    }else{
        $('.warning_course_length_Illegal').addClass('hide');
    }
    //价格
    if(course.price == ''){
        $('.warning_course_price').removeClass('hide');
        $('.warning_course_price').siblings("input").addClass("active-border");
        return false;
    }else{
        $('.warning_course_price').addClass('hide');
    }
    //价格数值校验
    if(!numberCk(course.price)){
        $('.warning_course_price_Illegal').removeClass('hide');
        $('.warning_course_price_Illegal').siblings("input").addClass("active-border");
        return false;
    }else{
        $('.warning_course_price_Illegal').addClass('hide');
    }
    //原价
    if(course.originalCost != '' && parseInt(course.originalCost) < parseInt(course.price)){
        $('.warning_course_originalCost').removeClass('hide');
        $('.warning_course_originalCost').siblings("input").addClass("active-border");
        return false;
    }else{
        $('.warning_course_originalCost').addClass('hide');
    }
    //资源
    if((course.resourceId == '' || course.resourceId == null) && course.courseForm==2){
        $('.warning_course_resource').removeClass('hide');
        return false;
    }else{
        $('.warning_course_resource').addClass('hide');
    }
    //课程详情
    if(course.courseDetail == ''){
        $('.warning_course_details').removeClass('hide');
        return false;
    }else{
        $('.warning_course_details').addClass('hide');
    }
    return true;
}

function confirmCourseSale(state,courseApplyId,courseId,index){
    var title="课程上架";
    var content="确认上架该课程？";
    var launchUp=launchData[index]
    if(state==0){
        title="课程下架";
        content="确认下架该课程？";
    }
    if(launchUp.courseForm==1){
    	var startTime = launchUp.startTime;
	    startTime = startTime.replace(/-/g,"/");
	    var dateTime = new Date(startTime);
	    dateTime.setMinutes (dateTime.getMinutes () + 30);
	    var nowDate = new Date();
	    if(state == 1 && launchUp.courseForm==1&&launchUp.liveStatus==2&&dateTime<nowDate){
	    	showTip("该直播时间已经过期，无法上架,请修改再次操作上架。");
	    	return false;
    	}else{
	    	confirmBox1(title,content,function(closefn){
		        $.ajax({
		            type: "post",
		            url: bath + "/anchor/course/changeSaleState",
		            data:"courseApplyId="+courseApplyId+"&courseId="+courseId+"&state="+state,
		            async: false,
		            success: function(data) {
		                closefn();
		                console.log(data);
		                if(data.success == true) {
		//
		                    courseList(1);
		                    showTip(data.resultObject);
		                } else {
		                    showTip(data.errorMessage);
		                }
		            }
		        });
	    	});
    	}
    }else{
    	confirmBox1(title,content,function(closefn){
	        $.ajax({
	            type: "post",
	            url: bath + "/anchor/course/changeSaleState",
	            data:"courseApplyId="+courseApplyId+"&courseId="+courseId+"&state="+state,
	            async: false,
	            success: function(data) {
	                closefn();
	                console.log(data);
	                if(data.success == true) {
	//
	                    courseList(1);
	                    showTip(data.resultObject);
	                } else {
	                    showTip(data.errorMessage);
	                }
	            }
	        });
    	});
    }   
}

function confirmCollection(state,courseApplyId,courseId){
    var title="专辑上架";
    var content="确认上架该专辑？";
    if(state==0){
        title="专辑下架";
        content="确认下架该专辑？";
    }
    confirmBox1(title,content,function(closefn){
        $.ajax({
            type: "post",
            url: bath + "/anchor/course/changeSaleState",
            data:"courseApplyId="+courseApplyId+"&state="+state+"&courseId="+courseId,
            async: false,
            success: function(data) {
                closefn();
                console.log(data);
                if(data.success === true) {
                    courseCollectionList(1);
                    showTip(data.resultObject)
                } else {
                    showTip(data.errorMessage)
                }
            }
        });
    });
}

//添加专辑模态框
function addAlbum(id,collectionId,multimediaType){
	
	//初始化下拉框
	initAlbumNoExitCourse(id,collectionId,multimediaType);
	
	debugger;
	$("#mask").removeClass("hide")
	$(".add-album-modal").removeClass("hide");
	$(".sure-add-caiId").attr("data-id",id);
	
}

function initAlbumNoExitCourse(id,collectionId,multimediaType){
    
    RequestService("/anchor/course/getCollectionNotExitCouse?multimediaType="+multimediaType+"&collectionId="+collectionId+"&caiId="+id, "get", null, function(data) {
        var courses = data.resultObject;
        var str="";
        if(courses !=null &&  courses.length>0){
           $(".nofind-class").hide();
        }else{
           $(".nofind-class").show();
           $("#select-add").html(str);
           $('.selectpicker_ks').selectpicker('refresh');
           return;
        }
        collectionCourseListQuickly = courses;
        
        for(var i=0;courses.length>i;i++){
        	
            str += "<option value='"+courses[i].id+"'>"+courses[i].title+"</option>";
            
            
        }
        $("#select-add").html(str);
        
        $('.selectpicker_ks').selectpicker('refresh');
        $('.selectpicker_ks').selectpicker({
            'selectedText': 'cat',size:10
        });
    });
    
}


//关闭新增专辑模态框
function closeAlbum(){
	$("#mask").addClass("hide");
	$(".add-album-modal").addClass("hide");
}

//增加这个课程中的
function quicklyAddAlbumCourse(){
    
	//
	
	var csArr = $("#select-add").val();
	if(csArr ==null || csArr == undefined ||  csArr.length<=0){
		showTip("请选择课程");
		return;
	}
	
    var courseArr = [];
    var k=1;
    for(var i in csArr){
        for(var j=0;j<collectionCourseListQuickly.length;j++){
            if(csArr[i]==collectionCourseListQuickly[j].id){
                collectionCourseListQuickly[j].collectionCourseSort=k;
                collectionCourseListQuickly[j].first=false;
                collectionCourseListQuickly[j].last=false;
                k++;
                courseArr.push(collectionCourseListQuickly[j]);
            }
        }
    }
    courseArr = upDownShowInit(courseArr);
	
	var collection = {};
    collection.id = $(".sure-add-caiId").attr("data-id");
    collection.courseApplyInfos = courseArr;
	
    var fromFalg = true;
    if(fromFalg){
    	fromFalg = false;
    	
        $.ajax({
            type: "post",
            url: bath + "/anchor/course/saveCollectionCourse",
            data:JSON.stringify(collection),
            contentType:"application/json",
            async: false,
            success: function(data) {
            	fromFalg = true;
                console.log(data);
                if(data.success === true) {
                    closeAlbum();
                    showTip("添加成功");
                    $('.course_collection_search').click();
                } else {
                	closeAlbum();
                    showTip(data.errorMessage)
                }
            }
        });
    }else{
        console.error("正在处理请稍等");
    }
}

function initCourse(multimediaType){
    RequestService("/anchor/course/getAllCourses?multimediaType="+multimediaType, "get", null, function(data) {
        var courses = data.resultObject;
        collectionCourseList = courses;
        var str="";
        for(var i=0;courses.length>i;i++){
            str += "<option value='"+courses[i].id+"'>"+courses[i].title+"</option>";
        }
        $("#course_select").html(str);
        $('.selectpicker_collection').selectpicker('refresh');
        $('.selectpicker_collection').selectpicker({
            'selectedText': 'cat',size:10
        });
    });
}











/**
 * Description：直播列表
 * creed: Talk is cheap,show me the code
 * @author name：yuxin <br>email: yuruixin@ixincheng.com
 * @Date: 2018/2/3 0003 下午 4:31
 **/
function courseLiveList(current){
    var url ="/anchor/course/getLiveApplyList?size=10&current="+current;
//
    RequestService(url, "get", null, function(data) {
        $("#course_live_list").html(template('course_live_tpl', data.resultObject));
        if(!data.resultObject || !data.resultObject.records || data.resultObject.records.length == 0){
            $('.live_streaming_table').html('<div style="padding-top:40px;text-align:center"><img src="/web/images/other_noResult.png" alt="" /><p style="font-size:16px;color:#999;margin-top:35px">暂无直播</p></div>');
         	$('.live_streaming_table').removeClass('hide')
        }else{
        	$('.live_streaming_table').removeClass('hide')
        }
//
        //每次请求完数据就去渲染分页部分
        if (data.resultObject.pages > 1) { //分页判断
            $(".not-data").remove();
            $(".course_live_pages").css("display", "block");
            $(".course_live_pages .searchPage .allPage").text(data.resultObject.pages);
            $("#Pagination_live").pagination(data.resultObject.pages, {
                num_edge_entries: 1, //边缘页数
                num_display_entries: 4, //主体页数
                current_page:current-1,
                callback: function (page) {
                    //翻页功能
                    courseLiveList(page+1);
                }
            });
        } else {
            $(".course_live_pages").css("display", "none");
        }
    });
}

function getPushStatus(courseId) {
    var status = 0;
    $.ajax({
        url: '/anchor/course/pushStream/status?courseId=' + courseId,
        method: 'GET',
        async: false,
        success: function (resp) {
            console.log(resp);
            status = resp.resultObject;
        }
    });
    return status;
}

/**
 * Description：开始直播
 * creed: Talk is cheap,show me the code
 * @author name：yuxin <br>email: yuruixin@ixincheng.com
 * @Date: 2018/2/3 0003 下午 8:46
 **/
function startLive(courseId, channelId) {
    if (!channelId) {
        alert("该直播为老的直播数据，请重新创建直播");
        return false;
    } else {
        if (getPushStatus(courseId) === 0) {
            location.href = "/courses/liveRoom?courseId=" + courseId;
        } else {
            showTip("其他设备正在直播，请关闭后继续使用本设备进行直播");
        }
    }
}

function previewLive(id) {
//  window.open("http://e.vhall.com/"+id);
location.href="http://e.vhall.com/"+id+""
}

/**
 * Description：专辑列表
 * creed: Talk is cheap,show me the code
 * @author name：yuxin <br>email: yuruixin@ixincheng.com
 * @Date: 2018/2/2 0002 下午 9:09
 **/
function courseCollectionList(current){
    var multimediaType = $("#course_collection_type").val();
    var courseName = $("#course_collection_name").val();
    var url ="/anchor/course/getCollectionApplyList?size=10&current="+current;
    if(multimediaType!=null && multimediaType!=""){
        url += "&multimediaType="+multimediaType;
    }
    if(courseName!=null && courseName!=""){
        url += "&title="+courseName;
    }
//
    RequestService(url, "get", null, function(data) {

         if(!data.resultObject || !data.resultObject.records || data.resultObject.records.length == 0){
        $('#zhuanji_list').html('<div style="padding-top:40px;text-align:center"><img src="/web/images/other_noResult.png" alt="" /><p style="font-size:16px;color:#999;margin-top:35px">暂无专辑</p></div>');
        $('#zhuanji_list').removeClass('hide')
        }else{
        	var str = '<thead><tr><td>封面图</td><td>课程名称</td><td>价格</td><td>总集数</td><td>选集数</td><td>推荐</td><td>类型</td><td>审核状态</td><td>课程状态</td><td>操作</td></tr></thead><tbody id="collection_list"></tbody>';
        	$('#zhuanji_list').html(str);
        	$('#zhuanji_list').removeClass('hide')
        }
        $("#collection_list").html(template('course_collection_list_tpl', data.resultObject));
        
//
        //每次请求完数据就去渲染分页部分
        if (data.resultObject.pages > 1) {
            //分页判断
            $(".not-data").remove();
            $(".collection_pages").css("display", "block");
            $(".collection_pages .searchPage .allPage").text(data.resultObject.pages);
            $("#Pagination_collection").pagination(data.resultObject.pages, {
                num_edge_entries: 1, //边缘页数
                num_display_entries: 4, //主体页数
                current_page:current-1,
                callback: function (page) {
                    //翻页功能
                    courseCollectionList(page+1);
                }
            });
        } else {
            $(".collection_pages").css("display", "none");
        }
    });
}
var collectionCourseList;
function initCourse(multimediaType){

    RequestService("/anchor/course/getAllCourses?multimediaType="+multimediaType, "get", null, function(data) {
        var courses = data.resultObject;
        collectionCourseList = courses;
        var str="";
        for(var i=0;courses.length>i;i++){
            str += "<option value='"+courses[i].id+"'>"+courses[i].title+"</option>";
        }
        $("#course_select").html(str);
        $('.selectpicker_collection').selectpicker('refresh');
        $('.selectpicker_collection').selectpicker({
            'selectedText': 'cat',size:10
        });
    });
}





var courseArr;
function addCourse2Collection(){
    var csArr = $("#course_select").val();
    
    var courseNumer = $('.course_number').val();
    if(csArr!=null && csArr!=undefined && csArr!="" && courseNumer!=null &&
        courseNumer!=undefined && courseNumer!=""  && 
        csArr.length > courseNumer){
//  	alert("选中的选集数大于总集数,请酌情更改!");
		$(".course_null").removeClass("hide");
    	return;
    }
    courseArr = [];
    var k=1;
    for(var i in csArr){
        for(var j=0;j<collectionCourseList.length;j++){
            if(csArr[i]==collectionCourseList[j].id){
                collectionCourseList[j].collectionCourseSort=k;
                collectionCourseList[j].first=false;
                collectionCourseList[j].last=false;
                k++;
                courseArr.push(collectionCourseList[j]);
            }
        }
    }
    courseArr = upDownShowInit(courseArr);
    var arr={};
    arr.courseArr=courseArr;
    $(".collection_courses").html(template('collection_course_list_tpl', arr));
    $(".new_box").hide();
}
function upDownShowInit(arr){
    if(arr.length<1)return;
    for(var i=0;i<arr.length;i++){
        arr[i].first=false;
        arr[i].last=false;
    }
    arr[0].first=true;
    arr[arr.length-1].last=true;
    return arr;
}
function deleteCourse2Collection(id){
    var arrTemp=[];
    var k=1;
    for(var i=0;i < courseArr.length;i++){
        if(courseArr[i].id!=id){
            courseArr[i].collectionCourseSort=k;
            k++;
            arrTemp.push(courseArr[i]);
        }
    }
    arrTemp = upDownShowInit(arrTemp);
    courseArr=arrTemp;
    var arr={};
    arr.courseArr=courseArr;
    $(".collection_courses").html(template('collection_course_list_tpl', arr));
}
function upCourse2Collection(collectionCourseSort){
    for(var i=0;i < courseArr.length;i++){
        if(courseArr[i].collectionCourseSort==collectionCourseSort){
            var temp = courseArr[i];
            var tempI = i -1;
            courseArr[i]=courseArr[tempI];
            courseArr[tempI]=temp;
            courseArr[i].collectionCourseSort++;
            courseArr[tempI].collectionCourseSort--;
        }
    }
    courseArr = upDownShowInit(courseArr);
    var arr={};
    arr.courseArr=courseArr;
    $(".collection_courses").html(template('collection_course_list_tpl', arr));
}
function downCourse2Collection(collectionCourseSort){
    for(var i=0;i < courseArr.length;i++){
        if(courseArr[i].collectionCourseSort==collectionCourseSort){
            var temp = courseArr[i];
            courseArr[i]=courseArr[i+1];
            courseArr[i+1]=temp;
            courseArr[i].collectionCourseSort--;
            courseArr[i+1].collectionCourseSort++;
        }
    }
    courseArr = upDownShowInit(courseArr);
    var arr={};
    arr.courseArr=courseArr;
    $(".collection_courses").html(template('collection_course_list_tpl', arr));
}

function saveCollection(){
	
    var collection = getCollectionData();

//    collection.courseNumber = $.trim($('.course_number').val());
//    collection.courseApplyInfos = courseArr;
    
    //var courseNumer = $('.course_number').val();
    if(collection.courseApplyInfos!=null && collection.courseApplyInfos!="" && 
       collection.courseApplyInfos!=undefined && 
       collection.courseNumber!=null && collection.courseNumber!=undefined && 
       collection.courseNumber!="" && 
       collection.courseApplyInfos.length > collection.courseNumber){
//      alert("选中的选集数量大于总集数,请酌情更改!");
		showTip("选中的选集数量大于总集数,请酌情更改!")
        return;
    }

    if(verifyCollection(collection)){
        if($("#collectionId").val()==null||$("#collectionId").val()==''){
            addCollection(collection);
        }else{
            updateCollection(collection);
        }
    }
}
function addCollection(collection){
    collection.collection=true;
    collection.courseForm=2;
    $.ajax({
        type: "post",
        url: bath + "/anchor/course/saveCollectionApply",
        data:JSON.stringify(collection),
        contentType:"application/json",
        async: false,
        success: function(data) {
            console.log(data);
            if(data.success === true) {
                showTip(data.resultObject);
                $("#zhuanji_bottom2").show();
                $("#zhuanji_bottom").hide();
                resetCollectionForm();
                courseCollectionList(1);
            } else {
                showTip(data.errorMessage)
            }
        }
    });
}
function updateCollection(collection){
    collection.collection=true;
    collection.courseForm=2;
    $.ajax({
        type: "post",
        url: bath + "/anchor/course/updateCollectionApply",
        data:JSON.stringify(collection),
        contentType:"application/json",
        async: false,
        success: function(data) {
            console.log(data);
            if(data.success === true) {
                showTip(data.resultObject);
                $("#zhuanji_bottom2").show();
                $("#zhuanji_bottom").hide();
                resetCollectionForm();
                courseCollectionList(1);
            } else {
                showTip(data.errorMessage)
            }
        }
    });
}

function getCollection4Update(collectionId){
    var collection;
    RequestService("/anchor/course/getCourseApplyById?caiId="+collectionId, "get", null, function(data) {
        collection = data.resultObject;
    },false);
    return collection;
}
function editCollection(collectionId){
    resetCollectionForm();
    if(echoCollection(collectionId)){
        $("#zhuanji_bottom2").hide();
        $("#zhuanji_bottom").show();
        clearAlbumError()
    }else{
        showTip("专辑发生变化了，请刷新列表");
    }
}
function clearAlbumError(){
	$("#zhuanji_bottom .warning").addClass("hide");
	$("#zhuanji_bottom input").removeClass("active-border");
}
function echoCollection(collectionId,passEdit){
    var collection = getCollection4Update(collectionId);
    //若该申请已通过，且点进方法的页面显示未通过，给出提示  //暂时关闭该校验
    // if(collection.status==1 && !passEdit)return false;
    $('#collectionId').val(collection.id)
    $('.collection_title').val(collection.title);
    $('.collection_subtitle').val(collection.subtitle);
    $('#collectionImg').html('<img src="" >'+'<p>点击图片重新上传</p>');
    $('#collectionImg img').attr('src',collection.imgPath+"?imageMogr2/thumbnail/!260x147r|imageMogr2/gravity/Center/crop/260x147");
    $('.collection_lecturer ').val(collection.lecturer);
    UE.getEditor('editor_collection_lecturer_description').setContent(collection.lecturerDescription);
    $('#menu_select_collection').val(collection.courseMenu);
    $('.collection_price').val(collection.price);
    UE.getEditor('editor_collection_details').setContent(collection.courseDetail);
    UE.getEditor('editor_collection_outline').setContent(collection.courseOutline);
    $('.course_number').val(collection.courseNumber);
    $("input:radio[name=collection_multimedia_type][value="+collection.multimediaType+"]").prop("checked",true);
    initCourse(collection.multimediaType);
    courseArr = collection.courseApplyInfos;
    courseArr = upDownShowInit(courseArr);
    if (collection.updateDates && collection.updateDates.length > 0) {
        var updateDates = collection.updateDates;
        $('.div_one').each(function(){
            var $this = $(this);
            var number = $this.data('number');
            if (updateDates.indexOf(number) != -1) {
                $this.addClass("div_one0");
            }
        });
    }
    var arr={};
    arr.courseArr=courseArr;
    $(".collection_courses").html(template('collection_course_list_tpl', arr));
    return true;
}
var albumPicUrl;
function getCollectionData(){	
    var collection = {};
    var imgAlbumLength=$('#collectionImg img');
		if(imgAlbumLength.length!=0){
    		albumPicUrl=imgAlbumLength.attr("src").split("?")[0];
    	}else{
    		albumPicUrl="";
    	}
    collection.id = $.trim($('#collectionId').val());
    collection.version = $.trim($('#collection_version').val());
    collection.title = $.trim($('.collection_title').val());
    collection.subtitle = $.trim($('.collection_subtitle').val());
    collection.imgPath = albumPicUrl;
    collection.lecturer = $.trim($('.collection_lecturer ').val());
    collection.lecturerDescription = getCollectionLecturerDescription()
    collection.courseMenu = $.trim($('#menu_select_collection').val());
    collection.price = $.trim($('.collection_price').val());
    collection.courseDetail = getCollectionDetails();
    collection.courseOutline = getCollectionOutline();
    collection.courseNumber = $.trim($('.course_number').val());
    collection.courseApplyInfos = courseArr;
    collection.updateDates = getWeekArr();
    collection.multimediaType = $("input[name='collection_multimedia_type']:checked").val();
    return collection;
}

function getWeekArr(){
	var weekArr = [];
			$('#times_div .div_one0').each(function(){
				weekArr.push($(this).attr("data-number"));
			})
			return weekArr;
	}

function verifyCollection(collection){
	var collectName=/^[a-zA-Z\u4e00-\u9fa5,，\x20]+$/;
    $(".warning").addClass("hide");
    $("#zhuanji_bottom input").removeClass("active-border")
    //课程标题
    if(collection.title == ''){
        $('.warning_collection_title').removeClass('hide');
        $('.warning_collection_title').siblings("input").addClass("active-border");
        return false;
    }else{
        $('.warning_collection_title').addClass('hide');
    }
    if(collection.title.length>30){
        $('.warning_collection_title_length').removeClass('hide');
        $('.warning_collection_title_length').siblings("input").addClass("active-border");
        
        return false;
    }else{
        $('.warning_collection_title_length').addClass('hide');
    }
    //副标题
    if(collection.subtitle == ''){
        $('.warning_collection_subtitle').removeClass('hide');
        $('.warning_collection_subtitle').siblings("input").addClass("active-border");
        return false;
    }else{
        $('.warning_collection_subtitle').addClass('hide');
    }
    //副标题
    if(collection.subtitle.length>30){
        $('.warning_collection_subtitle_length').removeClass('hide');
        $('.warning_collection_subtitle_length').siblings("input").addClass("active-border");
        return false;
    }else{
        $('.warning_collection_subtitle_length').addClass('hide');
    }
    //封面图
    if(collection.imgPath == ''){
        $('.warning_collection_imgPath ').removeClass('hide');
        return false;
    }else{
        $('.warning_collection_imgPath').addClass('hide');
    }
    //主播姓名
    if(collection.lecturer == ''){
        $('.warning_collection_lecturer').removeClass('hide');
        $('.warning_collection_lecturer').siblings("input").addClass("active-border");
        return false;
    }else{
        $('.warning_collection_lecturer').addClass('hide');
    }
    if(collection.lecturer.substr(collection.lecturer.length-1,1)== "，"){
        $('.warning_collection_lecturer_length').removeClass('hide');
        $('.warning_collection_lecturer_length').siblings("input").addClass("active-border");
        return false;
    }else{
        $('.warning_collection_lecturer_length').addClass('hide');
    }
    if (!collectName.test(collection.lecturer)) {
    	$('.warning_collection_lecturer_length').removeClass('hide');
        $('.warning_collection_lecturer_length').siblings("input").addClass("active-border");
        return false;
    } else{
    	$('.warning_collection_lecturer_length').addClass('hide');
    }
    //主播介绍
    if(collection.lecturerDescription == ''){
        $('.warning_collection_lecturer_description').removeClass('hide');
        return false;
    }else{
        $('.warning_collection_lecturer_description').addClass('hide');
    }
    //时长数值校验
    // if(!numberCk(collection.courseLength)){
    //     $('.warning_collection_length_Illegal').removeClass('hide');
    //     return false;
    // }else{
    //     $('.warning_collection_length_Illegal').addClass('hide');
    // }
    //价格
    if(collection.price == ''){
        $('.warning_collection_price').removeClass('hide');
        $('.warning_collection_price').siblings("input").addClass("active-border");
        return false;
    }else{
        $('.warning_collection_price').addClass('hide');
    }
    //价格数值校验
    if(!numberCk(collection.price)){
        $('.warning_collection_price_Illegal').removeClass('hide');
        $('.warning_collection_price_Illegal').siblings("input").addClass("active-border");
        return false;
    }else{
        $('.warning_collection_price_Illegal').addClass('hide');
    }
    //课程详情
    if(collection.courseDetail == ''){
        $('.warning_collection_details').removeClass('hide');
        return false;
    }else{
        $('.warning_collection_details').addClass('hide');
    }
    //课程大纲
    if(collection.courseOutline == ''){
        $('.warning_collection_outline').removeClass('hide');
        return false;
    }else{
        $('.warning_collection_outline').addClass('hide');
    }

    //总集数
    if(collection.courseNumber == ''){
        $('.warning_coursenumber').removeClass('hide');
        $('.warning_coursenumber').siblings("input").addClass("active-border");
        return false;
    }else{
        $('.warning_coursenumber').addClass('hide');
    }
//  更新时间
 	if(collection.updateDates == '' || collection.updateDates.length==0){
        $('.warning002').removeClass('hide');
        return false;
    }else{
        $('.warning002').addClass('hide');
    }
	
    //课程
    if(collection.courseApplyInfos == null ||collection.courseApplyInfos.length<1){
        $('.warning_course').removeClass('hide');
        return false;
    }else{
        $('.warning_course').addClass('hide');
    }
    // if(collection.courseNumber != collection.courseApplyInfos.length){
    //     $('.warning_course_count').removeClass('hide');
    //     return false;
    // }else{
    //     $('.warning_course_count').addClass('hide');
    // }
    return true;
}
function resetCollectionForm(){
    document.getElementById("collectionForm").reset();
    $("#collection_version").val(new Date().getTime());
    UE.getEditor('editor_collection_details').setContent('');
    UE.getEditor('editor_collection_outline').setContent('');
    UE.getEditor('editor_collection_lecturer_description').setContent('');
    $("#collectionId").val("");
    $("#collectionImg").html("");
    $(".collection_courses").html("");
    $(".div_one").removeClass("div_one0");
    courseArr=[];
	showPersonInf2();
    initCourse(1);
}

//显示专辑中的主播信息
function showPersonInf2(){
   RequestService("/anchor/info", "get",null, function(data) {
    $('.collection_lecturer').val(data.resultObject.name);
   	UE.getEditor('editor_collection_lecturer_description').setContent(data.resultObject.detail);
   });
    RequestService("/template/course_detail.html", "get",null, function(data) {
        UE.getEditor('editor_collection_details').setContent(data);
        UE.getEditor('editor_collection_outline').setContent(data);
    },false);
}



function initCourseSelect(){
	$(".course_null").addClass("hide");
    var csArr=[];
    		
    //添加 false
    var  isAddOrUpdate= false;
    if($("#collectionId").val()==null||$("#collectionId").val()==''){
        isAddOrUpdate = true;
    }else{
        isAddOrUpdate = false;
    }
    
    var courseNumer = $('.course_number').val();
    if(isNotBlank(courseNumer) && isNotBlank(courseArr) &&
        courseArr.length >= courseNumer && !isAddOrUpdate){
        showTip("此专辑已更新完毕(选集数等于总集数)！请酌情修改");
        return;
    }
    
    if(courseArr==null)courseArr={};
    for(var i=0;i < courseArr.length;i++){
        csArr.push(courseArr[i].id);
    }
    
    $('.selectpicker_collection').selectpicker('val',(csArr));
    $('.selectpicker_collection').selectpicker('refresh');
    $(".new_box").show();
}
/**
 * Description：资源列表
 * creed: Talk is cheap,show me the code
 * @author name：yuxin <br>email: yuruixin@ixincheng.com
 * @Date: 2018/2/2 0002 下午 9:09
 **/
function courseResourceList(current){
    var url ="/anchor/course/getCourseResourceList?size=10&current="+current;
    //
    RequestService(url, "get", null, function(data) {
        $("#resource_list").html(template('course_resource_list_tpl', data.resultObject));
        if(!data.resultObject || !data.resultObject.records || data.resultObject.records.length == 0){
        	$('#ziyuan_bottom2 > table').addClass('hide')
        	$('#ziyuan_bottom2 > div').removeClass('hide')
//      $('#ziyuan_bottom2').append('<div style="padding-top:40px;text-align:center"><img src="/web/images/other_noResult.png" alt="" /><p style="font-size:16px;color:#999;margin-top:35px">暂无资源</p></div>');
//       	$('#ziyuan_bottom2').removeClass('hide')
        }else{
        	$('#ziyuan_bottom2 > div').addClass('hide')
        	$('#ziyuan_bottom2 > table').removeClass('hide')
//      	$('#ziyuan_bottom2').html('<table><thead><tr><td>标题</td><td>时长</td><td>创建时间</td><td>状态</td><td>类型</td><td>操作</td></tr></thead><tbody id="resource_list"></tbody></table>');
//      	 $('#ziyuan_bottom2').removeClass('hide')
        }

        //
        //每次请求完数据就去渲染分页部分
        if (data.resultObject.pages > 1) {
            //分页判断
            $(".not-data").remove();
            $(".resource_pages").css("display", "block");
            $(".resource_pages .searchPage .allPage").text(data.resultObject.pages);
            $("#Pagination_resource").pagination(data.resultObject.pages, {
                num_edge_entries: 1, //边缘页数
                num_display_entries: 4, //主体页数
                current_page:current-1,
                callback: function (page) {
                    //翻页功能
                    courseResourceList(page+1);
                }
            });
        } else {
            $(".collection_pages").css("display", "none");
        }
    });
}

function deleteResource(resourceId){
    var title="删除";
    var content="确认删除该资源？";
    confirmBox1(title,content,function(closefn){
        $.ajax({
            type: "post",
            url: bath + "/anchor/course/deleteCourseResource",
            data:"resourceId="+resourceId,
            async: false,
            success: function(data) {
                closefn();
                if(data.success === true) {
                    showTip(data.resultObject);
                    courseResourceList(1);
                } else {
                    showTip(data.errorMessage)
                }
            }
        });
    });
}
//点击选择资源
function resourcePre(){
    $('.a_resource').show();
}
function showResourceList(){
    courseResourceList(1);
    $(".resource_one").hide();
    $(".resource_two").show();
}

$(function () {
    //添加资源
    $('#ziyuan_bottom .baocun #submit').click(function(){
        saveResource();
    })
});

function saveResource(){
    if(validateResource()){
        //
        var data = {};
        data.title = $.trim($('#ziyuan_bottom .zhuanlan_title').val());
        data.resource = $.trim($('#ccId').val());
        data.multimediaType = $("input[name='resource_multimediaType']:checked").val();
        var resourceIdData = data.resource;
        $.ajax({
            type: "post",
            url: bath + "/anchor/course/saveCourseResource",
            data:JSON.stringify(data),
            contentType:"application/json",
            async: false,
            success: function(data) {
                console.log(data);
                if(data.success === true) {
                    //更新时长
                    RequestService("/videoRes/ifUploaded", "GET",{ccId:resourceIdData}, function(data) {

                    })
                    showTip(data.resultObject);
                    showResourceList();
                } else {
                    showTip(data.errorMessage)
                }
            }
        });
    }
}
function validateResource(){
    var title = $.trim($('#ziyuan_bottom .zhuanlan_title').val());
    var resource = $.trim($('#ccId').val());
    //资源标题
    if(title == ''){
        $('#ziyuan_bottom .warning0').removeClass('hide');
        return false;
    }else{
        $('#ziyuan_bottom .warning0').addClass('hide');
    }
    if(title.length>30){
        $('.warning_resource_title_length').removeClass('hide');
        return false;
    }else{
        $('.warning_resource_title_length').addClass('hide');
    }

    //资源文件
    if(resource == ''){
        $('#ziyuan_bottom .warning1').html("请先上传资源文件");
        $('#ziyuan_bottom .warning1').removeClass('hide');
        return false;
    }else  if(!uploadfinished){
        $('#ziyuan_bottom .warning1').html("资源文件未上传完成");
        $('#ziyuan_bottom .warning1').removeClass('hide');
        return false;
    }else{
        $('#ziyuan_bottom .warning1').addClass('hide');
    }
    return true;
}
/**
 * Description：初始化资源下拉框
 * creed: Talk is cheap,show me the code
 * @author name：yuxin <br>email: yuruixin@ixincheng.com
 * @Date: 2018/2/2 0002 下午 9:09
 **/
var resources
function initResource(multimediaType,nv){
    RequestService("/anchor/course/getAllCourseResources?multimediaType="+multimediaType, "get", null, function(data) {
        resources = data.resultObject;
        var str = "";
        if(nv){
            str="<option value=''>选择一个视频</option>";
        }
        for(var i=0;resources.length>i;i++){
        	if (resources[i].length== null || resources[i].length== ""  || resources[i].length== -1) {
        		 str += "<option disabled='disabled' style='background:#ececec;' value='"+resources[i].id+"' data-length='"+resources[i].length+"'>"+resources[i].title+" 转码中</option>";
       
        	}else{
        		str += "<option value='"+resources[i].id+"' data-length='"+resources[i].length+"'>"+resources[i].title+"</option>";
        	}
            
        }
        $("#id_select").html(str);
        $('.course_resource').selectpicker('refresh');
        $('.course_resource').selectpicker({
            'selectedText': 'cat',size:10
        });
        $("#speech_select").html(str);
        $('.selectpicker').selectpicker('refresh');
        $('.selectpicker').selectpicker({
            'selectedText': 'cat',size:10
        });
        resourcesSelect()
    },false);
}

function resourcesSelect(){
		var resourcesValue=$("#id_select").val();
		for(var i=0;resources.length>i;i++){
			if (resources[i].id== resourcesValue) {
				$(".course_length").val(resources[i].length);
				return false
			}else{
				$(".course_length").val("");
			}
		}
	}


/**
 * Description：初始化菜单
 * creed: Talk is cheap,show me the code
 * @author name：yuxin <br>email: yuruixin@ixincheng.com
 * @Date: 2018/2/3 0003 上午 11:07
 **/
function initMenu(){
    RequestService("/menu/getAllMenu?type=1", "get", null, function(data) {
        var menus = data.resultObject;
        var str="";
        for(var i = 0;i < menus.length;i++){
        	 if(menus[i].id!=1){
                str += "<option value='"+menus[i].id+"'>"+menus[i].name+"</option>"
            }
        }
//      for(var i in menus){
//          if(menus[i].id!=1){
//              str += "<option value='"+menus[i].id+"'>"+menus[i].name+"</option>"
//          }
//      }
        $("#menu_select").html(str);
        $("#menu_select_collection").html(str);
    });
}

function initVhallInfo(){
    RequestService("/anchor/course/getVhallInfo", "get", null, function(data) {
        $("#vhallAccount").html(data.resultObject.vhallAccount);
        $("#vhallPassword").html(data.resultObject.password);
    });
}
//上传图片调用的接口
function picUpdown(form,imgname){
    $.ajax({
        type: 'post',
        url: "/medical/common/upload",
        data: form,
        cache: false,
        processData: false,
        contentType: false
    }).success(function (data) {
        $('#'+imgname+'').html('<img src="'+data.resultObject+'?imageMogr2/thumbnail/!260x147r|imageMogr2/gravity/Center/crop/260x147" style="width: 100%;height: 100%" >'+'<p>点击图片重新上传</p>');
        $(".row_size").hide();
    });

}

$(function(){
    /**
     * Description：课程封面
     * creed: Talk is cheap,show me the code
     * @author name：yuxin <br>email: yuruixin@ixincheng.com
     * @Date: 2018/2/2 0002 下午 9:12
     **/
    $('#courseImgPath').on('change',function(){
        //
    	if(this.files[0].size > 2097152){
		showTip('上传图片不能大于2M')
			return false;
		}
    	if(!(this.files[0].type.indexOf('image')==0 && this.files[0].type && /\.(?:jpg|png|gif)$/.test(this.files[0].name))){
    		showTip('图片格式不正确')
			return false;
    	}
        var form = new FormData();
        form.append("image", this.files[0]);
        var reader=new FileReader();
        reader.onload=function(e){
            picUpdown(form,'courseImg');
        }
        reader.readAsDataURL(this.files[0])
    })
    $('#collectionImgPath').on('change',function(){
        //
        if(this.files[0].size > 2097152){
		showTip('上传图片不能大于2M')
			return false;
		}
        if(!(this.files[0].type.indexOf('image')==0 && this.files[0].type && /\.(?:jpg|png|gif)$/.test(this.files[0].name))){
    		showTip('图片格式不正确')
			return false;
    	}
        var form = new FormData();
        form.append("image", this.files[0]);
        var reader=new FileReader();
        reader.onload=function(e){
            picUpdown(form,'collectionImg');
        }
        reader.readAsDataURL(this.files[0])
    })
    $('#cardPositiveImgPath').on('change',function(){
        //
        if(this.files[0].size > 2097152){
			showTip('上传图片不能大于2M')
			return false;
		}
        if(!(this.files[0].type.indexOf('image')==0 && this.files[0].type && /\.(?:jpg|png|gif)$/.test(this.files[0].name))){
    		showTip('图片格式不正确')
			return false;
    	}
        var form = new FormData();
        form.append("image", this.files[0]);
        var reader=new FileReader();
        reader.onload=function(e){
            picUpdown(form,'cardPositiveImg');
        }
        reader.readAsDataURL(this.files[0])
    })
    $('#cardNegativeImgPath').on('change',function(){
        //
        if(this.files[0].size > 2097152){
		showTip('上传图片不能大于2M')
			return false;
		}
        if(!(this.files[0].type.indexOf('image')==0 && this.files[0].type && /\.(?:jpg|png|gif)$/.test(this.files[0].name))){
    		showTip('图片格式不正确')
			return false;
    	}
        var form = new FormData();
        form.append("image", this.files[0]);
        var reader=new FileReader();
        reader.onload=function(e){
            picUpdown(form,'cardNegativeImg');
        }
        reader.readAsDataURL(this.files[0])
    })
    $('#qualificationCertificateImgPath').on('change',function(){
        //
        if(this.files[0].size > 2097152){
		showTip('上传图片不能大于2M')
			return false;
		}
        if(!(this.files[0].type.indexOf('image')==0 && this.files[0].type && /\.(?:jpg|png|gif)$/.test(this.files[0].name))){
    		showTip('图片格式不正确')
			return false;
    	}
        var form = new FormData();
        form.append("image", this.files[0]);
        var reader=new FileReader();
        reader.onload=function(e){
            picUpdown(form,'qualificationCertificateImg');
        }
        reader.readAsDataURL(this.files[0])
    })
    $('#professionalCertificateImgPath').on('change',function(){
        //
        if(this.files[0].size > 2097152){
			showTip('上传图片不能大于2M')
			return false;
		}
        if(!(this.files[0].type.indexOf('image')==0 && this.files[0].type && /\.(?:jpg|png|gif)$/.test(this.files[0].name))){
    		showTip('图片格式不正确')
			return false;
    	}
        var form = new FormData();
        form.append("image", this.files[0]);
        var reader=new FileReader();
        reader.onload=function(e){
            picUpdown(form,'professionalCertificateImg');
        }
        reader.readAsDataURL(this.files[0])
    })
    $('#businessLicensePictureImgPath').on('change',function(){
        //
        if(this.files[0].size > 2097152){
			showTip('上传图片不能大于2M')
			return false;
		}
        if(!(this.files[0].type.indexOf('image')==0 && this.files[0].type && /\.(?:jpg|png|gif)$/.test(this.files[0].name))){
    		showTip('图片格式不正确')
			return false;
    	}
        var form = new FormData();
        form.append("image", this.files[0]);
        var reader=new FileReader();
        reader.onload=function(e){
            picUpdown(form,'businessLicensePictureImg');
        }
        reader.readAsDataURL(this.files[0])
    })
    $('#licenseForPharmaceuticalTradingPictureImgPath').on('change',function(){
        //
        if(this.files[0].size > 2097152){
			showTip('上传图片不能大于2M')
			return false;
		}
        if(!(this.files[0].type.indexOf('image')==0 && this.files[0].type && /\.(?:jpg|png|gif)$/.test(this.files[0].name))){
    		showTip('图片格式不正确')
			return false;
    	}
        var form = new FormData();
        form.append("image", this.files[0]);
        var reader=new FileReader();
        reader.onload=function(e){
            picUpdown(form,'licenseForPharmaceuticalTradingPictureImg');
        }
        reader.readAsDataURL(this.files[0])
    })
//  诊疗直播
	$('#medicalImgPath').on('change',function(){
        //
        if(this.files[0].size > 2097152){
			showTip('上传图片不能大于2M')
			return false;
		}
        if(!(this.files[0].type.indexOf('image')==0 && this.files[0].type && /\.(?:jpg|png|gif)$/.test(this.files[0].name))){
    		showTip('图片格式不正确')
			return false;
    	}
        var form = new FormData();
        form.append("image", this.files[0]);
        var reader=new FileReader();
        reader.onload=function(e){
            picUpdown(form,'medical-img');
        }
        reader.readAsDataURL(this.files[0])
    })
//  头像
    $('#profilePhotoImgPath').on('change',function(){
        //
        if(this.files[0].size > 2097152){
        	showTip('上传图片不能大于2M')
			return false;
		}
        if(!(this.files[0].type.indexOf('image')==0 && this.files[0].type && /\.(?:jpg|png|gif)$/.test(this.files[0].name))){
    		showTip('图片格式不正确')
			return false;
    	}
        var form = new FormData();
        form.append("image", this.files[0]);
        var reader=new FileReader();
        reader.onload=function(e){
            picUpdownHead(form,'profilePhotoImg');
        }
        reader.readAsDataURL(this.files[0])
    })
})
//头像上传,为了不添加上传提示,单独拿出来
function picUpdownHead(form,imgname){
    $.ajax({
        type: 'post',
        url: "/medical/common/upload",
        data: form,
        cache: false,
        processData: false,
        contentType: false
    }).success(function (data) {
        $('#'+imgname+'').html('<img src="'+data.resultObject+'?imageMogr2/thumbnail/!120x120r|imageMogr2/gravity/Center/crop/120x120" >');
        $(".row_size").hide();
    });

}

function openRecordSet(courseId,isRecord) {
    $("#mask").removeClass("hide");
    $(".history-live").removeClass("hide");
    $(".record-course-id").val(courseId);
    $(".radio-select li").find("em").removeClass("active");
    $(".isrecord"+isRecord).addClass("active");
}

function closeRecordSet() {
    $("#mask").addClass("hide");
    $(".history-live").addClass("hide");
}

function saveRecordSet(){
    var courseId = $(".record-course-id").val();
    var isRecord = $(".isrecord.active").attr("data-record");
    RequestService("/anchor/course/" + courseId + "/record/" + isRecord , "POST", null, function (data) {
        if (data.success == true) {
            showTip("操作成功");
            courseLiveList(1);
            closeRecordSet();
        } else {
            showTip("操作失败");
        }
    })
}
//诊疗直播
function getMedicalData(courseId){
    var medical;
    RequestService("/anchor/course/getCourseApplyById?caiId="+courseId, "get", null, function(data) {
        medical = data.resultObject;
    },false);
    return medical;
}
//诊疗回显
function editMedical(courseId,appointId,index){
	clearMedical()
	var medical=getMedicalData(courseId);
	$(".medical-edit-name input").val(medical.title);
	$('#medical-img').html('<img src="">'+'<p>点击图片重新上传</p>');
    $('#medical-img img').attr('src',medical.imgPath+"?imageMogr2/thumbnail/!260x147r|imageMogr2/gravity/Center/crop/260x147");
    UE.getEditor('editor-medical').setContent(medical.courseDetail);
	$(".save-appointId").val(appointId);
	$(".save-courseId").val(courseId);
//	页面打开
	$(".curriculum_two").hide();
	$(".curriculum_three").show();
	$(".medical-save button").removeAttr("disabled");
}
//清空诊疗直播数据
function clearMedical(){
	$(".medical-edit-name input").val("");
	$("#medical-img").html("");
	UE.getEditor('editor-medical').setContent('');
	$(".save-appointId").val("");
	$(".save-courseId").val("");
}


//校验诊疗编辑数据
function checkMedical(medicalData){
	$(".warning").addClass("hide");
	if(medicalData.title==""){
		$(".warning_medical_title").removeClass("hide");
		return false;
	}else if($('#medical-img img').length == 0){
		$(".warning_medical_img").removeClass("hide");
		return false;
	}else if(medicalData.lecturerDescription==""){
		$(".warning_medical_introduce").removeClass("hide");
		return false;
	}
	return true;
}

//保存诊疗编辑
function btnMedical(){
	var appointId=$(".save-appointId").val();
	var	courseId=$(".save-courseId").val();
    var imgMedicalLength=$('#medical-img img');
    var medicalPicUrl;
	if(imgMedicalLength.length!=0){
		medicalPicUrl=imgMedicalLength.attr("src").split("?")[0];
	}else{
		medicalPicUrl="";
	}
	var medicalData={};
	medicalData.title=$.trim($(".medical-edit-name input").val());
	medicalData.imgPath=medicalPicUrl;
	medicalData.courseDetail=UE.getEditor('editor-medical').getContent();
	medicalData.appointmentInfoId=appointId;
	medicalData.id=courseId;	
	if(checkMedical(medicalData)){ 
		$(".medical-save button").attr("disabled","disabled");
		RequestJsonService("/anchor/course/updateCourseApply","post",JSON.stringify(medicalData) , function (data) {
        	  if(data.success === true) {
	                showTip(data.resultObject);
	                setTimeout(function(){ getCourseList()  }, 2000);
	            } else {
	                showTip(data.errorMessage);
	                $(".medical-save button").removeAttr("disabled");
	            }
        })	    	    
	}
}






