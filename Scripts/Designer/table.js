(function (desginer) {
	desginer.ToolbarControls["Table"] = new Table();

	function Table() {
		this.GetMarkup = function () {
			return "<table border='1' draggable='true' role='designer-control' style='display:inline-block'><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr></table>";
		}
	}
})(designer);
