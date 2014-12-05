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
			container = jsui.CreateElement("div");
			container.addClass("jsui-dialog");
			var html = "";


			if (settings.isModal = true) {
			}


			html += "<div class='jsui-dialog-content'></div><div class='jsui-dialog-footer'></div>";
			container.html(html);
			container.append(_generateHeader());

			debugger;	
			header = container.find(".jsui-dialog-header")[0];
			content = container.find("jsui-dialog-content")[0];
			footer = container.find("jsui-dialog-footer")[0];

			var left = document.documentElement.clientWidth/2 - settings.width/2;
			var top = document.documentElement.clientHeight/2 - settings.height/2;

			container.css({ width: settings.width + "px", height: settings.height + "px", left : left + "px", top : top + "px" });

			container.appendTo(document.body);

			header.bind("mousedown", _onMouseDown);

			//_initHeaderButtons();
		}


	}

	//обработчик нажатия мыши на заголовке диалога
	function _onMouseDown(ev) {
		jsui.helpers.moveObject(container, ev);
	}

	//создание кнопки для заголовка
	function _createHeaderButton(className, clickFunction, area) {
		var btn = jsui.CreateElement("span");
		btn.onclick = clickFunction;
		btn.className = "jsui-di-button";
		var cBtn = jsui.CreateElement("span");
		cBtn.className = "jsui-icon " + className;
		btn.append(cBtn);
		area.append(btn);
		return cBtn;
	}

	//генерация заголовка виалога
	function _generateHeader() {
		var header = jsui.CreateElement("div");
		header.addClass("jsui-dialog-header");
		header.innerText = settings.title;

		if (settings.customHeaderButtons) {
			if (!(settings.customHeaderButtons instanceof Array)) {
				settings.customHeaderButtons = new Array(settings.customHeaderButtons);
			}
		}

		if (settings.showClose || settings.showMax || settings.showMin || settings.customHeaderButtons) {
			var btnArea = jsui.CreateElement("span").attr("class", "jsui-dialog-header-buttons");
			if (settings.customHeaderButtons) {
				var btns = settings.customHeaderButtons;
				for(var i=0; i < btns.length; i++){
					var btn = _createHeaderButton(btns[i].css, btns[i].callback, btnArea);
				}
			}

			sysBtnMin = !settings.showMin || _createHeaderButton("jsui-di-min", self.Minimaze, btnArea);
			sysBtnMax = !settings.showMax || _createHeaderButton("jsui-di-max", self.Maximaze, btnArea);
			sysBtnClose = !settings.showClose || _createHeaderButton("jsui-di-close", self.Hide, btnArea);
			header.append(btnArea);
		}

		header.find(".jsui-di-button").bind("mousedown", function (ev) {
			ev.stopPropagation();
		});

		return header;
	}


	function _saveSettings() {
	    var top = container.offsetTop;
	    var left = container.offsetLeft;
	    var width = container.offsetWidth;
	    var height = container.offsetHeight;
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
		var result = true;
		if (typeof settings.closeCallback == "function") {
			result = settings.closeCallback(self);
			if (result == undefined) {
				result = true;
			}
		}
		if (result) {
			container.hide();
		}
	}
}



