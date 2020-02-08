checker = new DFAChecker(drawer);
let accepted = [];
let rejected = [];
$(document).ready(function() {
  $('#batchCheck').on('click',function() {
      $('.alert').hide();
    checker.resetColor();
    checker.time = $('#travspeedBatch').val();
    let strings = $('#dfabatchInput').val().split(",");
    // for (var i = 0; i < strings.length; i++) { //OG prototype
    //     if (checker.check(strings[i]) === "Accepted"){
    //         accepted.push(strings[i]);
    //     } else {
    //         rejected.push(strings[i]);
    //     }
    // } this loop is done with the function now
    var delay = $("#delayRange").val(); //added a delay so you can see it
    var i = 0;
    var strprnt = document.getElementById("strID");
    function delayLoop() {
        setTimeout(function(){
          strprnt.innerHTML = strings[i];
            if (checker.check(strings[i]) === "Accepted"){
                accepted.push(strings[i]);
            } else {
                rejected.push(strings[i]);
            }
            i++;
            if(i < strings.length){
                delayLoop();
            }
        }, delay);
    }
    delayLoop();
    strprnt.innerHTML = "-DONE TESTING-";

    $('#batchTestModal').modal('hide');
    $('#navCollapseBut').trigger('click');
  });

  $(document).on('click','.close',function() {
    checker.resetColor();
    redraw();
    $('.alert').hide();
  });
});

//Slider Handlers
var sliderTrvSpd = document.getElementById("travspeedBatch");
var outputTrvSpd = document.getElementById("batchTrvVal");
outputTrvSpd.innerHTML = sliderTrvSpd.value;
sliderTrvSpd.oninput = function () {
  outputTrvSpd.innerHTML = this.value;
}

var sliderDelay = document.getElementById("delayRange");
var outDelay = document.getElementById("delayVal");
outDelay.innerHTML = sliderDelay.value;
sliderDelay.oninput = function () {
  outDelay.innerHTML = this.value;
}