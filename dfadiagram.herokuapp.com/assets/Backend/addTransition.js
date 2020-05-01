$(document).ready(function() {
    $('#addTransModal').on('show', function(){ // refresh the alphabet when the user clicks to open the dialog box
        let alphaprnt = document.getElementById("alpha-remind"); // this is used in the test
        alphaprnt.innerHTML = `${sysDFA.alphabet.join(',')}`; //builder to remind the user of valid input
      });

    $('#addTransCommit').on('click', function() {
        let symbol = $('#addTransSymbol').val();
        
        console.log("pressed!");
    });
});