$(document).ready(function() {

    $('#clearButton').on('click', function() {
        drawer.clearCanvas();
        redraw();

        DFATuples.state = [];
        sysDFA.state = [];
        DFATuples.initial = [];
        sysDFA.initial = [];
        DFATuples.alphabet = [];
        sysDFA.alphabet = [];
        DFATuples.final = [];
        sysDFA.final = [];
        DFATuples.transition = {};
        sysDFA.transition = {};
    });
});