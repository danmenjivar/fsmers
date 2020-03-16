checker = new DFAChecker(drawer);
let accepted = [];
let rejected = [];
let TestTimeStamp;
$(document).ready(function () {
  $('#batchCheck').on('click', function () {
    $('.alert').hide();
    checker.resetColor(); // removes left over color
    checker.time = $('#travspeedBatch').val();
    let strings = $('#dfabatchInput').val().split(",");
    var delay = $("#delayRange").val(); //added a delay so you can see it
    let i = 0;
    let strprn = document.getElementById("curStr");
    let precheck = preChecker(strings);
    if(precheck != true){
      alert(`The following string(s) contain characters not in the alphabet: \n${precheck}\nPlease either expand the language or remove these strings to begin testing.`)
      return;
    }
    clearResultsTable();

    function delayLoop() {
      setTimeout(function () {
        strprn.innerHTML = `<h2>${strings[i]}<\h2>`;
        checker.check(strings[i]);
        i++;
        if (i < strings.length) {
          delayLoop();
        } else {
          evenOutResults();
          updateTimeStamp(Date.now());
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
  let badStrings = [];
  let alphaRegex = new RegExp(`[^${subesh.alphabet.join("")}]+`);

  for(let i = 0; i < strings.length; i++){
    if(alphaRegex.test(strings[i])){
      badStrings.push(strings[i]);
    }
  }

  if (badStrings.length === 0){
    return true;
  } else {
    return badStrings.join(',');
  }
}

function updateTimeStamp(timestmp){
  let dateStamp = new Date();
  dateStamp.setTime(timestmp);
  $('#tstTime').text(`Results generated on: ${dateStamp.toLocaleString()}`)
}

function evenOutResults(){
  //It looks funny when there are more results on the left side than right, or vice versa, so adjusting for that
}

function stringRunner(index, checker, strings) {
  strprn.innerHTML = `<h2>${strings[i]}<\h2>`;
    if (checker.check(strings[i]) === "Accepted") {
      passedResultsTable(strings[i]);
    } else {
      failedResultsTable(strings[i]);
    }
    // i++;
    // if (i < strings.length) {
    //   clearInterval(interval);
    // } else {
    //   evenOutResults();
    // }
  }
