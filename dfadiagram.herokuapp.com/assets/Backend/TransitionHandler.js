$(document).ready(function(){

  $('#TransModalBut').on('click', function(){ // refresh the alphabet when the user clicks to open the dialog box
    let alphaprnt = document.getElementById("alpha-remind"); // this is used in the test
    alphaprnt.innerHTML = `${sysDFA.alphabet.join(',')}`; //builder to remind the user of valid input
  });

  $('#TransCommit').on('click', function () {
    let toState = $('#toState').val();
    let fromState = $('#fromState').val();
    let symbol = $('#TransSymbol').val();
    if (toState == "" || fromState == "" || symbol == ""){ //nothing happens if missing
      console.log("nothing happened idiot");
    }
    else{
      drawer.addTransition(fromState, toState, symbol);
    }

  });

});