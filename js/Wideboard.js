function Wideboard(canvasSelector) {
    'use strict';
    var self = this;

    self.getEventPoint = function(e) {
        return new Point(e.pageX - self.canvasOffset.x, e.pageY - self.canvasOffset.y);
    };

    self.drawingStart = function(e) {
        if (self.shapes[self.shapes.length - 1] === 'CLEARED') {
            self.clearShapes();
        }

        var startingPosition = self.getEventPoint(e);

        if (!self.selectionTool) {
            var shape = new self.shapeConstructor(startingPosition, self.color, self.fillColor, self.lineWidth, self.font);
        } else {
            console.log("About to move shit");
        }

        shape.startDrawing(startingPosition, self.canvasContext);
        startingPosition.log('drawing start');

        var drawing = function(e) {
            var position = self.getEventPoint(e);
            shape.drawing(position, self.canvasContext);
            self.redraw();
            shape.draw(self.canvasContext);
        };

        var drawingStop = function(e) {
            var position = self.getEventPoint(e);
            shape.stopDrawing(position, self.canvasContext);

            position.log('drawing stop');

            self.shapes.push(shape);
            shape.added(self.canvasContext);

            // Tell drawing and drawingStop to take a chillpill
            self.canvas.off({
                mousemove: drawing,
                mouseup: drawingStop
            });

            self.redraw();
            self.clearHistory();
        };

        // Need drawing and drawingStop to be active unless I stop
        self.canvas.on({
            mousemove: drawing,
            mouseup: drawingStop
        });
    };

    self.mousedown = function(e) {
        if (self.shapeConstructor != null) {
            self.drawingStart(e);
        }
        self.redraw();
    };

    self.redraw = function() {
        self.canvasContext.clearRect(0, 0, self.canvasContext.canvas.width, self.canvasContext.canvas.height);
        if (self.shapes[self.shapes.length - 1] !== 'CLEARED') {
            for (var i = 0; i < self.shapes.length; i++) {
                self.shapes[i].draw(self.canvasContext);
            };
        }
        self.resetHistoryButtons();
    };

    self.clear = function() {
        self.shapes.push('CLEARED');
        self.history = [];
        self.redraw();
        self.resetHistoryButtons();
    };

    self.clearShapes = function() {
        self.shapes = [];
    }

    self.undo = function() {
        var last = null;
        if (last = self.shapes.pop()) {
            if (last !== 'CLEARED') {
                self.shapes.push(last);
                self.history.push(self.shapes.pop());
                self.redraw();
                self.resetHistoryButtons();
            } else {
                self.redraw();
                self.resetHistoryButtons();
            }
        }
    };

    self.redo = function() {
        if (self.history.length > 0) {
            self.shapes.push(self.history.pop());
            self.redraw();
            self.resetHistoryButtons();
        }
    };

    self.resetHistoryButtons = function() {
        if (self.history.length < 1) {
            AppChanges.disableRedo();
        } else {
            AppChanges.enableRedo();
        }
        if (self.shapes.length < 1) {
            AppChanges.disableUndo();
            AppChanges.disableClear();
        } else {
            AppChanges.enableUndo();
            AppChanges.enableClear();
        }
        if (self.shapes[self.shapes.length - 1] === 'CLEARED') {
            AppChanges.disableClear();
        }
    };

    self.clearHistory = function() {
        self.history = [];
        self.resetHistoryButtons();
    }

    self.setColor = function(color) {
        self.color = color;
    };

    self.setFill = function(color, opacity) {
        if (color === undefined && opacity === undefined) {
            self.fillColor = 'rgba(0,0,0,0)';
        } else {
            self.fillColor = utils.hex2rgb(color, opacity);
        }
    };

    self.setLastFillColor = function() {
        self.lastFillColor = self.fillColor;
    };

    self.toggleFill = function(mode, color, opacity) {
        if (mode === true) {
            AppChanges.enableOpacity(opacity);
            AppChanges.enableFill(color);
            self.setFill(color, opacity);
        } else {
            AppChanges.disableOpacity();
            AppChanges.disableFill();
            self.setFill('#000000', 0.0);
        }
    };

    self.toggleVisibles = function(tool) {
        AppChanges.checkVisibles(tool);
    };

    self.saveToApi = function(title, template) {
        utils.uploadShapes(self.shapes, self.apiUser, self.apiSaveUrl, title, template, AppChanges.closeSaveDialogAfterSave);
    };

    self.getListFromApi = function() {
        utils.downloadList(self.apiUser, self.apiGetListUrl, AppChanges.showOpenDialog);
    };

    self.getDrawingFromApi = function(id) {
        // Do stuff
        utils.downloadShapes(self.apiGetDrawingUrl, id, AppChanges.loadNewDrawing);
    };

    self.init = function() {
        // Init App
        self.canvas = $(canvasSelector);
        self.canvasOffset = new Point(self.canvas.offset().left, self.canvas.offset().top);
        self.canvas.on({
            mousedown: self.mousedown
        });
        self.shapeConstructor = null;
        self.selectionTool = false;
        self.canvasContext = canvas.getContext("2d");
        self.shapes = new Array();
        self.history = new Array();
        self.color = '#000000';
        self.fillColor = 'rgba(0,0,0,0.0)';
        self.fillOpacity = 0.0;
        self.lastFillColor = utils.hex2rgb('#cccccc, 1.0');
        self.lineWidth = 1;
        self.font = "normal 12px Arial";
        self.shapeConstructor = Pen;
        self.resetHistoryButtons();
        self.toggleFill(false, '#cccccc', self.fillOpacity);
        self.toggleVisibles('Pen');
        AppCustomization.init();
        AppListener.init();
        AppChanges.init();

        self.apiUser = 'bragi14';
        self.apiSaveUrl = 'http://whiteboard.apphb.com/Home/Save';
        self.apiGetListUrl = 'http://whiteboard.apphb.com/Home/GetList';
        self.apiGetDrawingUrl = 'http://whiteboard.apphb.com/Home/GetWhiteboard';
    };

    self.init();
};

var app = null;
$(function() {
    app = new Wideboard('#canvas');
});
