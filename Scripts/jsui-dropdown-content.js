function DropDownContent(settings) {
	if (settings == null) {
		new JSUIException("Не заданы настройки");
	}

	var container = document.createElement("div");
	container.className = "jsui-drop-down-content"

	this.Content = document.createElement("div");
	container.append(this.Content);
	document.body.append(container);
	var currentEvent = null;

	this.Hide = function () {
		window.unbind("click", onWindowClick);
		window.unbind("resize", onWindowResize);
		container.hide();
	}

	this.Show = function (args) {
	    currentEvent = event;//возможно нужно останавливать событие
		container.css({ display: "block", width:"0px" });
		if (args.tagName) {
		    var oldPoint = args.absCoords();
		    _setPosition(oldPoint);
		    var newPoint = args.absCoords();
		    //Если после показа координаты элемента изменились
            //в результате изменения размеров окна
		    if (oldPoint.left != newPoint.left) {
		        _setPosition(newPoint);
		    }
		}
		else {
		    _setPosition(args);
		}
        

		container.style.visibility = "visible";
		window.bind("click", onWindowClick);
		window.bind("resize", onWindowResize);
	};

	var self = this;

	function _setPosition(point)
	{
        //Если выравнивание по правому краю
	    if (settings.horizontAlign == "right") {
            //Если ширину нужно выставлять по возможности по ширине контента
	        if (settings.width == "auto") {
	            if (self.Content.offsetWidth > point.width) {
	                point.left = point.left + point.width - self.Content.offsetWidth;
                    //Если ширина контента не вышла за пределы видимой обасти
	                if (point.left < window.scrollPosX()) {
	                    var windowWidth = document.documentElement.clientWidth;
	                    //если содержимое больше чем размер экрана, выставляем ширину экрана
	                    if (self.Content.offsetWidth >= windowWidth) {
	                        container.style.width = document.documentElement.clientWidth - 4 + "px";
	                    }
                        //иначе реальную ширину контента
	                    else {
	                        container.style.width = self.Content.offsetWidth + "px";
	                    }
	                    point.left = 2 + window.scrollX;
	                }
	                else {
	                    container.style.width = self.Content.offsetWidth + "px";
	                }
	            }
	        }
	    }

	    if (settings.verticalAlign == "bottom") {
	        point.top += point.height;
	    }
	    else {
	        point.top -= self.Content.offsetHeight;
	    }
	    container.css({ top: point.top + "px", left: point.left + "px" });
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
