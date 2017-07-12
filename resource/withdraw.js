var withdraw = {
    submit: function () {
        var ele = this;
        var txtBalance = util.trim($("#txtBalance").val());
        var txtText = util.trim($("#txtText").val());
        var txtAmount = util.trim($("#txtAmount").val());
        var txtCode = util.trim($("#txtCode").val());
        var symbol = util.trim($("#symbol").val());
        if (txtText === "") {
            util.layerAlert("", util.getLan("user.tips.26"), 2);
            return;
        }
        if (txtAmount === "") {
            util.layerAlert("", util.getLan("user.tips.27"), 2);
            return;
        }
        if (txtCode === "") {
            util.layerAlert("", util.getLan("user.tips.28"), 2);
            return;
        }
        if (isNaN(txtBalance)) {
            util.layerAlert("", util.getLan("user.tips.29"), 2);
            return;
        }
        if (parseFloat(txtBalance) < parseFloat(txtAmount)) {
            util.layerAlert("", util.getLan("user.tips.29"), 2);
            return;
        }
        var url = "/withdraw/coin_manual.html";
        var param = {
            amount: txtAmount,
            address: txtText,
            code: txtCode,
            symbol: symbol
        };
        var callback = function (data) {
            if (data.code === 200) {
                util.layerAlert("", util.getLan("user.tips.30"), 1);
            } else {
                util.layerAlert("", data.msg, 2);
            }
        };
        util.network({btn: ele, url: url, param: param, success: callback});
    },
    cancelCoinWithdraw: function (id) {
        util.layerConfirm(util.getLan("user.tips.31"), function () {
            var url = "/withdraw/coin_cancel.html";
            var param = {
                id: id
            };
            var callback = function (data) {
                if (data.code === 200) {
                    window.location.reload(true);
                } else {
                    util.layerAlert("", data.msg, 2);
                }
            };
            util.network({
                             url: url,
                             param: param,
                             success: callback,
                         });
        });
    }
};
$(function () {
    $("#btnSendEmailCode").on("click", function () {
        email.sendcode($(this).data().msgtype, $(this).data().tipsid, this.id);
    });
    $("#btnSubmit").on("click", function () {
        withdraw.submit()
    });
    $("#txtAmount").on("keypress", function (event) {
        return util.goIngKeypress(this, event, 4);
    });
    $(".withdraw-cancel").on("click", function (event) {
        withdraw.cancelCoinWithdraw($(this).data().fid);
    });
});