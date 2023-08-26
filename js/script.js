// Side-bar info toggle divs
$('#about-btn').click(function() {
  $('#about-text').slideToggle('slow');
});

$('#instructions-btn').click(function () {
  $('#instructions-text').slideToggle('slow');
});

// Mode-selection
function modeDisplay(mode) {

  if (mode === 'Easy') {
    $('#mode-display').html('EASY').css('color', 'green');
    $('#timer').html('01:00');
  } else if (mode === 'Normal') {
    $('#mode-display').html('NORMAL').css('color', 'black');
    $('#timer').html('00:30');
  } else if (mode === 'Hard') {
    $('#mode-display').html('HARD').css('color', 'red');
    $('#timer').html('00:15');
  }

}

$('.mode-item').click(function() {
  let modeSelection = $(this).data('value');
  modeDisplay(modeSelection);
});