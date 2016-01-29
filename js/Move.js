var Move = Shape.extend({
    constructor: function(shape) {
        console.log("I am with a shape in the move constructor");
        this.base(shape.name, shape.position, shape.color);
    },

    startDrawing: function(point) {
        this.startingPosition = point;
    },

    draw: function(canvas) {
        this.base(canvas);
    },

    drawing: function(point) {
        //point.relative = new Point(point.x - this.position.x, point.y - this.position.y);
        this.position.x = point.x - this.position.x;
        this.position.y = point.y - this.position.y;

        //this.size.x = point.x - this.position.x;
        //this.size.y = point.y - this.position.y;
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
