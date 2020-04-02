(function ($, root) {
    function Control() {
        this.index = 0;
    }
    Control.prototype = {
        pre: function () {
            return this.getIndex(-1);
        },
        next: function () {
            return this.getIndex(1);
        },
        getIndex: function (val) {
            this.index = (this.index + val + dataLen) % dataLen;
            return this.index;
        }
    }
    root.indexControl = Control;

})(window.Zepto, window.player || (window.player = {}));