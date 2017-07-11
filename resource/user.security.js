var security = {
	saveModifyPwd : function(ele) {
        var oldPwd = util.trim($("#loginpass-oldpass").val());
		var newPwd = util.trim($("#loginpass-newpass").val());
		var confirmPwd = util.trim($("#loginpass-confirmpass").val());
		var user_name = '125427446@qq.com'; //通过页面获取
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
		var url = "/user/modify_passwd.html";
		//data={"user_name":"sdfds@qq.com","old_password":"sdfsfdsf","new_password":"sfdssdfs","confirm_password":"sfdssfds"}
		var param = {
			user_name:　user_name,
			old_password : oldPwd,
			new_password : newPwd,
			confirm_password : newPwd,
            //oldPwd : oldPwd,
            //newPwd : newPwd,
            //confirmPwd : newPwd,
			//identityCode : ''
		};
		var callback = function(data) {
			console.log('修改密码参数:',data);
			if (data.code == 0) {
                util.layerAlert("", util.getLan("comm.tips.25"), 1);
				window.setTimeout(function() {
					window.location.href = window.location.href;
				}, 1000);
			} else {
                util.layerAlert("", data.message, 2);
			}
		};
		util.network({
			btn : ele,
			url : cPassWordUrl,
			param : {data: JSON.stringify(param)},
			success : callback,
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