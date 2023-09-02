// Side-bar info toggle divs
$('#about-btn').click(function() {
  $('#about-text').slideToggle('slow');
});

$('#instructions-btn').click(function () {
  $('#instructions-text').slideToggle('slow');
});

// Start Game
$('#start button').click(function () {
  const cTiles = $('#c-tiles .tile'); // Targets the computer tiles
  const pTiles = $('#p-tiles .tile'); // Targets the computer tiles

  shuffle(images); // Shuffle a first time 
  assignImagesToTiles(images, cTiles); // Assign images to computer tiles
  shuffle(images); // Shuffle a second time
  assignImagesToTiles(images, pTiles); // Assign images to player tiles
  flipTiles(cTiles); // Shows computer tiles

  setTimeout(function() {
    flipTiles(cTiles); // Hides computer tiles
    flipTiles(pTiles); // Shows player tiles
  }, 5000); // Delay of 5 seconds
});

// Flip test button
$('#flip-button').click(function () {
  $('.t-inner').toggleClass('flipped');
});

// Mode-selection
$('.mode-item').click(function () {
  let modeSelection = $(this).data('value');
  modeDisplay(modeSelection);
});

/** 
 * Displays the mode selected from the 'Mode' dropdown menu.
 */
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

/** 
 * Flips the tiles 180 degrees on the Y axis.
 */
function flipTiles(tiles) {
  tiles.find('.t-inner').toggleClass('flipped');
}

/** 
 * Shuffles/reorganises the passed array - in this case: 'images'. Idea taken from The Fisher-Yates (Knuth) Shuffle Algorithm.
 */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/** 
 * Assigns images from the images array to either the computer or player tiles, depending on the argument passed in.
 */
function assignImagesToTiles(images, tiles) {
  tiles.each(function (index) { // Itterates over the computer tiles and does the following...
    const frontTile = $(this).find('.t-front'); // Targets the 't-front' div, i.e. the front of the tile
    const image = document.createElement('img'); // Creates a new <img> element and assigns it to the 'image' variable

    image.src = images[index].src; // Sets the src of the image to that of the src of the current image in the shuffled array
    image.alt = images[index].alt; // Sets the alt of the image to that of the alt of the current image in the shuffled array

    frontTile.empty().append(image); // Appends the randomly selected image with the assigned src and alt to one of the tiles
    // Function repeats until all images have been assigned to the available tiles
  });
}

// Images
const images = [
  { src: 'images/book.svg', alt: 'An icon of a book with a skull and crossbones.' },
  { src: 'images/chess-board.svg', alt: 'An icon of a chessboard.' },
  { src: 'images/chess-queen.svg', alt: 'An icon of the Queen piece from a chess-set.' },
  { src: 'images/chess-king-rook.svg', alt: 'An icon of the King and Rook pieces from a chess set.' },
  { src: 'images/diamond.svg', alt: 'An icon of a diamond.' },
  { src: 'images/dice-d20.svg', alt: 'An icon of a D-20 die/dice.' },
  { src: 'images/dice-three.svg', alt: 'An icon of the "three" side of a die/dice.' },
  { src: 'images/dragon.svg', alt: 'An icon of a dragon.' },
  { src: 'images/dungeon.svg', alt: 'An icon of a dungeon door.' },
  { src: 'images/fist.svg', alt: 'An icon of a fist.' },
  { src: 'images/gamepad.svg', alt: 'An icon of a video-game controller.' },
  { src: 'images/heart.svg', alt: 'An icon of a heart.' },
  { src: 'images/puzzle.svg', alt: 'An icon of a puzzle piece.' },
  { src: 'images/ring.svg', alt: 'An icon of a ring.' },
  { src: 'images/scroll.svg', alt: 'An icon of a scroll.' },
  { src: 'images/shield.svg', alt: 'An icon of a shield.' }
  // { src: 'images/vr.svg', alt: 'An icon of a virtual-reality headset.' },
  // { src: 'images/dice.svg', alt: 'An icon of two dice.' }
];