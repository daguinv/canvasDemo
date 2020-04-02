var len = $('li').length;
$('ul').on('click', 'li', function (e) {
    var currentthis = $(this);
    var index = $(this).index();
    $(this).toggleClass('active').siblings().removeClass('active');
    var flag = $(this).hasClass('active'); 
    change(index,flag);
    /* 
     var src = $(this).find('img').attr('src');
    $('.picView').find('img').attr('src', src);
    var w = $('.picView').find('img')[0].width;
    var h = $('.picView').find('img')[0].height;
    if (flag) {
        $('.picView').css({
            'width': w + "px",
            'height': h + "px"
        }).find('img').css({
            'transform': 'scale(0.96)'
        }).on('click', function () {
            $('.picView').css({
                'width': 0 + "px",
                'height': 0 + "px"
            })
            currentthis.removeClass('active');
        })
    } else {
        $('.picView').css({
            'width': 0 + "px",
            'height': 0 + "px"
        })
    }  */
})

$('a span').on('click', function () {
    var $this = $(this);
    var cla = $this.parent().attr('class');
    var nowIndex = $('.active').index();
    cla == 'left' ? nowIndex-- : nowIndex++;
    if(nowIndex == -1){
        nowIndex = len-1;
    }else if(nowIndex == len){
        nowIndex = 0;
    }
    console.log(nowIndex);
    $('li').eq(nowIndex).toggleClass('active').siblings().removeClass();
    
    change(nowIndex,true);
})
function change(index,flag){
    var flag = $('li').eq(index).hasClass('active'); 
     var src = $('li').eq(index).find('img').attr('src');
    $('.picView').find('img').attr('src', src);
    var w = $('.picView').find('img')[0].width;
    var h = $('.picView').find('img')[0].height;
    if (flag) {
        $('.picView').css({
            'width': w + "px",
            'height': h + "px"
        }).find('img').css({
            'transform': 'scale(0.96)'
        }).on('click', function () {
            $('.picView').css({
                'width': 0 + "px",
                'height': 0 + "px"
            })
            $('li').eq(index).removeClass('active');
        })
    } else {
        $('.picView').css({
            'width': 0 + "px",
            'height': 0 + "px"
        })
    } 
}