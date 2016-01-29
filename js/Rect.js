function Rect(position, size) {
	this.position = position;
	this.size = size;

	this.isInRect = function(point) {
		if (this.position.x < point.x && this.position.y < point.y) {
			if (point.x - this.position.x < this.size.x && point.y - this.position.y < this.size.y) {
				return true;
			}
		}
		return false;
	}
	this.log = function() {
		this.position.log();
		this.size.log();
	}
};