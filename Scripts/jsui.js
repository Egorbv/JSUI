(function (jQuery) {
    window.jsui = new Object();
    var jsui = window.jsui;
    jsui.helpers = {};

    if (jQuery) {
    	window.jsui.CreateElement = function (name) {
    		return $(document.createElement(name));
    	}
    } else {
    	window.jsui	.CreateElement = document.createElement;
    }

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
})(window.jQuery);


//заменяет все вхождения строки
String.prototype.replaceAll = function (s1, s2) {
	return this.replace(new RegExp(s1, 'g'), s2);
}

//возвращает ширину верхнего и нижнего бордюра
HTMLElement.prototype.verticalBordersWidth = function () {
	return parseInt(this.css("border-Top-Width")) + parseInt(this.css("border-Bottom-Width"));
}

//возвращает ширину левого и правого бордюра
HTMLElement.prototype.horizontalBordersWidth = function () {
	return parseInt(this.css("border-Left-Width")) + parseInt(this.css("border-Right-Width"));
}