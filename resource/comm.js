var vCodeUrl = "http://211.149.175.73:8089/sendVcode";//获取验证码
var registerUrl = "http://211.149.175.73:8089/register";//注册
var logInUrl = "http://211.149.175.73:8089/login";//网站用户登陆
var cPassWordUrl = "http://211.149.175.73:8089/user/changePassWord";// 修改密码
var rPassWordUrl = "http://211.149.175.73:8089/resetPassword";// 重置密码
var logOutUrl = "http://211.149.175.73:8089/user/logOut";// 用户退出

var exchangeUrl = "http://211.149.175.73:8089/coupon/exchange";// 前台兑换优惠券
var queryCouponUrl = "http://211.149.175.73:8089/coupon/queryCouponByUser";// 前台个人中心查看自己的优惠券;
var assetUrl = "http://211.149.175.73:8089/money/queryUserAsset";// 用户提现时展现用户的资产信息(注意此接口针对BTC和ETH、BCDN提现时展现);
var withdrawUrl = "http://211.149.175.73:8089/money/draw";// 用户提现
var cancelDrawUrl = "http://211.149.175.73:8089/money/cancelDraw";// 用户取消提现
var queryDrawUrl = "http://211.149.175.73:8089/money/queryDrawInfoByUser";// 前台根据用户查看提现记录
var queryChargeUrl = "http://211.149.175.73:8089/money/queryRechargeInfoByUser";// 前台根据用户查看充值充值信息
var btcCount = 0, ethCount = 0, bcdnCount = 0;

$(function () {
    $(".lan-tab-hover").on("click", function () {
        if ("undefined" === typeof (this.id)) {
            return;
        }
        var lan = $(this).data().lan;
        if (lan === this.id) {
            return;
        }
        util.network({
            url: "/real/switchlan.html",
            param: {lan: this.id},
            success: function (data) {
                if (data.code === 200) {
                    window.location.reload();
                }
            }
        });
    });
    util.lrFixFooter($(".footer"));

    $('#userName').text(localStorage.user_name);
    $('#uid').text(localStorage.user_name);
    $('#createTime').text(formatDate(localStorage.login_time));

    if ($('#iconNumber').length) {
        getBalance();//获取资产信息
    }

});

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}


function formatDate(str) {
    var now = new Date(parseInt(str));
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    return year + "-" + month + "-" + date + "   " + hour + ":" + minute + ":" + second;
}

//获取余额
function getBalance() {
    $.ajax({
        url: assetUrl,
        type: 'post',
        dataType: 'json',
        data: {
            sessionid: localStorage.sessionid,
            token: localStorage.token,
            timestamp: new Date().getTime(),
            user_name: localStorage.user_name,
            data: JSON.stringify({user_name: localStorage.user_name})
        },
        success: function (json) {
            if (json.status == 0) {
                var data = json.data;
                btcCount = data.btc;
                ethCount = data.eth;
                bcdnCount = data.bcdn;
                $('#iconNumber').text(bcdnCount);
                if ($('#BTCArea').length) {
                    var BTCStr = data.btc_address;
                    var ETHStr = data.eth_address;
                    $('#BTCStr').text(BTCStr);
                    $('#ETHStr').text(ETHStr);

                    //二维码
                    $("#BTCqrCodeBox").qrcode({
                        render: "table",
                        width: 220,
                        height: 220,
                        text: BTCStr
                    });
                    $("#ETHqrCodeBox").qrcode({
                        render: "table",
                        width: 220,
                        height: 220,
                        text: ETHStr
                    });
                }
                //提现余额展示
                if ($('#txtBalance').length) {
                    $('#txtBalance').val(btcCount);
                }
                //个人资产展示
                if ($('#assetsTable').length) {
                    $('#btcKy').text(btcCount);
                    $('#btcDj').text(0);
                    $('#btcZl').text(btcCount);

                    $('#ethKy').text(ethCount);
                    $('#ethDj').text(0);
                    $('#ethZl').text(ethCount);

                    $('#bcdnKy').text(bcdnCount);
                    $('#bcdnDj').text(0);
                    $('#bcdnZl').text(bcdnCount);

                    //点击提现
                    $('#assetsTable .withdraw-btn').off('click').on('click',function(){
                        var $this = $(this);
                        var fid = $this.attr('fid');
                        location.href = 'withdraw.html?type=' + fid;
                    });
                    //点击充值,兑换
                    $('#assetsTable .deposit-btn').off('click').on('click',function(){
                        var $this = $(this);
                        var fid = $this.attr('fid');
                        if(fid == '3') {
                            location.href = 'exchange.html';
                        }
                        else {
                            location.href = 'deposit.html?type=' + fid;
                        }
                    });
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
            console.log('资产信息:', json);
        }
    });
}