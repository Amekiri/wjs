/**
 * Created by Administrator on 2017/1/19 0019.
 */
$(function () {
    /*发送ajax请求获取数据*/
    /*获取到的数据返回到了success中,要在success中使用数据,将回调传入success直接处理*/
    var getData = function (callback) {
        $.ajax({
            type:'get',
            url:'../json/imgData.json',
            success: function (result) {
                callback(result);
            }
        });
    }

    /*标记屏幕类型*/
    var isMobile = false;
    /*根据不同屏幕进行渲染*/
    function rander(){
        var width = $(window).width();
        if(width>768){
            isMobile = false;
        }else{
            isMobile = true;
        }
        var data = getData(function (result) {
           /*调用模板引擎渲染*/
            var imgHTML = template("imgTEMP",{"items":result,"isMobile":isMobile});
            /*渲染*/
            $(".carousel-inner").html(imgHTML);

            /*渲染点标记*/
            var indicatorHTML = template("indicatorTEMP",{"items":result});
            $(".carousel-indicators").html(indicatorHTML);
        });
    }

    rander();

    $(window).on("resize", function () {
       /*当从手机屏幕切换到pc端刷新*/
        var width = $(window).width();
        if(isMobile==true && width>768 || isMobile==false && width<768){
            rander();
        }
    });
    //轮播图的滑动手势
    var startX = 0;
    var moveX = 0;
    var distanceX = 0;
    $(".carousel-inner").on("touchstart", function (e) {
        startX = e.originalEvent.touches[0].clientX;
    });
    $(".carousel-inner").on("touchmove", function (e) {
        isMove = true;
        moveX = e.originalEvent.touches[0].clientX;
        distanceX = moveX -startX;
    });
    $(".carousel-inner").on("touchend", function (e) {
        //指定最小滑动距离
        if(Math.abs(distanceX)>50 && isMove){
            if(distanceX>0){
                $(".carousel").carousel('prev');
            }else{
                $(".carousel").carousel('next');
            }
        }
        //重制移动标记
        isMove = false;
    })

    /*产品块在宽度不够的时候的滑动效果*/
    /*产品页ul的宽度*/
    var allLis=$(".tabParent").find("li");
    var totalWidth = 0;
    allLis.each(function (index, value) {
        /*outerWidth(true):获取内容+padding+border+margin*/
        totalWidth=totalWidth+$(value).outerWidth(true);
    });
    $(".tabParent > ul").width(totalWidth);

    /*滑动*/
    itcast.iScroll({
        swipeDom:$(".tabParent")[0],
        swipeType:"x",
        swipeDistance:100
    });
});