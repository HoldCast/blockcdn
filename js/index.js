if (!window.localStorage) {
    alert("浏览器版本过低!");
}
//获取cookie值
function getCookie(name) {
    try {
        name = name.replace(/\*/g, "\\*");
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    } catch (e) {
    }
}

//写入到Cookie
//c_name:cookie名称,value:cookie值,expiredays:过期天数
function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + encodeURIComponent(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

function lanChange(type) {
    var homeUrl = '';
    if (type == 'zh_CN') {
        homeUrl = 'index.html';
    }
    else if (type == 'en_US') {
        homeUrl = 'index_en.html';
    }
    location.href = homeUrl;
}

function emailDing() {
    var email = $('#dingEmail').val();
    test(email);
}

function test(temp) {
    //对电子邮件的验证
    var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if (!myreg.test(temp)) {
        alert('提示\n\n请输入有效的E_mail！');
        return false;
    }else{
        $.ajax({
            url: 'http://211.149.175.73:9000/subscribe',
            dataType: 'jsonp',
            data:{
                member: temp,
            },
            type: 'post',
            success: function(json){
                console.log('邮件:', json);
            }
        });
    }
}