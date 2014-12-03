function Dialog(settings) {
	var container = null;
	var self = this;

	if (settings.title == undefined) {
		settings.title = "";
	}

	var btn = "<span class='jsui-di-button'><span class='jsui-icon ";

	this.Show = function () {
		if (container == null) {
			container = document.createElement("div");
			container.className = "jsui-dialog";
			var html = "";





			html += "<div class='jsui-dialog-content'></div><div class='jsui-dialog-footer'></div>";


			html += "<div class='jsui-dialog-header'>" + settings.title;
			html += "<span class='jsui-dialog-header-buttons'>";
			html += btn + "jsui-di-min'></span></span>";
			html += btn + "jsui-di-max'></span></span>";
			html += btn + "jsui-di-close'></span></span>";
			html += "</span></div>"
			container.html(html);




			this.Header = container.getElementsByClassName("jsui-dialog-header")[0];
			this.Content = container.getElementsByClassName("jsui-dialog-content")[0];
			this.Footer = container.getElementsByClassName("jsui-dialog-footer")[0];

			var left = document.documentElement.clientWidth/2 - settings.width/2;
			var top = document.documentElement.clientHeight/2 - settings.height/2;

			container.css({ width: settings.width + "px", height: settings.height + "px", left : left + "px", top : top + "px" });

			document.body.append(container);

			this.Header.bind("mousedown", _onMouseDown);

            //переделать
			var ss = container.find(".jsui-di-button");
			container.find(".jsui-di-button").bind("click", function (ev) {
			    var icon = this.find(".jsui-icon");
			    if (icon.length == 1) {
			        var cl = icon[0].className.replace("jsui-icon ","");
			        switch (cl) {
			            case "jsui-di-close":
			                self.Hide(ev);
			                break;
			            case "jsui-di-min":
			                self.Minimaze(ev);
			                icon[0].className = "jsui-icon jsui-di-restore";
			                break;
			            case "jsui-di-restore":
			                self.Restore(ev, icon[0]);
			                break;
			            case "jsui-di-max":
			                self.Maximaze(ev);
			                icon[0].className = "jsui-icon jsui-di-restore";
			                break;
			        }
			    }
			})
		}


		function _onMouseDown(ev) {
		    jsui.helpers.moveObject(container, ev);
		}
	}

	function _saveSettings(oldClass) {
	    var top = container.offsetTop;
	    var left = container.offsetLeft;
	    var width = container.offsetWidth;
	    var height = container.offsetHeight;
	    //save body overflow
	    container.oldSettings = { left: left, top: top, width: width, height: height, oldClass : oldClass };
	}

	this.Restore = function (ev, icon) {
	    var st = container.oldSettings
	    container.css({ left: st.left + "px", top: st.top + "px", width: st.width + "px", height: st.height + "px" });
	    icon.className = "jsui-icon " + st.oldClass;
	}

	this.Minimaze = function(){
	    var tmp = container.getElementsByClassName("jsui-dialog-header")
	    if (tmp.length == 1) {
	        _saveSettings("jsui-di-min");
	        container.style.height = tmp[0].offsetHeight + "px";
	    }
	}

	this.Maximaze = function () {
	    _saveSettings("jsui-di-max");
	    document.body.style.overflow = "hidden";
	    container.css({ left: "0px", top: "0px", width:"100%", height: "100%" });
	}

	this.Hide = function () {
	    container.hide();
	}
}



