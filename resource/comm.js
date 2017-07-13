var vCodeUrl = "http://211.149.175.73:8089/sendVcode";//获取验证码
var registerUrl = "http://211.149.175.73:8089/register";//注册
var logInUrl = "http://211.149.175.73:8089/login";//网站用户登陆
var logOutUrl = "http://211.149.175.73:8089/user/logOut";// 用户退出
var cPassWordUrl = "http://211.149.175.73:8089/user/changePassWord";// 修改密码
var rPassWordUrl = "http://211.149.175.73:8089/resetPassword";// 重置密码
var exchangeUrl = "http://211.149.175.73:8089/coupon/exchange";// 前台兑换优惠券
var queryCouponUrl = "http://211.149.175.73:8089/coupon/queryCouponByUser";// 前台个人中心查看自己的优惠券;


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

	var   d = new   Date(parseInt(localStorage.create_time));
	$('#userName').text(localStorage.user_name);
	$('#uid').text(localStorage.user_name);
	$('#createTime').text(formatDate(d));


});


function   formatDate(now)   {
	var   year=now.getFullYear();
	var   month=now.getMonth()+1;
	var   date=now.getDate();
	var   hour=now.getHours();
	var   minute=now.getMinutes();
	var   second=now.getSeconds();
	return   year+"-"+month+"-"+date+"   "+hour+":"+minute+":"+second;
}