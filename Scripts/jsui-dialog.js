function Dialog(settings) {
	var container = null;
	var self = this;

	if (settings.title == undefined) {
		settings.title = "";
	}

	var btn = "<span class='jsui-dialog-icon-button'><span class='jsui-icon ";

	this.Show = function () {
		if (container == null) {
			container = document.createElement("div");
			container.className = "jsui-dialog";
			var html = "<div class='jsui-dialog-header'><span>" + settings.title + "</span>";
			
			html += "<span class='jsui-dialog-header-buttons'>";
			html += btn +"jsui-dialog-i-maximize'></span></span>";

			html+="</span>"

			html+= "</div><div class='jsui-dialog-content'></div><div class='jsui-dialog-footer'></div>";

			container.html(html);
			this.Header = container.getElementsByClassName("jsui-dialog-header")[0];
			this.Content = container.getElementsByClassName("jsui-dialog-content")[0];
			this.Footer = container.getElementsByClassName("jsui-dialog-footer")[0];

			var left = document.documentElement.clientWidth/2 - settings.width/2;
			var top = document.documentElement.clientHeight/2 - settings.height/2;

			container.css({ width: settings.width + "px", height: settings.height + "px", left : left + "px", top : top + "px" });

			document.body.append(container);

			this.Header.bind("mousedown", _onMouseDown);
		}

		function _onMouseDown(ev) {
			MoveObject(container, ev);
		}
	}

	this.Hide = function () {
	}
}


function MoveObject(obj, ev) {
	var startX = ev.clientX;
	var startY = ev.clientY;
	var oldObjX = obj.offsetLeft;
	var oldObjY = obj.offsetTop;

	document.documentElement.addClass("move-object-start");
	window.bind("mousemove", _onMouseMove);
	window.bind("mouseup", _onmouseUp);

	function _onMouseMove(ev) {
		obj.style.left = oldObjX -( startX - ev.clientX) + "px";
		obj.style.top = oldObjY - (startY - ev.clientY) + "px";
	}

	function _onmouseUp(){
		_destroy();
	}

	function _destroy(){
		document.documentElement.removeClass("move-object-start");
		window.unbind("mousemove", _onMouseMove);
		window.unbind("mouseup", _onmouseUp);
	}
}