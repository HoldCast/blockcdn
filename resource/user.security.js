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
		var url = "/user/modify_passwd.html";
		var param = {
            oldPwd : oldPwd,
            newPwd : newPwd,
            confirmPwd : newPwd,
			identityCode : ''
		};
		var callback = function(data) {
			if (data.code == 200) {
                util.layerAlert("", util.getLan("comm.tips.25"), 1);
				window.setTimeout(function() {
					window.location.href = window.location.href;
				}, 1000);
			} else {
                util.layerAlert("", data.msg, 2);
			}
		};
		util.network({
			btn : ele,
			url : url,
			param : param,
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