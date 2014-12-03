(function () {
    window.jsui = new Object();
    var jsui = window.jsui;
    jsui.helpers = {};

    //перемещает объект с абсолютными координатами по экрану вслед за машью
    //после события мыши 'mouseUp' перемещение заканчивается
    jsui.helpers.moveObject = function (obj, ev) {
        var startX = ev.clientX;
        var startY = ev.clientY;
        var oldObjX = obj.offsetLeft;
        var oldObjY = obj.offsetTop;

        document.documentElement.addClass("move-object-start");
        window.bind("mousemove", _onMouseMove);
        window.bind("mouseup", _onmouseUp);

        function _onMouseMove(ev) {
            obj.style.left = oldObjX - (startX - ev.clientX) + "px";
            obj.style.top = oldObjY - (startY - ev.clientY) + "px";
        }

        function _onmouseUp() {
            _destroy();
        }

        function _destroy() {
            document.documentElement.removeClass("move-object-start");
            window.unbind("mousemove", _onMouseMove);
            window.unbind("mouseup", _onmouseUp);
        }
    }
})();