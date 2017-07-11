var vCodeUrl = "http://211.149.175.73:8089/sendVcode";//获取验证码
var registerUrl = "http://211.149.175.73:8089/register";//注册
var logInUrl = "http://211.149.175.73:8089/login";//网站用户登陆
var logOutUrl = "http://211.149.175.73:8089/user/logOut";// 用户退出
var cPassWordUrl = "http://211.149.175.73:8089/user/changePassWord";// 修改密码
var rPassWordUrl = "http://211.149.175.73:8089/resetPassword";// 重置密码


$(function() {
	$(".lan-tab-hover").on("click", function() {
		if ("undefined" === typeof (this.id)) {
			return;
		}
		var lan = $(this).data().lan;
		if (lan === this.id) {
			return;
		}
		util.network({
			url : "/real/switchlan.html",
			param : {lan : this.id},
			success : function(data) {
				if (data.code === 200) {
					window.location.reload();
				}
			}
		});
	});
	util.lrFixFooter($(".footer"));
});