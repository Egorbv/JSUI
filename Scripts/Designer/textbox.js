(function (desginer) {
	desginer.ToolbarControls["TextBox"] = new TextBox();

	function TextBox() {
		this.GetMarkup = function (controlID) {
			return "<input id='textbox" + controlID + "' draggable='true' role='designer-control' data-params='type:TextBox' type='text' value='text'/>";
		}
	}

})(designer);