/**配置游戏设置 */
var config = {
    width: 300,
    height: 300,
    row: 3,
    column: 3,
    url: 'pic.jpg',
    wrapper: document.getElementById('game')
}
var emptydom;
/**设置每个小拼图的宽高 */
config.blockWidth = config.width / config.column;
config.blockHeight = config.height / config.row;
/**
 * 创建一个小方块并添加
 */
function createBlockDom(x, y, isAppend, currentx, currenty) {
    var dom = document.createElement('div');
    dom.style.width = config.blockWidth + "px";
    dom.style.height = config.blockHeight + "px";
    dom.style.position = 'absolute';
    dom.style.border = "1px solid #fff";
    dom.style.boxSizing = 'borderBox';
    dom.style.background = `url(${config.url})`;
    dom.style.transition = "all 0.2s";
    dom.currentX = currentx;
    dom.currentY = currenty;
    if (isAppend) {
        config.wrapper.appendChild(dom);
    } else {
        emptydom = dom;
    }
    //1.元素的位置
    dom.style.left = x + "px";
    dom.style.top = y + "px";
    //2.背景图位置
    dom.style.backgroundPosition = `-${currentx}px -${currenty}px`;
    dom.onclick = function () {
        var disX = Math.abs(parseInt(dom.style.left) - parseInt(emptydom.style.left));
        var disY = Math.abs(parseInt(dom.style.top) - parseInt(emptydom.style.top));
        if(disX + disY == (parseInt(config.blockWidth) || parseInt(config.blockHeight))){
            /**将当前元素与空白元素交换 */            
            var thisX = this.style.left;
            var thisY = this.style.top;
            this.style.left = emptydom.style.left;
            this.style.top = emptydom.style.top;
            emptydom.style.left = thisX;
            emptydom.style.top = thisY;
            if (isWin()) {
                setTimeout(function () {
                    alert("你真棒");
                }, 1000);
            }
        }
        
    }
}

/**判断是否胜利 */
function isWin() {
    for (var i = 0; i < config.wrapper.children.length; i++) {
        var dom = config.wrapper.children[i];
        console.log(parseInt(dom.offsetLeft), dom.currentX);
        console.log(parseInt(dom.offsetTop), dom.currentY);
        if (parseInt(dom.style.left) != parseInt(dom.currentX) || parseInt(dom.style.top) != parseInt(dom.currentY)) {
            return false;
        }
    }
    return true;
}

/**创建游戏界面 */
showGameArea();
function showGameArea() {
    //1.外部设置
    config.wrapper.style.width = config.width + "px";
    config.wrapper.style.height = config.height + "px";
    config.wrapper.style.border = "1px solid #ccc";
    config.wrapper.style.position = "relative";
    //2.创建小格子
    // 创建正确坐标的数组
    var regularArr = createRegularArr();
    randomArray(regularArr);
    var currentArr = createRegularArr();
    for (var i = 0; i < regularArr.length; i++) {
        createBlockDom(regularArr[i].x, regularArr[i].y, i < regularArr.length - 1, currentArr[i].x, currentArr[i].y);
    }
    //    
    //     // 打乱数组顺序，生成随机位置
    //     randomArray(regularArr);
    //     // console.log(regularArr);
    //     var newRegularArr = createRegularArr();
    //     for(var i = 0; i < regularArr.length; i++){
    //         var span = document.createElement('span');
    //         if(i < regularArr.length - 1){
    //             config.wrapper.appendChild(span);
    //             span.style.background = `url(${config.url})`;

    //         }else{
    //             config.wrapper.appendChild(span);
    //             span.classList.add("empty");
    //             console.log(span);
    //         }

    //         span.style.position = 'absolute';
    //         span.style.display = 'inline-block';  
    //         span.style.width = config.blockWidth + "px";
    //         span.style.height = config.blockHeight + "px";
    //         span.style.border = "1px solid #fff";
    //         span.style.boxSizing = 'borderBox';
    //         span.style.left = regularArr[i].x + "px";
    //         span.style.top = regularArr[i].y + "px";
    //         span.style.transition = "0.3s";
    //         // span.style.background = 'url(pic.jpg)';
    //         span.style.backgroundPosition = -newRegularArr[i].x + "px" +" " +-newRegularArr[i].y +"px";
    //     }
    //     // console.log(regularArr)
    //     // console.log(newRegularArr);
    // }
    // showGameArea();
    // clickEvent();
    // /**
    //  * 添加点击事件
    //  */
    // function clickEvent(){
    //     config.wrapper.onclick = function(e){
    //         var thisdom = e.target;
    //         // 当前dom元素位置
    //         var thisX  = parseInt(e.target.style.left);
    //         var thisY  = parseInt(e.target.style.top);
    //         var ; = document.getElementsByClassName('empty')[0];
    //         // 空白元素位置
    //         var emptyX = emptydom.offsetLeft;
    //         var emptyY = emptydom.offsetTop;
    //         if(Math.abs(parseInt(thisX) - parseInt(emptyX)) + Math.abs(parseInt(thisY) - parseInt(emptyY)) <= parseInt(thisdom.style.width)){
    //             // 临时交换变量
    //             var tempX,tempY;
    //             tempX = thisX;
    //             tempY = thisY;
    //             thisX = emptyX;
    //             thisY = emptyY;
    //             emptyX = tempX;
    //             emptyY = tempY;
    //             thisdom.style.left = thisX + "px";
    //             thisdom.style.top = thisY +"px";
    //             emptydom.style.left = emptyX + "px";
    //             emptydom.style.top = emptyY + "px";
    //         }

    //         var currentPosition = createRegularArr();
    //         for(var i = 0; i < currentPosition.length; i++){
    //             console.log(this.childNodes[i].offsetLeft, currentPosition[i].x);
    //             if((this.childNodes[i].offsetLeft != currentPosition[i].x ) || (this.childNodes[i].offsetTop != currentPosition[i].y)){
    //                 return false;
    //             }

    //         }
    //         setTimeout(function(){
    //             alert("yes")
    //         }, 1500);

    //     }
    // }

    /**
     * 创建一个数组，数组中包含所有正确的坐标
     */
    function createRegularArr() {
        var arr = [];
        for (var i = 0; i < config.row; i++) {
            for (var j = 0; j < config.column; j++) {
                arr.push({ x: j * config.blockWidth, y: i * config.blockHeight })
            }
        }
        return arr;
    }
    /**
     * 根据最大值和最小值产生一个随机数
     */
    function getrandom(min, max) {
        var dis = max - min;
        return Math.floor(Math.random() * dis + min);
    }
    // /**
    //  * 随机打乱数组
    //  */
    function randomArray(arr) {
        var random;
        var temp;
        for (var i = 0; i < arr.length - 1; i++) {
            random = getrandom(0, arr.length - 1);
            temp = arr[i];
            arr[i] = arr[random];
            arr[random] = temp;
        }
    }
}
