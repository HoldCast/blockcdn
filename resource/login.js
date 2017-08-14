var login = {
    checkLoginUserName: function () {
        var uName = $("#login-account").val();
        if (uName == "") {
            util.layerAlert("", util.getLan("user.tips.1"), 2);
            return false;
        }
        return true;
    },
    checkLoginPassword: function () {
        var password = $("#login-password").val();
        var des = util.isPassword(password);
        if (des != "") {
            util.layerAlert("", des, 2);
            return false;
        }
        return true;
    },
    login: function () {
        if (login.checkLoginUserName() && login.checkLoginPassword()) {
            var url = "/login.html";
            var uName = $("#login-account").val();
            var pWord = $("#login-password").val();
            var imgCode = $("#login-imgCode").val();
            var longLogin = 0;
            if (util.checkEmail(uName)) {
                longLogin = 1;
            }
            var forwardUrl = "";
            if ($("#forwardUrl") != null) {
                forwardUrl = $("#forwardUrl").val();
            }
            if(!imgCode){
                util.layerAlert("", util.getLan("add21"), 2);
                return false;
            }
            var param = {
                user_name: uName,
                password: pWord,
                vertify_code: imgCode,
                nonce_str: Math.random()
            };
            util.network({
                btn: $("#login-submit")[0],
                url: logInUrl,
                param: {data: JSON.stringify(param)},
                success: function (data) {
                    console.log('登录参数:', data);
                    if (data.status == 0) {
                        localStorage.sessionid = data.data.sessionid;
                        localStorage.token = data.data.token;
                        localStorage.create_time = data.data['user']['create_time'];
                        localStorage.login_time = new Date().getTime();
                        localStorage.user_name = data.data['user']['user_name'];
                        //登陆成功
                        window.location = 'assets.html';
                    }
                    //用户不存在
                    else if (data.status == 404) {
                        util.layerAlert("", util.getLan("add18"), 2);
                    }
                    //密码错误
                    else if (data.status == 405) {
                        util.layerAlert("", util.getLan("add19"), 2);
                        $("#login-password").val("");
                        $("#login-imgCode").val("");
                        getImgVcode();
                    }
                    //406表示验证码错误
                    else if (data.status == 406) {
                        util.layerAlert("", util.getLan("add21"), 2);
                        $("#login-imgCode").val("");
                        getImgVcode();
                    }
                    //432表示验证码超时
                    else if (data.status == 432) {
                        util.layerAlert("", util.getLan("add20"), 2);
                        $("#login-imgCode").val("");
                        getImgVcode();
                    }
                    else {
                        util.layerAlert("", data.message, 2);
                        $("#login-password").val("");
                        $("#login-imgCode").val("");
                        getImgVcode();
                    }
                },
                enter: true
            });
        }
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
    $("#login-password").on("focus", function () {
        util.callbackEnter(login.login);
    });
    $("#login-submit").on("click", function () {
        login.login();
    });
    $(window).resize(function () {
        login.autoRestHeight();
    });
    login.autoRestHeight();

    getImgVcode()


});

function getImgVcode() {
    var vCodeImgUrl1 = vCodeImgUrl + '?r=' + Math.random();
    $('#loginVcodeImg').prop('src', vCodeImgUrl1);
    $('#loginVcodeImg').attr('src', vCodeImgUrl1);
    $('#loginVcodeImg').off('click').on('click', function () {
        var vCodeImgUrl2 = vCodeImgUrl + '?r=' + Math.random();
        $(this).prop('src', vCodeImgUrl2);
        $(this).attr('src', vCodeImgUrl2);
    });
}