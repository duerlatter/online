

var wait = 60;
function time(o) {
    if (wait == 0) {
        o.removeAttribute("disabled");
        $(o).html("获取验证码");

        wait = 60;
        $(".call_code").css("background","#00bc12");
         $(".call_code").css("opacity","1");
    } else {
        o.setAttribute("disabled", true);
        $(o).html("" + wait + "S");
        wait--;
        $(".call_code").css("background","#00bc12");
        $(".call_code").css("opacity","0.3");
        setTimeout(function() {
            time(o)
        }, 1000)
    }
}

$("input").focus(function(){
	$("#errorMsg").hide();
});


/*点击返回按钮*/
$(".return").click(function(){
    location.href ='persons.html';
});


/**
 * 	更换手机号开始
 */
var currentName = localStorage.username;

/*
 * 发送短信验证码
 */
function  sendCode(obj){
	var vtype = "";
	var number= "";
	if(obj.id == "call_code_current"){
		vtype = 3;
		number = currentName; // 手机号
	}else if(obj.id == "call_code_update"){
		vtype = 4;
		number = $("#new_mobile").val();
	}
	if (isBlank(number)) {
		return false;
	}
	if (!(/^1[345678]\d{9}$/.test(number))) {
		webToast("手机号格式不正确","middle",1500);
		return false;
	}
	//
	if(vtype == 4 && currentName.trim() == number.trim()){
		webToast("当前绑定的手机号和原来的一样,换个吧","middle",1500);
		/*$(".web_toast").css("left","50%");
		$(".web_toast").css("margin-left","-113.5px");*/
		return false;
	}
	var urlparm = {
		username : number,
		vtype:vtype   	//类型，3注册，4重置密码
	};
	requestService("/xczh/set/phoneCheck",
			urlparm, function(data) {
		if (data.success) {
			time(obj);
		} else {
			webToast(data.errorMessage,"middle",1500);		//统一手机号2次发送间隔90		
			/*$(".web_toast").css("left","50%");
			$(".web_toast").css("margin-left","-106.5px");*/
			
		}
	});
}



/*
 * 新的微信端修改用户基本信息
 */
function setuserInfoWechat(saveFalg){

	  var falg = true;
	
	  var nickname = "";  var sex  = ""; var email = "";  var provinceCityName = "";
	  var info = "";var occupation = ""; var  occupationOther = ""; var regionId ="";
	  if(saveFalg == "nickname"){
		  nickname =  $("#form input[name='nickname']").val();
	  }else if(saveFalg == "sex"){
		  sex =  $("#form input[name='sex']:checked").val();
	  }else  if(saveFalg == "email"){
		  email = $("#form input[name='email']").val();
	  }else  if(saveFalg == "provinceCityName"){
		  provinceCityName  =  $("#xzdz").html();
		  regionId  =  $("#xzdz").attr("class");
	  }else  if(saveFalg == "info"){
		  info = $("#info").val().trim();
	  }else if(saveFalg == "occupation"){
		  occupation = $("#sfxx").attr("class");
	  }else if(saveFalg == "occupationOther"){
		  occupationOther =  $("#form input[name='occupationOther']").val();
	  }
	  var user_id = localStorage.getItem("userId");
	requestService("/xczh/set/userInfoWechat", {
          id: isNotBlank(user_id) ? user_id : "",
		  name: isNotBlank(nickname) ? nickname : "",
		  sex:isNotBlank(sex) ? sex : "",
		  email:isNotBlank(email) ? email : "",
          provinceName:isNotBlank(provinceCityName) ? provinceCityName : "",
          regionId:isNotBlank(regionId) ? regionId : "",
         		  
		  info:isNotBlank(info) ? info : "",
	      occupation:isNotBlank(occupation) ? occupation : "",
	      occupationOther:isNotBlank(occupationOther) ? occupationOther : ""
	}, function(data) {
		if (data.success) {
			var result = data.resultObject;
			if(isNotBlank(result.nickname)){
				$("#person_one").html(result.nickname);
				localStorage.setItem("username",result.nickname);
			}
			if(isNotBlank(result.sex)){
				if(result.sex==1){
					$("#person_two").html("男");
				}else if(result.sex==0){
					$("#person_two").html("女");
				}
				localStorage.setItem("sex",result.sex);
			}
			if(isNotBlank(result.email)){
				$("#person_five").html(result.email);
				localStorage.setItem("email",result.email);
			}
			
			

			if(isNotBlank(result.provinceName)){
				localStorage.setItem("provinceName",result.provinceName);
				localStorage.setItem("regionAreaId",result.regionAreaId);
			}
			if(isNotBlank(result.cityName)){
				localStorage.setItem("cityName",result.cityName);
				localStorage.setItem("regionCityId",result.regionCityId);
			}
			if(isNotBlank(result.countyName)){
				localStorage.setItem("countyName",result.countyName);
				localStorage.setItem("regionId",result.regionId);
			}
			
			if(isNotBlank(result.info)){
				localStorage.setItem("info",result.info);
				$("#person_sign").html(result.info);
			}
			if(isNotBlank(result.occupation)){
				localStorage.setItem("occupation",result.occupation);
			}
			if(isNotBlank(result.occupationOther)){
				localStorage.setItem("occupationOther",result.occupationOther);
			}
		} else {
			falg = false;
			webToast(data.errorMessage,"middle",1500);
		}
	},false);
	return falg;
}


/*
 * 绑定现有的手机号，也就是更换原来的手机号
 */
function updateMobile(){

    var newMobile= $("#new_mobile").val();
    if(isBlank(newMobile)){
        return false;
    }
    if (isBlank(currentName) || !(/^1[345678]\d{9}$/.test(currentName))) {
        $("#errorMsg").html("获取用户手机号有误");
        $("#errorMsg").show();
        return false;
    }

    var number = $("#new_mobile").val();
    if (!(/^1[345678]\d{9}$/.test(number))) {
       	webToast("手机号格式不正确","middle",1500);
        return false;
    }

    var code= $("#new_code").val();
    if(isBlank(code)){
    	webToast("验证码不能为空","middle",1500);
        return false;
    }
    var urlparm = {
        oldUsername:currentName,
        newUsername:number,
        code:code,
        vtype:4   	//类型，3注册，2重置密码
    };
    requestService("/xczh/set/updatePhone",   //获取验证码短信
        urlparm, function(data) {
            if (data.success) {
                //更改完手机号后，需要把session中的这个东西换下呢？
                localStorage.setItem("username",number);
                $(".call_popup_size2").text(number);
                $(".call_popup").show();
            } else {
            	webToast(data.errorMessage,"middle",1500);  //动态码不正确
                return false;
            }
        });

}
$(".call_popup_btn").click(function(){
    $(".call_popup").hide(); //去设置页面
    $(".return").click();

    requestService("/set/user/logout",{
		}, function(data) {
            if (data.success) {
                window.location.href="enter.html";
            }
        });


})

