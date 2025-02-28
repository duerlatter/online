// XMPP连接
var connection = null;
// 当前状态是否连接
var connected = false;
// 当前登录的JID
var jid = "";
var giftList;
//初始化没有参数的队列
var queue = new Queue();


/**
 * 礼物列表血染
 * @returns
 */
function getGiftList(){
	RequestService("/gift/getGift", "GET", {
	}, function(data) {
		var gifts ="";
		for (var i = 0; i < data.resultObject.length; i++) {
			var item = data.resultObject[i];
			var  gift = "<li class='li-initial-border' data-id="+item.id+" data-number="+item.price+">"+
			"	<img src='"+item.smallimgPath+"' />";
			if(liveStatus != 3){
				gift+="	<div class='surprise-hide'>"+
					"		<div class='surprise-show'>"+
					"			<div class='surprise-show-img'>"+
					"				<img src='"+item.smallimgPath+"' style='width: 80px;height: 64px;margin-top: 8px;' />"+
					"			</div>"+
					"			<div class='surprise-show-name' style='width: 150px;margin-left: 110px;'>"+
					"				<div class='surprise-show-title'>"+
					"					<span class='show-name'>"+item.name+"</span><span class='show-number'>（&nbsp;"+item.price+"熊猫币&nbsp;）</span>"+
					"				</div>"+
					"				<div class='surprise-presented' data-id="+item.id+" data-number="+item.price+">赠送</div>"+
					"			</div>"+
					"		</div>"+
					"		<div class='aspect-down'></div>"+
					"	</div>";
			}
			gift+="</li>";
		    gifts += gift;
		}
		$(".surprise-mouseover-ul").html(gifts);
	},false);
}
//礼物渲染
getGiftList();

/**
 * 连接IM服务器
 * @param status
 * @returns
 */
function onConnect(status) {
    if (status == Strophe.Status.CONNFAIL) {
//        alert("连接失败！");
        autoLogin();
    } else if (status == Strophe.Status.AUTHFAIL) {
//        alert("登录失败！");
        autoLogin();
    } else if (status == Strophe.Status.DISCONNECTED) {
//        alert("连接断开！");
        autoLogin();
        connected = false;
    } else if (status == Strophe.Status.CONNECTED) {
//        alert("连接成功，可以开始聊天了！");
        connected = true;
        
        // 当接收到<message>节，调用onMessage回调函数
        connection.addHandler(onMessage, null, 'message', null, null, null);
        
        // 首先要发送一个<presence>给服务器（initial presence）
        connection.send($pres().tree());

        // 发送<presence>元素，加入房间
		var pres = $pres({
            from: jid,
            to: ROOM_JID + "/" + guId//jid.substring(0,jid.indexOf("@"))
        }).c('x',{xmlns: 'http://jabber.org/protocol/muc'}).tree();
        connection.send(pres);
		//connection.sendIQ(pres);//获取房间列表
	}
}

/**
 * 自定义string过滤方法
 */
String.prototype.replaceAll = function (FindText, RepText) {
	regExp = new RegExp(FindText, "g"); 
	return this.replace(regExp, RepText); 
}

/**
 * 接受到IM消息
 * @param msg
 * @returns
 */
function onMessage(msg) {
    // 解析出<message>的from、type属性，以及body子元素
    var from = msg.getAttribute('from');
    var type = msg.getAttribute('type');
    var elems = msg.getElementsByTagName('body');

    if (type == "groupchat" && elems.length > 0) {
    	try{
	        var body = elems[0];
	        var text = Strophe.getText(body);
	        text = text.replaceAll("&quot;","\"");
        	data = JSON.parse(text);
        	
        	createGiftList(data);
    	}catch(err){
//        	console.info(err);
    	}
    }
    return true;
}



$(document).ready(function() {

    // 通过BOSH连接XMPP服务器
    $('#btn-login').click(function() {
        if(!connected) {
            connection = new Strophe.Connection(BOSH_SERVICE);
            connection.connect($("#input-jid").val(), $("#input-pwd").val(), onConnect);
            jid = $("#input-jid").val();
        }
    });
    
    function sendMsg(data){
    	data = JSON.stringify(data);
    	data = JSON.parse(data);
		// 创建一个<message>元素并发送
		var msg = $msg({
			to: ROOM_JID, 
			from: jid,
			type: 'groupchat'
		}).c("body", null, JSON.stringify(data));
		connection.send(msg.tree());
    }
	autoLogin();
	
	var lastGift=null;
	var lastTime = new Date();
	var myid =null;

	/*
	 * 点击发送时候的送礼物效果/充值事件
	 */
	$('.surprise-presented').click(function(){
		
		//回放状态不让发送
		if(liveStatus == 3){
			return;
		}
		var gid = $(this).attr("data-id");
		var number = $(this).attr("data-number");
		//判断余额是否足够
		var balanceTotal = $("#balanceTotal").html();
		if(parseInt(number)<= parseInt(balanceTotal) || parseInt(number) ==0){
			var msgJson = {
					channel:1,
					giftId:gid,
					count:1,
					clientType:1,
					liveId:course_id,
					receiver:teacherId,
					receiverName:teacherName
			};
			RequestService("/gift/sendGift", "POST", msgJson, function(data) {
				if(data.success==true){
                    data.resultObject.courseId=course_id;
        			sendMsg(data.resultObject);
        			VHALL_SDK.sendChat({
        				text: "赠送给主播一个"+data.resultObject.giftInfo.name
        			})
        			var json = {user_name:data.resultObject.senderInfo.userName,
        				content:"赠送给主播一个"+data.resultObject.giftInfo.name};
        			$("#chatmsg").append(liveGiftList(json)), $(".chatmsg-box").mCustomScrollbar("update").mCustomScrollbar("scrollTo", "99999");
        			refreshBalance();
				}else{
                    showTip(data.errorMessage);
					// $('.mask3').text(data.errorMessage).fadeIn(400,function(){
					// 	setTimeout(function(){
					// 		$('.mask3').fadeOut()
					// 	},1000)
					// });
				}
			},false);
			//获取当前点击时候的id/点击的时间
			lastGift = myid ;
			lastTime = new Date();
		}else{
			$('.chongZhi').click();
		}
	})
});

function createGiftList(data){
    if(data.courseId!=course_id)return;   //ios传值
    
    if(data.messageType==2 && liveStatus == 2){  //直播开始通知
	  	//当前时间 
    	if(parseInt(sendTime) < parseInt(data.sendTime)){
        	console.log("开始直播了，建议再次刷新页面   >>>>");
        	//刷新页面 --》在观看
        	location.reload();
    	}
	}else if(data.messageType==1){
        createRanking(data.ranking);
		//获取最后一次的id
		var li = $('<li style="background-color:#fafafa;margin-bottom: 10px"></li>');
		li.html("<li class='clearfix' style='position: relative;background-color:#fafafa;margin-left:0;'>" +
				"<div class='headImg' style='float: left;'>" +
			 	"  <img style ='width:54px;height:54px;border-radius: 60px;margin-right: 10px;' src='"+data.senderInfo.avatar+"'>" +
			    " </div>" +
				"<div class='sender-gif'>" +
				"<p>"+data.senderInfo.userName+"：</p>" +
				"<span>赠送给主播</span>&nbsp;&nbsp;" +
				"<span>"+data.giftInfo.name+"</span>" +
				"</div>" +
				"<div class='imgNum'><img style='position: absolute;width: 54px;right: 25px;height: 54px;' src="+data.giftInfo.smallimgPath+">" +
				"<span style=' position: absolute; right: 0;top: 20px'>X1</span>" +
				"</div>" +
		"</li>")
		$('#chat-list').append(li);
		var a = $('#chat-list');
		a.scrollTop(a[0].scrollHeight);
		
		if(data.giftInfo.time==null)return;
		
		if(parseInt(sendTime)>parseInt(data.giftInfo.time))return;
		if($("#"+data.senderInfo.userId+data.giftInfo.giftId).length>0){
            giftShow(data,$("#"+data.senderInfo.userId+data.giftInfo.giftId).attr("xh"),true);
		}else{
            queue.push(data);
            createGiftShow();
		}
	}
}


function autoLogin(){
	connection = new Strophe.Connection(BOSH_SERVICE);
	connection.connect(guId+'@'+host, guPwd, onConnect);
	jid = guId+'@'+host;
}

//两个占位 f1 f2
var f1 = true;
var f2 = true;
var f3 = true;
var f4 = true;

function createGiftShow(){

	//若f1位可用，。。。
	if(f1){
		f1=false;
		var gift = queue.pop();
		//将礼物显示出来，设置显示时间。时间到了，f1 = true;，礼物占位结束。
		giftShow(gift,1);
	}else if(f2){//若f2位可用，。。。
		f2=false;
		var gift = queue.pop();
		//将礼物显示出来，设置显示时间。时间到了，f1 = true;，礼物占位结束。
		giftShow(gift,2);
	}else if(f3){//若f2位可用，。。。
        f3=false;
        var gift = queue.pop();
        //将礼物显示出来，设置显示时间。时间到了，f1 = true;，礼物占位结束。
        giftShow(gift,3);
    }else if(f4){//若f2位可用，。。。
        f4=false;
        var gift = queue.pop();
        //将礼物显示出来，设置显示时间。时间到了，f1 = true;，礼物占位结束。
        giftShow(gift,4);
    }else if(!f1&&!f2&&!f3&&queue.size()>0){
		setTimeout(function(){createGiftShow();},1000);
	}
}

//生成礼物
var count = 1;
function countChange(){
	if(count==1){
		count=2;
		return 350;
	}else if(count==2){
        count=3;
        return 300;
    }else if(count==3){
        count=4;
        return 250;
    }else{
		count=1;
		return 200;
	}
}
var gif=[];    
var num=[];	
var min=[];	
var sto=[];
function giftShow(gift,f,continuous){
    if(continuous){
        $("#"+gift.senderInfo.userId+gift.giftInfo.giftId).html(gift.giftInfo.continuousCount);
        $('.addnum'+f).data("sto",new Date().getTime())
        return;
    }
	var colors = ["red", "green", "hotpink", "pink", "cyan", "yellowgreen", "purple", "deepskyblue"];
   
    if(gift.messageType==1){
	    var top=countChange()
    	gif[f] = $( "<div class='big' id='gift"+f+"' style='width: 500px;height: 46px;line-height: 46px;background: url(/web/images/456.png) no-repeat;padding-left: 10px;position: absolute;bottom: "+top+"px;'>" +
    			"<div class='left' style='height: 100%;display: inline-block;vertical-align: top;'>" +
    			"<span>"+gift.senderInfo.userName+"</span>&nbsp;" +
    			"<span>送&nbsp;"+gift.giftInfo.name+"</span>" +
    			"</div><img src="+gift.giftInfo.smallimgPath+" style='height: 54px;width:54px;margin-left: 10px;'>" +
    			"<span class='' style='height: 100%;display: inline-block;vertical-align: top;margin-left: 10px;color: white;font-size: 24px;'>x<i class='addnum"+f+"' style='font-size: 30px;font-weight: 700;' id='"+gift.senderInfo.userId+gift.giftInfo.giftId+"' xh='"+f+"'>"+gift.giftInfo.continuousCount+"</i></span>" +
    	"</div>")	
    }

    //礼物弹幕生成效果
    	 gif[f].appendTo($("#boxDom")).css("color", colors[Math.floor(Math.random() * 8)]).css("left", "-500px")//初始未知
    	   .animate({// 设置运动
    	       "left": "50px"
    	     }, 500, "linear", function () {
    	    	 if(f==1){
                     // $('.addnum'+f).html(gift.giftInfo.continuousCount);
                     $('.addnum'+f).data("sto",new Date().getTime())
    	    	 }else if(f==2){
                     // $('.addnum'+f).html(gift.giftInfo.continuousCount);
                     $('.addnum'+f).data("sto",new Date().getTime())
                 }else if(f==3){
                     // $('.addnum'+f).html(gift.giftInfo.continuousCount);
                     $('.addnum'+f).data("sto",new Date().getTime())
                 }else{
                     // $('.addnum'+f).html(gift.giftInfo.continuousCount);
                     $('.addnum'+f).data("sto",new Date().getTime())
    	    	 }
    	     });

}
/**
 * [Queue]
 * @param {[Int]} size [队列大小]
 */
function Queue(size) {
    var list = [];

    //向队列中添加数据
    this.push = function(data) {
        if (data==null) {
            return false;
        }
        //如果传递了size参数就设置了队列的大小
        if (size != null && !isNaN(size)) {
            if (list.length == size) {
                this.pop();
            }
        }
        list.unshift(data);
        return true;
    }

    //从队列中取出数据
    this.pop = function() {
        return list.pop();
    }

    //返回队列的大小
    this.size = function() {
        return list.length;
    }

    //返回队列的内容
    this.quere = function() {
        return list;
    }
}

$(function () {
    setInterval(function(){
        for(var i=1;i<5;i++){
            var t = new Date().getTime()-$('.addnum'+i).data("sto");
            if(t>3000){
            	var f = $('.addnum'+i).attr("xh");
                if(f == 1){
                    f1 = true;
                }else if(f == 2){
                    f2 = true;
                }else if(f == 3){
                    f3 = true;
                }else{
                    f4 = true;
                }
                $("#gift"+i).remove();
			}
        }
    },500)
});
