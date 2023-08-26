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

// Images
let images = [
  'images/book.svg',
  'images/chess-board.svg',
  'images/chess-queen.svg',
  'images/chess.svg',
  'images/diamond.svg',
  'images/dice-d20.svg',
  'images/dice-three.svg',
  'images/dice.svg',
  'images/dragon.svg',
  'images/dungeon.svg',
  'images/fist.svg',
  'images/gamepad.svg',
  'images/heart.svg',
  'images/puzzle.svg',
  'images/ring.svg',
  'images/scroll.svg',
  'images/shield.svg',
  'images/vr.svg'
]