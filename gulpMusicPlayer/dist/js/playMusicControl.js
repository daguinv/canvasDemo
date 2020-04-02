(function ($, root) {
    function AudioManger(src) {
        this.audio = new Audio();
        this.src = src;
        this.state = "pause";
    };
    AudioManger.prototype = {
        play: function () {
            this.audio.play();
            this.state = "play";
        },
        pause: function () {
            this.audio.pause();
            this.state = "pause";
        },
        getMusic: function () {
            this.audio.src = this.src;
            this.audio.load();
        },
        playTo: function (t) {
            this.audio.currentTime = t;
        }
    }
    root.music = AudioManger;
})(window.Zepto, window.player || (window.player = {}))