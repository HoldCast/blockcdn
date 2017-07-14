$(function () {
    $(".address-box").each(function () {
        if (navigator.userAgent.indexOf("MSIE") > 0) {
            jQuery(this).find("#qrCodeBox").qrcode({
                text : jQuery(this).find(".recharge-address").text(),
                width : "150",
                height : "150",
                render : "table"
            });
        } else {
            jQuery(this).find("#qrCodeBox").qrcode({
                text : jQuery(this).find(".recharge-address").text(),
                width : "150",
                height : "150"
            });
        }
    });

});