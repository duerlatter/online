
function btn_up(){
    /*if($(".wrap-user-id .userName").val()==''||$(" #cardNum").val()==''
        ||$("#previewImg").val()==''||$("#previewImg2").val()==''
        ||$("#previewImg3").val()==''||$("#previewImg4").val()==''){
        $(".error-prompt").show();
        $(".btn-up").removeAttr("onclick")
        setTimeout(function(){
            $(".error-prompt").hide();
            $(".btn-up").attr("onclick","btn_up()")
        },2000)
    }*/
    //验证
    if($.trim($(" #userName").val())==''){
        webToast("请输入真实姓名","middle",1500);
        return false;
    }
    if($.trim($(" #cardNum").val())==''){
        webToast("请输入身份证号","middle",1500);
        return false;
    }
    if($.trim($(" #previewImg").val())==''){
        webToast("请上传身份证正面","middle",1500);
        return false;
    }
    if($.trim($(" #previewImg2").val())==''){
        webToast("请上传身份证反面","middle",1500);
        return false;
    }
    if($.trim($(" #previewImg3").val())==''){
        webToast("请上传医师资格证","middle",1500);
        return false;
    }
    if($.trim($(" #previewImg4").val())==''){
        webToast("请上传职业资格证","middle",1500);
        return false;
    }
        //form提交
        var form=document.getElementById("docAutInf");
        var fd =new FormData(form);
        $.ajax({
            url: "/xczh/medical/addDoctorApply",
            type: "POST",
            data: fd,
            processData: false,  // 告诉jQuery不要去处理发送的数据
            contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
            success: function(data){
                if(data.success==true){
                    window.location.href="../html/phy_examine.html";
                }else{
                    webToast(data.errorMessage,"middle",1500);
                }


            }
        });

}



function isCardID(sId){
	    var iSum=0 ;
	    var info="" ;
	    if(!/^\d{17}(\d|x)$/i.test(sId))
	    //return "你输入的身份证长度或格式错误";
	        return false;
	    sId=sId.replace(/x$/i,"a");
	    if(aCity[parseInt(sId.substr(0,2))]==null)
	    //return "你的身份证地区非法";
	        return false;
	    sBirthday=sId.substr(6,4)+"-"+Number(sId.substr(10,2))+"-"+Number(sId.substr(12,2));
	    var d=new Date(sBirthday.replace(/-/g,"/")) ;
	    if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate()))
	    //return "身份证上的出生日期非法";
	        return false;
	    for(var i = 17;i>=0;i --) iSum += (Math.pow(2,i) % 11) * parseInt(sId.charAt(17 - i),11) ;
	    if(iSum%11!=1)
	    //return "你输入的身份证号非法";
	        return false;
	    return true;
}
