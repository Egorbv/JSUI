/*
contentMode - Режим отображения контента таба. Режим по умолчанию - 'auto', контент таба растягивает контейнер с табами по своему содержимому.
              Режим 'container' - означает что контент таба з

tabHeaderStyle - flat : по умолчанию
                 roundEdge : верхние края заголовка округлены
*/
function TabStrip(settings) {
	var instance = this;


	var tab = settings.target;
	tab.addClass(settings.mode);

	var ul = tab.find("UL")[0];
	ul.find("#text").remove();
	ul.css({ position: "relative" });

	
	//Создаем кнопку для показа не поместившихся табов
	var listButton = document.createElement("div");
	listButton.className = "jsui-tab-strip-list-button";
	listButton.title = "Список скрытых вкладок";
	listButton.css({ visibility: "hidden" });
	listButton.innerHTML = "<span></span><span></span><span></span>";
	ul.append(listButton);



	var tabContent = jsui.CreateElement("span");
	tabContent.className = "jsui-tab-strip-content";

	if (settings.mode == "jsui-mode1" || settings.mode == "jsui-mode3") {
		var line = document.createElement("span");
		line.className = "jsui-tab-strip-line";
		settings.target.append(line);
	}

	//Если содержимое табов нужно умещать в высоту основного контейнера
	if (settings.contentMode != undefined && settings.contentMode == "container") {
		var tabContentHeight = ul.offsetHeight;
		if (line != undefined) {
			tabContentHeight += line.offsetHeight -1;
		}
		tabContent.className += " jsui-absolute";
		tabContent.css({ top: tabContentHeight + "px", overflow: "auto" });
	}


	tab.append(tabContent);
	var li = ul.find("LI");
	ul.css({ height: li[0].offsetHeight + "px", "white-Space" : "normal" }); //возвращаем стиль, что если не помещается переносить

	li.forEach(function(item){
		var liParams = item.dataParams();
		if (liParams.tabID != undefined) {
			var div = document.getElementById(liParams.tabID);
			if (div != null) {
				div.remove();
				tabContent.append(div);
				item.tabContainer = div;
				div.hide();
				if (liParams.selected == "true") {
					item.addClass("jsui-selected");
					div.show();
				}
			}
			else {
				new JSUIException("Не найден контейнер по указанному идентификатору во вкладке таба", instance);
			}
		}
		else {
			new JSUIException("Вкладка таба не содержит идентификатор контейнера содержиомго", instance);
		}
	});

	//Переключение вкладок таба
	li.bind("click", function () {
		li.forEach(function (item) {
			item.tabContainer.hide();
			item.removeClass("jsui-selected")
		});
		this.addClass("jsui-selected");
		this.tabContainer.show();
	});

	document.body.bind("DOMNodeInserted", function (x,x1) {
		if (settings.target == x.srcElement) {
			alert(5);
		}
	});


	var onWindowResize = function () {
		var lastLi = li[li.length - 1];
		var firstLi = li[0];
		if (lastLi.offsetTop != firstLi.offsetTop) {
			listButton.style.visibility = "visible";
		}
		else {
			listButton.style.visibility = "hidden";
		}

		if (settings.target.parentNode == null) {
			alert("unbind");
			window.unbind("resize", onWindowResize);
		}
	}

	window.bind("resize", onWindowResize);
	onWindowResize();

	var tabListBox = null;
	//Обработчик клика на кнопке показа скрытых вкладок
	listButton.bind("click", function () {
		if (tabListBox == null) {
			tabListBox = new DropDownContent({verticalAlign: "top", horizontAlign: "right" });
		}
		tabListBox.Content.style.width = "100px";
		tabListBox.Content.style.height = "200px";
		tabListBox.Show(this);
	});
}


TabStrip.prototype.toString = function () {
	return "TabStrip";
}
