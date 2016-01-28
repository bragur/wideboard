var Shape = Base.extend({
    constructor: function(name, position, color) {
        this.name = name;
        this.position = position;
        this.size = new Point(0, 0);
        this.color = color;
        this.selected = false;
    },

    draw: function() {
        if (this.selected === true) {

        }
    },

    startDrawing: function(point) {

    },

    drawing: function(point) {

    },

    stopDrawing: function(point) {

    },

    added: function(canvas) {

    }
});
