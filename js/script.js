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
    $('#mode-display').html('EASY');
    $('#timer').html('01:00');
  } else if (mode === 'Normal') {
    $('#mode-display').html('NORMAL');
    $('#timer').html('00:30');
  } else if (mode === 'Hard') {
    $('#mode-display').html('HARD');
    $('#timer').html('00:15');
  }

}

$('.mode-item').click(function() {
  let modeSelection = $(this).data('value');
  modeDisplay(modeSelection);
});