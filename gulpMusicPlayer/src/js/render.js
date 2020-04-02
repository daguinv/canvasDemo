// 页面渲染
(function ($, root) {
    var timer;
    var deg = 0;
    function renderImage(src) {
        // 将当前src设置到img上
        $('.imageBox img')[0].src = src;
        //  设置当前图片的高斯模糊图片为body背景
        var img = new Image();
        img.src = src;
        img.onload = function () {
            root.blurImg(img, $('body'));
        }
    }
    function renderInfo(data) {
        $('.text').html('<div class="songName"><span>' + data.song + '</span></div>\
            <div class="singerName"><span>'+ data.singer + '</span></div>\
            <div class="albumName"><span>'+ data.album + '</span></div>');
    }
    function renderisLike(like) {
        if (like) {
            $('.bottom .love').addClass('loving');
        } else {
            $('.bottom .love').removeClass('loving');

        }
    }
    function renderlist(data) {
        var str = ''
        for (var i in data) {
            str = str + '<div class="item">' + data[i].song + '</div>'
        }
        $('.listBox').html(str);
        $('.item').on('click', function () {
            console.log(this);
            // 切换背景
            // 切换音频
        })
    }
    root.render = function (data) {
        deg = 0;
        $('.imageWrapper .imageBox').css({
            'transform': 'rotateZ(' + 0 + 'deg)',
            'transition': ''
        })
        audioObj.getMusic();
        renderImage(data.image);
        renderInfo(data);
        renderisLike(data.isLike);
        renderlist(dataList);
        root.process.renderTime(data.duration);
    }
    function rotate() {
        clearInterval(timer);
        timer = setInterval(function () {
            deg = deg + 2;
            // console.log(deg);
            $('.imageWrapper .imageBox').css({
                'transform': 'rotateZ(' + deg + 'deg)',
                'transition': 'transform 1s linear'
            })
        }, 500);

    }

    function loadingSource(step) {
        audioObj.src = dataList[step].audio;
        root.render(dataList[step]);
        if (audioObj.state == 'play') {
            audioObj.play();
            root.process.startTime();
            rotate();
        }
    }

    $('.bottom .pre').on('click', function () {
        var step = index.pre();
        loadingSource(step);
        root.process.startTime(0);
        if(audioObj.state == 'pause'){
            root.process.stopTime()
        }
    });

    $('.bottom .next').on('click', function () {
        var step = index.next();
        loadingSource(step);
        root.process.startTime(0)
        if(audioObj.state == 'pause'){
            root.process.stopTime()
        }
    })

    $('.bottom .play').on('click', function () {
        if (audioObj.state == "pause") {
            $(this).addClass('playing');
            audioObj.play();
            root.process.startTime();
            rotate();
        } else {
            $(this).removeClass('playing');
            audioObj.pause();
            clearInterval(timer);
            root.process.stopTime()
        }
    })

    $('.spot').on('touchstart', function () {
        root.process.stopTime();
    }).on('touchmove', function (e) {
        var center = $('.center').offset();
        var l = center.left;
        var w = center.width;
        var x = e.changedTouches[0].clientX;
        var per = (x - l) / w;
        if(per < 0){
            per = 0;
        }
        else if(per > 1){
            per = 1;
        }
        this.per = per;
        root.process.upDate(per);

    }).on('touchend', function () {
        root.process.startTime(this.per);
        // console.log(index.index);
        console.log(1);
        console.log(audioObj);
        audioObj.playTo(this.per * dataList[index.index].duration);
        audioObj.play();
        audioObj.state = 'play';
        $('.play').addClass('playing');
    })

    $('.list').on('click', function () {
        $('.listWrapper').css({
            'bottom': '0',
            'transition': 'bottom 0.4s ease-out'
        })
    })
    $('.listWrapper .close').on('click', function () {
        $('.listWrapper').css({
            'bottom': '-100%',
            'transition': 'bottom 0.4s ease-out'
        })
    })
    $('.item').on('click', function () {
        console.log(5);
    })
})(window.Zepto, window.player || (window.player = {}));