function Dialog(settings) {
	var modalContainer, header, content, footer, sysBtnClose, sysBtnMin, sysBtnMax, container = null
	var self = this;

	if (settings.title == undefined) {
		settings.title = "";
	}
	//если показ системных кнопок не задан, то показываем их все
	if (settings.showClose == undefined && settings.showMax == undefined && settings.showMin == undefined) {
		settings.showClose = settings.showMax = settings.showMin = true;
	}

	var btn = "<span class='jsui-di-button'><span class='jsui-icon ";

	this.Show = function () {
		if (container == null) {
			container = document.createElement("div");
			container.className = "jsui-dialog";
			var html = "";


			if (settings.isModal = true) {
			}



			html += "<div class='jsui-dialog-content'></div><div class='jsui-dialog-footer'></div>";
			html += _generateHeader();
			container.html(html);

			header = container.getElementsByClassName("jsui-dialog-header")[0];
			content = container.getElementsByClassName("jsui-dialog-content")[0];
			footer = container.getElementsByClassName("jsui-dialog-footer")[0];

			var left = document.documentElement.clientWidth/2 - settings.width/2;
			var top = document.documentElement.clientHeight/2 - settings.height/2;

			container.css({ width: settings.width + "px", height: settings.height + "px", left : left + "px", top : top + "px" });

			document.body.append(container);

			header.bind("mousedown", _onMouseDown);

			_initHeaderButtons();
		}


	}

	//обработчик нажатия мыши на заголовке диалога
	function _onMouseDown(ev) {
		jsui.helpers.moveObject(container, ev);
	}

	//инициализация обработчиков системных кнопок в заголовке диалога
	function _initHeaderButtons() {
		var tmp = container.find(".jsui-di-min");
		if (tmp.length == 1) {
			sysBtnMin = tmp[0];
			sysBtnMin.bind("click", self.Minimaze);
		}

		tmp = container.find(".jsui-di-max");
		if (tmp.length == 1) {
			sysBtnMax = tmp[0];
			sysBtnMax.bind("click", self.Maximaze);
		}

		tmp = container.find(".jsui-di-close");
		if (tmp.length == 1) {
			sysBtnClose = tmp[0];
			sysBtnClose.bind("click", self.Hide);
		}
		container.find(".jsui-di-button").bind("mousedown", function (ev) {
			ev.stopPropagation();
		});
	}

	//генерация заголовка виалога
	function _generateHeader() {
		var header = "<div class='jsui-dialog-header'>" + settings.title;
		var buttons = "";
		if (settings.showMin === true) {
			buttons += btn + "jsui-di-min'></span></span>";
		}
		if (settings.showMax === true) {
			buttons += btn + "jsui-di-max'></span></span>";
		}
		if (settings.showClose === true) {
			buttons += btn + "jsui-di-close'></span></span>";
		}
		if (header.length > 0) {
			buttons = "<span class='jsui-dialog-header-buttons'>" + buttons + "</span>";
		}
		return header + buttons + "</div>";
	}


	function _saveSettings() {
	    var top = container.offsetTop;
	    var left = container.offsetLeft;
	    var width = container.offsetWidth;
	    var height = container.offsetHeight;
	    //save body overflow
	    container.oldSettings = { left: left, top: top, width: width, height: height};
	}

	this.Restore = function (ev, icon) {
		if (container.oldSettings) {
			var st = container.oldSettings
			container.css({ left: st.left + "px", top: st.top + "px", width: st.width + "px", height: st.height + "px" });
			container.oldSettings = null;
		}
	}

	this.Minimaze = function(){
		if (header && sysBtnMin) {
			if (sysBtnMin.hasClass("jsui-di-min")) {
				_saveSettings();
				container.style.height = header.offsetHeight + container.verticalBordersWidth()+ "px";
				sysBtnMin.className = "jsui-icon jsui-di-restore";
				sysBtnMax.hide();
			}
			else {
				sysBtnMin.className = "jsui-icon jsui-di-min";
				sysBtnMax.show();
				self.Restore();
			}
	    }
	}

	this.Maximaze = function () {
		if (sysBtnMax.hasClass("jsui-di-max")) {
			_saveSettings();
			document.body.style.overflow = "hidden";
			container.css({ left: "0px", top: "0px", width: "100%", height: "100%" });
			sysBtnMax.className = "jsui-icon jsui-di-restore";
			debugger;
			sysBtnMin.hide();
		
		}
		else {
			document.body.style.overflow = "auto";
			sysBtnMax.className = "jsui-icon jsui-di-max";
			sysBtnMin.show();
			self.Restore();
		}
	}

	this.Hide = function () {
	    container.hide();
	}
}



