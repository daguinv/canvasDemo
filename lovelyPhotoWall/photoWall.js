
var flag = true;
function init() {
    addImg();
}
init();

function addImg() {
    var src,
        str = "";
    for (var i = 0; i < 50; i++) {
        var src = Math.floor(Math.random() * 10);
        str = str + "<img src='./pic/" + src + ".jpg'></img>";
    }
    $('.imgBox').html(str);
    bindEvent();
}
function bindEvent() {
    img = $('img');
    len = $('img').length;
    $('.btn').on('click', function () {
        var sum = 0;
        if (!flag) {
            return;
        }
        flag = false;
        for (var i = 0; i < 50; i++) {
            (function (i) {
                setTimeout(function () {
                    cartoon($('img')[i], '1s', function () {
                        $(this).css('transform', 'scale(0)')
                    }, function () {
                        cartoon(this, '1s', function () {
                            $(this).css({
                                'transform': 'scale(1)',
                                'opacity': 0
                            })
                        }, function () {
                            sum++;
                            if (sum == 50) {
                                show();
                            }
                        })
                    })
                }, Math.random() * 1000)
            })(i)

        }
    })
}
function show() {
    var allEnd = 0;

    for (var i = 0; i < 50; i++) {
        $($('img')[i]).css({
            'transition': '',/*因为把他移动到translateZ的距离没有过度效果，所以把他清空*/
            'transform': 'rotateY(0deg) translateZ(-' + Math.random() * 500 + 'px)'
        });
        (function (i) {
            setTimeout(function () {
                self.cartoon($('img')[i], '2s', function () {
                    $(this).css({
                        'opacity': 1,
                        'transform': 'rotateY(-360deg) translateZ(0)'
                    })
                }, function () {
                    allEnd++;
                    // 记录完成图片数量  设置flag
                    if (allEnd == 50) {
                        flag = true;
                    }
                })
            }, Math.random()* 1000)
        })(i);

    }
}
function cartoon(dom, time, doFun, cb) {
    $(dom).css('transition', time);
    doFun.call(dom)
    var called = true;
    $(dom).on('transitionend', function () {
        if (called) { /*加锁 因为一个元素身上有多个transitionend 可用多次触发*/ 
            cb && cb.call(dom);
            called = false;
        }
    })
}
