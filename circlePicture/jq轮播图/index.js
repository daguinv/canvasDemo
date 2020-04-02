var nowIndex = 0;
var imgWidth = 520;
var len = 5;
var flag = true;
var timer;
function init() {
    bindEvent();
    automatic();
}
init();
function bindEvent() {
    $('.left').add('.right').add('li').on('click', function () {
        if ($(this).attr('class') == 'left') {
            move('prev');
        } else if ($(this).attr('class') == 'right') {
            move('next');
        }
        else {
            var index = $(this).index();
            move(index);

        }
        changeStyle();
    });
    $('.wrapper').on('mouseenter', function () {
        $('.btn').css('display', 'block');
        clearTimeout(timer);
    }).on('mouseleave', function () {
        $('.btn').css('display', 'none');
        automatic();
    })
}
function move(index) {
    if (flag) {
        flag = false;
        if (index == 'prev') {
            if (nowIndex == 0) {
                nowIndex = len - 1;
                $('.imgbox').css({
                    left: -(len * imgWidth)
                })
            } else {
                nowIndex--;
            }
        } else if (index == 'next') {
            if (nowIndex == len - 1) {
                nowIndex = 0;
                $('.imgbox').animate({
                    left: -(len * imgWidth) + "px"
                }, function () {
                    $(this).css({
                        left: 0
                    })
                });

            } else {
                nowIndex++;
            }
        } else {
            nowIndex = index;
        }
        silder();
    }
}
function silder() {
    $('.imgbox').animate({
        left: -(imgWidth * nowIndex) + "px"
    }, function () {
        flag = true;
        automatic();
    })
}


function automatic() {
    clearTimeout(timer);
    timer = setTimeout(function () {
        move('next');
        changeStyle();
    }, 2000);
}
function changeStyle() {
    $('.active').removeClass('active');
    $('.order li').eq(nowIndex).addClass('active');
}