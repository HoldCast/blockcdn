var email = {
    secs: 121,
    msgtype: 2,
    sendcode: function (type, tipElement_id, button_id, address) {
        var that = this;
        var tipElement = document.getElementById(tipElement_id);
        var button = document.getElementById(button_id);
        if (typeof (address) == 'undefined') {
            address = 0;
        } else {
            if (!util.checkEmail(address)) {
                util.layerAlert("", util.getLan("msg.tips.6"), 2);
                return;
            }
        }
        //var url = "/user/send_reg_email.html";
        var url = "../request/send_reg_email.html";
        var param = {
            type: type,
            msgtype: this.msgtype,
            address: address
        };
        var callback = function (data) {
            if (data.code == 200) {
                button.disabled = true;
                for (var num = 1; num <= that.secs; num++) {
                    window.setTimeout("email.updateNumber(" + num + ",'" + button_id + "',2)", num * 1000);
                }
            } else {
                util.layerAlert("", data.msg, 2);
            }
        };
        util.network({
            btn: button,
            url: url,
            param: param,
            success: callback,
            error: function(){
                alert('1err');
            }
        });
    },
    updateNumber: function (num, button_id, isVoice) {
        var button = document.getElementById(button_id);
        if (num == this.secs) {
            button.innerHTML = util.getLan("msg.tips.3");
            button.disabled = false;
        } else {
            var printnr = this.secs - num;
            button.innerHTML = util.getLan("msg.tips.4", printnr);
        }
    }
};
var newEmail = {
    secs: 121,
    msgtype: 1,
    sendcode: function (type, tipElement_id, button_id, address) {
        var that = this;
        var tipElement = document.getElementById(tipElement_id);
        var button = document.getElementById(button_id);
        if (typeof (address) == 'undefined') {
            address = 0;
        } else {
            if (!util.checkEmail(address)) {
                util.layerAlert("", util.getLan("msg.tips.6"), 2);
                return;
            }
        }
        debugger;
        //var url = "/user/send_reg_email.html";
        var url = "../request/send_reg_email.html";
        var param = {
            type: type,
            msgtype: this.msgtype,
            address: address
        };
        /******/
        alert('此处调试1545');
        button.disabled = true;
        for (var num = 1; num <= that.secs; num++) {
            window.setTimeout("email.updateNumber(" + num + ",'" + button_id + "',2)", num * 1000);
        }
        return;
        /******/
        var callback = function (data) {
            debugger
            data.code = 200;    //调试需要
            if (data.code == 200) {
                button.disabled = true;
                for (var num = 1; num <= that.secs; num++) {
                    window.setTimeout("email.updateNumber(" + num + ",'" + button_id + "',2)", num * 1000);
                }
            } else {
                util.layerAlert("", data.msg, 2);
            }
        };
        util.network({
            btn: button,
            url: url,
            param: param,
            success: callback,
            error: function(){
                alert('2err');
            }
        });
    },
    updateNumber: function (num, button_id, isVoice) {
        var button = document.getElementById(button_id);
        if (num == this.secs) {
            button.innerHTML = util.getLan("msg.tips.3");
            button.disabled = false;
        } else {
            var printnr = this.secs - num;
            button.innerHTML = util.getLan("msg.tips.4", printnr);
        }
    }
};