$(function(){
    /*var bcdnLan =  getCookie('bcdnLan');
    var lanStatus =  getCookie('lanStatus');
    if (bcdnLan == 'en_US'){
        location.href = 'index_en.html';
        setCookie('lanStatus', 'en_US', 300);
    }*/
});


//获取cookie值
function getCookie(name){
    try{
        name = name.replace(/\*/g,"\\*");
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }catch (e) {}
}

//写入到Cookie
//c_name:cookie名称,value:cookie值,expiredays:过期天数
function setCookie(c_name,value,expiredays){
    var exdate=new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie=c_name+ "=" +escape(value)+	((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

function lanChange(type){
    var homeUrl = 'index.html';
    if(type == 'zh_CN'){
        homeUrl = 'index.html';
    }
    else if(type == 'en_US'){
        homeUrl = 'index_en.html';
    }
    location.href = homeUrl;
    setCookie('bcdnLan', type, 300)

}
