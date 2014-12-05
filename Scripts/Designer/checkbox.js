(function (desginer) {
	desginer.ToolbarControls["CheckBox"] = new CheckBox();

	function CheckBox() {
		this.GetMarkup = function () {
			return "<input type='checkbox'/>";
		}
	}
})(designer);
