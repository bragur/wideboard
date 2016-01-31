var AppChanges = {
    init: function() {
        this.enableControlsAfterDialogDismiss();
    },

    disableUndo: function() {
        $('#optionUndo').attr('disabled', 'disabled');
    },

    enableUndo: function() {
        $('#optionUndo').removeAttr('disabled');
    },

    disableRedo: function() {
        $('#optionRedo').attr('disabled', 'disabled');
    },

    enableRedo: function() {
        $('#optionRedo').removeAttr('disabled');
    },

    disableClear: function() {
        $('#optionClear').attr('disabled', 'disabled');
    },

    enableClear: function() {
        $('#optionClear').removeAttr('disabled');
    },

    disableFill: function() {
        $('#fillPicker').attr('disabled', 'disabled');
    },

    enableFill: function() {
        $('#fillPicker').removeAttr('disabled');
    },

    disableOpacity: function() {
        // $('#opacity').val(0);
        // $('.opacity-amount').text('0%');
        // $('.opacity-amount').data('opacity', 0);
        // app.setFillToHistory();
        $('#opacity').attr('disabled', 'disabled');
    },

    enableOpacity: function(opacity) {
        // $('#opacity').val(100);
        $('.opacity-amount').text(opacity + '%');
        $('.opacity-amount').data('opacity', opacity);
        // app.getFillFromHistory();
        $('#opacity').removeAttr('disabled');
    },

    changeLineWidth: function(width) {
        $('#currentLineWidth').attr("class", "").addClass("line");
        var insideButton = $('#currentLineWidthLabel').html().split(" ");
        insideButton.pop();
        var newInside = utils.arrayToString(insideButton) + " " + width + "px";
        $('#currentLineWidthLabel').html(newInside);

        switch (width) {
            case 1:
                $('#currentLineWidth').addClass("onepx");
                break;
            case 2:
                $('#currentLineWidth').addClass("twopx");
                break;
            case 3:
                $('#currentLineWidth').addClass("threepx");
                break;
            case 4:
                $('#currentLineWidth').addClass("fourpx");
                break;
            case 5:
                $('#currentLineWidth').addClass("fivepx");
                break;
            case 10:
                $('#currentLineWidth').addClass("tenpx");
                break;
            default:
                break;
        };
    },

    checkVisibles: function(newTool) {
        console.log(newTool);
        if (newTool !== 'Line' && newTool !== 'Pen' && newTool !== 'Text' && newTool !== 'Move') {
            $('.fill-group').fadeIn();
        } else {
            $('.fill-group').fadeOut();
        }
        if (newTool === 'Text') {
            $('#lineWidth').hide();
            $('#font').fadeIn();
        } else if (newTool !== 'Move') {
            $('#lineWidth').fadeIn();
            $('#font').hide();
        } else {
            $('#font').fadeOut();
        }
        if (newTool === 'Move') {
            $('#lineWidth').fadeOut();
        }
    },

    changeTool: function(tool) {
        $('#currentTool').attr("class", "").addClass("fa");

        // Want the 'text' cursor when using Text-mode
        if (tool === 'Text') {
            $('#canvas').hover(
                function() {
                    $(this).css('cursor', 'text');
                }, // in
                function() {
                    $(this).css('cursor', 'default'); // out
                });
        } else if (tool === 'Move') {
            $('#canvas').hover(
                function() {
                    $(this).css('cursor', 'move');
                },
                function() {
                    $(this).css('cursor', 'default');
                });
        } else {
            $('#canvas').hover(
                function() {
                    $(this).css('cursor', 'crosshair');
                },
                function() {
                    $(this).css('cursor', 'default');
                });
        }

        switch (tool) {
            case 'Rectangle':
                $('#currentTool').addClass("fa-square-o");
                break;
            case 'Line':
                $('#currentTool').addClass("fa-minus");
                break;
            case 'Ellipse':
                $('#currentTool').addClass("fa-circle-thin");
                break;
            case 'Text':
                $('#currentTool').addClass("fa-i-cursor");
                break;
            case 'Pen':
                $('#currentTool').addClass("fa-pencil");
                break;
            case 'Move':
                $('#currentTool').addClass("fa-hand-grab-o");
                break;
            default:
                break;
        };
        $('#currentTool').text(' ' + tool);
    },

    enableControlsAfterDialogDismiss: function() {
        var windowHeight = $(window).height();
        $('#fake-screen').css('top', -windowHeight);
    },

    disableAllButDialog: function() {
        $('#fake-screen').css('top', 0);
    },

    getText: function(position) {
        $('input.textBox').prop('top', position.x).prop('left', position.y);
    },

    openSaveDialog: function() {
        console.log("Gonna open this save dialog thing");
        AppCustomization.enableCancel('save');
        var $dialog = $('#save-dialog');
        $('#save-filename').removeAttr('disabled');
        var sizeOfDialog = new Box($dialog.width(), $dialog.height());
        var newPlacement = utils.calculateCenter(sizeOfDialog);
        var newLeft = newPlacement.x + "px";
        var newTop = newPlacement.y + "px";
        utils.blurElement('#main', 0, 4, 200);
        this.disableAllButDialog();
        $dialog.animate({left: newLeft}, 200);
    },

    closeSaveDialog: function() {
        console.log("Gonna close this save dialog thing");
        AppCustomization.disableCancel();
        var $dialog = $('#save-dialog');
        var dialogWidth = $dialog.width();
        var shadowWidth = parseInt($dialog.css('box-shadow').split(' ')[5].replace("px", ""));
        var newLeft = (-dialogWidth-shadowWidth*2) + "px";
        $dialog.animate({left: newLeft}, 100);
        AppChanges.enableControlsAfterDialogDismiss();
        utils.blurElement('#main', 4, 0, 100);
        this.resetDialog = function(timeout) {
            setTimeout(function() {
                if ($('#save-template').is(':checked')) {
                    $('#save-template').trigger('click');
                }
                $('#save-filename').val('');
                $('#save-filename').attr('disabled', 'disabled');
                $('#save').attr('disabled', 'disabled');
            }, timeout
        )};
        AppChanges.resetDialog(200);
    },

    closeSaveDialogAfterSave: function(str) {
        AppChanges.closeSaveDialog();
        AppChanges.message(str);
    },

    showOpenDialog: function(success, data, error) {
        console.log("Gonna show some items here");
        AppCustomization.enableCancel('open');
        var $dialog = $('#open-dialog');
        var sizeOfDialog = new Box($dialog.width(), $dialog.height());
        var newPlacement = utils.calculateCenter(sizeOfDialog);
        var newRight = newPlacement.x + "px";
        AppChanges.disableAllButDialog();
        utils.blurElement('#main', 0, 4, 200);
        $('#open-file-list').select2({data: utils.fixOpenData(data)});
        $dialog.animate({right: newRight}, 200);
    },

    closeOpenDialog: function() {
        console.log("Gonna close this open dialog thingy here");
        AppCustomization.disableCancel();
        var $dialog = $('#open-dialog');
        var dialogWidth = $dialog.width();
        var shadowWidth = parseInt($dialog.css('box-shadow').split(' ')[5].replace("px", ""));
        var newRight  = (-dialogWidth-shadowWidth*2) + "px";
        $dialog.animate({right: newRight}, 100);
        this.enableControlsAfterDialogDismiss();
        utils.blurElement('#main', 4, 0, 100);
    },

    loadNewDrawing: function(data) {
        if (data === "error") {
            AppChanges.message('Unable to open file, please try again', -1);
        } else {
            var newShapes = utils.convertJsonShapes(data.WhiteboardContents);
            app.shapes = newShapes;
            app.resetHistoryButtons();
            app.redraw();
            AppChanges.closeOpenDialog();
            AppChanges.message('Opened file successfully');
        }
        
    },

    message: function(str, type) {
        console.log(str);
        var $dialog = $('#messages');
        $dialog.text(str);

        switch (type) {
            case -1:
                $dialog.css('background-color', '#E8C4CD');
                break;
            default:
                $dialog.css('background-color', 'rgb(240,240,240)');
                break;
        }

        $dialog.show();
        setTimeout(function() {$dialog.fadeOut(); }, 2500);
        setTimeout(function() {$dialog.text(''); }, 3500);
    },
};