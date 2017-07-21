var login = {
	checkLoginUserName : function() {
		var uName = $("#login-account").val();
		if (uName == "") {
            util.layerAlert("", util.getLan("user.tips.1"),2);
			return false;
		}
		return true;
	},
	checkLoginPassword : function() {
		var password = $("#login-password").val();
		var des = util.isPassword(password);
		if (des != "") {
            util.layerAlert("", des,2);
			return false;
		}
		return true;
	},
	login : function() {
		if (login.checkLoginUserName() && login.checkLoginPassword()) {
			var url = "/login.html";
			var uName = $("#login-account").val();
			var pWord = $("#login-password").val();
			var longLogin = 0;
			if (util.checkEmail(uName)) {
				longLogin = 1;
			}
			var forwardUrl = "";
			if ($("#forwardUrl") != null) {
				forwardUrl = $("#forwardUrl").val();
			}
			//data={"user_name":"2322@qq.com","password":"sdsfsfs","nonce_str":"sdfdsdfs"}
			var param = {
				user_name : uName,
				password : pWord,
				nonce_str : Math.random()
				//loginName : uName,
				//password : pWord,
				//type : longLogin
			};

			var callback = function(data) {
				console.log('登录参数:',data);
				if (data.status == 0) {
					localStorage.sessionid = data.data.sessionid;
					localStorage.token = data.data.token;
					localStorage.create_time = data.data['user']['create_time'];
					localStorage.login_time = new Date().getTime();
					localStorage.user_name = data.data['user']['user_name'];
					util.layerAlert("", '登陆成功!', 1, function () {
						window.location = 'assets.html';
					});
					/*
					if (util.trim(forwardUrl) == "") {
						window.location.href = "/ico.html";
					} else {
						window.location.href = forwardUrl;
					}
					*/
				} else {
                    util.layerAlert("", data.message, 2);
					$("#login-password").val("");
				}
			};
			util.network({
				btn : $("#login-submit")[0],
				url : logInUrl,
				param : {data:  JSON.stringify(param)},
				success : callback,
				enter : true,
			});
		}
	},
    autoRestHeight : function () {
		var pecent =1;
		if(remPercent>0){
            pecent =remPercent/100;
		}
        var height = parseInt($(window).height())-125 * pecent;
        if(height>0){
            $(".user-content").css("height",height+"px");
        }
    }
};
$(function() {
	$("#login-password").on("focus", function() {
		util.callbackEnter(login.login);
	});
	$("#login-submit").on("click", function() {
		login.login();
	});
    $(window).resize(function() {
        login.autoRestHeight();
    });
    login.autoRestHeight();
});