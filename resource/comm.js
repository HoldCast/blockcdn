var vCodeUrl = "https://ssl.blockcdn.org/sendVcode";//获取验证码
var registerUrl = "https://ssl.blockcdn.org/register";//注册
var logInUrl = "https://ssl.blockcdn.org/login";//网站用户登陆
var cPassWordUrl = "https://ssl.blockcdn.org/user/changePassWord";// 修改密码
var rPassWordUrl = "https://ssl.blockcdn.org/resetPassword";// 重置密码
var logOutUrl = "https://ssl.blockcdn.org/user/logOut";// 用户退出
var vCodeImgUrl = "https://ssl.blockcdn.org/login/getVertifyCode";//  获取验证码 利用img的，src标签直接指向该地址

var exchangeUrl = "https://ssl.blockcdn.org/coupon/exchange";// 前台兑换优惠券
var queryCouponUrl = "https://ssl.blockcdn.org/coupon/queryCouponByUser";// 前台个人中心查看自己的优惠券;
var assetUrl = "https://ssl.blockcdn.org/money/queryUserAsset";// 用户提现时展现用户的资产信息(注意此接口针对BTC和ETH、BCDN提现时展现);
var withdrawUrl = "https://ssl.blockcdn.org/money/draw";// 用户提现
var cancelDrawUrl = "https://ssl.blockcdn.org/money/cancelDraw";// 用户取消提现
var queryDrawUrl = "https://ssl.blockcdn.org/money/queryDrawInfoByUser";// 前台根据用户查看提现记录
var queryChargeUrl = "https://ssl.blockcdn.org/money/queryRechargeInfoByUser";// 前台根据用户查看充值充值信息
//购币, ico锁定
var moneyRateUrl = "https://ssl.blockcdn.org/moneyRate/getNowMoneyRate";// 前台根据货币类型查看当前汇率信息
var moneyBuyUrl = "https://ssl.blockcdn.org/moneyRate/buy";//
var queryAllBuyUrl = "https://ssl.blockcdn.org/moneyRate/getBuyHistoryByUser";// 后台查看用户兑换信息
var btcCountYe = 0, ethCountYe = 0, bcdnCountYe = 0;
var btcCountDj = 0, ethCountDj = 0, bcdnCountDj = 0;
var btcCountZl = 0, ethCountZl = 0, bcdnCountZl = 0;

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

    getUserInfo();

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
    if(month < 10) month = '0' + month;
    if(date < 10) date = '0' + date;
    if(hour < 10) hour = '0' + hour;
    if(minute < 10) minute = '0' + minute;
    if(second < 10) second = '0' + second;
    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
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
                //余额
                btcCountYe = data.btc;
                ethCountYe = data.eth;
                bcdnCountYe = data.bcdn;
                //冻结
                btcCountDj = data.btc_frozen || 0;
                ethCountDj = data.eth_frozen || 0;
                bcdnCountDj = data.bcdn_frozen || 0;
                //总共
                btcCountZl = data.btc_total;//btcCountYe + btcCountDj;,,
                ethCountZl = data.eth_total;//ethCountYe + ethCountDj;
                bcdnCountZl = data.bcdn_total;//bcdnCountYe + bcdnCountDj;
                $('#iconNumber').text(bcdnCountYe);
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
                    $('#txtBalance').val(btcCountYe);
                }
                //个人资产展示
                if ($('#assetsTable').length) {
                    $('#btcKy').text(btcCountYe);
                    $('#btcDj').text(btcCountDj);
                    $('#btcZl').text(btcCountZl);

                    $('#ethKy').text(ethCountYe);
                    $('#ethDj').text(ethCountDj);
                    $('#ethZl').text(ethCountZl);

                    $('#bcdnKy').text(bcdnCountYe);
                    $('#bcdnDj').text(bcdnCountDj);
                    $('#bcdnZl').text(bcdnCountZl);

                    //点击提现
                    $('#assetsTable .withdraw-btn').off('click').on('click',function(){
                        //disableHandle();
                        //return false;
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
                            //disableHandle();
                            //return false;
                            location.href = 'deposit.html?type=' + fid;
                        }
                    });
                }
            }
            else if (json.status == 431 || json.status == 402 || json.status == 430) {
                console.log('message:', json.message);
                util.layerAlert("", util.getLan("add4"), 2, function () {
                    localStorage.clear();
                    location.href = 'login.html';
                });
            }
            else {
                util.layerAlert("", json.message, 2);
                localStorage.clear();
                location.href = 'login.html';
            }
            console.log('资产信息:', json);
        }
    });
}
function logOut(){
    localStorage.clear();
    location.href = 'login.html';
}

function getUserInfo(){
    //获取用户信息
    var userName = localStorage.user_name;
    if(userName){
        $('#userInfo').show();
        var index = userName.indexOf('@');
        $('#userMc').text(userName.substr(0,index));
    }
    else {
        $('#userInfo').hide();
    }
}

function userInfo(){
    //获取用户信息
    var userName = localStorage.user_name;
    if(userName){
        location.href = 'assets.html';
    }
    else {
        location.href = 'login.html';
    }
}

function disableHandle(){
    //util.layerAlert("", '由于BTC近期存在分叉风险，暂停充值提现!', 2);
    util.layerAlert("", util.getLan("add3"), 2);
    return false;
}

//获取cookie值
function getCookie(name){
    try{
        name = name.replace(/\*/g,"\\*");
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }catch (e) {}
}

//写入到Cookie
//c_name:cookie名称,value:cookie值,expiredays:过期天数
function setCookie(c_name,value,expiredays){
    var exdate=new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie=c_name+ "=" +escape(value)+	((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

function lanChange(type){
    var homeUrl = '';
    if(type == 'zh_CN'){
        homeUrl = '../index.html';
    }
    else if(type == 'en_US'){
        homeUrl = '../index_en.html';
    }
    location.href = homeUrl;
}
