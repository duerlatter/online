var curriculum_blck = getQueryString("search_back");
sessionStorage.setItem("search_back", curriculum_blck);

$(function() {

	//搜索历史开始
	requestService("/xczh/shop/goods/hotSearch", null,
		function(data) {

			if (data.success == true) {

				if (data.resultObject.hotSearch == 0 || data.resultObject.hotSearch == '' || data.resultObject.hotSearch == null) {
					$(".search_hot").hide();
				} else {
					//			检索列表
					$(".search_hot_main").html(template('search1', {
						items: data.resultObject.hotSearch
					}))
				};
				
				$(".header_seeks").html(template('header_seeks', {
					items: data.resultObject.defaultSearch
				}))
				// 	    	<!--给inpiu默认值-->
				$(".div_span_input").html(template('shipin', {
					items: data.resultObject.defaultSearch
				}))
				if (data.resultObject.defaultSearch != null && data.resultObject.defaultSearch.length > 0) {
					localStorage.setItem("defaultKey", data.resultObject.defaultSearch[0].name);
				}

				// 点击搜索按钮
				$(".header_cancel").click(function() {
					if ($(".div_span_input").html() == "" && $("#header_input").val() == "") {
						jqtoast("请输入搜索关键字");
					} else {
						var account = document.getElementById("header_input").value.trim();
			            if (account==""){  
			                var search_val = $(".keyword").html();
							if ($("#header_input").val() != "") {
								$(".header_seek_main").css("display", "none");
								//头部input搜索框开始
								initHistoryList();
								var keyValue = $(".keyword").html();
								//判断该记录是否已存在
								if ($.inArray(keyValue, arr) != -1) {
									removeByValue(arr, keyValue);
									arr.unshift($(".keyword").html());
									localStorage.setItem(hisArr, arr);
									window.location.href = "search_listings.html?queryKey=" + search_val + "&curriculum_blck=2";
								} else {
									arr.unshift($(".keyword").html())
									localStorage.setItem(hisArr, arr);
									window.location.href = "search_listings.html?queryKey=" + search_val + "&curriculum_blck=2";
								}
							} else {  //没有输入内容，有关键字的时候走这里
								var keyword = $(".keyword").html();
								search_val = keyword;
								$(".header_seek_main").css("display", "none");
	
								/*$(".search_history_list_one .div0").html(keyword);
								$(".search_history_list_one .div0").html();*/
	
								//头部input搜索框开始
								initHistoryList();
								var keyValue = $(".keyword").html();
								//判断该记录是否已存在
								if ($.inArray(keyValue, arr) != -1) {
									removeByValue(arr, keyValue);
									arr.unshift($(".keyword").html());
									localStorage.setItem(hisArr, arr);
									window.location.href = "search_listings.html?queryKey=" + search_val + "&curriculum_blck=2";
								} else {
									arr.unshift($(".keyword").html())
									localStorage.setItem(hisArr, arr);
									window.location.href = "search_listings.html?queryKey=" + search_val + "&curriculum_blck=2";
								}
							};
			            }else{
							var search_val = $("#header_input").val();
							if ($("#header_input").val() != "") {
								$(".header_seek_main").css("display", "none");
								//头部input搜索框开始
								initHistoryList();
								var keyValue = $('#header_input').val();
								//判断该记录是否已存在
								if ($.inArray(keyValue, arr) != -1) {
									removeByValue(arr, keyValue);
									arr.unshift($('#header_input').val());
									localStorage.setItem(hisArr, arr);
									window.location.href = "search_listings.html?queryKey=" + search_val + "&curriculum_blck=2";
								} else {
									arr.unshift($('#header_input').val())
									localStorage.setItem(hisArr, arr);
									window.location.href = "search_listings.html?queryKey=" + search_val + "&curriculum_blck=2";
								}
							} else {  //没有输入内容，有关键字的时候走这里
								var keyword = $(".keyword").html();
								search_val = keyword;
								$(".header_seek_main").css("display", "none");
	
	
								/*$(".search_history_list_one .div0").html(keyword);
								$(".search_history_list_one .div0").html();*/
	
								//头部input搜索框开始
								initHistoryList();
								var keyValue = $(".keyword").html();
								//判断该记录是否已存在
								if ($.inArray(keyValue, arr) != -1) {
									removeByValue(arr, keyValue);
									arr.unshift($(".keyword").html());
									localStorage.setItem(hisArr, arr);
									window.location.href = "search_listings.html?queryKey=" + search_val + "&curriculum_blck=2";
								} else {
									arr.unshift($(".keyword").html())
									localStorage.setItem(hisArr, arr);
									window.location.href = "search_listings.html?queryKey=" + search_val + "&curriculum_blck=2";
								}
							};
						}
					};
				});

				//      点击yinput  失去焦点隐藏默认值
				$("#header_input").keyup(function() {
					if ($(".div_span_input").html() == "" && $("#header_input").val() == "") {
						jqtoast("请输入搜索关键字");
					} else {
						var account = document.getElementById("header_input").value.trim();
			            if (account==""){
							var search_val = $(".keyword").html();
							if ($("#header_input").val() != "") {
								$(".header_seek_main").css("display", "none");
	
								//头部input搜索框开始
								document.onkeyup = function(event) {
									initHistoryList();
									var e = event || window.event || arguments.callee.caller.arguments[0];
									if (e && e.keyCode == 13) { // enter 键
										var keyValue = $(".keyword").html();
										//判断该记录是否已存在
										if ($.inArray(keyValue, arr) != -1) {
											removeByValue(arr, keyValue);
											arr.unshift($(".keyword").html());
											localStorage.setItem(hisArr, arr);
											window.location.href = "search_listings.html?queryKey=" + search_val + "&curriculum_blck=2";
										} else {
											arr.unshift($(".keyword").html())
											localStorage.setItem(hisArr, arr);
											window.location.href = "search_listings.html?queryKey=" + search_val + "&curriculum_blck=2";
										}
									}
								};
							} else {
								var keyword = $(".keyword").html();
								search_val = keyword;
								$(".header_seek_main").css("display", "none");
								//头部input搜索框开始
								initHistoryList();
								var keyValue = $(".keyword").html();
								//判断该记录是否已存在
								if ($.inArray(keyValue, arr) != -1) {
									removeByValue(arr, keyValue);
									arr.unshift($(".keyword").html());
									localStorage.setItem(hisArr, arr);
									window.location.href = "search_listings.html?queryKey=" + search_val + "&curriculum_blck=2";
								} else {
									arr.unshift($(".keyword").html())
									localStorage.setItem(hisArr, arr);
									window.location.href = "search_listings.html?queryKey=" + search_val + "&curriculum_blck=2";
								}
							};
						}else{
							var search_val = $(this).val()
							if ($("#header_input").val() != "") {
								$(".header_seek_main").css("display", "none");
	
								//头部input搜索框开始
								document.onkeyup = function(event) {
									initHistoryList();
									var e = event || window.event || arguments.callee.caller.arguments[0];
									if (e && e.keyCode == 13) { // enter 键
										var keyValue = $('#header_input').val();
										//判断该记录是否已存在
										if ($.inArray(keyValue, arr) != -1) {
											removeByValue(arr, keyValue);
											arr.unshift($('#header_input').val());
											localStorage.setItem(hisArr, arr);
											window.location.href = "search_listings.html?queryKey=" + search_val + "&curriculum_blck=2";
										} else {
											arr.unshift($('#header_input').val())
											localStorage.setItem(hisArr, arr);
											window.location.href = "search_listings.html?queryKey=" + search_val + "&curriculum_blck=2";
										}
									}
								};
							} else {
								var keyword = $(".keyword").html();
								search_val = keyword;
								$(".header_seek_main").css("display", "none");
								//头部input搜索框开始
								initHistoryList();
								var keyValue = $(".keyword").html();
								//判断该记录是否已存在
								if ($.inArray(keyValue, arr) != -1) {
									removeByValue(arr, keyValue);
									arr.unshift($(".keyword").html());
									localStorage.setItem(hisArr, arr);
									window.location.href = "search_listings.html?queryKey=" + search_val + "&curriculum_blck=2";
								} else {
									arr.unshift($(".keyword").html())
									localStorage.setItem(hisArr, arr);
									window.location.href = "search_listings.html?queryKey=" + search_val + "&curriculum_blck=2";
								}
							};
						}
					}
				});

				// 	    	localStorage.setItem("defaultKey", data.resultObject.defaultSearch);

			}
		}, false)
	//搜索历史结束

	//点击热门搜索跳转
	$(".search_hot_main_one").click(function() {
		var btn_write = $(this).text()
		//		arr.unshift(btn_write);
		//判断该记录是否已存在
		if ($.inArray(btn_write, arr) != -1) {
			removeByValue(arr, btn_write);
			arr.unshift(btn_write);
			localStorage.setItem(hisArr, arr);
		} else {
			arr.unshift(btn_write)
			localStorage.setItem(hisArr, arr);
		}
		//		localStorage.hisArr = arr;
		window.location.href = "search_listings.html?queryKey=" + btn_write + ""
	})

})

//清空历史

function clearAll() {
	if (localStorage.getItem(hisArr) != undefined) {
		localStorage.setItem(hisArr, "");
		$(".search_history_list").empty();
		$(".search_history").hide();
		arr = [];
	}
}


