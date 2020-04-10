checker = new DFAChecker(drawer);
$(document).ready(function () {

  $('#inputButtonModal').on('click', function(){ // refresh the alphabet when the user clicks to open the dialog box
    let alphaprnt = document.getElementById("alphabet-remind"); // this is used in the test
    alphaprnt.innerHTML = `${subesh.alphabet.join(',')}`; //builder to remind the user of valid input
  });

  $('#batchCheck').on('click', function () {
    $('.alert').hide();
    checker.finalCheck = false;
    checker.time = $('#travspeedBatch').val();
    let strings = $('#dfabatchInput').val().split(",");
    let strprn = document.getElementById("curStr");
    let precheck = preChecker(strings);
    if (precheck != true) {
      alert(`The following string(s) contain characters not in the alphabet: \n${precheck}\nPlease either expand the language or remove these strings to begin testing.`)
      return;
    } else {
      let count = {"pass" : 0, "fail": 0};
      clearResultsTable();
      $('#inputModal').modal('hide');
      $('#navCollapseBut').trigger('click');
      let runLoop = async () => {
        for(var i = 0; i < strings.length; i++){
          strprn.innerHTML = `<h2>${strings[i]}<\h2>`;
          if (i + 1 == strings.length){
            checker.finalCheck = true;
          }
          await new Promise(resolve => passOrFail = checker.check(resolve, strings[i]));
          // console.log(passOrFail);
          (passOrFail == "Accepted") ? count["pass"]++ : count["fail"]++;
          if (checker.finalCheck){
            updateTimeStamp(Date.now());
            evenOutResults(count["pass"], count["fail"]);
          }
        }
      }
      runLoop();
    }
  });

  $(document).on('click', '.close', function () {
    checker.resetColor();
    redraw();
    $('.alert').hide();
  });
});

$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

//Slider Handlers
let sliderTrvSpd = document.getElementById("travspeedBatch");
sliderTrvSpd.oninput = function () {
  outputTrvSpd.innerHTML = this.value;
}

function clearResultsTable() {
  $('#tableResults tbody').html("<tr></tr><tr></tr>");
}

function preChecker(strings) {
  let badStrings = [];
  let alphaRegex = new RegExp(`[^${subesh.alphabet.join("")}]+`);

  for (let i = 0; i < strings.length; i++) {
    if (alphaRegex.test(strings[i])) {
      badStrings.push(strings[i]);
    }
  }

  if (badStrings.length === 0) {
    return true;
  } else {
    return badStrings.join(',');
  }
}

function updateTimeStamp(timestmp) {
  let dateStamp = new Date();
  dateStamp.setTime(timestmp);
  $('#tstTime').text(`Results generated on: ${dateStamp.toLocaleString()}`)
}

function evenOutResults(passCount, failCount) {
  //It looks funny when there are more results on the left side than right, or vice versa, so adjusting for that
  // console.log(`Passed ${passCount}, failed ${failCount}`);
  while (passCount != failCount){
    if (passCount < failCount){
      //add a bunch of empties to pass
      $('#tableResults tbody tr:first').append(`<td></td>`);
      passCount++;
    } else {
      //add a bunch of empties to fail
      $('#tableResults tbody tr:nth-child(2)').append(`<td></td>`);
      failCount++;
    }
  }

}