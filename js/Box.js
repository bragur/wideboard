function Box(width, height) {
	this.width = width;
	this.height = height;

	this.center = function() {
		return new Point(width/2, height/2);
	};

	this.log = function(text) {
		if (text === undefined) { text = ''; }
		console.log(text,this.width, this.height);
	};
}