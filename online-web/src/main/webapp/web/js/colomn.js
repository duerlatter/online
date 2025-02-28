$(function(){
	
	//设置初始化数据
	window.current = 1;
	window.size = 10;
	window.doctorId = getQueryString('doctorId')?getQueryString('doctorId'):'';
	
	//头部的医师变色
	$('.path .doctor').addClass('select');
	

	//获取url中参数值的方法
	function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return (r[2]); 
    }
    return null;
	}
	
	
	
	
	//没有条件的进行列表渲染
	function getReportList(current,size,doctorId){
		RequestService("/doctor/getSpecialColumnsByPage","GET",{
			current:current,
			size:size,
			doctorId:doctorId
		},function(data){
	    if(data.success==false || data.resultObject.records.length == 0){
	   	//没有数据处理
	        $('#doctor_book_list').addClass('hide')
	   }else{
	   		if( current*size < data.resultObject.total){
	   			$('.doctor_book_more').removeClass('hide')
	   		}else{
	   			$('.doctor_book_more').addClass('hide')
	   		}
	    	//获取到数据渲染
	    	console.log(data)
	    	$('#doctor_book_list').append(template('report_listTpl',{inf:data.resultObject.records}));
	  	}
	});
	}
	
	//渲染列表
	getReportList(current,size,doctorId);
	
	//点击更多
	$('.doctor_book_more button').click(function(){
		current += 1;
		getReportList(current,size,doctorId);
	})
	
	
	//右侧名医推荐部分
	     RequestService("/doctor/getHotSpecialColumnAuthor","GET",null,function(data){
	       
	        console.log(data);
	        $('#about_doctorList').html(template('zhuanlan_zuozheTpl',{doc:data.resultObject}));
	        
	      });
	
})
