var AppListener = {
    init: function() {
        'use strict';
        this.toolChangeListener();
        this.colorPickerListener();
        this.fillPickerListener();
        this.clearListener();
        this.undoListener();
        this.redoListener();
        this.fillListener();
        this.lineWidthListener();
        this.textWidthListener();
        this.opacityListener();
        this.saveDialogListener();
        this.save();
        this.cancelSave();
        this.openDialogListener();
        this.cancelOpen();
    },

    toolChangeListener: function() {
        'use strict';
        $('.toolOption').on('click', function() {
            var newTool = $(this).data('tool');
            console.log("Changing to " + newTool);
            AppChanges.changeTool(newTool);
            AppChanges.checkVisibles(newTool);
            app.selectionTool = false;

            switch (newTool) {
                case 'Rectangle':
                    app.shapeConstructor = Rectangle;
                    break;
                case 'Line':
                    app.shapeConstructor = Line;
                    break;
                case 'Ellipse':
                    app.shapeConstructor = Ellipse;
                    break;
                case 'Text':
                    app.shapeConstructor = Text;
                    break;
                case 'Pen':
                    app.shapeConstructor = Pen;
                    break;
                case 'Move':
                    app.shapeConstructor = Move;
                    app.selectionTool = true;
                    break;
                default:
                    break;
            }
        });
    },

    lineWidthListener: function() {
        'use strict';
        $('.lineWidth').on('click', function() {
            console.log("Changing line width to " + $(this).data('width'));
            AppChanges.changeLineWidth($(this).data('width'));
            app.lineWidth = $(this).data('width');
        });
    },

    colorPickerListener: function() {
        'use strict';
        $('#colorPicker').on('change', function() {
            app.setColor($(this).val());
        });
    },

    fillPickerListener: function() {
        'use strict';
        $('#fillPicker').on('change', function() {
            app.setFill($(this).val(), $('#opacity').val());
        });
    },

    opacityListener: function() {
        'use strict';
        var changeOpacity = function(item) {
            var $this = item;
            var amount = $this.val();
            $('.opacity-amount').text(amount + "%");
            $('.opacity-amount').data('opacity', amount);
            app.setFill($('#fillPicker').val(), amount);
        };

        $('#opacity').on('change mousemove', function() {
            console.log('Changing opacity');
            changeOpacity($(this));
        });

    },

    clearListener: function() {
        'use strict';
        $('#optionClear').on('click', function() {
            app.clear();
        });
    },

    undoListener: function() {
        'use strict';
        $('#optionUndo').on('click', function() {
            app.undo();
        });
    },

    redoListener: function() {
        'use strict';
        $('#optionRedo').on('click', function() {
            app.redo();
        });
    },

    fillListener: function() {
        'use strict';
        $('#fill').on('click', function() {
            var mode = $(this).is(':checked');
            var color = $('#fillPicker').val();
            var opacity = $('#opacity').val();
            console.log("Color:", color, "Opacity:", opacity);
            app.toggleFill(mode, color, opacity);
        });
    },

    textWidthListener: function() {
        'use strict';
        $('input.textBox').autoSize();
    },

    saveDialogListener: function() {
        'use strict';
        $('#optionSave').on('click', function() {
            AppChanges.openSaveDialog();
        });
    },

    save: function() {
        'use strict';
        $('#save').on('click', function() {
            var title = $('#save-filename').val();
            var template = $('#save-template').is(':checked');
            app.saveToApi(title, template);
        });
    },

    cancelSave: function() {
        'use strict';
        $('#cancelSave').on('click', function() {
            AppChanges.closeSaveDialog();
        });
    },

    openDialogListener: function() {
        'use strict';
        $('#optionOpen').on('click', function() {
            app.getListFromApi();
        });
    },

    cancelOpen: function() {
        'use strict';
        $('#cancelOpen').on('click', function() {
            AppChanges.closeOpenDialog();
        });
    },
};
