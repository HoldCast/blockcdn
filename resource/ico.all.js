var getTotalUrl = "http://211.149.175.73:8089/getTotal";//前台查看购币的总金额
var getBtcBuyUrl = "http://211.149.175.73:8089/getBtcBuyHistory";// 首页查看btc的购买记录
var getEthBuyUrl = "http://211.149.175.73:8089/getEthBuyHistory";// 首页查看eth的购买记录

var pageSize = 20;
var btcPageNum = 1;
var ethPageNum = 1;
$(function () {
    getTotal();
    getBtcRecord(btcPageNum);
    getEthRecord(ethPageNum);
    getMore();
});

function getMore() {
    $('#btcMore').off('click').on('click', function () {
        alert(btcPageNum);
        getBtcRecord(btcPageNum);
    });
    $('#ethMore').off('click').on('click', function () {
        alert(ethPageNum);
        getEthRecord(ethPageNum);
    });
}


function getBtcRecord() {
    getRecord('btc');
}

function getEthRecord() {
    getRecord('eth');
}

function getRecord(type) {
    var url = '';
    var page = 0;
    if (type == 'btc') {
        url = getBtcBuyUrl;
        page = btcPageNum;
    } else if (type == 'eth') {
        url = getEthBuyUrl;
        page = ethPageNum;
    }
    var data = [
        {add: 'dadasdasdasd', count: 199},
        {add: 'dadasdasdasd', count: 410},
        {add: 'dadasdasdasd', count: 428},
    ];

    $.ajax({
        url: url,
        type: 'post',
        dataType: 'json',
        data: {
            data: JSON.stringify({page: page})
        },
        success: function (json) {
            console.log(type, '购币记录:', json);
            if (json.status == 0) {
                var data = json.data;
                var hasMore = data.hasMore;
                var list = data.list;
                for (var i = 0; i < list.length; i++) {
                    var item = list[i];
                    var num = i + 1 + ((page-1) * 20);
                    var trHtml = '<tr>' +
                        '<td class="td-2">' + num + '</td>' +
                        '<td class="td-6">4D1F4G1T4R5D2D4F1E4S54D1F4G1T4R5D2D4F1E4S5HJ</td>' +
                        '<td class="td-2">' + item.bcdn + '</td>' +
                        '</tr>';
                    $('#' + type + 'Record').append(trHtml);
                }
                if (type == 'btc') {
                    if(hasMore == 0){
                        $('#btcMore').hide();
                    }else{
                        btcPageNum++
                    }
                }
                if (type == 'eth') {
                    if(hasMore == 0){
                        $('#ethMore').hide();
                    }else{
                        ethPageNum++
                    }
                }
            } else {
                alert(json.message);
            }
        }
    });


}

function getTotal() {
    $.ajax({
        url: getTotalUrl,
        type: 'post',
        dataType: 'json',
        data: {},
        success: function (json) {
            console.log('所有金额数据:', json);
            if (json.status == 0) {
                var data = json.data;
                $('#ethAll').text(data.eth);
                $('#btcAll').text(data.btc);
            } else {
                alert(json.message);
            }
        }
    });
}
