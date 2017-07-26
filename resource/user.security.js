var security = {
	saveModifyPwd : function(ele) {
        var oldPwd = util.trim($("#loginpass-oldpass").val());
		var newPwd = util.trim($("#loginpass-newpass").val());
		var confirmPwd = util.trim($("#loginpass-confirmpass").val());
        if (oldPwd == "") {
            util.layerAlert("", util.getLan("comm.tips.11"),2);
            return;
        }
		if (newPwd == "") {
            util.layerAlert("", util.getLan("comm.tips.11"),2);
			return;
		}
		if (confirmPwd == "") {
            util.layerAlert("", util.getLan("comm.tips.11"),2);
			return;
		}
		if (newPwd != confirmPwd) {
            util.layerAlert("", util.getLan("comm.tips.17"),2);
			$("#loginpass-confirmpass").val("");
			return;
		}
		var param = {
			user_name:　localStorage.user_name,
			old_password : oldPwd,
			new_password : newPwd,
			confirm_password : newPwd
		};
		var callback = function(data) {
			console.log('修改密码参数:',data);
			if (data.status == 0) {
                util.layerAlert("", util.getLan("comm.tips.25"), 1, function(){
					localStorage.clear();
					location.href = 'login.html';
				});
			} else {
                util.layerAlert("", data.message, 2);
			}
		};
		util.network({
			btn : ele,
			url : cPassWordUrl,
			param : {
				data: JSON.stringify(param),
				sessionid:localStorage.sessionid,
				token: localStorage.token,
				timestamp: new Date().getTime(),
				user_name: localStorage.user_name
			},
			success : callback
		});
	}
};
$(function() {
	$(".btn-imgcode").on("click", function() {
		this.src = "/servlet/ValidateImageServlet.html?r=" + Math.round(Math.random() * 100);
	});

	$("#bindloginpass-Btn").on("click", function() {
		security.saveModifyPwd(this);
	});
});