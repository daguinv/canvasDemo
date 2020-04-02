function Game() {
    //私有化属性
    //游戏最外层dom元素
    var dom = document.getElementById('gameBox');
    //最外层dom元素宽度
    var width = dom.offsetWidth;
    //每个小格子大小
    var size = 10;
    //一行多少个小格子
    var length = width / size;
    //蛇身数组 【left，top】
    var bodyArr = [[3, 3], [2, 3], [1, 3]];
    //蛇身的dom元素
    var snakeDom = [];
    //食物的位置
    var foodPosition = [];
    //按键锁 false 没有锁，true 上锁
    var TDclock = false; //控制上下的锁
    var LRclock = false; //控制左右的锁
    //公有方法
    /**
     * 游戏初始化
     */
    this.init = function () {
        clock = false;
        for (var i = 0; i < bodyArr.length; i++) {
            var body = this.createDom(dom, 'div');
            body.style.position = 'absolute';
            body.style.width = size + 'px';
            body.style.height = size + 'px';
            // body.style.borderRadius = '50%';
            if(i == 0){
                body.style.backgroundColor = '#abcdef'
            }else{
                body.style.backgroundColor = '#fff';
            }
            body.style.left = (bodyArr[i][0] * size) + 'px';
            body.style.top = (bodyArr[i][1] * size) + 'px';
            snakeDom.push(body);
        }
    };
    /**
     * 创建dom元素
     */
    this.createDom = function (wrapper, dom) {
        var dom = document.createElement(dom);
        wrapper.appendChild(dom);
        return dom;
    }
    /**
     * 
     */
    /**
     * 生成随机数 lawerValue - upperValue  包括 lawerValue 和 upperValue
     */
    this.selectFrom = function(lawerValue,upperValue){
        var choices =  upperValue - lawerValue + 1;
        return Math.floor(Math.random() * choices + lawerValue);
    }
    /**
     * 生成食物
     */
    this.createFood = function () {
        console.log('food')
        var food = this.createDom(dom, 'div');
        food.style.position = 'absolute';
        food.style.width = size + 'px';
        food.style.height = size + 'px';
        // food.style.borderRadius = '50%'
        //设置食物颜色
        food.style.backgroundColor = 'orange';
        //生成食物随机位置
        var positionLeft = this.selectFrom(0,length - 1);
        var positionTop = this.selectFrom(0,length - 1);
        //把位置压入数组保存
        foodPosition[0] = positionLeft;
        foodPosition[1] = positionTop
        foodPosition[2] = food;
        food.style.left = positionLeft * size + 'px';
        food.style.top =  positionTop * size + 'px';
        console.log(foodPosition)
    }
    /**
     * 判断蛇头的位置和食物的位置是否相等，相等在蛇的最后位置增加蛇身,并创建新的食物  参数：增加蛇身的位置数组
     */
    this.judgeHeadEqualFood = function(last){
     
        if(bodyArr[0][0] == foodPosition[0] && bodyArr[0][1] == foodPosition[1]){
            console.log('==');
            //把最后一个位置压入数组
            bodyArr.push(last);
            foodPosition[2].style.backgroundColor = '#fff';
            //增加蛇身dom(把食物的位置变成蛇的最后一个位置)
            snakeDom.push(foodPosition[2]);
            // console.log(bodyArr,snakeDom)
            this.showSnake();
            this.createFood()
        }
    }
    /**
     * move
     */
    this.move = function (dir) {
        var self = this;
        this.timer = setInterval(function () {
            console.log(bodyArr[0][1])
            if (dir == 'right') {
                if (bodyArr[0][1] >= length || bodyArr[0][0] >=length || bodyArr[0][1] < 0 || bodyArr[0][0] < 0) {
                    clearInterval(self.timer);
                    alert("游戏结束");
                    window.location.reload();
                } else {
                    //增加头部新位置，去除末尾位置，更新位置数组
                    var arr = [];
                    arr.push(bodyArr[0][0] + 1, bodyArr[0][1]);
                    bodyArr.unshift(arr);
                    var last = bodyArr.pop();
                    //画蛇
                    self.showSnake();
                    self.judgeHeadEqualFood(last);
                   
                }
            } else if (dir == 'top') {
                if (bodyArr[0][1] >= length || bodyArr[0][0] >=length || bodyArr[0][1] < 0 || bodyArr[0][0] < 0) {
                    clearInterval(self.timer);
                    alert("游戏结束");
                    window.location.reload();
                } else {
                    //增加头部新位置，去除末尾位置，更新位置数组
                    var arr = [];
                    arr.push(bodyArr[0][0], bodyArr[0][1] - 1);
                    bodyArr.unshift(arr);
                    var last = bodyArr.pop();
                    //画蛇
                    self.showSnake();
                    //判断食物和蛇头是否相等
                    self.judgeHeadEqualFood(last);
                }
            } else if (dir == 'left') {
                if (bodyArr[0][1] >= length || bodyArr[0][0] >=length || bodyArr[0][1] < 0 || bodyArr[0][0] < 0 ) {
                    clearInterval(self.timer);
                    alert("游戏结束");
                    window.location.reload();
                    
                } else {
                    //增加头部新位置，去除末尾位置，更新位置数组
                    var arr = [];
                    arr.push(bodyArr[0][0] - 1, bodyArr[0][1]);
                    bodyArr.unshift(arr);
                    var last = bodyArr.pop();
                    //画蛇
                    self.showSnake();
                    self.judgeHeadEqualFood(last);

                }
            } else {
                if (bodyArr[0][1] >= length || bodyArr[0][0] >=length || bodyArr[0][1] < 0 || bodyArr[0][0] < 0) {
                    clearInterval(self.timer);
                    alert("游戏结束");
                    window.location.reload();
                    
                } else {
                    //增加头部新位置，去除末尾位置，更新位置数组
                    var arr = [];
                    arr.push(bodyArr[0][0], bodyArr[0][1] + 1);
                    bodyArr.unshift(arr);
                    var last = bodyArr.pop();
                    //画蛇
                    self.showSnake();
                    self.judgeHeadEqualFood(last);

                }
            }
        }, 1000 / 30);
    } 

    this.showSnake = function () {
        for (var i = 0; i < bodyArr.length; i++) {
            snakeDom[i].style.left = bodyArr[i][0] * size + 'px';
            snakeDom[i].style.top = bodyArr[i][1] * size + 'px';
        }
    }
    /**
     * 键盘监测事件
     */
    this.keyEvent = function () {
        var self = this;
        window.addEventListener('keydown', function (event) {
            //上或下
            if(TDclock == false && (event.keyCode == 38 || event.keyCode == 40)){
                TDclock = true;
                LRclock = false;
                clearInterval(self.timer);
                if (event.keyCode == 38) {
                    self.move('top');
                }else{
                    self.move('bot')
                }
            }else if(LRclock == false && (event.keyCode == 39 || event.keyCode == 37)){
                LRclock = true;
                TDclock = false;
                clearInterval(self.timer);                
                if (event.keyCode == 39) {
                    self.move('right')    
                } else if (event.keyCode == 37) {
                    self.move('left')
                }
            }
        })
    }
}
var game = new Game();
game.init();
game.createFood();
game.keyEvent();
