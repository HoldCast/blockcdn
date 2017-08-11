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
    if(email){
        test(email);
    }

}

function test(temp) {
    var lanType = $('#dingEmailTips').attr('type');
    var emailCheck = '请输入正确的邮箱格式';
    var dingSuccess = '订阅成功!';
    if(lanType == 'en'){
        emailCheck = 'Please enter the correct mailbox format';
        dingSuccess = 'Subscription success';
    }
    //对电子邮件的验证
    var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if (!myreg.test(temp)) {
        $('#dingEmailTips').text(emailCheck);
        $('#my-alert').modal({closeViaDimmer: false});
        $('#dingEmail').val('');
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
                if(json.code == 0){
                    $('#dingEmailTips').text(temp+' ' + dingSuccess);
                    $('#my-alert').modal({closeViaDimmer: false});
                    $('#dingEmail').val('');
                    $('#dingSure').off('click').on('click',function(){

                    });
                }
            }
        });
    }
}