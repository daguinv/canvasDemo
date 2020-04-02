var startBtn = document.getElementsByClassName("startBtn")[0];
var content = document.getElementsByClassName("content")[0];
var pauseButton = document.getElementsByClassName("pauseBtn")[0];
var addSpeed = document.getElementsByClassName("addSpeed")[0];
var reduceSpeed = document.getElementsByClassName("reduceSpeed")[0];
var topsoreR = document.getElementsByClassName("topsoreR")[0];
init();
function init() {
    this.boxWidth = parseInt(window.getComputedStyle(content, null).width);
    this.boxHeight = parseInt(window.getComputedStyle(content, null).height);
    this.foodWidth = 20;
    this.foodHeight = 20;
    this.snakeBodys = [[3, 1], [2, 1], [1, 1]];
    this.numberW = boxWidth / 20;
    this.numberH = boxHeight / 20;
    this.direction = 'right';
    this.left = false;
    this.up = true;
    this.down = true;
    this.right = false;
    this.sore = 0;
    this.speed = 200;
    this.pause = false;
    this.start = true;
    control();
}
function control() {
    startBtn.addEventListener('click', function () {
        startGame();
    }, false)

}

function startGame() {
    startBtn.style.display = "none";
    creatFood();
    creatSnake();
    move();
    gamePause(this.start);
    dkey(this.start);
    controlSpeed();
}
function no(){
    this.start = false;
    dkey(this.start);
}
function yes(){
    this.start = true;
    dkey(this.start);
}
function gamePause(start) {
    pauseButton.addEventListener('click', function () {
        if (start == true) {
            clearInterval(snakeMove);
            pauseButton.innerHTML = "start";
            start = false;
            no();
        
        }
        else {
            move();
            pauseButton.innerHTML = "pause";
            start = true;
            yes();
            //dkey(start);
        }

    }, false)

}
function creatFood() {
    var food = document.createElement("div");
    this.foodX = Math.floor(Math.random() * numberW);
    this.foodY = Math.floor(Math.random() * numberH);
    food.style.left = this.foodX * 20 + "px";
    food.style.top = this.foodY * 20 + "px";
    food.setAttribute("class", "food");
    content.appendChild(food);
}
function creatSnake() {
    for (var i = 0; i < snakeBodys.length; i++) {

        this.snake = document.createElement('div');
        snake.style.left = snakeBodys[i][0] * 20 + "px";
        snake.style.top = snakeBodys[i][1] * 20 + "px";
        if (i == 0) {
            snake.setAttribute("class", "snakeHead");
        }
        else {
            snake.setAttribute("class", "snakeBody");
        }
        this.snake.classList.add('snake');
        this.content.appendChild(snake);
    }
    var snakeHead = document.getElementsByClassName("snakeHead");
    switch (this.direction) {
        case "right":
            snakeHead[0].style.transform = "rotate(0deg)";
            break;
        case "left":
            snakeHead[0].style.transform = "rotate(180deg)";
            break;
        case "up":
            snakeHead[0].style.transform = "rotate(270deg)";
            break;
        case "down":
            snakeHead[0].style.transform = "rotate(90deg)";
            break;
        default:
            break;
    }
}

function snakeDirection(code) {

    switch (code) {
        case 38:
            if (this.up == true) {
                this.direction = "up";
                this.up = false;
                this.down = false;
                this.left = true;
                this.right = true;
            }
            break;
        case 40:
            if (this.down == true) {
                this.direction = 'down';
                this.up = false;
                this.down = false;
                this.left = true;
                this.right = true;
            }
            break;
        case 37:
            if (this.left == true) {
                this.direction = "left";
                this.up = true;
                this.down = true;
                this.left = false;
                this.right = false;
            }
            break;
        case 39:
            if (this.right == true) {
                this.direction = "right";
                this.up = true;
                this.down = true;
                this.left = false;
                this.right = false;
            }
            break;
    }
}
function dkey(start) {
    var self  = this;
    document.addEventListener('keydown', function (e) {
        if (self.start == true) {
            snakeDirection(e.keyCode);
        }
    }, false);
}
function move() {
    this.snakeMove = setInterval(function() {
        control();
        for (var i = snakeBodys.length - 1; i > 0; i--) {
            snakeBodys[i][0] = snakeBodys[i - 1][0];
            snakeBodys[i][1] = snakeBodys[i - 1][1];
        }
        switch (this.direction) {
            case "right":
                snakeBodys[0][0] = snakeBodys[0][0] + 1;
                break;
            case "left":
                snakeBodys[0][0] = snakeBodys[0][0] - 1;
                break;
            case "up":
                snakeBodys[0][1] = snakeBodys[0][1] - 1;
                break;
            case "down":
                snakeBodys[0][1] = snakeBodys[0][1] + 1;
                break;
            default:
                break;
        }
        removeDiv('snake');
        creatSnake();
        if (this.foodX == snakeBodys[0][0] && this.foodY == snakeBodys[0][1]) {
            removeDiv('food');
            creatFood();
            this.sore++;
            topsoreR.innerHTML = sore;
            var snakeTailX = snakeBodys[snakeBodys.length - 1][0];
            var snakeTailY = snakeBodys[snakeBodys.length - 1][1];
            snakeBodys.push([snakeTailX, snakeTailY]);
        }
        for (var i = 1; i < snakeBodys.length; i++) {
            if (snakeBodys[0][0] == snakeBodys[i][0] && snakeBodys[0][1] == snakeBodys[i][1]) {
                clearInterval(snakeMove);
                pauseButton.innerHTML = "start";
                this.start = false;
            }
        }
        console.log(window.speed);
        if (this.snakeBodys[0][0] < 0 || this.snakeBodys[0][0] >= numberW || this.snakeBodys[0][1] < 0 || this.snakeBodys[0][1] >= numberH) {
            clearInterval(snakeMove);
            pauseButton.innerHTML = "start";
            this.start = false;
            this.sore = 0;
        }
    }, this.speed)
}

function removeDiv(node) {
    var deleteSnake = document.getElementsByClassName(node);
    while (deleteSnake.length != 0) {
        deleteSnake[0].parentNode.removeChild(deleteSnake[0]);
    }
}
function controlSpeed(){
    var self = this;
    addSpeed.addEventListener('click',function(){
        clearInterval(snakeMove);
        self.speed = self.speed + 30;
        //move();
    },false);
    reduceSpeed.addEventListener('click',function(){
        clearInterval(snakeMove);
        self.speed = self.speed - 30;
        move();
    },false);
}