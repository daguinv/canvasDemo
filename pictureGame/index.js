/**配置游戏设置 */
var config = {
    width: 300,
    height: 300,
    row: 4,
    column: 4,
    url: 'pic.jpg',
    wrapper: document.getElementById('game')
}
/**设置每个小拼图的宽高 */
config.blockWidth = config.width / config.column;
config.blockHeight = config.height / config.row;
/**创建游戏界面 */
function showGameArea() {
    //1.外部设置
    config.wrapper.style.width = config.width + "px";
    config.wrapper.style.height = config.height + "px";
    config.wrapper.style.border = "1px solid #ccc";
    config.wrapper.style.position = "relative";
    //2.随机创建小格子
    // 创建顺序数组
    var regularArr = createRegularArr();
    // 打乱数组顺序，生成随机位置
    randomArray(regularArr);
    // console.log(regularArr);
    var newRegularArr = createRegularArr();
    for(var i = 0; i < regularArr.length; i++){
        var span = document.createElement('span');
        if(i < regularArr.length - 1){
            config.wrapper.appendChild(span);
            span.style.background = `url(${config.url})`;

        }else{
            config.wrapper.appendChild(span);
            span.classList.add("empty");
            console.log(span);
        }
        
        span.style.position = 'absolute';
        span.style.display = 'inline-block';  
        span.style.width = config.blockWidth + "px";
        span.style.height = config.blockHeight + "px";
        span.style.border = "1px solid #fff";
        span.style.boxSizing = 'borderBox';
        span.style.left = regularArr[i].x + "px";
        span.style.top = regularArr[i].y + "px";
        span.style.transition = "0.3s";
        // span.style.background = 'url(pic.jpg)';
        span.style.backgroundPosition = -newRegularArr[i].x + "px" +" " +-newRegularArr[i].y +"px";
    }
    // console.log(regularArr)
    // console.log(newRegularArr);
}
showGameArea();
clickEvent();
/**
 * 添加点击事件
 */
function clickEvent(){
    config.wrapper.onclick = function(e){
        var thisdom = e.target;
        // 当前dom元素位置
        var thisX  = parseInt(e.target.style.left);
        var thisY  = parseInt(e.target.style.top);
        var emptydom = document.getElementsByClassName('empty')[0];
        // 空白元素位置
        var emptyX = emptydom.offsetLeft;
        var emptyY = emptydom.offsetTop;
        if(Math.abs(parseInt(thisX) - parseInt(emptyX)) + Math.abs(parseInt(thisY) - parseInt(emptyY)) <= parseInt(thisdom.style.width)){
            // 临时交换变量
            var tempX,tempY;
            tempX = thisX;
            tempY = thisY;
            thisX = emptyX;
            thisY = emptyY;
            emptyX = tempX;
            emptyY = tempY;
            thisdom.style.left = thisX + "px";
            thisdom.style.top = thisY +"px";
            emptydom.style.left = emptyX + "px";
            emptydom.style.top = emptyY + "px";
        }

        var currentPosition = createRegularArr();
        for(var i = 0; i < currentPosition.length; i++){
            console.log(this.childNodes[i].offsetLeft, currentPosition[i].x);
            if((this.childNodes[i].offsetLeft != currentPosition[i].x ) || (this.childNodes[i].offsetTop != currentPosition[i].y)){
                return false;
            }
            
        }
        setTimeout(function(){
            alert("yes")
        }, 1500);
        
    }
}

function createRegularArr() {
    var arr = [];
    for (var i = 0; i < config.row; i++) {
        for (var j = 0; j < config.column; j++) {
            arr.push({ x: j * config.blockWidth ,y: i * config.blockHeight})
        }
    }
    return arr;
}
/**
 * 随机打乱数组
 */
function randomArray(arr){
    var random;
    var temp;
    for(var i = 0; i < arr.length - 1; i++){
        random = Math.floor(Math.random() * (arr.length - 1));
        temp = arr[i];
        arr[i] = arr[random];
        arr[random] = temp;
    }
}
