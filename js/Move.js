var Move = Shape.extend({
    constructor: function(shape) {
        this.base(shape.name, shape.position, shape.color);
        this.rectOffsetX = 0;
        this.rectOffsetY = 0;
    },

    startDrawing: function(point) {
        this.rectOffsetX = point.x - this.position.x;
        this.rectOffsetY = point.y - this.position.y;
    },

    draw: function(canvas) {
        this.base(canvas);
    },

    drawing: function(point) {
        this.position.x = point.x - this.rectOffsetX;
        this.position.y = point.y - this.rectOffsetY;
    },

    added: function(canvas) {
        if (this.size.x < 0) {
            this.position.x += this.size.x;
            this.size.x = Math.abs(this.size.x);
        }

        if (this.size.y < 0) {
            this.position.y += this.size.y;
            this.size.y = Math.abs(this.size.y);
        }
    },

});
