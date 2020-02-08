let checker = new DFAChecker(drawer);
$(document).ready(function() {


  $('#check').on('click',function() {
      $('.alert').hide();
    checker.resetColor();
    checker.time = $('#travspeed').val();
    checker.check($('#dfaInput').val());
    $('#inputButtonModal').modal('hide');
    $('#navCollapseBut').trigger('click');
  });
 
  $(document).on('click','.close',function() {
    checker.resetColor();
    redraw();
    $('.alert').hide();
  });
});


// Slider handler
var sldrTrvSpd = document.getElementById("travspeed");
var outTrvSpd = document.getElementById("trvspdvalue");
outTrvSpd.innerHTML = sldrTrvSpd.value;
sldrTrvSpd.oninput = function () {
  outTrvSpd.innerHTML = this.value;
}