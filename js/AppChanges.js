var AppChanges = {
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

    getText: function(position) {
        $('input.textBox').prop('top', position.x).prop('left', position.y);
    },
};