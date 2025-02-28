var sn = getQueryString("orderSn");
var orderId = getQueryString("orderId");

$(function() {
    orderDetails();

    requestGetService("/xczh/shop/order/shipping", {
        orderId: orderId
    }, function (data) {
        if(data.success ){
            var shippingId = data.resultObject.id;
            if(shippingId != null){
                $(".kuaidiName").html("本商品由【"+data.resultObject.deliveryCorp+"快递】承运");
                $(".orderSn").html("运单号  "+data.resultObject.trackingNo);
                transitStep(shippingId);
            } else {
                jqtoast("运单号有误");
            }
        }
    });

});

function transitStep(shippingId) {
    requestGetService("/xczh/shop/order/transitStep", {
        shippingId: shippingId
    }, function (data) {
        if(data.success ){
            var size = data.resultObject.transitSteps.length;
            if(size > 0){
                var transitStep = data.resultObject.transitSteps[size-1];

                if(size == 1) {
                    $(".transportStatus").html("已揽收");
                } else if (transitStep.context.indexOf("已签收") != -1) {
                    $(".transportStatus").html("已收货");
                } else {
                    $(".transportStatus").html("运输中");
                }
            } else {

                $(".logistics_address").html("该单号暂无物流进展，请稍后再试。");
            }

            $(".logistics_address_ul").html(template('logistics_address_ul', {items: data.resultObject.transitSteps}));
        }else {
            jqtoast(data.errorMessage);
        }
    });
}

//订单详情
function orderDetails() {
    requestGetService("/xczh/shop/order/detail", {
        sn: sn
    }, function (data) {
        if(data.success ){
            var obj =  data.resultObject;
            order_Id=data.resultObject.sn;

            if(obj.status =="SHIPPED"){
                $(".transportStatus").html("已发货");
            }


            //$(".orderInfo").html(template('orderInfo',obj));
            $(".orderImg").attr('src',data.resultObject.orderItems[0].thumbnail);

        }
    });

}