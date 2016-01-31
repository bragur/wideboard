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
        this.open();
        this.fontListener();
        this.textToolListener();
        this.fileNameListener();
    },

    toolChangeListener: function() {
        'use strict';
        $('.toolOption').on('click', function() {
            var newTool = $(this).data('tool');
            console.log("Changing to " + newTool);
            AppChanges.changeTool(newTool);
            AppChanges.checkVisibles(newTool);
            app.selectionTool = false;
            app.textTool = false;

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
                    app.textTool = true;
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
            if (app.shapes.length > 0) {
                AppChanges.openSaveDialog();
            } else {
                AppChanges.message('Nothing to save', -1);
            }
        });
    },

    save: function() {
        'use strict';
        $('#save').on('click', function() {
            utils.save();
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

    open: function() {
        'use strict';
        $('#open').on('click', function() {
            var id = $('#open-file-list').val();
            app.getDrawingFromApi(id);
        });
    },

    fontListener: function() {
        'use strict';
        $('.fontOption').on('click', function() {
            var fontSize = $('#currentFontSize').text().replace("t", "x");
            console.log("Changing font to " + $(this).data('font') + " " + fontSize);
            app.font = "normal " + fontSize + " " + $(this).data('font');
            AppChanges.updateTextbox($(this).data('font'), fontSize.replace("px", ""));
        });
        $('.fontSize').on('click', function() {
            var font = $('#currentFont').text().trim();
            console.log("Changing font to " + font + " " + $(this).data('fontsize') + "px");
            app.font = "normal " + $(this).data('fontsize') + "px " + font;
            AppChanges.updateTextbox(font, $(this).data('fontsize'));
        });
    },

    textToolListener: function() {
        var position;
        $('#textTool').on('keyup', function(e) {
            if (e.keyCode === 13) {
                $('#textTool').focusout();
            }
            if (e.keyCode === 27) {
                $('#textTool').val('');
                $('#textTool').focusout();
            }
        });
        $('#textTool').on('focusin', function() {
            position = new Point($(this).position().left - $('#canvas').offset().left, $(this).position().top + 11 - $('#ladyluck').height());
        });
        $('#textTool').on('focusout', function() {
            if ($(this).val().trim() !== '') {
                app.insertText($(this).val().trim(), position);
            }
            $(this).val("");
            $(this).hide();
        });
    },

    fileNameListener: function() {
        $('#save').attr('disabled', 'disabled');
        $('#save-filename').on('keydown keyup change', function(e) {
            if (e.keyCode === 27 && e.type === 'keydown') {
                console.log("Vil cancellera!");
                AppChanges.closeSaveDialog();
            }
            if (e.keyCode === 13 && e.type === 'keydown') {
                utils.save();
            }
            if ($(this).val().trim() == '') {
                $('#save').attr('disabled', 'disabled');
            } else {
                $('#save').removeAttr('disabled');
            }
        });
    },
};
