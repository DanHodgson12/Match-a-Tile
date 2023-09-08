// Side-bar info toggle divs
$('#about-btn').click(function() {
  $('#about-text').slideToggle('slow');
});

$('#instructions-btn').click(function () {
  $('#instructions-text').slideToggle('slow');
});

// Images
let images = [
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
  { src: 'images/shield.svg', alt: 'An icon of a shield.' },
  { src: 'images/vr.svg', alt: 'An icon of a virtual-reality headset.' },
  { src: 'images/dice.svg', alt: 'An icon of two dice.' }
];

const cTiles = $('#c-tiles .tile'); // Targets the computer tiles
const pTiles = $('#p-tiles .tile'); // Targets the player tiles
let countdownGame;
let countdownTimer;
let countdownDisplay = $('#countdown');;
const countdownStart = 5;
let countdown = countdownStart;
let pTilesSelection;
let cTilesSelection;

// Start Game
$('#start button').click(function () {
  $('#start button').prop('disabled', true); // Disables Start button
  disableTiles(cTiles);
  disableTiles(pTiles);

  resetCountdown(); // Resets countdown
  shuffle(images); // Shuffle all images
  let copiedImages = [...images]; // Copy of images array
  copiedImages.splice(0, 9); // Take first 9 images from array

  assignImagesToTiles(copiedImages, cTiles); // Assign images to computer tiles
  shuffle(copiedImages); // Shuffle a second time
  assignImagesToTiles(copiedImages, pTiles); // Assign images to player tiles
  flipTiles(cTiles); // Shows computer tiles
  
  setCountdown();

  pTiles.click(function() {
    pTilesSelection = $(this);
    let pTilesOther = $(this).siblings();
    disableTiles(pTilesOther);
    pTilesSelection.removeClass('t-active').addClass('t-clicked');
    disableTiles(pTilesSelection);

    activateTiles(cTiles);
  });

  cTiles.click(function() {
    cTilesSelection = $(this);
    let cTilesOther = $(this).siblings();
    disableTiles(cTilesOther);
    disableTiles(cTilesSelection);

    checkTileMatch();
    activateTiles(pTiles);

  });

});

/** 
 * Checks if the player tiles matches the computer tile clicked on.
 */
function checkTileMatch() {
  let pContent = pTilesSelection.find('.t-front').html();
  let cContent = cTilesSelection.find('.t-front').html();
  if (pContent === cContent) {
    pTilesSelection.removeClass('t-clicked t-active t-incorrect').addClass('t-correct');
    cTilesSelection.removeClass('t-clicked t-active t-incorrect').addClass('t-correct');
    cTilesSelection.find('.t-inner').removeClass('flipped');
  } else if (pContent !== cContent) {
    pTilesSelection.removeClass('t-clicked t-active t-correct');
    cTilesSelection.removeClass('t-clicked t-active t-correct').addClass('t-incorrect');
    cTilesSelection.find('.t-inner').removeClass('flipped');
  }
  
}

// Reset Game
$('#reset button').click(function() {
  resetCountdown();
  disableTiles(cTiles);
  disableTiles(pTiles);

  cTiles.removeClass('t-active t-correct t-incorrect t-clicked');
  pTiles.removeClass('t-active t-correct t-incorrect t-clicked');
  $('.t-inner').removeClass('flipped').addClass('flipped'); // All tiles flipped over to the back
  $('.t-front').empty(); // Remove all images from tiles
  $('#start button').prop('disabled', false);
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

/** 
 * Disables all tiles (buttons) so they cannot be clicked.
 */
function disableTiles(tiles) {
  tiles.prop('disabled', true);
  tiles.removeClass('t-active');
}

/** 
 * Activates all tiles (buttons) so they can be clicked.
 */
function activateTiles(tiles) {
  tiles.each(function () {
    const tile = $(this);
    if (tile.hasClass('t-correct')) {
      tile.prop('disabled', true);
      tile.removeClass('t-active');
    } else if (tile.hasClass('t-incorrect')) {
      tile.prop('disabled', true);
      tile.removeClass('t-active');
    } else {
      tile.prop('disabled', false);
      tile.addClass('t-active');
    }
  });
  
}

/** 
 * Sets the countdown timer and the timer to flip the cTiles and pTiles to the relevant starting positions.
 */
function setCountdown() {
  countdownDisplay.text(countdownStart);

  countdownGame = setTimeout(function () {
    flipTiles(cTiles); // Hides computer tiles
    flipTiles(pTiles); // Shows player tiles
    activateTiles(pTiles); // Activate player tiles
  }, 5000); // Delay of 5 seconds

  countdownTimer = setInterval(function () { // Sets countdown timer for 5 seconds
    countdown--;
    if (countdown >= 1) {
      countdownDisplay.text(countdown);
      countdownDisplay.css('color', 'red');
    } else {
      clearInterval(countdownTimer);
      countdownDisplay.text('GO');
      countdownDisplay.css('color', 'green');
      setTimeout(function () {
        countdownDisplay.fadeOut('slow', function () {
          countdownDisplay.text(countdownStart);
        });
      }, 1500);
    }
  }, 1000);
}

/** 
 * Clears the countdownGame timeout and countdownTimer intervals, and sets the countdown value to 5.
 */
function resetCountdown() {
  clearTimeout(countdownGame); // Clears countdownGame
  clearInterval(countdownTimer); // Stops countdownTimer
  countdown = countdownStart; // Resets countdownTimer
  countdownDisplay.empty(); // Sets value to 5
  countdownDisplay.css('color', 'red'); // Sets color to Red
  countdownDisplay.show();
}