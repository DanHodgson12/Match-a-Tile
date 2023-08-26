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
  } else if (mode === 'Normal') {
    $('#mode-display').html('NORMAL');
  } else if (mode === 'Hard') {
    $('#mode-display').html('HARD');
  }

}

$('.mode-item').click(function() {
  let modeSelection = $(this).data('value');
  modeDisplay(modeSelection);
});