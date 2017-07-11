
//邮箱验证
var reg = {
    checkUserName: function () {
        var regType = $("#regType").val();
        var regUserName = "";
        var desc = '';
        // 验证邮箱
        regUserName = util.trim($("#register-email").val());
        if (regUserName.indexOf(" ") > -1) {
            desc = util.getLan("user.tips.5");
        } else if (regUserName == '') {
            desc = util.getLan("user.tips.6");
        } else if (!util.checkEmail(regUserName)) {
            desc = util.getLan("user.tips.7");
        } else if (new RegExp("[,]", "g").test(regUserName)) {
            desc = util.getLan("user.tips.8");
        } else if (regUserName.length > 100) {
            desc = util.getLan("user.tips.9");
        }
        if (desc != "") {
            util.layerAlert("", desc, 2);
            return;
        }
        var url = "/user/check_user_exist.html";
        var param = {
            name: regUserName,
            type: regType
        }
        var callback = function (data) {
            if (data.code != 200) {
                util.layerAlert("", data.msg, 2);
                return;
            }
        };
        util.network({
            url: url,
            param: param,
            success: callback,
        });
    },
    checkPassword: function () {
        var pwd = util.trim($("#register-password").val());
        var desc = util.isPassword(pwd);
        if (desc != "") {
            util.layerAlert("", desc, 2);
            return false;
        }
        return true;
    },
    checkRePassword: function () {
        var pwd = util.trim($("#register-password").val());
        var rePwd = util.trim($("#register-confirmpassword").val());
        var desc = util.isPassword(pwd);
        if (desc != "") {
            util.layerAlert("", desc, 2);
            return false;
        }
        if (pwd != rePwd) {
            util.layerAlert("", util.getLan("user.tips.10"), 2);
            return false;
        }
        return true;
    },
    checkUserNameNoJquery: function () {
        var regType = $("#regType").val();
        var desc = '';
        // 验证邮箱
        var regUserName = util.trim($("#register-email").val());
        if (regUserName.indexOf(" ") > -1) {
            desc = util.getLan("user.tips.5");
        } else if (regUserName == '') {
            desc = util.getLan("user.tips.6");
        } else if (!util.checkEmail(regUserName)) {
            desc = util.getLan("user.tips.7");
        } else if (new RegExp("[,]", "g").test(regUserName)) {
            desc = util.getLan("user.tips.8");
        } else if (regUserName.length > 100) {
            desc = util.getLan("user.tips.9");
        }
        if (desc != "") {
            util.layerAlert("", desc, 2);
            return false;
        }
        return true;
    },
    register: function (ele) {
        var regType = 1;
        var flag = this.checkUserNameNoJquery();
        if (flag == true) {
            var regUserName = regUserName = util.trim($("#register-email").val());
            var pwd = util.trim($("#register-password").val());
            var regEmailCode = $("#register-email-code").val();
            if (regEmailCode == "") {
                util.layerAlert("", util.getLan("user.tips.13"), 2);
                return;
            }
            if (!this.checkPassword()) {
                return;
            }
            if (!this.checkRePassword()) {
                return;
            }
            var intro_user = $("#register-intro").val();
            var param = {
                //regName: regUserName,
                user_name: regUserName,
                password: pwd,
                confirm_password: pwd,
                //regType: regType,
                //vcode: 0,
                //pcode: 0,
                //ecode: regEmailCode,
                vcode: regEmailCode,
                //areaCode: 0,
                //intro_user: intro_user
            };
            var callback = function (data) {
                console.log('注册:',data);
                if (data.status === 0) {
                    util.layerAlert("", util.getLan("user.tips.35"), 1, function () {
                        window.location = '/ico.html';
                    });
                } else {
                    // 注册失败
                    util.layerAlert("", data.message, 2);
                    if (data.code == -20) {
                        $("#register-imgcode").val("");
                        $(".btn-imgcode").click();
                    }
                }
            };
            util.network({btn: ele, url: registerUrl, param: {data:JSON.stringify(param)}, success: callback,});
        }
    },
    areaCodeChange: function (ele, setEle) {
        var code = $(ele).val();
        $("#" + setEle).html("+" + code);
    },
    autoRestHeight: function () {
        var pecent = 1;
        if (remPercent > 0) {
            pecent = remPercent / 100;
        }
        var height = parseInt($(window).height()) - 125 * pecent;
        if (height > 0) {
            $(".user-content").css("height", height + "px");
        }
    }

};


$(function () {

    $(".btn-imgcode").on("click", function () {
        this.src = "/servlet/ValidateImageServlet.html?r=" + Math.round(Math.random() * 100);
    });
    /*
     $("#register-email").on("blur", function () {
     reg.checkUserName();
     });*/
    $("#register-submit").on("click", function () {
        reg.register(this);
    });

    $("#register-areaCode").on("change", function () {
        reg.areaCodeChange(this, "register-phone-areacode");
    });
    $(".btn-sendemailcode").on("click", function () {
        var address = $("#register-email").val();
        if (address == "") {
            util.layerAlert("", util.getLan("user.tips.6"), 2);
            return;
        }
        if (!util.checkEmail(address)) {
            util.layerAlert("", util.getLan("user.tips.7"), 2);
            return;
        }
        //验证通过
        newEmail.sendcode($(this).data().msgtype, $(this).data().tipsid, this.id, address);
    });
    $(window).resize(function () {
        reg.autoRestHeight();
    });
    reg.autoRestHeight();
});