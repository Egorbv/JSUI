(function (desginer) {
	desginer.ToolbarControls["ComboBox"] = new ComboBox();

	function ComboBox() {
		this.GetMarkup = function () {
			return "<select></select>";
		}
	}
})(designer);
