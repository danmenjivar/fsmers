$(document).ready(function() {

    $('#addState').on('click', function() {
        drawer.createStateCircle();
        redraw();
    });
});