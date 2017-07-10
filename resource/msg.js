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
        //var url = "/user/send_reg_email.html";
        var url = "../request/send_reg_email.html";
        var param = {
            //type: type,
            //msgtype: this.msgtype,
            //address: address
            email: address
        };
        var callback = function (data) {
            console.log(111,data);
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
        $.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            data: param,
            success: function (json){
                console.log('获取验证码成功:',json);
                callback(json);
            },
            error: function (){
                console.log('msg  ajax err');
                util.layerAlert('','获取验证码调试',2);
                callback({status:0})
            }
        });
        /*util.network({
            btn: button,
            url: url,
            param: param,
            success: callback,
        });*/
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