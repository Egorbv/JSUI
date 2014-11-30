function DropDownContent(settings) {
	if (settings == null) {
		new JSUIException("Не заданы настройки", this);
	}

	var self = this;
	var currentEvent = null;
	var container = document.createElement("div");
	container.className = "jsui-drop-down-content"

	this.Content = document.createElement("div");
	container.append(this.Content);
	document.body.append(container);

	this.Hide = function () {
		window.unbind("click", onWindowClick);
		window.unbind("resize", onWindowResize);
		container.css({ display: "none", visibility : "hidden", width: "0px", height: "0px", overflow: "hidden" });
	}

	this.Show = function (args) {
	    currentEvent = event;//возможно нужно останавливать событие
	    container.css({ display: "block", width:"0px", height:"0px", overflow :"hidden" });
	    if (args.tagName) {
	        var oldPoint = args.absCoords();
	        var oldLeft = oldPoint.left;
	        _setPosition(oldPoint);
	        var newPoint = args.absCoords();
	        var newLeft = newPoint.left;
	        //Если после показа координаты элемента изменились
	        //в результате изменения размеров окна
	        if (oldLeft != newLeft) {
	            _setPosition(newPoint);
	        }
	    }
	    else if (args.x && args.y) {
	        var point = { left: args.x, top: args.y, height: 1, width: 1 };
	        _setPosition(point);
	    }
	    else {
	        new JSUIException("Заданы не верные аргумента для показа выпадающего контента", this)
	    }
    
	    container.css({ visibility: "visible", overflow: "auto" });
		window.bind("click", onWindowClick);
		window.bind("resize", onWindowResize);
	};

	function _setPosition(point)
	{
	    //Получаем ширину видимого окна без прокруток
	    var windowWidth = document.documentElement.clientWidth;
        //Получаем высоту видимого окна без прокруток
	    var windowHeight = document.documentElement.clientHeight;
	    //X позиция прокрутки окна
	    var scrollX = window.scrollPosX();
        //Y позиция прокрутки окна
	    var scrollY = window.scrollPosY();
	    //Высчитываем окончательную высоту и ширину контента с учетом рамок основного контейнера
	    var contentWidth = self.Content.offsetWidth + (container.offsetWidth - container.clientWidth);
	    var contentHeight = self.Content.offsetHeight + (container.offsetHeight - container.clientHeight);
        //Запоминаем текущие характеристики
	    var oldWidth = self.Content.offsetWidth;
	    var oldHeight = self.Content.offsetHeight;
	    var oldTop = point.top;

        //Учитываем настройка минимальной\максимольной высоты\ширины
        //Если установлена максимальная ширина и ширина контента ее превышает
	    if (settings.maxWidth && self.Content.offsetWidth > settings.maxWidth) {
	        self.Content.style.width = settings.maxWidth + "px";
	    }
        //Если установлена минимальная ширина и ширина контента меньше заданной
	    if (settings.minWidth && self.Content.offsetWidth < settings.minWidth) {
	        self.Content.style.width = settings.minWidth + "px";
	    }
        //Если установлена максимальная высота и высота контента ее превышает
	    if (settings.maxHeight && self.Content.offsetHeight > settings.maxHeight) {
	        self.Content.style.height = settings.maxHeight + "px";
	    }
        //Если установлена минимальная высота и высота контента ее меньше
	    if (settings.minHeight && self.Content.offsetHeight < settings.minHeight) {
	        self.Content.style.height = settings.minHeight + "px";
	    }


	    //********Высчитывание ширины и позиции X координаты********
        //Если выравнивание по правому краю
	    if (settings.horizontAlign == "right") {
            //выравниваем по правому краю указанной области
	        point.left = point.left + point.width - contentWidth
	    }
	    //Если видимая ширина окна меньше ширины контента,уменьшаем ширину контента
	    if (windowWidth < contentWidth) { contentWidth = windowWidth; }
        //Если левый угол вне видимости, выравниваем по видимому левому углу окна
	    if (point.left < scrollX) { point.left = scrollX; }
        //Если правый угол вне видимости, выравниваем по видимому правому углу окна
	    if (point.left + contentWidth > scrollX + windowWidth) { point.left -= point.left + contentWidth - (scrollX + windowWidth); }

	    if (settings.verticalAlign == "bottom") {
	        point.top += point.height;
	    }
	    else {
	        point.top -= contentHeight + 1;//1 - что бы не заступать на top элемента
	    }

        //Если видимая высота окна меншье высоту контента, уменьшаем высоту контента
	    if (contentHeight > windowHeight) { contentHeight = windowHeight; }
        //Если верхний угол вне видимости, выравниваем его по верхнему углу окна
	    if (point.top < scrollY) { point.top = scrollY; }
        //Если нижний угол вне видимости, выравниваем его по нижнему углу окна
	    if (point.top + contentHeight > scrollY + windowHeight) { point.top -= point.top + contentHeight - (scrollY + windowHeight); }

	    //Если контент был расширен и не попадает в указанные координаты
        //Проверяем, можем ли мы сменить позицию выравнивания
	    if (settings.verticalAlign == "bottom") {
	        if (oldTop + point.height != point.top) {
	            if (oldTop - contentHeight >= scrollY) {
	                point.top = oldTop -( contentHeight + 1);
	            }
	        }
	    }
	    else if ( point.top == scrollY && point.top + contentHeight > oldTop){
	        if (oldTop + point.height + contentHeight <= scrollY + windowHeight) {
	            point.top = oldTop + point.height;
	        }
	    }

	    //clear
	    self.Content.css({ overflow: "none", width: oldWidth + "px", height: oldHeight + "px" });
	    container.css({ top: point.top + "px", left: point.left + "px", width: contentWidth + "px", height : contentHeight + "px" });
    }

	//обработчик события изменения размеров окна
	var onWindowResize = function () {
		self.Hide();
	}
	//обработчик события клика в любом месте окна
	var onWindowClick = function () {
		if (currentEvent == null) {
			self.Hide();
		}
		currentEvent = null;
	}

}
