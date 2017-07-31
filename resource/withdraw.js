var pageType = getQueryString('type');
var widthdrawType = pageType || '1' ;
var withdraw = {
    submit: function () {
        var ele = this;
        var txtBalance = util.trim($("#txtBalance").val());
        var txtText = util.trim($("#txtText").val());
        var txtAmount = util.trim($("#txtAmount").val());
        var txtCode = util.trim($("#txtCode").val());
        if (txtText === "") {
            util.layerAlert("", util.getLan("user.tips.26"), 2);
            return;
        }
        if (txtAmount === "") {
            util.layerAlert("", util.getLan("user.tips.27"), 2);
            return;
        }
        if (txtCode === "") {
            util.layerAlert("", util.getLan("user.tips.28"), 2);
            return;
        }
        if (isNaN(txtBalance)) {
            util.layerAlert("", util.getLan("user.tips.29"), 2);
            return;
        }
        if (parseFloat(txtBalance) < parseFloat(txtAmount)) {
            util.layerAlert("", util.getLan("user.tips.29"), 2);
            return;
        }
        //提现类型，1是btc，2是eth，3是bcdn
        var param = {
            sessionid: localStorage.sessionid,
            token: localStorage.token,
            timestamp: new Date().getTime(),
            user_name: localStorage.user_name,
            data: JSON.stringify({
                "user_name": localStorage.user_name,
                "draw_address": txtText,
                "draw_count": txtAmount,
                "vcode": txtCode,
                "type": widthdrawType
            })
        };
        var callback = function (data) {
            if (data.status == 0) {
                util.layerAlert("", util.getLan("user.tips.30"), 1, function(){
                    location.href = 'withdraw.html?type=' + widthdrawType;
                });
            } else {
                util.layerAlert("", data.message, 2);
            }
        };
        util.network({btn: ele, url: withdrawUrl, param: param, success: callback});
    },
    cancelCoinWithdraw: function (id) {
        util.layerConfirm(util.getLan("user.tips.31"), function () {
            var param = {
                sessionid: localStorage.sessionid,
                token: localStorage.token,
                timestamp: new Date().getTime(),
                user_name: localStorage.user_name,
                data: JSON.stringify({
                    "user_name": localStorage.user_name,
                    id: id
                })
            };
            var callback = function (data) {
                if (data.status == 0) {
                    console.log('这里语言处理');
                    util.layerAlert("", '取消成功', 1, function () {
                        location.href = 'withdraw.html?type=' + widthdrawType;
                    });
                }
                else {
                    util.layerAlert("", data.message, 2);
                }
            };
            util.network({
                url: cancelDrawUrl,
                param: param,
                success: callback,
            });
        });
    }
};

$(function () {
    $("#btnSendEmailCode").on("click", function () {
        email.sendcode($(this).data().msgtype, $(this).data().tipsid, this.id, localStorage.user_name, 3);
    });
    $("#btnSubmit").on("click", function () {
        withdraw.submit()
    });
    $("#txtAmount").on("keypress", function (event) {
        //return util.goIngKeypress(this, event, 4);
    });//withdrawRecord
    $("#withdrawRecord").off('click').on("click", '.withdraw-cancel', function (event) {
        withdraw.cancelCoinWithdraw($(this).attr('fid'));
    });

    //提现类型，1是btc，2是eth，3是bcdn
    $('.withdraw-btn').off('click').on('click', function () {
        $('.withdraw-btn').removeClass('active');
        $(this).addClass('active');
        var type = $(this).attr('type');
        $('#txtAmount').val('');
        $('#sjtx').text('');
        $('#txtText').val('');
        $('#txtAmount').val('');
        $('#txtCode').val('');
        if (type == 'BTC') {
            widthdrawType = '1';
            $('#txtBalance').val(btcCountYe);
            getQueryDraw(widthdrawType);
        }
        else if (type == 'ETH') {
            widthdrawType = '2';
            $('#txtBalance').val(ethCountYe);
            getQueryDraw(widthdrawType);
        }
        else {
            widthdrawType = '3';
            $('#txtBalance').val(bcdnCountYe);
            getQueryDraw(widthdrawType);
        }
    });

    setTimeout(function(){
        $('#withdrawBtn' + widthdrawType).click();
    },300);



});

function getQueryDraw(type) {
    $.ajax({
        url: queryDrawUrl,
        type: 'post',
        dataType: 'json',
        data: {
            sessionid: localStorage.sessionid,
            token: localStorage.token,
            timestamp: new Date().getTime(),
            user_name: localStorage.user_name,
            data: JSON.stringify({user_name: localStorage.user_name, type: type})
        },
        success: function (json) {
            console.log('提现记录:', type, json);
            //BTC 提现手续费0.0005BTC/笔，ETH提现0.005ETH/笔，BCDN提现5BCDN/笔。
            var dw = '笔';
            if (getCookie('bcdnLan') == 'en_US') {
                dw = 'sum';
            }
            var withdrawAddress = '';
            var sxf = 0;
            var sxfDw = '';
            if (type == '1'){
                withdrawAddress = 'https://blockchain.info/address/';
                sxf = 0.0005;
                sxfDw = ' BTC/' + dw;

            }
            else if (type == '2'){
                withdrawAddress = 'https://etherscan.io/address/';
                sxf = 0.005;
                sxfDw = ' ETH' + dw;
            }
            else if (type == '3'){
                withdrawAddress = 'https://etherscan.io/token/0x1e797ce986c3cff4472f7d38d5c4aba55dfefe40?a=';
                sxf = 5;
                sxfDw = ' BCDN' + dw;
            }
            if (json.status == 0) {
                /*
                * draw_actual: -4
                 draw_address: "dsads21312wdasda123213"
                 draw_fee: 5
                 draw_money: 1
                 draw_status: 2
                 draw_time: 1500622198000
                * */
                var data = json.data;
                $('#withdrawRecord').empty();
                for (var i=0;i<data.length;i++){
                    var dataI = data[i];
                    var draw_status = dataI.draw_status;
                    var draw_actual = dataI.draw_actual;
                    if (draw_actual < 0) {
                        draw_actual=0;
                    }
                    var isNone = '';
                    draw_status == '1' ? isNone = '' : isNone = 'none';
                    var draw_address = withdrawAddress + dataI.draw_address;
                    var trHtml = '<tr>' +
                        '<th width="200">'+formatDate(dataI.draw_time)+'</th>' +
                        '<th width="150">'+draw_actual+'</th>' +
                        '<th width="328"><a style="color: #5454FF;text-decoration:underline;" href="'+ draw_address +'" target="_blank">'+dataI.draw_address+'</a></th>' +
                        '<th width="100">'+drawStatus(draw_status)+'</th>' +
                        '<th width="100">' +
                        '<span class="withdraw-cancel" style="display:'+isNone+'" fid="'+dataI.id+'">取消</span>' +
                        '</th>' +
                        '</tr>';
                    $('#withdrawRecord').append(trHtml);
                }


                $('#sxf').text(sxf + sxfDw);
                $('#txtAmount').off('change').on('change',function(){
                    var val = $(this).val();
                    var sjje = (val*1000000 - sxf*1000000)/1000000;
                    if (sjje < 0) {
                        sjje = 0;
                    }
                    $('#sjtx').text(sjje);
                });
            }
            else if (json.status == 431 || json.status == 402 || json.status == 430) {
                util.layerAlert("", json.message, 2, function () {
                    location.href = 'login.html';
                });
            }
            else {
                util.layerAlert("", json.message, 2);
            }
        }
    });
}

//提现状态1是审核中，2是成功，3是已取消,4是已驳回
function drawStatus(draw_status){
    var obj = {
        1 : '审核中',
        2 : '成功',
        3 : '已取消',
        4 : '已驳回'
    };
    return obj[draw_status];
}