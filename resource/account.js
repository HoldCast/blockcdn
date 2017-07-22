var pageType = getQueryString('type') || '1';
$(function () {
    $('.deposit-btn').off('click').on('click', function () {
        $('.deposit-btn').removeClass('active');
        $(this).addClass('active');
        var type = $(this).attr('type');
        if (type == 'ETH') {
            pageType = '2';
            $('#ETHArea').show();
            $('#BTCArea').hide();
            getFinancialRecord(pageType);
        }
        else {
            pageType = '1'
            $('#ETHArea').hide();
            $('#BTCArea').show();
            getFinancialRecord(pageType);
        }
    });

    $('#depositBtn' + pageType).click();

    setInterval(function () {
        console.log('3分钟自动刷新数据');
        getFinancialRecord(pageType)
    }, 1000 * 60 * 3);
});


function getFinancialRecord(type) {
    $.ajax({
        url: queryChargeUrl,
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
            console.log('充值记录:', type, json);
            /* 提现状态1是审核中，2是成功，3是已取消,4是已驳回
             "time":  "2017-09-02 12:23:23",
             "recharge_money": 12,
             "recharge_out_address": "asadsasdasdsaaas",
             "status": 2
             * */
            if (json.status == 0) {
                var data = json.data;
                $('#financialRecord').empty();
                if (data.length) {
                    for(var i=0;i<data.length;i++){
                        var itemData = data[i];
                        var time = itemData.time;
                        var recharge_money = itemData.recharge_money;
                        var recharge_out_address = itemData.recharge_out_address;
                        var status = depositeStatus(itemData.status);
                        var trHtml = '<tr>' +
                            '<th width="220">'+time+'</th>' +
                            '<th width="200">'+recharge_money+'</th>' +
                            '<th width="220"><p>'+recharge_out_address+'</p></th>' +
                            '<th width="212">'+status+'</th>' +
                            '</tr>';
                        $('#financialRecord').append(trHtml);
                    }

                }

            }
            else if (json.status == 431 || json.status == 402) {
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

function depositeStatus(status) {
    var obj = {
        1: '审核中',
        2: '成功',
        3: '已取消',
        4: '已驳回'
    }
    return obj[status];
}