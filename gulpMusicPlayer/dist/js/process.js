(function ($, root) {
    var frameId;
    var duration;
    var lastTime = 0;
    var startTime;
    function renderTime(time) {
        duration = time;
        $('.allTime').html(this.formatTime(time));
    };

    function formatTime(time) {
        var m = Math.floor(time / 60);
        var s = time - m * 60;
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;
        return m + ':' + s;
    };
    function startTime(lastPer) {
        console.log('+' + lastPer);
        cancelAnimationFrame(frameId);
        startTime = new Date().getTime();
        if(lastPer != undefined){
            lastTime = lastPer * duration * 1000;
        }
        function count() {
            var curTime = new Date().getTime();
            var per = (curTime - startTime + lastTime) / (duration * 1000);
            if (per <= 1) {
                upDate(per);
            } else {
                cancelAnimationFrame(frameId);
            }
            frameId = requestAnimationFrame(count);
        }
        count();
    }

    function upDate(per) {
        var time = formatTime(Math.round(per * duration));
        $('.curTime').html(time);
        var x = (per - 1) * 100;
        $('.pro-top').css({
            'transform': 'translateX(' + x + '%)'
        })

    }
    function stopTime() {
        cancelAnimationFrame(frameId);
        var stopTime = new Date().getTime();
        lastTime = lastTime + stopTime - startTime;
    }
    
    
    root.process = {
        renderTime: renderTime,
        formatTime: formatTime,
        startTime: startTime,
        stopTime: stopTime,
        upDate: upDate
    }
})(window.Zepto, window.player || (window.player = {}))