$(document).ready(function(){

    $('#TransCommit').on('click', function () {
        let toState = $('#toState').val();
        let fromState = $('#fromState').value();
        let symbol = $('#TransSymbol').value();
        drawer.addTransition(toState, fromState, symbol);
      });

});