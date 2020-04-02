
(function () {

    function Swiper(options) {
        var options = $.extend({ 'image': [], 'interVal': 2000 }, options);
        this.img = options.image;
        this.interVal = options.interVal;
        this.wrap = options.father;
        this.nowIndex = 0;
        this.len = this.img.length;
        this.timer = undefined;
        this.flag = true;
        this.init();
    }
    Swiper.prototype.init = function () {
        this.creatDom();
        this.bindEvent();
        this.automatic();
    }
    Swiper.prototype.creatDom = function () {
        var len = this.len;//照片数组长度
        var str = "";
        var listStr = "";
        this.w = this.wrap.width(); //获取最外层div的宽高
        this.h = this.wrap.height();
        var imgBox = $('<ul class="img-box"></ul>');//创建 ul 设置 class=img-box
        imgBox.width(this.w * (len + 1));//设置ul的宽高
        imgBox.height(this.h);
        var btn = '<div class="btn">\
        <a class="left" href = "javascript:;" ><span>&lt;</span></a>\
        <a class="right" href="javascript:;"><span>&gt;</span></a></div> '
        var order = $('<div class="order"></div>');    //创建order
        var ul = $('<ul></ul>');
        for (var i = 0; i < this.len; i++) {
            listStr = listStr + '<li></li>';
            str = str + '<li><a href="javascript:;"><img src="' + this.img[i] + '" alt=""></a></li>';
        }
        str = str + '<li><a href="javascript:;"><img src="' + this.img[0] + '" alt=""></a></li>';

        this.wrap.append(imgBox.html(str))
            .append(btn)
            .append(order.append(ul.html(listStr)));
        imgBox.find('li').css({
            'width': this.w,
            'height': this.h
        })
        $('.order li').eq(0).addClass('active');

    }
    Swiper.prototype.bindEvent = function () {
        var self = this;
        $('.left').add('.right').add('li').on('click', function () {
            if ($(this).attr('class') == 'left') {
                self.move('prev');
            } else if ($(this).attr('class') == 'right') {
                self.move('next');
            }
            else {
                var index = $(this).index();
                self.move(index);
            }
            self.changeStyle();
        });
        self.wrap.on('mouseenter', function () {
            console.log(this);
            $('.btn').css('display', 'block');
            clearTimeout(self.timer);
        }).on('mouseleave', function () {
            $('.btn').css('display', 'none');
            self.automatic();
        })
    }
    Swiper.prototype.changeStyle = function () {
        $('.active').removeClass('active');
        $('.order li').eq(this.nowIndex).addClass('active');
    }
    Swiper.prototype.move = function (index) {
        var self = this;
        if (self.flag) {
            self.flag = false;
            if (index == 'prev') {
                if (self.nowIndex == 0) {
                    self.nowIndex = self.len - 1;
                    $('.img-box').css({
                        left: -(self.len * self.w)
                    })
                } else {
                    self.nowIndex--;
                }
            } else if (index == 'next') {
                if (this.nowIndex == this.len - 1) {
                    this.nowIndex = 0;
                    $('.img-box').animate({
                        left: -(self.len * self.w) + "px"
                    }, function () {
                        $(this).css({
                            left: 0
                        })
                    });

                } else {
                    this.nowIndex++;
                }
            } else {
                this.nowIndex = index;
            }
            this.silder();
        }
    }
    Swiper.prototype.silder = function(){
        var self = this;
        $('.img-box').animate({
           left: -(self.w * self.nowIndex) + "px"
        }, function () {
            self.flag = true;
            //self.automatic();
        })
    }
    Swiper.prototype.automatic = function () {
        clearTimeout(this.timer);
        var self = this;
        this.timer = setTimeout(function () {
            self.move('next');
            self.changeStyle();
        }, self.interVal);
    }
    $.fn.extend({
        sliderImg: function (options) {
            options.father = this || $('body');
            new Swiper(options);
        }
    })
})()
