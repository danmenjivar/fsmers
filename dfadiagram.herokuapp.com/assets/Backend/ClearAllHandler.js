$(document).ready(function() {

    $('#clearButton').on('click', function() {
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

        drawer.clearCanvas();
        redraw();


    });
});