checker = new DFAChecker(drawer);
$(document).ready(function () {
  $('#batchCheck').on('click', function () {
    $('.alert').hide();
    checker.finalCheck = false;
    checker.time = $('#travspeedBatch').val();
    let strings = $('#dfabatchInput').val().split(",");
    var delay = $("#delayRange").val();
    let strprn = document.getElementById("curStr");
    let precheck = preChecker(strings);
    if (precheck != true) {
      alert(`The following string(s) contain characters not in the alphabet: \n${precheck}\nPlease either expand the language or remove these strings to begin testing.`)
      return;
    }
    clearResultsTable();
    $('#inputModal').modal('hide');
    $('#navCollapseBut').trigger('click');

    let runLoop = async () => {
      for(var i = 0; i < strings.length; i++){
        strprn.innerHTML = `<h2>${strings[i]}<\h2>`;
        console.log("about to await");
        if (i + 1 == strings.length){
          checker.finalCheck = true;
        }
        await new Promise(resolve => checker.check(resolve, strings[i]));
        console.log("await done");
      }
    }

    runLoop();

    // (async function loop(){
    //   for (let i = 0; i < strings.length; i++) {
    //     strprn.innerHTML = `<h2>${strings[i]}<\h2>`;
    //     if (i + 1 == strings.length){
    //       checker.finalCheck = true;
    //     }
    //     await new Promise(resolve => checker.check(strings[i]));
    //   }
    // })();

    // let testingInterval = setInterval(function () {
    //   strprn.innerHTML = `<h2>${strings[i]}<\h2>`;
    //   if (i + 1 == strings.length) {
    //     checker.finalCheck = true;
    //   }
    //   checker.check(strings[i]);
    //   i++;
    //   if (i >= strings.length) {
    //     clearInterval(testingInterval);
    //     evenOutResults();
    //     updateTimeStamp(Date.now());
    //   }
    // }, delay);






    // function delayLoop(i) {
    //   setTimeout(function () {
    //     strprn.innerHTML = `<h2>${strings[i]}<\h2>`;
    //     if (i + 1 == strings.length){
    //       checker.finalCheck = true;
    //     }
    //     checker.check(strings[i]);
    //     i++;
    //     if (i < strings.length) {
    //       delayLoop();
    //     } else {
    //       evenOutResults();
    //       updateTimeStamp(Date.now());
    //     }
    //   }, delay);
    // }

    // delayLoop();
    
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

function evenOutResults() {
  //It looks funny when there are more results on the left side than right, or vice versa, so adjusting for that
}