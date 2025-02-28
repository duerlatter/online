$(function(){
//	商品好货
	(function(){	
//	点击我的商品,重新获取数据
		$(".shopping-list-btn").click(function(){
			shopList(1);
		})
//		var orderType;
		shopList(1);
		function shopList(pageNumber,orderType){
			var keyword=$.trim($(".input-code").val()),
				minSales=$.trim($(".min-sales").val()),
				maxSales=$.trim($(".max-sales").val()),
				minPrice=$.trim($(".min-price").val()),
				maxPrice=$.trim($(".max-price").val());
			var shopData={};
				shopData.pageNumber=pageNumber,
				shopData.pageSize=10,
				shopData.keyword=keyword,
	//			销量低到高
				shopData.minSales=minSales,
				shopData.maxSales=maxSales,
	//			价格低到高
				shopData.minPrice=minPrice,
				shopData.maxPrice=maxPrice,
	//			自己的商品
				shopData.all=0;
				if(orderType != null || orderType != ""){
					shopData.orderType=orderType;
				}else{
					shopData.orderType="";
				}
			
			RequestService("/doctor/product/list", "get",shopData, function (data) {
		  		if (data.success==true) {
		  			var shopData=data.resultObject.content;
		  			if(shopData.length==0){
		  				$(".shop-null").removeClass("hide");
		  				$(".all-shopping-list").addClass("hide");
		  			}else{
		  				$(".shop-null").addClass("hide");
		  				$(".all-shopping-list").removeClass("hide");
		  				$("#shop-list-ul").html(template("shop-template",{items:shopData}))
		  			}
	//	  			分页
					var pages=Math.ceil(data.resultObject.total/10);
	 				if (pages > 1) { //分页判断,接口总页数
		                    $(".not-data").remove();
		                    $(".shop_pages").removeClass("hide");
		                    $(".shop_pages .searchPage .allPage").text(pages);  //接口总页数
		                    $("#Pagination_shop").pagination(pages, {			//接口总页数
		                        num_edge_entries: 1, //边缘页数
		                        num_display_entries: 4, //主体页数
		                        current_page: pageNumber - 1,  //所传的页数
		                        callback: function (page) {
		                            //翻页功能
		                            shopList(page + 1,orderType);
		                        }
		                    });
		                } else {
		                    $(".shop_pages").addClass("hide");
		                }
		  		} else{
		  				showTip(data.errorMessage);
		  		}
		  })
		}
	
//		清空筛选条件
		$(".clear-screen").click(function(){
			$(".input-code, .min-sales, .max-sales, .min-price, .max-price").val("");
		})
//		点击筛选条件进行筛选
		$(".screen-commodity").click(function(){
			shopList(1);
			$(".shopping-list-top li i").removeClass("active");
		})
//		点击升序,降序进行筛选
		$(".shopping-list-top").on("click","li i",function(){
			var dataType=$(this).attr("data-style");
			$(".shopping-list-top li i").removeClass("active");
			$(this).addClass("active")
			shopList(1,dataType)
		})
	})();
	
//	订单管理
 	(function(){	
 		$(".shopping-order-btn").click(function(){
 			orderList(1);
 		})
 		function orderList(pageNumber,status,orderStyle){
 			var orderValue=$.trim($(".order-value").val()),
 				wareValue=$.trim($(".ware-value").val()),
 				timeStart=$.trim($(".time-start").val()),
 				timeEnd=$.trim($(".time-end").val());
 			var orderData={};
 				orderData.pageNumber=pageNumber,
 				orderData.pageSize=10,
 				orderData.sn=orderValue,
 				orderData.productName=wareValue;
   				orderData.startDate=timeStart,
   				orderData.endDate=timeEnd;
 				if(status != null || status != ""){
 					orderData.status=status;
 				}else{
 					orderData.status="";
 				}
 				if(orderStyle != null || orderStyle != ""){
 					orderData.orderType=orderStyle;
 				}else{
 					orderData.orderType="";
 				}
 			RequestService("/xczh/shop/order/list", "get",orderData, function (data) {
	 			if(data.success==true){
	 				var orderService=data.resultObject.content;
	 					if(orderService.length==0){
	 						$(".order-null").removeClass("hide");
	 						$(".goods-bottom-list").addClass("hide");
	 					}else{
	 						$(".order-null").addClass("hide");
	 						$(".goods-bottom-list").removeClass("hide");
	 						$("#order-list-bottom").html(template("order-template",{items:orderService}))
	 					}
//	  			分页
					var pages=Math.ceil(data.resultObject.total/10);
	 				if (pages > 1) { //分页判断,接口总页数
		                    $(".not-data").remove();
		                    $(".order_pages").removeClass("hide");
		                    $(".order_pages .searchPage .allPage").text(pages);  //接口总页数
		                    $("#Pagination_order").pagination(pages, {			//接口总页数
		                        num_edge_entries: 1, //边缘页数
		                        num_display_entries: 4, //主体页数
		                        current_page: pageNumber - 1,  //所传的页数
		                        callback: function (page) {
		                            //翻页功能
		                            orderList(page + 1,status);
		                        }
		                    });
		                } else {
		                    $(".order_pages").addClass("hide");
		                }
	 			}else{
		  			//showTip(data.errorMessage);
	 			   $(".order-null").removeClass("hide");
	 			   $(".goods-bottom-list").addClass("hide");
		  		}
	 		})
 		}
//		点击状态进行筛选
		var dataStatus;
		$(".goods-status ul").on("click","li",function(){
			$(".goods-top-menu ul li i").removeClass("order-active"); //去掉排序样式
			dataStatus=$(this).attr("data-status");
			$(".goods-status ul li").removeClass("active");
			$(this).addClass("active");
			if(dataStatus==0){
				orderList(1);
			}else{
				orderList(1,dataStatus)
			}
		})	
//		时间上下排序
		$(".goods-top-menu ul li i").click(function(){
			var orderStyle=$(this).attr("data-style");
			$(".goods-top-menu ul li i").removeClass("order-active");
			$(this).addClass("order-active");
			if(dataStatus==0){
				orderList(1,"",orderStyle)
			}else{
				orderList(1,dataStatus,orderStyle);
			}
			
		})	
//		输入条件点击筛选
		$(".order-commodity").click(function(){
			$(".goods-top-menu ul li i").removeClass("order-active"); //去掉排序样式
			$(".select-before-time").removeClass("active-time")  //去掉7天样式
			var timeStart=$(".time-start").val(),
				timeEnd=$(".time-end").val();
			if (timeStart != "" && timeEnd!= "") {
				if (timeStart>timeEnd) {
					showTip("开始时间不能大于结束时间");
					return false;
				}else{
					if(dataStatus==0){
						orderList(1);
					}else{
						orderList(1,dataStatus);
					}
				}
			}else{
				orderList(1,dataStatus)
			}
		})
//		清空筛选条件
		$(".clear-order-commodity").click(function(){
			$(".order-value, .ware-value, .time-start, .time-end").val("");
			$(".select-before-time").removeClass("active-time");
		})
//		点击近七天/近30天
		$(".select-before-time").click(function(){
			$(".goods-top-menu ul li i").removeClass("order-active"); //去掉排序样式
			var dataTime=$(this).attr("data-time");
			var nowtime=getBeforeDate(0);
			var pastTime=getBeforeDate(-7);
			var pastMoreTime=getBeforeDate(-30);
			$(".select-before-time").removeClass("active-time");
			$(this).addClass("active-time");
			if (dataTime==7) {
				$(".time-start").val(pastTime);
				$(".time-end").val(nowtime);
				if(dataStatus==0){
					orderList(1)
				}else{
					orderList(1,dataStatus)
				}
				
			}else if(dataTime==30){
				$(".time-start").val(pastMoreTime);
				$(".time-end").val(nowtime);
				if(dataStatus==0){
					orderList(1)
				}else{
					orderList(1,dataStatus)
				}
			}
		})
		
 	})();
})
