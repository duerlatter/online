var loginUserId = "";
var loginStatus = true;
var smallHeadPhoto = "";

//判断有没有登录
RequestService("/online/user/isAlive", "GET", null, function (data) {
    if (data.success) {
        loginUserId = data.resultObject.id;
        smallHeadPhoto = data.resultObject.smallHeadPhoto;
        loginStatus = true;
    } else {
        loginStatus = false;
    }
}, false)

$(function () {

    var index = 0;

    var falg = false;
    if (collection == 1 && watchState == 0) { 		  //专辑付费，	         删除选集、显示大纲
        $(".buy_tab").remove();
        $(".no_buy_tab").removeClass("hide");
        falg = true;
    } else if (collection == 1 && watchState != 0) {  //专辑免费,已购买  显示选集、删除大纲
        $(".no_buy_tab").remove();
        $(".buy_tab").removeClass("hide");
        falg = true;
        index = 1;
    } else {										  //非专辑，删除选集和大纲  				
        $(".no_buy_tab").remove();   
        $(".buy_tab").remove();
    }
    
    
    //应该显示   --> bug号：5673 默认显示专辑
    if(type == "info" && collection == 1 && watchState != 0){
    	type =  "selection";
    }
    
    
    if (type == "info" || type == "albumInfo") {
        $(".wrap-sidebar ul li").eq(index).addClass("active-footer");
        
    }else  if (type == "selection") {
        index = 0;
        $(".wrap-sidebar ul li").eq(0).addClass("active-footer");
    
        if(!loginStatus){
        	
        	//干掉a连接
        	$(".wrap-anthology ul li a").each(function(){
        		$(this).attr("href","javascript:void(0)");
        	})
        	//点击时间
        	$(".wrap-anthology ul li a").click(function(){
        		$('#login').modal('show');
        	})
        }
    
    } else if (type == "outline") {
        index = 1;
        $(".wrap-sidebar ul li").eq(1).addClass("active-footer");
    } else if (type == "comment") {
    	
        falg ? index = 2 : index = 1;
        $(".wrap-sidebar ul li").eq(index).addClass("active-footer");

    } else if (type == "aq") {
        falg ? index = 3 : index = 2;
        $(".wrap-sidebar ul li").eq(index).addClass("active-footer");
    }
    $(".sidebar-content").addClass("hide").eq(index).removeClass("hide")

    //课程类型 1：视频 2：音频 3：直播 4：线下培训班
    if (courseForm == 3) {
        $(".under").css("color", "rgb(0, 188, 18)");
    } else if (courseForm == 1) {
        $(".broadcast").css("color", "rgb(0, 188, 18)");
    } else if (courseForm == 2) {
        $(".listen").css("color", "rgb(0, 188, 18)");
    }


//	详情/评价/常见问题	选项卡
    $(".wrap-sidebar ul li").click(function () {
        $(".wrap-sidebar ul li").removeClass("active-footer");
        $(this).addClass("active-footer");
        $(".sidebar-content").addClass("hide").eq($(this).index()).removeClass("hide")
    })


//购买课程
    $('.J-course-buy').on('click', function (e) {
        var $this = $(this);
        RequestService("/online/user/isAlive", "GET", null, function (data) {
            if (!data.success) {
                $('#login').modal('show');
            } else {
                var id = $this.data('id');
                $this.attr("disabled", "disabled");
                if (!id) {
                    showTip("无法获取课程id");
                }
                if (courseForm === 3) {//线下课，需要先填写报名信息
                    goOfflineApply(id);
                } else {
                    createOrder(id);
                }
            }
        });
    });

    function createOrder(id) {
        RequestService("/order/" + id, "POST", null, function (data) {
            if (data.success) {
                window.location.href = "/order/pay?orderId=" + data.resultObject;
            } else {
                showTip(data.errorMessage);
            }
        }, false);
    }

    function goOfflineApply(courseId) {
        location.href = "/courses/offlineApply?courseId=" + courseId;
    }

//	点击立即学习时，需要判断是否登录了
//	点击立即学习时，需要判断是否登录了
    $(".learning_immediately").click(function () {
//      var $this = $(this);
//      var watchState = $this.attr("data-watchState");
//      var type = $this.attr("data-type");
//      var collection = $this.attr("data-collection");
//      var realCourseId = $this.attr("data-realCourseId");
//      var learning = $this.attr("data-learning");
//      var cutoff = $this.attr("data-cutoff");
        var watchState;
        var type;
        var collection;
        var realCourseId;
        var learning;
        var cutoff;
        var status;
        var currentPrice;
        var lineState;
        /**
         * 判断是否登录了
         */
        RequestService("/online/user/isAlive", "GET", null, function (data) {
            if (!data.success) {
                $('#login').modal('show');
            } else {
            	 RequestService("/courses/courseStatus?courseId="+courseId, "GET", null, function (data) {
		         	if (data.success==true) {
		         		watchState=data.resultObject.watchState;
		         		type=data.resultObject.type;
		         		collection=data.resultObject.collection ? 1 : 0;
		         		realCourseId=data.resultObject.id;
						learning=data.resultObject.learning;
						cutoff=data.resultObject.cutoff;
						status=data.resultObject.status;
						currentPrice = data.resultObject.currentPrice;
						lineState = data.resultObject.lineState;
		         	}
		         },false)
            	
		         
            	if(status==0 && currentPrice > 0 && watchState != 2){
            		showTip("该课程已下架")
            		return false;
            	}
            	
              	if(status==0 && currentPrice <= 0 && learning != 1){
              		showTip("该课程已下架")
              		return false;
              	}
              	
              	if(status==0 && lineState==6){
            		showTip("该课程已下架")
            		return false;
            	}
            	 
                if (courseForm == 3) {      //线下课
                	//已购买   或者 免费以学习   或者  报名截止的
                    if (watchState == 2 || (watchState == 1 && learning == 1) || cutoff == 1) {
                        return;
                    }
                    
                    if (watchState == 1) {
                        goOfflineApply(realCourseId);
                    }
                }
                if (courseForm == 1) { //直播课
                    if(multimediaType == 1){
                        if(watchState == 1){
                            RequestService("/learnWatch/add", "POST", {
                                courseId:realCourseId,recordType:1
                            }, function(data) {
                                console.log("增加学习记录");
                            },false);
                        }
                        window.location.href = "/web/livepage/" + realCourseId;
                    }else if(multimediaType == 2){
                        $("#video-cover").removeClass("hide");
                        $(".video-live").removeClass("hide");
                    }
                } else if (courseForm == 2) {
                    if(watchState == 1){
                    	RequestService("/learnWatch/add", "POST", {
                    		courseId:realCourseId,recordType:1
                    	}, function(data) {
                    		console.log("增加学习记录");
                    	},false);
                    }
                    if (collection == 1) {
                    	/**
                    	 * 获取专辑最后一个播放到哪里了
                    	 */
                        var lastLiveKey = loginUserId + courseId + "lastLive";
                        var lastLiveCourseId = localStorage.getItem(lastLiveKey);
                        
                        if (lastLiveCourseId != null && lastLiveCourseId != "" && lastLiveCourseId != undefined) { //继续学习
                            window.location.href = "/web/html/ccvideo/liveVideoAlbum.html?collectionId=" + realCourseId + "&courseId=" + lastLiveCourseId;
                        } else {
                            window.location.href = "/web/html/ccvideo/liveVideoAlbum.html?collectionId=" + realCourseId + "&ljxx=ljxx";
                        }
                    } else {
                    	
                        window.location.href = "/web/html/ccvideo/video.html?courseId=" + realCourseId;
                    }
                }
            }
        });
    });


//  专辑判断播放到那个位置了
    if (collection == 1) {
        var lastLiveKey = loginUserId + courseId + "lastLive";
        var lastLiveCourseId = localStorage.getItem(lastLiveKey);
        if (lastLiveCourseId != null && lastLiveCourseId != "" && lastLiveCourseId != undefined) {
            //选集
            $(".play-album").each(function () {
                var $this = $(this);
                var courseId = $this.attr("data-courseId");
                if (lastLiveCourseId == courseId) {

                    var gradeName = $this.find("p").eq(0).text();
                    $(".immediately-buy").html("继续学习");
                    $(".remember-last").removeClass("hide");
                    $(".remember-last span").text(gradeName);
                    return false;
                }

            })
        }
    }
//判断进入条	
    /**
     * 得到这个记录，控制播放进度条
     */
    var key = loginUserId + courseId;
    var recordingList = localStorage.getItem(key);

    if (collection == 0 && recordingList != null) {  //单个课程
        //秒转换为分钟
        var lookRecord = parseFloat(recordingList) / 60
        var progressBar = (lookRecord / courseLength) * 100;
        if (progressBar > 100) {
            progressBar = 100;
        }
        $(".progress-bar-success").css("width", progressBar + "%");
        $(".progress").show();

        $(".immediately-buy").text("继续学习");

    } else if (recordingList != null) {				//专辑
        var key = loginUserId + courseId;
        if (recordingList != null || recordingList != undefined) {
            var re = new RegExp("%", "i");
            var fristArr = recordingList.split(re);
            var arr = [];
            for (var i = 0; i < fristArr.length; i++) {
                var arrI = fristArr[i];
                if (arrI != "") {
                    var obj = {}
                    var lalaArr = arrI.split("=");
                    obj[lalaArr[0]] = lalaArr[1];
                    arr.push(obj);
                }
            }
            console.log(arr);
            //进行循环啦
            
            $(".wrap-anthology .left").each(function () {
                var $this = $(this);
                var courseId = $this.attr("data-courseId");
                //分钟
                var timeLength = $this.attr("data-timeLength");
                var recording = 0;
                for (var i = 0; i < arr.length; i++) {
                    var json = arr[i];
                    for (var key in json) {
                        if (courseId == key) {
                            recording = json[key];
                            break;
                        }
                    }
                }
                if (recording <= 0) {
                    return true; //结束本地
                }
                var lookRecord = parseFloat(recording) / 60
                var	percent = (lookRecord / timeLength) * 100;

                if (percent > 100) {
                    percent = 100;
                }
                if (percent > 100) {
                    percent = 0;
                    $this.parent().removeClass('clip-auto');
                    $this.next().addClass('wth0');
                } else if (percent > 50) {
                    $this.parent().addClass('clip-auto');
                    $this.next().removeClass('wth0');
                }
                $this.css("-webkit-transform", "rotate(" + (18 / 5) * percent + "deg)");
                //添加视频播放百分比
                var finishVideoBox=$this.parent().parent().siblings(".play-album").find(".course-length").find("span");
               	var finishVideo=percent.toFixed(1);
               if (percent>0) {
                	finishVideoBox.removeClass("hide").html("已完成"+finishVideo+"%");
                } else{
                	finishVideoBox.addClass("hide")
                }
            })
        }else{
        	
        }
    }
});
$("#video-cover").click(function(){
    $(this).addClass("hide");
    $(".video-live").addClass("hide");
})

