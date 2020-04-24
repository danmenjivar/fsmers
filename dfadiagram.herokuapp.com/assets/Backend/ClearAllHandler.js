$(document).ready(function() {

    $('#clearButton').on('click', function() {
        drawer.clearCanvas();
        redraw();
    });
});