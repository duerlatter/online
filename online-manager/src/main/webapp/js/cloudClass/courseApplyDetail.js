function pass(){ 
	var falg  = false;
	if(!falg){
		falg = true;
		$.ajax({
	        type:'post',
	        url:basePath+'/cloudclass/courseApply/pass?courseApplyId='+courseApplyId,
	        dataType:'json',
	        async:false,
	        success:function(data){
	        	if(data.success){
	        		falg = false;
	        		alertInfo(data.errorMessage,function(){
	  	                if(data.success){
	  	                    window.location.reload();
	  	                }
	  	            });
	        	}else{
	        		alertInfo(data.errorMessage,function(){
	  	                if(!data.success){
	  	                    window.location.reload();
	  	                }
	  	            });
	        	}
	        }
	    }) ;
	}
}
function notPass(){

    var cadata = {};
    cadata.id=courseApplyId;
    cadata.dismissal=$("#dismissal").val();
    cadata.dismissalRemark=$("#dismissalRemark").val();
    $.ajax({
        type:'post',
        url:basePath+'/cloudclass/courseApply/notPass',
        data:JSON.stringify(cadata),
        contentType:'application/json',
        dataType:'json',
        async:false,
        success:function(data){
            alertInfo(data.errorMessage,function(){
                if(data.success){
                    window.location.reload();
                }
            });
        }
    }) ;
}

function confirmNotPass() {
    openDialog("setDismissalDialog", "setDismissalDiv", "拒绝申请理由", 500, 400, true, "确定", function () {
        notPass();
    });
}
