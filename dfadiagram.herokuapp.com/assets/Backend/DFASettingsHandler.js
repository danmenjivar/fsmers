$(document).ready(function () {

  $('#modalBut').on('click', function () {
    makeModal();
  });

  function makeModal() {
    console.log(sysDFA);
    drawer.updateSysDFA();
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
    $('#settingsButtonModal').modal('hide');
    DFATuples.state = $('#state').val().split(',');
    DFATuples.initial = $('#initial').val().split(',', 1);
    DFATuples.alphabet = $('#alphabet').val().split(',');

    let start = DFATuples.state.find(item => item == DFATuples.initial);

    DFATuples.transition = {};
    let transition = DFATuples.transition;
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
    // sysDFA.map(DFATuples);
    // drawer.createDiagram();
    redraw();
  });


  //touch action // this code shouldn't work anymore since you can only add states outside, this is just to edit transitions
  $('#state,#alphabet').focusout(function () {
    let key = $(this).data('name');
    if (DFATuples[key].join(",") !== $(this).val()) {
      changeTable();
    }
  });

  function changeTable() {
    let state = $('#state').val().split(',');
    let alphabet = $('#alphabet').val().split(',');
    $('#transitionsTable tbody').html("");
    $('#transitionsTable thead').html(`
        <tr>
          <th>Q\&Sigma;</th>
        </tr>
        `);
    let inputCheck = 1;
    for (let i = 0; i < state.length; i++) {
      $('#transitionsTable tbody ').append(`<tr><th>${state[i]}</th></tr>`)
      for (let j = 0; j < alphabet.length; j++) {
        if (inputCheck)
          $('#transitionsTable thead tr').append(`<th>${alphabet[j]}</th>`);
        $('#transitionsTable tbody tr').last().append(`<td><input type="text" class="form-control col-10"></td>`);

      }
      inputCheck = 0;
    }
  }

});
// based on the number of state circles, draw the transition table
// extract the state circles into DFATuples
// make a function that selects a state to be initial,tests to see if that state is valid