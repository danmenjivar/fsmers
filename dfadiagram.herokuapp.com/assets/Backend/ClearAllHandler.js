$(document).ready(function() {

    $('#clearButton').on('click', function() {
        if (subesh.state && subesh.state.length){ //Non-Empty FSM
            DFATuples.state = ['q0', 'q1'];
            DFATuples.alphabet = ['0', '1'];
            DFATuples.final = ['q1'];
            DFATuples.initial = ['q0'];
            DFATuples.transition = {
                q0 : {
                    0 : '',
                    1 : ''
                },
                q1 : {
                    0 : '',
                    1 : '',
                }
            };
            subesh.map(DFATuples);
            drawer.createDiagram();
            redraw();
            DFATuples.state = [];
            subesh.map(DFATuples);
        } else {
            console.log("DFA was already empty");
        }
    });
});