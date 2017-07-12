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
        //data={"email":sdsfd@qq.com}
        //var url = "/user/send_reg_email.html";
        var url = "../request/send_reg_email.html";
        var param = {
            //type: type,
            //msgtype: this.msgtype,
            email: address,
            type: 2
        };

        var callback = function (data) {
            console.log('找回密码发送验证码:',data);
            if (data.status == 0) {
                button.disabled = true;
                for (var num = 1; num <= that.secs; num++) {
                    window.setTimeout("email.updateNumber(" + num + ",'" + button_id + "',2)", num * 1000);
                }
            } else {
                util.layerAlert("", data.message, 2);
            }
        };
        util.network({
            btn: button,
            url: vCodeUrl,
            param: {data: JSON.stringify(param),sessionid: 'sessionid'},
            success: callback
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
        var param = {
            //type: type,
            //msgtype: this.msgtype,
            //address: address
            data: JSON.stringify({email: address,type: 1})
        };
        var callback = function (data) {
            console.log('发送验证码:',data);
            //if (data.code == 200) {
            if (data.status === 0) {
                button.disabled = true;
                for (var num = 1; num <= that.secs; num++) {
                    window.setTimeout("email.updateNumber(" + num + ",'" + button_id + "',2)", num * 1000);
                }
            } else {
                //util.layerAlert("", data.msg, 2);
                util.layerAlert("", data.message, 2);
            }
        };

        util.network({
            btn: button,
            url: vCodeUrl,
            param: param,
            success: callback,
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