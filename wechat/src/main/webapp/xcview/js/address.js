
    /**
     * 可能是来自填写报名信息页面的
     */
    /*var userId = localStorage.getItem("userId");
    $(".address_return").click(function(){
    	var person = sessionStorage.getItem("address_back");
    	if(person=="personalfor.html"){
    		location.href ='personalfor.html?userId='+userId;
    	}else{
    		location.href ='persons.html';
    	}
    })*/
  
   /*可能来自确认订单页面*/
   	function isLoginJump() {
	    var userId = localStorage.userId;
	    if (isNotBlank(userId)) {
	        /*
	         * 判断这上个地址是否来自我们的浏览器啦。如果是的就返回上一页，如果不是的话，那么就返回首页吧。
	         */
	        var before_address = document.referrer;
	        if (before_address.indexOf("page/index") != -1 ||
	            before_address.indexOf("/xcview/html/shop/confirm_order.html") != -1 ||   //确认订单页
	            before_address.indexOf("edit_address.html") != -1 ||   //确认订单页
	            before_address.indexOf("persons.html") != -1) {  //资料设置页
	
	            window.history.back();
	        }
	    } else {
	        //登录页面
	        location.href = "home_page.html";
	        
	    }
	}
   	
// 	判断来自订单页面
	$(".address_return").click(function(){
		/*var isAddress=localStorage.getItem("isAddress");
		if (isAddress == "details") {
			
			var before_address = document.referrer;
	        if (before_address.indexOf("page/index") != -1 ||
	            before_address.indexOf("confirm_order.html") != -1 ||   //确认订单页
	            before_address.indexOf("edit_address.html") != -1){
	
	            window.history.back();
	        }else{
	        	location.href="/xcview/html/persons.html"
	        }
//			location.href="/xcview/html/shop/confirm_order.html"
//			window.history.back();
		} else{
//			window.history.go(-1);
			location.href="/xcview/html/persons.html"
		}*/
//		alert(11);
//		window.history.go(-1);
		//html获取链接上面的参数
        function getQueryString(name){
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r!=null) return r[2];else return'';
        }
        var type = getQueryString('type');
        var types = getQueryString('types');
        if(type=='2'){
        	
        	if(types=='4'){
//      		window.history.go(-1);
	            window.history.go(-3);
	        }else{
				//window.history.back();
				location.replace(document.referrer); 
	        }
        }else if(type=='3'){
            location.replace("/xcview/html/persons.html");
        }
        getQueryString('name');
	

	})
   	
   	
	/**
	 * 新增地址或修改地址返回
	 */
	$("#update_address_return").click(function(){
		
//		location.href ='address.html';
		history.go(-1);
	})
	
	/**
	 * 点击保存 跳转到编辑页面
	 */
	$(".site_newly").click(function(){
		$(".site_edit").show();
		$(".site_call").hide();
		$(".attention").hide();
		
		$("#consignee").val("");
	    $("#phone").val("");
	    $("#cityP").text("请选择");
		$("#detailed_address").val("");
		$("#postal_code").val("");
		$("#address_id").val("");
	});
		
	/* 地址管理结束 */
	function addressList(){
		requestGetService("/xczh/shop/receiver/list",null, function(data) {
			if (data.success) {
				//$("#address_list").html("");
				//更改完手机号后，需要把session中的这个东西换下呢？
				var results = data.resultObject;	
				var str ="";
				for (var int = 0; int < results.length; int++) {
					var result = results[int];
					/**
					 * 目前暂时不显示街道
					 */
//					var a_all = result.provinces + result.city+ result.county + result.street +result.detailedAddress;
					var a_all = "";
				    if(isNotBlank(result.areaName)){
				    	a_all+=result.areaName+"";
				    }
//				    if(isNotBlank(result.city)){
//				    	a_all+=result.city+"";
//				    }
//				    if(isNotBlank(result.county)){
//				    	a_all+=result.county+" ";
//				    }
				    if(isNotBlank(result.address)){
				    	a_all+=result.address;
				    }
					/*
					 * 是否默认地址
					 */
					var isAcquiesStr = "";
					if(result.isDefault == true || results.length==1){//是默认地址
						isAcquiesStr+="<div class='sit_bg site_bg01'></div><span class=''>默认地址</span>";
					}else{
						isAcquiesStr+="<div class='site_bg1 sit_bg'></div><span class='moren_span' style='color: #666;'>设为默认地址</span>";
					}
					str += "<div class='site'>"+
					"<div class='site_div'>"+
						"<div class='site_div_cen'>"+
							"<div class='site_div_cen_top'><span class='site_cen1'>"+result.consignee+"</span><span class='site_cen2'>"+result.phone+"</span></div>"+
							"<div class='site_div_text'>"+a_all+"</div>"+
							/*"<div class='site_div_text'>"+result.postalCode+"</div>"+*/
							"<div class='site_bto'>"+
								"<div class='site_bto_left' id='"+result.id+"' >"+isAcquiesStr+"</div>"+
								"<div class='site_bto_right'>"+
									"<div class='site_bto_right01 edit_go' name=''  title='"+result.id+"'>"+
										"<div class='site_bg001'></div>"+
										"<span>编辑</span>"+
									"</div>"+
									"<div class='site_bto_right02' name='' title='"+result.id+"'>"+
										"<div class='site_bg002'></div>"+
										"<span >删除</span>"+
									"</div>"+
								"</div>"+
							"</div>"+
						"</div>"+
					"</div>"+
					"</div>";
				}
				$("#address_list").html(str);
			} else {
				$(".vanish5").show();
				setTimeout(function(){$(".vanish5").hide();},1500);
				/*alert("请求列表有误");*/
			}
		},false);
		
		 /*点击默认开始*/
		 var aBtn6=$('.site_bto_left');
		 
		 if(aBtn6.length > 1){
			 for(i=0;i<aBtn6.length;i++){
		          $(aBtn6[i]).click(function(){
		          	for(i=0;i<aBtn6.length;i++){ 
		          		/*$(aBtn6[i]).find('.sit_bg').addClass('site_bg1');
		                $(aBtn6[i]).find('.sit_bg').removeClass('site_bg01');*/
		                var obj = $(aBtn6[i]).find('.sit_bg');
		                var objClassName = obj.attr("class");
		                if(objClassName.indexOf("site_bg01")!=-1){
		                	obj.removeClass('site_bg01');
		                	obj.addClass('site_bg1');
		                	var span =  obj.next();
		                	span.addClass("moren_span");
		                	span.text("设置为默认地址");
		                	break;
		                }
		            }
		          	var this_Obj = $(this).find('.sit_bg');
		          	this_Obj.addClass('site_bg01');
		          	this_Obj.removeClass('site_bg1');
		          	var this_span = this_Obj.next();
		          	this_span.text("默认地址");
		          	this_span.removeClass("moren_span");
		            //然后点击的时候呢，需要判断
		            var newId = $(this)[0].id;
		        	/**
		        	 * 保存地址
		        	 */
		        	requestService("/xczh/shop/receiver/setDefaultReceiver",
		        		{
		        			"receiverId":newId,
		        			"isDefault":true
		        		}, function(data) {
		        		if (data.success) {
		        			
		        			addressList();
		        			
		        			console.log("设置默认成功");
		        		} else {
		        			console.log("设置默认失败");
		        		}
		        	});
		            
		          })
		     }
		 }

		 
		 /**
		   * 点击修改跳转到编辑页面
			 */
			$(".edit_go").click(function(){
				var type = getQueryString("type");
				var id = $(this)[0].title;
				location.href="edit_address.html?id="+ id + "&type=" + type;
//				"/xcview/html/live_album.html?course_id="+courseId+"&direct_id="+myvideo
			});
			/**
			 * 删除这个地址啦
			 */
			$(".site_bto_right02").click(function(){
				var id = $(this)[0].title;
				$(".history_bg_bto2").attr("title",id);
				$(".history_bg").show();
				//deleteAddress(this);
			});
			$(".site_newly").click(function(){
				var type = getQueryString("type");
				var id = $(this)[0].title;
				location.href="edit_address.html?&type=" + type;
			});
			
			
	}
/**
 * 隐藏确定删除的弹框
 */	
$(".history_bg_bto1").click(function(){
	$(".history_bg").hide();
});
$(".history_bg_bto2").click(function(){
	deleteAddress(this);
	$(".history_bg").hide();
});
function deleteAddress(obj){
	var addressId =  $(obj).attr("title");
	if(isNotBlank(addressId)){
		//查询下 -- 填充到form表单中
		/**
		 * 根据id查询地址
		 */
		requestService("/xczh/shop/receiver/delete?receiverId="+addressId,null,function(data) {
			if (data.success) {
				 $(obj).attr("title","");
				webToast("删除成功","middle",1500);

				 addressList();
			} else {
//			    alert("获取数据有误！");
				$(".vanish1").show();
				setTimeout(function(){$(".vanish1").hide();},1500);
				return false;
			}
		});
	}
}
	
/**
 * 
 * @param str
 * @param minLength
 * @param maxLength
 */
function checkLengthInterval(str,minLength,maxLength){
	var strlength = str.length;
	if(strlength<minLength || maxLength >18){
		$("#errorMsg").html("<p>新密码不能为空</p><p>6-18位英文大小写字母或阿拉伯数字</p>");
		$("#errorMsg").show();
		return false;
	}
}

