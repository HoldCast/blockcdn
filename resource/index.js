/**
 * Created by zhuwei on 2017-07-25.
 */
var imgNum = 0;
var the_images = [];

function pageLoad(){
    var imgs = document.images;
    for (var i = 0; i < imgs.length; i++) {
        the_images.push(imgs[i].src);
    }
    jQuery.imgpreload(the_images,{
        each: function()
        {
            var status = $(this).data('loaded') ? 'success' : 'error';
//                百分比显示
            if (status == "success") {
                /* var v = (parseFloat(++imgNum) / the_images.length).toFixed(2);
                 $(".nums").html(Math.round(v * 100) + "<span>%</span>");*/
            }
        },
        all: function()
        {

            particlesJS('particles-js', {
                particles: {
                    color: '#fff',
                    shape: 'circle', // "circle", "edge" or "triangle"
                    opacity: 1,
                    size: 5,
                    size_random: true,
                    nb: 450,
                    line_linked: {
                        enable_auto: true,
                        distance: 100,
                        color: '#fff',
                        opacity: 1,
                        width: 1,
                        condensed_mode: {
                            enable: false,
                            rotateX: 600,
                            rotateY: 600
                        }
                    },
                    anim: {
                        enable: true,
                        speed: 1
                    }
                },
                interactivity: {
                    enable: true,
                    mouse: {
                        distance: 300
                    },
                    detect_on: 'canvas', // "canvas" or "window"
                    mode: 'grab',
                    line_linked: {
                        opacity: .5
                    },
                    events: {
                        onclick: {
                            enable: true,
                            mode: 'push', // "push" or "remove"
                            nb: 4
                        }
                    }
                },
                /* Retina Display Support */
                retina_detect: true
            });

            $('.scroll').bind('click', function(event) {
                var $anchor = $(this);
                var headerH = $('#navigation').outerHeight();
                $('html, body').stop().animate({
                    scrollTop : $($anchor.attr('href')).offset().top - headerH + "px"
                }, 1200, 'easeInOutExpo');
                event.preventDefault();
            });

            $('body').scrollspy({
                target: '.nav-menu',
                offset: 95
            })




//    <!--手机侧边栏-->
            $('#off-canvas').click(function(){
                $('#offcanvas').toggleClass('show');
            });
            $('.canvas-close').click(function(){
                $('#offcanvas').toggleClass('show');
            });


//    打开关闭提示
            $('#email_ding').click(function(){
                $('#my-alert').modal({closeViaDimmer:false});
            })
            $('.am-modal-btn').click(function(){
                $('#my-alert').modal('close');
            });
//倒计时
            $(".count_down").countDown({
                startTimeStr:'2017/07/20 00:00:00',//开始时间
                endTimeStr:'2017/07/20 12:14:00',//结束时间
                daySelector:".day_num",
                hourSelector:".hour_num",
                minSelector:".min_num",
                secSelector:".sec_num"
            });

//投资TAB切换
            $('.touzi-btn').click(function(){
                $('.touzi-btn').removeClass('active');
                $(this).addClass('active');
                var index = $(this).index();
                $('.investment_table').removeClass('.active');
                $('.investment_table').eq(index).addClass('.active');
            });

            $('.pc_hd_menus>li').click(function(){
                $('.pc_hd_menus>li').removeClass('active-ck');
                $(this).addClass('active-ck');
            });

            $('.canvas-menu>li').click(function(){
                $('#offcanvas').toggleClass('show');
            });
//二维码弹出
            $('#wechat_er').click(function(){
                $('#er_code_img').attr('src','images/wechat.jpg');
                $('.er_box').css('display','block');
            });
            $('#qq_er').click(function(){
                $('#er_code_img').attr('src','images/qq.jpg');
                $('.er_box').css('display','block');
            });
            $('.er_box').click(function(){
                $(this).fadeOut(200);
            });
        }
    });

    getUserInfo();


}

pageLoad();

function getUserInfo(){
    //获取用户信息
    var userName = localStorage.user_name;
    if(userName){
        $('#userInfo').show();
        var index = userName.indexOf('@');
        $('#userMc').text(userName.substr(0,index));
    }
    else {
        $('#userInfo').hide();
    }
}

function userInfo(){
    //获取用户信息
    var userName = localStorage.user_name;
    if(userName){
        location.href = 'html/assets.html';
    }
    else {
        location.href = 'html/login.html';
    }
}

function logOut(){
    localStorage.clear();
    location.href = 'login.html';
}

