function DropDownContent(settings) {
	if (settings == null) {
		new JSUIException("Не заданы настройки");
	}

	var container = document.createElement("div");
	container.className = "jsui-drop-down-content"
	document.body.append(container);
	var currentEvent = null;

	this.Hide = function () {
		window.unbind("click", onWindowClick);
		window.unbind("resize", onWindowResize);
		container.hide();
	}

	this.Show = function (args) {


		currentEvent = event;

		container.css({ display: "block" });

		var point = args;
		if (args.tagName) {
			point = args.absCoords();
		}

		if (settings.horizontAlign == "right") {
			point.left = point.left + point.width - container.offsetWidth;
		}

		if (settings.verticalAlign == "bottom") {
			point.top += point.height;
		}
		else {
			point.top -= container.offsetHeight;
		}

		container.css({ top: point.top + "px", left: point.left + "px" });
		container.show();
		window.bind("click", onWindowClick);
		window.bind("resize", onWindowResize);
	};

	var instance = this;

	//обработчик события изменения размеров окна
	var onWindowResize = function () {
		instance.Hide();
	}
	//обработчик события клика в любом месте окна
	var onWindowClick = function () {
		if (currentEvent == null) {
			instance.Hide();
		}
		currentEvent = null;
	}

}
