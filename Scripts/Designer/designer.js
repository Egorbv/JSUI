function Designer() {
	var self = this;
	var content = null;
	var toolbar = null;
	var currentDragElement = null;
	var controlID = 0;
	this.ToolbarControls = new Array();


	//метод инициализации редактора
	this.Init = function() {
		content = document.getElementById("DesignerContent");
		if (content == null) {
			new JSUIException("Не найдена область редактирования", this);
		}
		toolbar = document.getElementById("DesignerToolbar");
		if (toolbar == null) {
			new JSUIException("Не найдена панель с пользовательскими элементами", this);
		}

		toolbar.find(".toolbox-item").attr("draggable", "true").bind("dragstart", _onDragStrart).bind("dragend", function (ev) {
			var range = window.getSelection()
			range.empty();
		});
		content.attr("contentEditable", "true")
		content.bind("dragend", _dragEnd);
		content.bind("dragstart", _dragStart);
	}


	function _dragStart(ev) {
		//если перетаскиваем один элемент
		if (ev.dataTransfer.items.length == 0) {
			//если это узел
			if (ev.srcElement.nodeType != 3) {
				var control = ev.srcElement;
				ev.dataTransfer.setData("text/html", control.outerHTML);
			}
		}
	}

	function _dragEnd(ev) {
		if (ev.dataTransfer.dropEffect == "copy") {
			var range = window.getSelection()
			if (range.type != "Caret") {
				ev.srcElement.remove();
				range.empty();
				content.focus();
			}
		}
	}

	//обработчик события начала перетаскивания элемента с панели инструментов
	function _onDragStrart(ev) {
		var currentDragElement = ev.srcElement;
		var params = currentDragElement.dataParams();
		if (params.type) {
			if (self.ToolbarControls[params.type].GetMarkup) {
				var markup = self.ToolbarControls[params.type].GetMarkup(controlID);
				ev.dataTransfer.setData("text/html", markup);
				controlID++;
			}
			else {
				new JSUIException("У вставляемого элемента нет метода получения разметки элемента", this);
			}
		}
		else {
			new JSUIException("Не удалось определить тип вставляемого элемента", this);
		}
	}
}
var designer = new Designer();
