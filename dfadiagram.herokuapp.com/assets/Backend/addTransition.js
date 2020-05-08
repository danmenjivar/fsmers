$(document).ready(function() {


    $('#addTransModal').on('shown.bs.modal' ,function(){ // refresh the alphabet when the user clicks to open the dialog box
        let alphaprnt = document.getElementById("theAlphabet-remind"); // this is used in the test
        alphaprnt.innerHTML = `${sysDFA.alphabet.join(',')}`; //builder to remind the user of valid input
      });

    $('#addTransModal').on('hidden.bs.modal' ,function(){
        drawer.shiftReset();
      });

    $('#addTransCommit').on('click', function() {
        let symbol = $('#addTransSymbol').val();
        if (symbol == ""){
            drawer.shiftReset();
            console.log("Empty");
        }
        else{
            drawer.symbolSetter(symbol);
        }

    });
});