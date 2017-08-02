var push = {
    submit: function (ele) {
        var bcdnCoupon = $("#bcdnCoupon").val();
        if (bcdnCoupon == "") {
            util.layerAlert("", util.getLan("add1"), 2);
            return;
        }
        var param = {
            bcdn_coupon: bcdnCoupon,
            user_name: localStorage.user_name
        }
        var callback = function (result) {
            console.log('兑换码:', result);
            if (result.status == 0) {
                util.layerAlert("", util.getLan("add2"), 1, function () {
                    getCoupon(); //获取兑换信息
                    getBalance();//获取资产信息
                });
            } else {
                util.layerAlert("", result.message, 2);
            }
        }
        util.network({
            btn: ele,
            url: exchangeUrl,
            param: {
                sessionid: localStorage.sessionid,
                token: localStorage.token,
                timestamp: new Date().getTime(),
                user_name: localStorage.user_name,
                data: JSON.stringify(param)
            },
            success: callback
        });
    },
    cancel: function (pushid) {
        util.layerConfirm(util.getLan("finance.tips.40"), function () {
            var url = "/cancel_push.html";
            var param = {
                pushid: pushid
            };
            var callback = function (result) {
                if (result.code == 200) {
                    util.layerAlert("", result.msg, 1);
                } else {
                    util.layerAlert("", result.msg, 2);
                }
            };
            util.network({url: url, param: param, success: callback});
        });
    },
    confirmShow: function (ele) {
        var $that = $(ele);
        var $data = $that.data();
        var pushid = $data.pushid;
        var coins = $data.coins;
        var count = $data.count;
        var price = $data.price;
        var amount = $data.amount;
        var content = '<div class="comm-dialog">'
            + '<div class="title">'
            + '<span>'
            + util.getLan("finance.tips.42")
            + '</span><i class="close"></i>'
            + '</div>'
            + '<div class="content">'
            + '<div class="grid-item"><span>' + util.getLan("finance.tips.43")
            + '</span><span>DHG</span></div>'
            + '<div class="grid-item"><span>' + util.getLan("finance.tips.44")
            + '</span><span>' + price + coins + '</span></div>'
            + '<div class="grid-item"><span>' + util.getLan("finance.tips.45")
            + '</span><span>' + count + 'DHG</span></div>'
            + '<div class="grid-item"><span>' + util.getLan("finance.tips.46")
            + '</span><span class="blod">' + amount + coins + '</span></div>'
            + '</div>'
            + '<button class="pay-btn">' + util.getLan("finance.tips.47") + '</button>'
            + '</div>';
        push.layerIndex = layer.open({type: 1, title: false, content: content, area: '7.9rem', closeBtn: 0});
        $(".comm-dialog .close").unbind("click").on("click", function () {
            layer.close(push.layerIndex);
        });
        $(".comm-dialog .pay-btn").unbind("click").on("click", function () {
            push.confirm(this, pushid);
        });
    },
    confirm: function (ele, pushid) {
        var url = "/confirm_push.html";
        var param = {
            pushid: pushid
        };
        var callback = function (result) {
            if (result.code == 200) {
                util.layerAlert("", result.msg, 1);
            } else {
                util.layerAlert("", result.msg, 2);
            }
        };
        util.network({btn: ele, url: url, param: param, success: callback});
    },
    getUserBalance: function (ele) {
        var url = "/push/userbalance.html";
        var param = {coinid: ele.value};
        var callback = function (result) {
            if (result.code === 200) {
                $("#btcbalance").val(result.data.total);
                $("#assettotal").html(result.data.total);
            } else {
                util.layerAlert("", result.msg, 2);
            }
        };
        util.network({btn: ele, url: url, param: param, success: callback});
    }
};
$(function () {
    $("#pushPrice").on("keypress", function (event) {
        return util.goIngKeypress(this, event, util.PUSH_COIN_SCALE);
    }).on("keyup", function (event) {
        var number = $("#pushCount").val();
        if (number && number.length > 0) {
            $("#txtShowAmount").text(util.numFormat(util.accMul(parseFloat(this.value), parseFloat(number)), 4))
        }
        return util.goIngKeypress(this, event, util.PUSH_COIN_SCALE);
    });
    $("#pushCount").on("keypress", function (event) {
        return util.goIngKeypress(this, event, util.PUSH_COIN_SCALE);
    }).on("keyup", function (event) {
        var number = $("#pushPrice").val();
        if (number && number.length > 0) {
            $("#txtShowAmount").text(util.numFormat(util.accMul(parseFloat(this.value), parseFloat(number)), 4))
        }
        return util.goIngKeypress(this, event, util.PUSH_COIN_SCALE);
    });
    $("#pushSubmit").on("click", function () {
        push.submit(this);
    });
    $(".cancelPush").on("click", function () {
        var $that = $(this);
        push.cancel($that.data().pushid);
    });
    $(".payPush").on("click", function () {
        push.confirmShow(this);
    });
    $("#pushModalBtn").on("click", function () {
        push.confirm(this);
    });
    $("#pushCoinId").on("change", function () {
        push.getUserBalance(this);
    });
    getCoupon();//获取优惠券
});

//queryCouponUrl
function getCoupon() {
    $.ajax({
        url: queryCouponUrl,
        type: 'post',
        dataType: 'json',
        data: {
            data: JSON.stringify({user_name: localStorage.user_name}),
            sessionid: localStorage.sessionid,
            token: localStorage.token,
            timestamp: new Date().getTime(),
            user_name: localStorage.user_name
        },
        success: function (json) {
            console.log('获取兑换券:', json);
            if (json.status == 0) {
                $('#bcdnCouponList').empty();
                var users = json.data.users;
                for (var i=0;i<users.length;i++) {
                    var user = users[i];
                    var trHtml = '<tr>' +
                        '<th width="240">'+user.ext_time+'</th>' +
                        '<th width="400">'+user.bcdn_coupon+'</th>' +
                        '<th width="240">'+user.money+'</th>' +
                        '</tr>';
                    $('#bcdnCouponList').append(trHtml);
                }
            }
            else if (json.status == 431 || json.status == 402 || json.status == 430) {
                console.log('message:', json.message);
                util.layerAlert("", util.getLan("add4"), 2, function () {
                    location.href = 'login.html';
                });
            }

            else {
                util.layerAlert("", json.message, 2);
            }
        }
    });
}