checker = new DFAChecker(drawer);
let accepted = [];
let rejected = [];
$(document).ready(function() {
  $('#batchCheck').on('click',function() {
      $('.alert').hide();
    checker.resetColor();
    time = $('#dfaBatchInterval').val();
    if (time != "") {
      if (time <= 2000)
        checker.time = time;
    } else {
      checker.time = 200;
    }
    let strings = $('#dfaBatchInput').val().split(",");
    // for (var i = 0; i < strings.length; i++) { //OG prototype
    //     if (checker.check(strings[i]) === "Accepted"){
    //         accepted.push(strings[i]);
    //     } else {
    //         rejected.push(strings[i]);
    //     }
    // }
    var delay = $("#stringInterval").val(); //added a delay so you can see it
    if (delay == "" || delay > 5000){
        delay = 2000;
    }
    var i = 0
    function delayLoop() {
        setTimeout(function(){
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

    $('#batchTestModal').modal('hide');
    $('#navCollapseBut').trigger('click');
  });

  $(document).on('click','.close',function() {
    checker.resetColor();
    redraw();
    $('.alert').hide();
  });
});
