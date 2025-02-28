

var vhallId = "";
var falg = 1;
var hostName ="";

/**
 * 初始化视频啦
 * @param videoId
 */
function chZJ(videoId){
	//获取开播时间和
    var map;
    requestService("/xczh/vhall/vhallJssdkVerify", {video:videoId}, function(data) {
    	map  = data.resultObject;
    },false)
    $("#video").html("");
    
    var weihouSignInfo ={
    		facedom: "#face",
            textdom: "#mywords",
            app_key: map.app_key,// 第三方app_key
            signedat: map.signedat,// 签名时间戳
            sign: map.sign,// 签名
            email: map.email,
            roomid: map.roomid,// 活动id
            account: map.account,// 第三方用户id
            username: map.username,// 用户昵称
            docContent: "#doc"
    }
    weihouSignInfo.videoContent="#video";
    VHALL_SDK.init(weihouSignInfo);
}

/**
 * 在聊天区域增加自定义的信息
 * @param content  内容
 * @param type 1 进入房间提示
 */
function liaoTianArea(content,type){
	 	var msg = null;
	    msg = VHALL_SDK.sendChat({
		      text: content
		});
	    var content ="";
	    if(type == 1){
	    	content = "进入直播间";
	    }
	    var room = VHALL_SDK.getRoominfo();
		if (msg && room.type == 1){
			var str = "<div class='coze_cen_ri'> "+
					"<div class='coze_cen_bg_ri'>"+
						"<span class='span_name'>"+msg.user_name+"：</span>"+content+""+
					" </div> "+
				" <div class='both'></div></div>";
        $("#chatmsg").append(str);  
		}
		$("#mywords").val('');
	    setTimeout(function(){
	    	  $(".chatmsg-box").mCustomScrollbar("scrollTop","bottom","0");
     },50);
}


/**
 * 加载请求视频
 */
$(document).ready(function() {
   
	$("#exchange").click(function(){
        $("#modal").show();
    });
    /**
	 * 播放线路
	 */
    $("#lines").on("click", 'li', function(){
        var _line = $(this).text();
        $(this).siblings('li').removeClass('active');
        $(this).addClass('active');
        VHALL_SDK.player.setPlayerLine(_line);
        $("#modal").hide();
    });
    /**
	 * 播放线路
	 */
    $("#definitions").on("click", 'li', function(){
        var _line = $(this).text();
        $(this).siblings('li').removeClass('active');
        $(this).addClass('active');
        VHALL_SDK.player.setPlayerDefinition(_line);
        $("#modal").hide();
    });
    $(".header").on('click', 'a', function(){
        var target = $(this).attr("data-target");
        $(".header a").removeClass('active');
        $(this).addClass('active');
        $(".tab-pane").removeClass("active");
        $("." + target).addClass('active');
    });
    $("#hideVideo").click(function(){
        $("#video").toggleClass("on");
        $("#doc").toggleClass("on");
    });
   
    /**
	 * [onChatMessage 直播收到聊天消息]
	 * 
	 * @param {[type]}
	 *            msg [object]
	 * @return {[type]} [description]
	 */
    VHALL_SDK.on('chatMsg', function(msg) {
    	var userName = msg.user_name;
    	if(msg.role == "host"){ //说明是主播
    		var hostName = sessionStorage.getItem("hostName");
    		userName = "<span class='span_zhubo'>主播</span>"+ (isNotBlank(hostName) ?  hostName : "");
    	}
    	var str = "<div class='coze_cen_ri'><div class='coze_cen_bg_ri'><span class='span_name'>"+userName+"：</span>"+msg.content+"</div><div class='both'></div></div>";
        
    	
    	$("#chatmsg").append(str);
        $(".chatmsg-box").mCustomScrollbar('update').mCustomScrollbar("scrollTop","bottom");
    });     
    VHALL_SDK.on('questionMsg', function(msg) {
        console.log('问答', msg);
        //$("#question-msg").append(question_template(msg));
        $(".question-msg-box").mCustomScrollbar('update').mCustomScrollbar('scrollTop', '99999');
    });
    VHALL_SDK.on('ready', function() {
        if (VHALL_SDK.getRoominfo().type == 1) {
            // 当前直播中
            VHALL_SDK.vhall_get_live_history_chat_msg();
            VHALL_SDK.vhall_get_live_history_question_msg();
        } else {
            // 当前不在直播
            VHALL_SDK.vhall_get_record_history_chat_msg();
        }
        /*
		 * 房间信息
		 */
        console.log(VHALL_SDK.getRoominfo());
        /*
		 * 用户信息
		 */
        console.log(VHALL_SDK.getRoominfo());
        var room  = VHALL_SDK.getRoominfo();
        if(room.type  == 3 || room.type  == 1){
            $(".chatmsg-box").mCustomScrollbar({
                scrollInertia: 200,
            	theme:"dark",
                axis:"y",
                onTotalScroll:"50px",
                alwaysTriggerOffsets:false,
                onTotalScrollBackOffse:"100px",
                onTotalScrollOffset:"100px",
                callbacks: {
                    onTotalScrollBack: function() {
                        var curr_page = parseInt($('#chatmsg').data('curr_page'));
                    	var curr_page = parseInt($("#chatmsg").data("curr_page"));
                        VHALL_SDK.vhall_get_record_history_chat_msg(curr_page+1);
                    }
                }
            });
        } 
    });
    /**
	 * [用户上线]
	 * 
	 * @param {[type]}
	 *            msg [description]
	 * @return {[type]} [description]
	 */
    VHALL_SDK.on('userOnline', function(msg) {
    	
    	
    	var userName = msg.user_name;
    	
        console.log("参与人数："+msg.data.attend_count);
        console.log("当前在线人数："+msg.data.concurrent_user);
    	
    	var content = "进入直播间";

    	var str = "<div class='coze_cen_ri'> "+
		"  <div class='coze_cen_bg_ri'> "+
		"<span class='span_name'>"+userName+"：</span>"+   //用户名
		"	"+content+"  "+
		" </div> "+
		" <div class='both'></div></div>";
    	
        $("#chatmsg").append(str);
        $(".chatmsg-box").mCustomScrollbar('update').mCustomScrollbar("scrollTop","bottom");
    	
        console.log(msg);
        
        var learndCount =  sessionStorage.getItem("learndCount");
        if(isNotBlank(learndCount) && isNotBlank(msg.data.attend_count)){
            learndCount = parseInt(learndCount) + parseInt(msg.data.attend_count);
        }
        /**
         * 当有人进来房间的时候，学习人数加1
         */
		$(".details_size span:eq(0)").html(learndCount);
        
    });
    /**
	 * [onUserOffline 用户下线]
	 * 
	 * @param {[type]}
	 *            msg [description]
	 * @return {[type]} [description]
	 */
    VHALL_SDK.on('userOffline', function(msg) {
  	
	  	var userName = msg.user_name;
	  	var content = "退出直播间";
	
	    console.log("参与人数："+msg.data.attend_count);
        console.log("当前在线人数："+msg.data.concurrent_user);
	  	
	  	var str = "<div class='coze_cen_ri'> "+
			"  <div class='coze_cen_bg_ri'> "+
			"<span class='span_name'>"+userName+"：</span>"+   //用户名
			"	"+content+"  "+
			" </div> "+
			" <div class='both'></div></div>";
  	
        $("#chatmsg").append(str);
        $(".chatmsg-box").mCustomScrollbar('update').mCustomScrollbar("scrollTop","bottom");
        console.log(msg);
        /**
         * 当有人进来房间的时候，学习人数加1
         */
        var learndCount =  sessionStorage.getItem("learndCount");
        if(isNotBlank(learndCount) && isNotBlank(msg.data.attend_count)){
            learndCount = parseInt(learndCount) + parseInt(msg.data.attend_count);
        }
        $(".details_size span:eq(0)").html(learndCount);
    });
    
    /**
	 * [onSendChatSuccess 消息发送回调事件]
	 * class="span_name"
	 * @return {[type]} [description]
	 */
    VHALL_SDK.on('sendChat', function(msg) {
    	
        console.log(msg);
    });
    /**
	 * [onSendChatSuccess 问答消息发送回调事件]
	 * 
	 * @return {[type]} [description]
	 */
    VHALL_SDK.on('sendQuestion', function(msg) {
        console.log(msg);
    });
    /**
	 * [onSendChatSuccess 直播禁言消息]
	 * 
	 * @return {[type]} [description]
	 */
    VHALL_SDK.on('disableChat', function(msg) {
        console.log('禁言', msg);
    });
    /**
	 * [onPermitChat 直播恢复禁言消息]
	 * 
	 * @param {[type]}
	 *            msg [description]
	 * @return {[type]} [description]
	 */
    VHALL_SDK.on('permitChat', function(msg) {
        console.log('恢复禁言', msg);
    });
    /**
	 * [onForbidChat 直播全体禁言消息]
	 * 
	 * @param {[type]}
	 *            msg [description]
	 * @return {[type]} [description]
	 */
    VHALL_SDK.on('forbidChat', function(msg) {
        console.log('全体禁言', msg);
    });
    /**
	 * [onKickout 直播踢出消息]
	 * 
	 * @param {[type]}
	 *            msg [description]
	 * @return {[type]} [description]
	 */
    VHALL_SDK.on('kickout', function(msg) {
        console.log('踢出', msg);
    });
    /**
	 * [onKickoutRestore 直播恢复踢出消息]
	 * 
	 * @param {[type]}
	 *            msg [description]
	 * @return {[type]} [description]
	 */
    VHALL_SDK.on('kickoutRestore', function(msg) {
        console.log('恢复踢出', msg);
    });
    VHALL_SDK.on('questionSwitch', function(msg) {
        if (msg.status == 1) {
            //alert('问答已开启');
        } else {
            //alert('问答已关闭');
        }
        
    });
    VHALL_SDK.on('streamOver', function(msg) {
        
    	//alert('活动已结束'+msg);   
    	//$("#video").html("");
		//$(".video_end_top").show(); 
    });
    VHALL_SDK.on('publishStart', function(msg) {
        //alert('活动开始推流'+msg);
        //如果活动开始了
        //$(".video_end_top0").hide();
    });

    
    
    VHALL_SDK.on('publishStart', function(msg) {
        //alert('活动开始推流'+msg);
        //如果活动开始了
        //$(".video_end_top0").hide();
    });
    
    var userInfo = "";
    VHALL_SDK.on('vhall_live_history_chat_msg', function(res) {
    	if(userInfo ==""){
    		userInfo = VHALL_SDK.getUserinfo();
    	}
        if (res.code == 200 ) {
        	var Name = localStorage.name;
            var str = '';
            
            for (var i = res.data.length - 1; i >= 0; i--) {
            	var item = res.data[i];
            	
            	var userName = item.user_name;
            	if(item.role == "host"){ //说明是主播
            		var hostName = sessionStorage.getItem("hostName");
            		userName = "<span class='span_zhubo'>主播</span>"+ (isNotBlank(hostName) ?  hostName : "");
            	}
        		 str += "<div class='coze_cen_ri'> "+
    			"  <div class='coze_cen_bg_ri'> "+
    			"<span class='span_name'>"+userName+"：</span>"+   //用户名
    			"	"+item.content+"  "+
    			" </div> "+
    			" <div class='both'></div></div>";
            }
            $("#chatmsg").append(str);
            setTimeout(function(){
            	$(".chatmsg-box").mCustomScrollbar('update').mCustomScrollbar("scrollTop","bottom","0");
            },50);
        }
    });
   
   
   
    VHALL_SDK.on('vhall_record_history_chat_msg', function(res) {
    	
    	if(userInfo ==""){
    		userInfo = VHALL_SDK.getUserinfo();
    	}
    	if (res.code == 200 ) {
    		var Name = localStorage.name;
            var e = '';
            
            $("#chatmsg").data('curr_page', res.curr_page);
            for (var i = res.data.length - 1; i >= 0; i--) {
            	var item = res.data[i];
            	var userName = item.user_name;
            	if(item.role == "host"){ //说明是主播
            		var hostName = sessionStorage.getItem("hostName");
            		userName = "<span class='span_zhubo'>主播</span>"+ (isNotBlank(hostName) ?  hostName : "");
            	}
        		 e += "<div class='coze_cen_ri'> "+
    			"  <div class='coze_cen_bg_ri'> "+
    			"<span class='span_name'>"+userName+"：</span>"+   //用户名
    			"	"+item.content+"  "+
    			" </div> "+
    			" <div class='both'></div></div>";
            }
            
			1 == res.curr_page 
			? ($("#chatmsg").html(e), 
					setTimeout(function() {
				       $(".chatmsg-box").mCustomScrollbar("update").mCustomScrollbar("scrollTop", "999999")
					}, 50)) 
			: ($("#chatmsg").prepend(e), $(".chartlist").mCustomScrollbar("update").mCustomScrollbar("scrollTop", "20px"))
        }
    });
    /**
	 * 问答历史
	 */
    VHALL_SDK.on('getQuestionList', function(res) {
        if (res.code == 200 ) {
            var str = '';
            for (var i = res.data.length - 1; i >= 0; i--) {
                //str += question_template(res.data[i]);
            }
            $("#question-msg").append(str);
            setTimeout(function(){
                $(".chatmsg-box").mCustomScrollbar('update').mCustomScrollbar('scrollTop', '999999');
            },50);
        }
    });
   
    
    /**
	 * 获取自定义消息的通知
	 */
    VHALL_SDK.on('customEvent', function(res) {
       
    	console.log(res);
    });
    
    $("#sendChat").click(function() {
        $(".coze_bottom").css("bottom", "0rem");  //这是输入框在最底部,添加到其他文件不起作用
	    var text = $("#mywords").val();
	    giftDsPuTong(text);
	    
	    
	    //  自定义消息的使用  sendCustomEvent(data)
	    VHALL_SDK.sendCustomEvent({
		      name: "yangxuan",sex:"男"
		});
	    
    });
    
    /**
     * 普通聊天、发送礼物、打赏要显示的
     * 在评论区应该显示的内容
     */
    function giftDsPuTong(content){
        var userInfo  = VHALL_SDK.getUserinfo();
        var msg = null;
 	    msg = VHALL_SDK.sendChat({
 		      text: content
 		});
 	    var room = VHALL_SDK.getRoominfo();
 		if (msg && room.type == 1){
 			var str = "<div class='coze_cen_ri'> "+
						"<div class='coze_cen_bg_ri'>"+
							"<span class='span_name'>"+msg.user_name+"：</span>"+msg.content+""+
						" </div> "+
					" <div class='both'></div></div>";
	        $("#chatmsg").append(str);  
 		}
 		$("#mywords").val('');
 	    setTimeout(function(){
 	    	  $(".chatmsg-box").mCustomScrollbar("scrollTop","bottom","0");
         },50);
    }
    
    VHALL_SDK.on("playerReady", function(){
    	/**
    	 * 设备准备就绪后
    	 */
    	$("video").attr("x5-playsinline", "");
    	$("video").attr("poster", courseHead);
        /**
		 * 可播线路消息
		 */
        VHALL_SDK.player.on('canPlayLines', function(msg) {
            var _src = '';
            for (var i in msg) {
                _src += '<li>' + i + '</li>';
            }
            $("#lines").html(_src).find("li").eq(0).addClass('active');
        });
        /**
		 * 可播清晰度消息
		 */
        VHALL_SDK.player.on('canPlayDefinitions', function(msg) {
            var _src = '';
            for (var i in msg) {
                _src += '<li>' + i + '</li>';
            }
            $("#definitions").html(_src).find("li").eq(0).addClass('active');
        });
    });



})        