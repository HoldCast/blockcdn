var reset = {
	findPassword : function(btnele) {
        var email = $("#email").val();
        var emailCode = $("#emailCode").val();

        var pwd = util.trim($("#password").val());
        var rePwd = util.trim($("#confirmpassword").val());
        var desc = util.isPassword(pwd);
        if (desc != "") {
            util.layerAlert("", desc,2);
            return false;
        }

        desc = util.isPassword(rePwd);
        if (desc != "") {
            util.layerAlert("", desc,2);
            return false;
        }
        if (pwd != rePwd) {
            util.layerAlert("", util.getLan("user.tips.10"),2);
            return false;
        }
        // 验证邮箱
        if (email.indexOf(" ") > -1) {
            desc = util.getLan("user.tips.5");
        }  else if (!util.checkEmail(email)) {
            desc = util.getLan("user.tips.7");
        } else if (new RegExp("[,]", "g").test(email)) {
            desc = util.getLan("user.tips.8");
        } else if (email.length > 100) {
            desc = util.getLan("user.tips.9");
        }
        if (desc != "") {
            util.layerAlert("", desc,2);
            return false;
        }

        var url = "/validate/reset_password.html";

        var param = {
            user_name : email,
            vcode : emailCode,
            password : pwd,
            confirm_password : rePwd
        };

        var callback = function(data) {
            console.log('找回密码提交数据:', data);
            if (data.status == 0) {
                util.layerAlert("", '修改成功', 1);
                //window.location.href="/user/login.html"
            } else {
                util.layerAlert("", data.message, 2);
            }
        }
		util.network({
			btn : btnele,
			url : rPassWordUrl,
			param : {data: JSON.stringify(param)},
			success : callback,
		});
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
	$(".btn-imgcode").on("click", function() {
		this.src = "/servlet/ValidateImageServlet.html?r=" + Math.round(Math.random() * 100);
	});
    $(".btn-sendemailcode").on("click", function() {
        var address = $("#email").val();
        if (address == "") {
            util.layerAlert("",util.getLan("user.tips.6"),2);
            return;
        }
        if (!util.checkEmail(address)) {
            util.layerAlert("",util.getLan("user.tips.7"),2);
            return;
        }
        email.sendcode($(this).data().msgtype, $(this).data().tipsid, this.id, address);
    })
	$("#btnRestPassword").on("click", function() {
		reset.findPassword(this);
	});
    $(window).resize(function() {
        reset.autoRestHeight();
    });
    reset.autoRestHeight();

});