$(document).ready(function() {

    $('#addState').on('click', function() {
        // alert("Hello mate");
        drawer.createStateCircle();
        redraw();
    });
});