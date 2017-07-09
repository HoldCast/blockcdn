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