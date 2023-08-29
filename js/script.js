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
  { src: 'images/book.svg', alt: 'An icon of a book with a skull and crossbones.', description: ''},
  { src: 'images/chess-board.svg', alt: 'An icon of a chessboard.', description: '' },
  { src: 'images/chess-queen.svg', alt: 'An icon of the Queen piece from a chess-set.', description: '' },
  { src: 'images/chess-king-rook.svg', alt: 'An icon of the King and Rook pieces from a chess set.', description: '' },
  { src: 'images/diamond.svg', alt: 'An icon of a diamond.', description: '' },
  { src: 'images/dice-d20.svg', alt: 'An icon of a D-20 die/dice.', description: '' },
  { src: 'images/dice-three.svg', alt: 'An icon of the "three" side of a die/dice.', description: '' },
  { src: 'images/dice.svg', alt: 'An icon of two dice.', description: '' },
  { src: 'images/dragon.svg', alt: 'An icon of a dragon.', description: '' },
  { src: 'images/dungeon.svg', alt: 'An icon of a dungeon door.', description: '' },
  { src: 'images/fist.svg', alt: 'An icon of a fist.', description: '' },
  { src: 'images/gamepad.svg', alt: 'An icon of a video-game controller.', description: '' },
  { src: 'images/heart.svg', alt: 'An icon of a heart.', description: '' },
  { src: 'images/puzzle.svg', alt: 'An icon of a puzzle piece.', description: '' },
  { src: 'images/ring.svg', alt: 'An icon of a ring.', description: '' },
  { src: 'images/scroll.svg', alt: 'An icon of a scroll.', description: '' },
  { src: 'images/shield.svg', alt: 'An icon of a shield.', description: '' },
  { src: 'images/vr.svg', alt: 'An icon of a virtual-reality headset.', description: '' }
]