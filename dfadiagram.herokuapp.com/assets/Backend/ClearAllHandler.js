$(document).ready(function() {

    $('#clearButton').on('click', function() {
        drawer.clearCanvas();
        redraw();

        DFATuples.state = [];
        subesh.state = [];
        DFATuples.initial = [];
        subesh.initial = [];
        DFATuples.alphabet = [];
        subesh.alphabet = [];
        DFATuples.final = [];
        subesh.final = [];
        DFATuples.transition = {};
        subesh.transition = {};
    });
});