var LoopImage = function(imageArr,container){
    this.imageAarray = imageArr;    //图片数组
    this.container = container;     //轮播图片容器
}
LoopImage.prototype = {
    //创建轮播图片
    createImage: function(){    
        
    },
    //切换图片
    changeImage: function(){

    }
}


var container = document.getElementById('container');
var loopImage = new LoopImage(['./image/1.jpg','./image/2.jpg','./image/3.jpg','./image/4.jpg'],container);
