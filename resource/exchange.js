var push = {
    submit: function (ele) {
        var bcdnCoupon = $("#bcdnCoupon").val();
        if (bcdnCoupon == "") {
            util.layerAlert("", "请输入兑换码", 2);
            return;
        }
        var param = {
            bcdn_coupon: bcdnCoupon,
            user_name: localStorage.user_name
        }
        var callback = function (result) {
            console.log('兑换码:', result);
            if (result.status == 0) {
                util.layerAlert("", result.message, 1, function () {
                    console.log('成功后执行?');
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
                timestamp: localStorage.create_time,
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
}
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
            data: JSON.stringify({}),
            sessionid: localStorage.sessionid,
            token: localStorage.token,
            timestamp: localStorage.timestamp,
            user_name: localStorage.user_name,

        },
        success: function (json) {
            console.log('获取优惠券:', json);
            var trHtml = '<tr>' +
                '<th width="240">2017-07-12 20:00:01</th>' +
                '<th width="400">1A1LJX2ktiLpZWgQKoik</th>' +
                '<th width="240">99</th>' +
                '</tr>';
            $('#bcdnCouponList').append(trHtml);
        }
    })
}