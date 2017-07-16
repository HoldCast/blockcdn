$(function(){
    $('.deposit-btn').off('click').on('click',function(){
        $('.deposit-btn').removeClass('active');
        $(this).addClass('active');
        var type = $(this).attr('type');
        if (type == 'ETH'){
            $('#ETHArea').show();
            $('#BTCArea').hide();
        }
        else {
            $('#ETHArea').hide();
            $('#BTCArea').show();
        }
    });
});