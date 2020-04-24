$(document).ready(function () {

  $('#modalBut').on('click', function () {
    makeModal();
  });

  function makeModal() {
    drawer.updateSysDFA(); // fetch latest edits made to canvas
    $('#alphabet').val(sysDFA.alphabet.join(','));
    $('#initial').val(sysDFA.initial.join(','));

    // build the transitions table for easy editing
    $('#transitionsTable thead').html(`
    <tr>
      <th>Q\&Sigma;</th>
    </tr>
    `); // this builds the row headers
    $('#transitionsTable tbody').html(""); // without this, we get doubles
    //table
    let inputCheck = true;
    let transitions = sysDFA.transition;
    for (let state in transitions) {
      $('#transitionsTable tbody ').append(`<tr><th>${state}</th></tr>`);
      for (let transition in transitions[state]) {
        if (inputCheck) // this adds the column headers
          $('#transitionsTable thead tr').append(`<th>${transition}</th>`);
        $('#transitionsTable tbody tr').last().append(`<td><input type="text" value = "${transitions[state][transition]}" class="form-control col-10"></td>`);
      }
      inputCheck = false;
    }
  }

  $('#save').on('click', function () {
    let alphaBackup = sysDFA.alphabet.map((x) => x);
    sysDFA.alphabet = removeDuplicates($('#alphabet').val().split(',')); // ensure no duplicates
    sysDFA.transition = {};
    let transition = sysDFA.transition;
    //transition
    $('#transitionsTable tbody').find('tr').each(function () {
      let state = $(this).children().eq(0).text();
      transition[state] = {};
      $(this).children().each(function (i) {
        if (i != 0) {
          
          let state2 = $(this).children().val();
          let input = $('#transitionsTable thead tr').children().eq(i).text();
          
          transition[state][input] = state2;
        }
      });
      $('#navCollapseBut').trigger('click');
    });
    let crash = drawer.updateDrawing();
    if (crash){
      sysDFA.alphabet = alphaBackup;
    } else {
      $('#settingsButtonModal').modal('hide');
    }
  });


  //touch action
  $('#alphabet').focusout(function () {
    changeTable();
  });

  function removeDuplicates(array) {
    return array.filter((a, b) => array.indexOf(a) === b)
  };

  function changeTable() {
    let transitions = sysDFA.transition;
    let state = sysDFA.state;
    let alphabet = $('#alphabet').val().split(',');
    $('#transitionsTable tbody').html("");
    $('#transitionsTable thead').html(`
        <tr>
          <th>Q\&Sigma;</th>
        </tr>
        `);
    let inputCheck = 1;
    let oldTransition;
    for (let i = 0; i < state.length; i++) {
      $('#transitionsTable tbody ').append(`<tr><th>${state[i]}</th></tr>`)
      for (let j = 0; j < alphabet.length; j++) {
        if (inputCheck)
          $('#transitionsTable thead tr').append(`<th>${alphabet[j]}</th>`);
        oldTransition = transitions[state[i]][alphabet[j]]; //look up old value
        if(oldTransition){// if there is then keep it
          $('#transitionsTable tbody tr').last().append(`<td><input type="text" value = "${oldTransition}" class="form-control col-10"></td>`);
        } else { // remove it
          $('#transitionsTable tbody tr').last().append(`<td><input type="text" class="form-control col-10"></td>`);
        }
      }
      inputCheck = 0;
    }
  }

});