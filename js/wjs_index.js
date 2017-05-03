/**
 * Created by Administrator on 2017/1/19 0019.
 */
$(function () {
    /*����ajax�����ȡ����*/
    /*��ȡ�������ݷ��ص���success��,Ҫ��success��ʹ������,���ص�����successֱ�Ӵ���*/
    var getData = function (callback) {
        $.ajax({
            type:'get',
            url:'../json/imgData.json',
            success: function (result) {
                callback(result);
            }
        });
    }

    /*�����Ļ����*/
    var isMobile = false;
    /*���ݲ�ͬ��Ļ������Ⱦ*/
    function rander(){
        var width = $(window).width();
        if(width>768){
            isMobile = false;
        }else{
            isMobile = true;
        }
        var data = getData(function (result) {
           /*����ģ��������Ⱦ*/
            var imgHTML = template("imgTEMP",{"items":result,"isMobile":isMobile});
            /*��Ⱦ*/
            $(".carousel-inner").html(imgHTML);

            /*��Ⱦ����*/
            var indicatorHTML = template("indicatorTEMP",{"items":result});
            $(".carousel-indicators").html(indicatorHTML);
        });
    }

    rander();

    $(window).on("resize", function () {
       /*�����ֻ���Ļ�л���pc��ˢ��*/
        var width = $(window).width();
        if(isMobile==true && width>768 || isMobile==false && width<768){
            rander();
        }
    });
    //�ֲ�ͼ�Ļ�������
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
        //ָ����С��������
        if(Math.abs(distanceX)>50 && isMove){
            if(distanceX>0){
                $(".carousel").carousel('prev');
            }else{
                $(".carousel").carousel('next');
            }
        }
        //�����ƶ����
        isMove = false;
    })

    /*��Ʒ���ڿ�Ȳ�����ʱ��Ļ���Ч��*/
    /*��Ʒҳul�Ŀ��*/
    var allLis=$(".tabParent").find("li");
    var totalWidth = 0;
    allLis.each(function (index, value) {
        /*outerWidth(true):��ȡ����+padding+border+margin*/
        totalWidth=totalWidth+$(value).outerWidth(true);
    });
    $(".tabParent > ul").width(totalWidth);

    /*����*/
    itcast.iScroll({
        swipeDom:$(".tabParent")[0],
        swipeType:"x",
        swipeDistance:100
    });
});