/**
 *  医师页面默认到那个tab使用
 *   当到此页面时，默认到动态
 *   全部/直播间/师承/介绍
 *   li_datal/li_course/li_evaluate//li_prose_origin
 */
sessionStorage.setItem("physiciansPage","")
sessionStorage.setItem("li_data","");

var my_impression1 = "";
var my_impression2 = "";
var my_impression3 = "";
var course_id = "";
var criticize_id = "";
var LecturerId = "";

//分享的信息
var gradeName = "";
var smallImgPath = "";
var description = "";

function stripHTML(str) {
    var reTag = /<(?:.|\s)*?>/g;
    return str.replace(reTag, "");
}

//	标签选中变色

$(".select_lable li").click(function () {
    $(this).toggleClass("active_color");
});
//星星五星好评
$('.my_impression1 img').each(function (index) {
    var star = '../images/xing1.png';    //普通灰色星星图片的存储路径
    var starRed = '../images/xing.png';     //红色星星图片存储路径
    var prompt = ['1分', '2分', '3分', '4分', '5分'];   //评价提示语
    this.id = index;      //遍历img元素，设置单独的id
    $(this).on("mouseover click", function () {    //设置鼠标滑动和点击都会触发事件
        $('.my_impression1 img').attr('src', star);//当“回滚”、“改变主意”时，先复位所有图片为木有打星的图片颜色
        $(this).attr('src', starRed);        //设置鼠标当前所在图片为打星颜色图
        $(this).prevAll().attr('src', starRed);  //设置鼠标当前的前面星星图片为打星颜色图
        $(this).siblings('span').text(prompt[this.id]);     //根据id的索引值作为数组的索引值

        my_impression1 = this.id;
    });
});
//主播演绎好评
$('.my_impression2 img').each(function (index) {
    var star = '../images/face0.png';    //普通灰色星星图片的存储路径
    var starRed = '../images/face1.png';     //红色星星图片存储路径
    var prompt = ['一般', '一般', '好', '好', '很好'];   //评价提示语
    this.id = index;      //遍历img元素，设置单独的id
    $(this).on("mouseover click", function () {    //设置鼠标滑动和点击都会触发事件
        $('.my_impression2 img').attr('src', star);//当“回滚”、“改变主意”时，先复位所有图片为木有打星的图片颜色
        $(this).attr('src', starRed);        //设置鼠标当前所在图片为打星颜色图
        $(this).prevAll().attr('src', starRed);  //设置鼠标当前的前面星星图片为打星颜色图
        $(this).siblings('span').text(prompt[this.id]);     //根据id的索引值作为数组的索引值
        my_impression2 = this.id;

    });
});
//节目内容好评
$('.my_impression3 img').each(function (index) {
    var star = '../images/face0.png';    //普通灰色星星图片的存储路径
    var starRed = '../images/face1.png';     //红色星星图片存储路径
    var prompt = ['一般', '一般', '好', '好', '很好'];   //评价提示语
    this.id = index;      //遍历img元素，设置单独的id
    $(this).on("mouseover click", function () {    //设置鼠标滑动和点击都会触发事件
        $('.my_impression3 img').attr('src', star);//当“回滚”、“改变主意”时，先复位所有图片为木有打星的图片颜色
        $(this).attr('src', starRed);        //设置鼠标当前所在图片为打星颜色图
        $(this).prevAll().attr('src', starRed);  //设置鼠标当前的前面星星图片为打星颜色图
        $(this).siblings('span').text(prompt[this.id]);     //根据id的索引值作为数组的索引值
        my_impression3 = this.id;
    });
});
//判断普通浏览器时,去点微信分享  
if (is_weixin()) {
    $(".share_to_one").show()
} else {
    $(".share_to_one").hide()
}

//获取课程ID跳转相应页面页面
//引入comment.j后调用方法获取ID，course_id为html里的a链接后面的ID
var courseId = getQueryString('course_id');
course_id = courseId;
//传ID courseId为接口的课程ID
requestService("/xczh/course/details", {
    courseId: courseId
}, function (data) {
    //分享的信息展示
    gradeName = data.resultObject.gradeName;
    smallImgPath = data.resultObject.smallImgPath;
    if (data.resultObject.description == null || data.resultObject.description == '') {

    } else {
        description = data.resultObject.description.stripHTML();
    }
    //  详情页的banner
    var school_img = document.createElement("img");
    school_img.src = data.resultObject.smallImgPath + '?imageView2/2/w/750';
    $(".play_video").append(school_img);
    //  获取讲师id
    LecturerId = data.resultObject.userLecturerId;

    // title类型判断
    $("#header").html(template('headers', data.resultObject));

    // 当collectionHint返回null时，表示没有对应的专辑。
    if (data.resultObject.collectionHint == null) {
        $(".check").hide();
    }else{
        // 点击查看专辑开始
        $(".check").html(template('check', data.resultObject.collectionHint));
        var courseId =$(".check_click").attr("data-id");
        $(".check_click").click(function(){
            location.href = "/xcview/html/school_audio.html?course_id="+courseId;
        });
    };
    
    //	课程名称/等级/评论
    $("#speak_people").html(template('data_people', data.resultObject));
    //	直播时间/主播名字
    $("#wrap_playTime").html(template('data_name', data.resultObject));
    //	是否购买
    $("#sure_isBuy").html(template('data_isBuy', data.resultObject));
    //	简介/内容
    if (data.resultObject.description == null || data.resultObject.description == '') {
        $(".no_data").show();
        $(".btn").hide()
        $(".zhezhao").hide();
    } else {
        $(".wrap p").html(data.resultObject.description);

    }
    //	主讲人
    if (data.resultObject.lecturerDescription == null || data.resultObject.lecturerDescription == '') {
        $(".no_data1").show();
        $(".btn1").hide();
        $(".zhezhao1").hide();
    } else {
        $(".wrap1 p").html(data.resultObject.lecturerDescription)
    }
//判断简介的字长度
    var h = $(".wrap1").height();
    if (h > 200) {
        $(".zhezhao1").hide();
        $(".btn1").show();
        $(".line_xian").hide();
//			$(".wrap1").css({"height":"2rem","overflow":"hidden"})
    } else {
        $(".zhezhao1").hide();
        $(".btn1").hide();
    }

    var h2 = $(".wrap").height();
    if (h2 > 200) {
        $(".zhezhao").hide();
        $(".btn").show();
//			$(".wrap").css({"height":"2rem","overflow":"hidden"})
    } else {
        $(".zhezhao").hide();
        $(".btn").hide();
    }
},false);

/*document.setTitle = function(t) {
    document.title = t;
    var i = document.createElement('iframe');
    // i.src = '//m.baidu.com/favicon.ico';
    i.style.display = 'none';
    i.onload = function() {
      setTimeout(function(){
        i.remove();
      }, 9)
    }
    document.body.appendChild(i);
  }

  setTimeout(function(){
    document.setTitle(gradeName);
  }, 1000);*/


//JQ预加载分界线----------------------------------------------------------------------------------
//刷新评论列表
refresh()

function refresh() {
    requestService("/xczh/criticize/getCriticizeList", {
        courseId: course_id,
        pageNumber: 1,
        pageSize: 6
    }, function (data) {
//  	判断有无评论显示默认图片
        if (data.resultObject.items.length == 0) {
            $(".quie_pic").show();
        } else {
            $(".quie_pic").hide();
            $(".wrap_all_returned").css({"margin-bottom": "1.2rem"})
        }
        console.log(data)
        //	课程名称/等级/评论
        $(".wrap_all_returned").html(template('wrap_people_comment', {items: data.resultObject.items}));
        //	回复弹窗
        $(".wrap_returned_btn .btn_littleReturn").click(function () {
            //评论id
            criticize_id = this.id;
            /* $(".bg_userModal").show();
             $(".wrapLittle_comment").show();
             $("#littlt_return").focus()*/
            //跳转到评论列表页
            btn_allComment();
        });
        $(".bg_userModal").click(function () {
            $(".bg_userModal").hide();
            $(".wrapLittle_comment").hide();
        });
        //点赞
        $(".btn_click_zan").click(function () {
            //评论id
            criticize_id = $(this).attr("data-id");
            //跳转到评论列表页
            btn_allComment();
        });

    });
}

//评论

function reportComment() {

    var arr = new Array();

    var list = document.getElementsByClassName("active_color");
    for (var i = 0; i < list.length; i++) {
        arr.push(list[i].value);
    }
    var str = arr.join(",");

    //var s = $('.active_color').val();
    var comment_detailed = $('#comment_detailed').val();
    if (comment_detailed == "") {
        alert("内容不能为空");
        return
    }

    requestService("/xczh/criticize/saveCriticize", {
        overallLevel: parseInt(my_impression1) + 1,
        contentLevel: parseInt(my_impression3) + 1,
        deductiveLevel: parseInt(my_impression2) + 1,
        criticizeLable: str,
        content: comment_detailed,
        courseId: course_id,
        userId: LecturerId
    }, function (data) {
        //	课程名称/等级/评论

        alert(data.resultObject);
        //	直播时间/主播名字
        //$("#wrap_playTime").html(template('data_name',data.resultObject));
        $(".wrapAll_comment").hide();
        $(".bg_modal").hide();
        document.getElementById("comment_detailed").value = "";
        refresh();
    });
}

//回复评论
function replyComment() {
    var comment_detailed = $('#littlt_return').val();
    if (comment_detailed == "") {
        alert("内容不能为空");
        return
    }
    requestService("/xczh/criticize/saveReply", {

        content: comment_detailed,
        criticizeId: criticize_id
    }, function (data) {
        //	课程名称/等级/评论

        alert(data.resultObject);
        //	直播时间/主播名字
        $(".bg_userModal").hide();
        $(".wrapLittle_comment").hide();
        document.getElementById("littlt_return").value = "";
        refresh();
    });
}

//点赞、取消点赞
function updatePraise(id, isPraise) {
    requestService("/xczh/criticize/updatePraise", {
        praise: isPraise,
        criticizeId: id
    }, function (data) {
        //	课程名称/等级/评论
    });
}

//点击所有评论跳转
function btn_allComment() {
    window.location.href = "all_comment.html?courseId=" + course_id + "&LecturerId=" + LecturerId + "";
}


//点击购买后的接口
//var courseId = getQueryString('course_id');
//function btn_buy(){	
//	requestService("/xczh/order/save",{
//		courseId:courseId,
//		orderFrom:2
//	},function(data){
//
//		window.location.href="purchase.html?orderId="+data.resultObject.orderId+"";
//	});
//
//}

//点击免费购买后无专辑的
//function btn_mianfei(){
//	window.location.href="live_audio.html?my_study="+course_id+"";
//}
//判断状态跳转
var courseId = getQueryString('course_id');

function btn_zj_mianfei() {
    checkAuth(courseId, 2);
    var data_zj = $(".right_priceBtn").attr("data-zj")

    if (data_zj == 0) {
        requestService("/xczh/order/save", {
            courseId: courseId,
            orderFrom: 2
        }, function (data) {
            if (data.success == true) {
               
                window.location.href = "purchase.html?orderId=" + data.resultObject.orderId + "";
            }else{
                jqtoast(data.errorMessage);
            }
            
        });
    } else if (data_zj == 1) {
        requestService("/xczh/history/add", {
            courseId: courseId,
            recordType: 1
        }, function (data) {

        })
        window.location.href = "live_audio.html?my_study=" + course_id + "";
    } else if (data_zj == 2) {
        requestService("/xczh/history/add", {
            courseId: courseId,
            recordType: 1
        }, function (data) {

        })
        window.location.href = "live_select_album.html?course_id=" + course_id + "";

    } else if (data_zj == 3) {
        window.location.href = "live_audio.html?my_study=" + course_id + "";

    } else if (data_zj == 4) {
        window.location.href = "live_select_album.html?course_id=" + course_id + "";

    } else if (data_zj == 5) {

        window.location.href = "live_audio.html?my_study=" + course_id + "";

    } else if (data_zj == 6) {
        window.location.href = "live_select_album.html?course_id=" + course_id + "";
    }
}

//删除评论状态
function del() {
    //星星
    var star = '../images/xing1.png';
    $('.my_impression1 img').attr('src', star);
    //主播演绎
    var star1 = '../images/face0.png';
    $('.my_impression2 img').attr('src', star1);
    //节目内容
    var star2 = '../images/face0.png';
    $('.my_impression3 img').attr('src', star2);
    //很赞
    $(".select_lable li").removeClass("active_color");
    my_impression1 = "";
    my_impression2 = "";
    my_impression3 = ""
}

//
//	
////	<!--无专辑免费-->
//	if(data_zj==1){
//		if (falg==1002) {
//			location.href ="/xcview/html/enter.html";		
//		}else if (falg==1005) {
//			location.href ="/xcview/html/evpi.html";
//		}else{
//		window.location.href="live_audio.html?my_study="+course_id+"";	
//		}
//	}else if(data_zj==2){
////<!--有专辑免费-->
//		if (falg==1002) {
//			location.href ="/xcview/html/enter.html";		
//		}else if (falg==1005) {
//			location.href ="/xcview/html/evpi.html";
//		}else{
//			window.location.href="live_select_album.html?course_id="+course_id+"";		
//		}
//	}else if(data_zj==3){
////<!--有专辑免费-->
//		if (falg==1002) {
//			location.href ="/xcview/html/enter.html";		
//		}else if (falg==1005) {
//			location.href ="/xcview/html/evpi.html";
//		}else{
//			window.location.href="live_audio.html?my_study="+course_id+"";	
//		}
//	}else if(data_zj==4){
////<!--已购买并有专辑-->
//		if (falg==1002) {
//			location.href ="/xcview/html/enter.html";		
//		}else if (falg==1005) {
//			location.href ="/xcview/html/evpi.html";
//		}else{
//			window.location.href="live_select_album.html?course_id="+course_id+"";
//		}
//	}else if(data_zj==5){
////主播买并没有专辑
//		if (falg==1002) {
//			location.href ="/xcview/html/enter.html";		
//		}else if (falg==1005) {
//			location.href ="/xcview/html/evpi.html";
//		}else{
//			window.location.href="live_audio.html?my_study="+course_id+"";
//		}
//	}else if(data_zj==6){
////主播并有专辑
//		if (falg==1002) {
//			location.href ="/xcview/html/enter.html";		
//		}else if (falg==1005) {
//			location.href ="/xcview/html/evpi.html";
//		}else{
//			window.location.href="live_select_album.html?course_id="+course_id+"";
//		}
//	}
//
//}
//已购买并没有专辑
//function btn_purchase_no(){
//	window.location.href="live_audio.html?my_study="+course_id+"";
//}
//已购买并有专辑
//function btn_purchase_have(){
//
//	window.location.href="live_select_album.html?course_id="+course_id+"";
//}
//主播本人无专辑

//function btn_purchase_myno(){	
//	window.location.href="live_audio.html?my_study="+course_id+"";
//}
//主播本人有专辑
//function btn_purchase_myhave(){
//	window.location.href="live_select_album.html?course_id="+course_id+"";
//}