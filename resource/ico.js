var rateData = {};

$(function(){
    getRate(1);

    $('#icoBtn1').off('click').on('click',function(){
        $('.withdraw-btn').removeClass('active');
        $(this).addClass('active');
        getRate(1);
    });

    $('#icoBtn2').off('click').on('click',function(){
        $('.withdraw-btn').removeClass('active');
        $(this).addClass('active');
        getRate(2);
    });

    $('#icoSubmit').off('click').on('click',function(){
        var txtFinancesCount = $('#txtFinancesCount').val();
        rateData.txtFinancesCount = txtFinancesCount;
        moneyBuy(rateData);
    });

    buyRecord()
});

//购买记录
function buyRecord(){
    $.ajax({
        url: queryAllBuyUrl,
        type: 'post',
        dataType: 'json',
        data: {
            data : JSON.stringify({
                user_name:localStorage.user_name
            }),
            sessionid: localStorage.sessionid,
            token: localStorage.token,
            timestamp: new Date().getTime(),
            user_name: localStorage.user_name
        },
        success: function(json){
            console.log('购买记录:', json);
            /*
            * "user_name":"12121@qq.com",
             "buy_time":1212121112,
             "buy_money_type":1,
             "buy_money":1.24,
             "bcdn":1233
            * */
            if(json.status == 0){
                var data = json.data;
                var buy_time = data.buy_time;
                var buy_money_type = data.buy_time;
                var buy_money = data.buy_time;
                var bcdn = data.buy_time;

            }
            else if (json.status == 420) {
                util.layerAlert("", util.getLan("add5"), 2);
            }
            /*else if (json.status == 431 || json.status == 402 || json.status == 430) {
             console.log('message:', json.message);
             util.layerAlert("", util.getLan("add4"), 2, function () {
             location.href = 'login.html';
             });
             }*/
            else{
                util.layerAlert("", json.message, 2);
            }
        }
    });
}

//锁定
function moneyBuy(rateData){
    console.log(rateData)
    var ioc = rateData.txtFinancesCount;
    var number = (rateData.number * ioc * rateData.rate)/100;
    $.ajax({
        url: moneyBuyUrl,
        type: 'post',
        dataType: 'json',
        data: {
            data : JSON.stringify({
                type: rateData.type,
                user_name:localStorage.user_name,
                step: rateData.step,
                ioc: ioc,
                number: number
            }),
            sessionid: localStorage.sessionid,
            token: localStorage.token,
            timestamp: new Date().getTime(),
            user_name: localStorage.user_name
        },
        success: function(json){
            console.log('购买:', json);
            if(json.status == 0){

            }
            else if (json.status == 420) {
                util.layerAlert("", util.getLan("add5"), 2);
            }
            /*else if (json.status == 431 || json.status == 402 || json.status == 430) {
                console.log('message:', json.message);
                util.layerAlert("", util.getLan("add4"), 2, function () {
                    location.href = 'login.html';
                });
            }*/
            else{
                util.layerAlert("", json.message, 2);
            }
        }
    });
}

//获取汇率
function getRate(type) {
    $('#txtFinancesCount').val('');
    $.ajax({
        url: moneyRateUrl,
        type: 'post',
        dataType: 'json',
        data: {
            data : JSON.stringify({
                type: type,
                user_name: localStorage.user_name
            }),
            sessionid: localStorage.sessionid,
            token: localStorage.token,
            timestamp: new Date().getTime(),
            user_name: localStorage.user_name
        },
        success: function(json){
            console.log('汇率信息:'+type, json);
            if(json.status == 0){
                var data = json.data;
                rateData.type = data.type;
                rateData.step = data.step;
                rateData.number = data.number;
                rateData.rate = parseInt(data.rate);
                var rate = data.number + '*' + data.rate;
                $('#rateValue').text(rate);
                $('#btcbalance').val(data.money);
                $('#icoCount').text(data.max_buy);
            }
            else if (json.status == 420) {
                util.layerAlert("", util.getLan("add5"), 2);
            }
            else if (json.status == 431 || json.status == 402 || json.status == 430) {
                console.log('message:', json.message);
                util.layerAlert("", util.getLan("add4"), 2, function () {
                    location.href = 'login.html';
                });
            }
            else{
                util.layerAlert("", json.message, 2);
            }
        }
    });
}