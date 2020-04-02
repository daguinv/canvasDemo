getData('../mock/data.json');
var root = window.player;
var dataLen;
var dataList; 
var audioObj;
var index;
var process;
function getData(url) {
    $.ajax({
        type:'GET',
        url:url,
        success:function(data){
            dataLen = data.length;
            dataList = data;
            console.log(dataList);
            index = new root.indexControl()
            audioObj = new root.music(dataList[0].audio);
            root.render(data[0]);
            
        },
        error:function(){
            console.log('error');
        }
    })
}



// 信息 + 图片渲染到页面
// 图片旋转
// 点击按钮实现交互（播放，暂停，喜欢）
// 进度条运动与拖拽
// 列表切歌