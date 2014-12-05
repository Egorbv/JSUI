HTMLElement.prototype.css = function (params) {
	if (typeof params == "object") {
		for (var k in params) {
			this.style[k.replaceAll("-", "")] = params[k];
		}
	}
	else {
		params = params.replaceAll("-", "");
		if (window.getComputedStyle) {
			return window.getComputedStyle(this)[params];
		}
		else {
			this.currentStyle[params];
		}
	}
}

HTMLElement.prototype.hide = function () {
	if (this.beforeStyles == undefined) {
		this.beforeStyles = {};
	}
	this.beforeStyles.display = this.css("display");
	this.style.visibility = "hidden";
	this.style.display = "none";
	return this;
}

HTMLElement.prototype.show = function () {
	if (this.beforeStyles != undefined && this.beforeStyles.display) {
		this.style.display = this.beforeStyles.display;
	}
	else {
		this.style.display = "block";
	}
	this.style.visibility = "visible";
	return this;
}

HTMLElement.prototype.dataParams = function () {
	var res = {};
	var attr = this.getAttribute("data-params");
	if (attr != undefined) {
		var tmp = attr.split(";");
		for (var i = 0; i < tmp.length; i++) {
			var values = tmp[i].split(":");
			res[values[0]] = values[1];
		}
	}
	return res;
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
	return this;
}

HTMLElement.prototype.find = function (tagName) {
    if (tagName.charAt(0) == '.') {
        return this.getElementsByClassName(tagName.substr(1));
    }
    var result = new Array();
    if (this.childNodes) {
		for (var i = 0; i < this.childNodes.length; i++) {
			if (this.childNodes[i].nodeName == tagName) {
				result.push(this.childNodes[i]);
			}
		}
	}
    return result;
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
	return this;
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
	return this;
}

HTMLElement.prototype.bind = function (ev, func) {
	if (this.attachEvent) {
		this.attachEvent("on" + event, func);
	}
	else {
		this.addEventListener(ev, func);
	}
	return this;
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

HTMLElement.prototype.html = function (html) {
	if (html == undefined) {
		return this.innerHTML;
	}
	this.innerHTML = html;
	return this;
}

HTMLElement.prototype.clone1 = function () {
	var node = document.createElement("div");
	node.html(this.outerHTML).addClass("jsui-dragable-element");
	return node.childNodes[0];
}


HTMLElement.prototype.closest = function (s) {
	var el = this;
	if (s.charAt(0) == ".") {
		while (el != null) {
			var index = this.className.indexOf(s);
			if (index != -1) {
				if (index == 0 || index == this.className.length - s.length) {
					return el
				}
				if (el.className.charAt(index - 1) == " " && el.className.charAt(index + s.length) == " ") {
					return el;
				}
			}
			el = el.parentNode;
		}
	}
}

HTMLElement.prototype.unbind = function (ev, func) {
	if (this.attachEvent) {
		this.detachEvent("on" + event, func);
	}
	else {
		this.removeEventListener(ev, func);
	}
}

HTMLElement.prototype.attr = function (attr, value) {
	if (value != undefined) {
		this.setAttribute(attr, value);
	} else {
		if (typeof attr == "string") {
			return this.getAttribute[attr].value;
		}
		for (var key in attr) {
			this.setAttribute(key, value);
		}
	}
	return this;
}

HTMLElement.prototype.hasClass = function( selector ) {
	var className = " " + selector + " ";
	if ( this.nodeType === 1 && (" " + this.className + " ").indexOf( selector ) >= 0 ) {
		return true;
	}
	return false;
}

HTMLElement.prototype.appendTo = function (node) {
	if (this.parentNode != null) {
		this.parentNode.removeChild(this);
	}
	node.appendChild(this);
	return this;
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
	return this;
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

Array.prototype.attr = function (attr, value) {
	for (var i = 0; i < this.length; i++) {
		this[i].attr(attr, value);
	}
	return this;
}
	

HTMLCollection.prototype.bind = Array.prototype.bind;
HTMLCollection.prototype.attr = Array.prototype.attr;
