$(function(){
	imgSenBut();
	createImageUpload($('.uploadImg'));//生成图片编辑器
	document.onkeydown=function(event){

//		if(event.keyCode==13){
//			return false
//		}
	}
});


function imgSenBut(){
	$("#imgAdd").html('<input type="file" name="img" id="imgPath_file" class="uploadImg"/>');
	
};
function createImageUpload(obj){
	obj.ace_file_input({
		style:'well',
		btn_choose:'点击选择图片',
		btn_change:null,
		no_icon:'ace-icon fa fa-cloud-upload',
		droppable:true,
		thumbnail:'small',//large | fit	
		preview_error : function(filename, error_code) {
		}
	}).on('change', function(){
	});
	obj.ace_file_input('update_settings',
			{
		'allowExt': ["jpeg", "jpg", "png", "gif" , "bmp"],
		'allowMime': ["image/jpg", "image/jpeg", "image/png", "image/gif", "image/bmp"]
			});
	/*$(".ace-file-container").css({"width": "240px", "height": "120px"});*/
	$(".remove").hide();
	
}
//图片上传统一上传到附件中心---- 修改  列表页
$("#addArticle-form").on("change","#imgPath_file",function(){
	var v = this.value.split(".")[this.value.split(".").length-1].toUpperCase();
	if(v!='BMP' && v!='GIF' && v!='JPEG' && v!='PNG' && v!='SVG' && v!='JPG'){
		layer.alert("图片格式错误,请重新选择.");
		this.value="";
		
		return;
	}
	var id = $(this).attr("id");
	ajaxFileUpload(this.id,basePath+"/attachmentCenter/upload?projectName=online&fileType=1", function(data){
		if (data.error == 0) {
			$("#"+id).parent().find(".ace-file-name").after("<img scr='' class='middle'/>");
			$("#"+id).parent().find(".ace-file-name img").attr("src",data.url);
			$("#"+id).parent().find(".ace-file-name img").attr("style","width: 228px; height: 110px;");

			$("#add_imgPath").val(data.url);
			document.getElementById("imgPath_file").focus();
			document.getElementById("imgPath_file").blur();
			$(".remove").hide();
			
		}else {
			alert(data.message);
			
		}
	})
});

function openTagDiv(){
	
	$("#tagDiv :input").removeAttr("checked");
	if($("#tagId").val()!=""&&$("#tagId").val()!=null){
		;
		var seleTag=$("#tagId").val().split(",");
		for(var i=0;i<seleTag.length;i++){
			$("#tagDiv input").each(function(){
				if($(this).val()==seleTag[i]){
					$(this).prop('checked','checked');
				}
			})
		}
	}
	
	
	var dialog = openDialog("addTagDialog","dialogTagDiv","选择文章标签",580,500,true,"确定",function(){
		var tagIds = new Array();
		var tagNames = new Array();
		$("#tagDiv input:checked").each(function(){
			var tagId=$(this).val();
			var tagName=$(this).attr("data-tagName");
			tagIds.push(tagId);
			tagNames.push(tagName);
		})
		if(tagIds.length>2){
			 layer.msg("最多只能选择两个标签！");
			 return;
		}
		$("#tagId").val(tagIds);
		$("#tagName1").val(tagNames);
		dialog.dialog( "close" ); 
	})
};

//新增
$("#saveBtn").click(function(){
	
	// var content=$("#article_content").html();
	$("#content").val(UE.getEditor('editor').getContent());
	
	if($("#addArticle-form").valid()){
		mask();
		 $("#addArticle-form").attr("action", basePath+"/headline/article/add");
		 $("#addArticle-form").ajaxSubmit(function(data){
			 data = getJsonData(data);
			 if(data.success){
				 layer.msg(data.resultObject);
				 turnPage(basePath+'/home#headline/article/index');
				
			 }else{
				 layer.alert(data.errorMessage);
			 }
			 unmask();
		 })
	}
});

//返回
$("#returnbutton").click(function(){
	turnPage(basePath+'/home#headline/article/index');
})

//新增预览
$("#previewSaveBtn").click(function(){
	var content=$("#article_content").html();
	$("#content").val(content);
	
	if($("#addArticle-form").valid()){
		mask();
		 $("#addArticle-form").attr("action", basePath+"/headline/article/addPre");
		 $("#addArticle-form").ajaxSubmit(function(data){
			 data = getJsonData(data);
			 if(data.success){
				 window.open(weburl+"/web/html/forumDetailPreview.html?preId="+data.resultObject);
			 }else{
				 layer.alert(data.errorMessage);
			 }
			 unmask();
		 })
	}
})