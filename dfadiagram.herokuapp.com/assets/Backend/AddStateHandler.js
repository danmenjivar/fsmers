$(document).ready(function() {

    $('#addState').on('click', function() {
        if (!subesh.state || !subesh.state.length){ //Empty FSM
            console.log("Started with empty slate");
            DFATuples.state = ['q1'];
            DFATuples.initial = ['q1'];
            subesh.map(DFATuples);
            drawer.createDiagram();
            redraw();
        } else { //there exists at least 1 state in the fsm
            console.log(`Had ${subesh.state.length} states`)
            DFATuples.state.push(`q${DFATuples.state.length + 1}`);
            subesh.map(DFATuples);
            drawer.createDiagram();
            redraw();
        }
    });
});