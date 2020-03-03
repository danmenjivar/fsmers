checker = new DFAChecker(drawer);
let accepted = [];
let rejected = [];
$(document).ready(function () {
  $('#batchCheck').on('click', function () {
    $('.alert').hide();
    checker.resetColor();
    checker.time = $('#travspeedBatch').val();
    let strings = $('#dfabatchInput').val().split(",");
    var delay = $("#delayRange").val(); //added a delay so you can see it
    let i = 0;
    let strprn = document.getElementById("curStr");
    clearResultsTable();
    let precheck = preChecker(strings);
    if(precheck != true){
      alert(`String ${precheck} contains characters not in the language`)
      return;
    }
    function delayLoop() {
      setTimeout(function () {
        strprn.innerHTML = `<h2>${strings[i]}<\h2>`;
        if (checker.check(strings[i]) === "Accepted") {
          passedResultsTable(strings[i]);
        } else {
          failedResultsTable(strings[i]);
        }
        i++;
        if (i < strings.length) {
          delayLoop();
        } 
      }, delay);
    }
    delayLoop();
    $('#inputModal').modal('hide');
    $('#navCollapseBut').trigger('click');
  });

  $(document).on('click', '.close', function () {
    checker.resetColor();
    redraw();
    $('.alert').hide();
  });
});

//Slider Handlers
let sliderTrvSpd = document.getElementById("travspeedBatch");
let outputTrvSpd = document.getElementById("batchTrvVal");
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

function clearResultsTable() {
  $('#tableResults tbody').html("<tr></tr><tr></tr>");
}

function passedResultsTable(str) {
  $('#tableResults tbody tr:first').append(`<td>${str}</td>`);
}

function failedResultsTable(str) {
  $('#tableResults tbody tr:nth-child(2)').append(`<td>${str}</td>`);
}

function preChecker(strings){
  let alphaRegex = new RegExp(`[^${subesh.alphabet.join("")}]+`);
  console.log(alphaRegex);
  for(let i = 0; i < strings.length; i++){
    if(alphaRegex.test(strings[i])){
      return strings[i];
    }
  }
  return true;
}