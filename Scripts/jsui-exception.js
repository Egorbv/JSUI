function JSUIException(message, sender) {
	console.error("JSUIException:" + message);
	if (sender != null) {
		console.error(sender);
	}
}
