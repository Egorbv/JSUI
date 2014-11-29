HTMLElement.prototype.css = function (params) {
	for (var k in params) {
		this.style[k.replace("-", "")] = params[k];
	}
}

HTMLElement.prototype.hide = function () {
	this.style.visibility = "hidden";
	this.style.display = "none";
}

HTMLElement.prototype.show = function () {
	this.style.visibility = "visible";
	this.style.display = "block";
}

HTMLElement.prototype.dataParams = function () {
	var attr = this.getAttribute("data-params");
	if (attr != undefined) {
		var tmp = attr.split(";");
		var res = {};
		for (var i = 0; i < tmp.length; i++) {
			var values = tmp[i].split(":");
			res[values[0]] = values[1];
		}
		return res;
	}
}

HTMLElement.prototype.remove = function (params) {
	if (params == undefined) {
		this.parentNode.removeChild(this);
	}
}

HTMLElement.prototype.toList = function(){
	return new Array(this);
}

HTMLElement.prototype.append = function (obj) {
	var elements = obj.toList();
	for (var i = 0; i < elements.length; i++) {
		this.appendChild(elements[i]);
	}
}

HTMLElement.prototype.find = function (tagName) {
	if (this.childNodes) {
		var result = new Array();
		for (var i = 0; i < this.childNodes.length; i++) {
			if (this.childNodes[i].nodeName == tagName) {
				result.push(this.childNodes[i]);
			}
		}
		return result;
	}
}

HTMLElement.prototype.addClass = function (className) {
	if (this.className.length == 0) {
		this.className = className;
		return;
	}
	var classes = this.className.split(" ");
	var found = false;
	for (var j = 0; j < classes.length; j++) {
		if (className == classes[j]) {
			return;
		}
	}
	this.className += " " + className;
}

HTMLElement.prototype.removeClass = function (className) {
	if (this.className.length == 0) {
		return;
	}
	var classes = this.className.split(" ");
	var newClassNames = "";
	for (var j = 0; j < classes.length; j++) {
		if (className != classes[j]) {
			newClassNames += j == 0 ? classes[j] : " " + classes[j];
		}
	}
	this.className = newClassNames;
}

HTMLElement.prototype.bind = function (ev, func) {
	if (this.attachEvent) {
		this.attachEvent("on" + event, func);
	}
	else {
		this.addEventListener(ev, func);
	}
}


HTMLElement.prototype.absCoords = function () {
    if (this.getBoundingClientRect) {
	    var data = this.getBoundingClientRect();
	    return { left: data.left + window.scrollPosX(), top: data.top + window.scrollPosY(), width: data.width, height: data.height };
	}
	var el = this;
	var top = el.offsetTop;
	var left = el.offsetLeft;
	while (el.offsetParent) {
		el = el.offsetParent;
		if (el.offsetLeft != undefined) {
			left += el.offsetLeft;
			top += el.offsetTop;
		}
	}
	return { left: left, top: top };
}



Window.prototype.scrollPosX = function () {
    return window.pageXOffset ? window.pageXOffset : window.scrollX;
}

Window.prototype.scrollPosY = function () {
    return window.pageYOffset ? window.pageYOffset : window.scrollY;
}

Window.prototype.bind = function (ev, func) {
	if (this.attachEvent) {
		this.attachEvent("on" + event, func);
	}
	else {
		this.addEventListener(ev, func);
	}
}

Window.prototype.unbind = function (ev, func) {
	if (this.attachEvent) {
		this.detachEvent("on" + event, func);
	}
	else {
		this.removeEventListener(ev, func);
	}
}




Text.prototype.remove = function (params) {
	if (params == undefined) {
		this.parentNode.removeChild(this);
	}
}




Array.prototype.bind = function (ev, func) {
	for (var i = 0; i < this.length; i++) {
		this[i].bind(ev, func);
	}
}

Array.prototype.removeClass = function (className) {
	for (var i = 0; i < this.length; i++) {
		this[i].removeClass(className);
	}
}

Array.prototype.addClass = function (className) {
	for (var i = 0; i < this.length; i++) {
		this[i].addClass(className);
	}
}

Array.prototype.remove = function () {
	for (var i = 0; i < this.length; i++) {
		this[i].remove();
	}
}

Array.prototype.toList = function(){
	return this;
}