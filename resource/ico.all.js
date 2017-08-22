var getTotalUrl = "https://ssl.blockcdn.org/getTotal";//前台查看购币的总金额
var getBtcBuyUrl = "https://ssl.blockcdn.org/getBtcBuyHistory";// 首页查看btc的购买记录
var getEthBuyUrl = "https://ssl.blockcdn.org/getEthBuyHistory";// 首页查看eth的购买记录

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
                var listLen = list.length;
                var icoCountType = $('#icoCountType').val();
                if(icoCountType == 'homePage'){
                    listLen = 10;
                }
                for (var i = 0; i < listLen; i++) {
                    var item = list[i];
                    var num = i + 1 + ((page-1) * 20);
                    var address = item.eth_address;
                    if (type == 'btc') {
                        address = item.btc_address
                    }
                    var trHtml = '<tr>' +
                        '<td class="td-1">' + num + '</td>' +
                        '<td class="td-6">' + address + '</td>' +
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
