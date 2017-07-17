$(function(){
    $('.deposit-btn').off('click').on('click',function(){
        $('.deposit-btn').removeClass('active');
        $(this).addClass('active');
        var type = $(this).attr('type');
        if (type == 'ETH'){
            $('#ETHArea').show();
            $('#BTCArea').hide();
            getFinancialRecord(2);
        }
        else {
            $('#ETHArea').hide();
            $('#BTCArea').show();
            getFinancialRecord(1);
        }
    });
    getFinancialRecord(1);
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
            data: JSON.stringify({user_name:localStorage.user_name,type:type})
        },
        success: function(json){
            console.log('充值记录:',type, json);
            if (json.status == 0){

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