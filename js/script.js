// Images
let images = [
  { alt: 'An icon of a book with a skull and crossbones.', src: 'images/book.svg' },
  { alt: 'An icon of a chessboard.', src: 'images/chess-board.svg' },
  { alt: 'An icon of the Queen piece from a chess-set.', src: 'images/chess-queen.svg' },
  { alt: 'An icon of the King and Rook pieces from a chess set.', src: 'images/chess-king-rook.svg' },
  { alt: 'An icon of a diamond.', src: 'images/diamond.svg' },
  { alt: 'An icon of a D-20 die/dice.', src: 'images/dice-d20.svg' },
  { alt: 'An icon of the "three" side of a die/dice.', src: 'images/dice-three.svg' },
  { alt: 'An icon of a dragon.', src: 'images/dragon.svg' },
  { alt: 'An icon of a dungeon door.', src: 'images/dungeon.svg' },
  { alt: 'An icon of a fist.', src: 'images/fist.svg' },
  { alt: 'An icon of a video-game controller.', src: 'images/gamepad.svg' },
  { alt: 'An icon of a heart.', src: 'images/heart.svg' },
  { alt: 'An icon of a puzzle piece.', src: 'images/puzzle.svg' },
  { alt: 'An icon of a ring.', src: 'images/ring.svg' },
  { alt: 'An icon of a scroll.', src: 'images/scroll.svg' },
  { alt: 'An icon of a shield.', src: 'images/shield.svg' },
  { alt: 'An icon of a virtual-reality headset.', src: 'images/vr.svg' },
  { alt: 'An icon of two dice.', src: 'images/dice.svg' }
];

const cTiles = $('#c-tiles .tile'); // Targets the computer tiles
const pTiles = $('#p-tiles .tile'); // Targets the player tiles
let currentMode = 'Easy';
let currentTurns = 18;
let currentScore = 0;
let countdownGame;
let countdownTimer;
let countdownDisplay = $('#countdown');;
const countdownStart = 5;
let countdown = countdownStart;
let pTilesSelection;
let cTilesSelection;
let loadListeners = true;

$(document).ready(function () {
	// Side-bar info toggle divs
	$('#about-btn').click(function () {
		$('#about-text').slideToggle('slow');
	});

	$('#instructions-btn').click(function () {
		$('#instructions-text').slideToggle('slow');
	});

  // Stops modal background showing when adjusting screen width
  $(window).on('resize', function() {
    if ($(window).width() > 991) {
      $('#aboutModal').modal('hide');
      $('#instructionsModal').modal('hide');
    }
  });

	// Mode-selection
	$('.mode-item').click(function () {
		let modeSelection = $(this).data('value');
		modeDisplay(modeSelection);
	});

	resetGame();

	// Start Game
	$('#start button').click(function () {
		$('#game-view').get(0).scrollIntoView({ behavior: 'smooth' });

		$('#score').text('0');
		$('#start button').prop('disabled', true);
		$('#mode button').prop('disabled', true);
		disableTiles(cTiles);
		disableTiles(pTiles);

		resetCountdown();
		shuffle(images);
		let copiedImages = [...images];
		copiedImages.splice(0, 9);
		assignImagesToTiles(copiedImages, cTiles);
		shuffle(copiedImages);
		assignImagesToTiles(copiedImages, pTiles);
		flipTiles(cTiles);
		setCountdown();

		if (loadListeners) {
			pTiles.click(function () {
				pTilesSelection = $(this);
				let pTilesOther = $(this).siblings();
				disableTiles(pTilesOther);
				pTilesSelection.removeClass('t-active');
				pTilesSelection.find('.t-front').addClass('t-clicked');
				disableTiles(pTilesSelection);
				activateTiles(cTiles);
			});
			cTiles.click(function () {
				cTilesSelection = $(this);
				let cTilesOther = $(this).siblings();
				disableTiles(cTilesOther);
				disableTiles(cTilesSelection);
				checkTileMatch();
				activateTiles(pTiles);
				checkGameOver();
			});
			loadListeners = false;
		}
	});

	// Reset Game
	$('#reset button').click(resetGame);
});

/** 
 * Checks if the player has run out of turns or scored 9/9.
 */
function checkGameOver() {
  if (currentTurns === 0 || currentScore === 9) {
		endGame();
	}
}

/** 
 * Disables and unflips all tiles, then displays an end-game message (defined externally).
 */
function endGame() {
	disableTiles(cTiles);
	disableTiles(pTiles);
	cTiles.removeClass('t-active t-clicked');
	pTiles.removeClass('t-active t-clicked');
	setTimeout(function() {
		cTiles.find('.t-inner').removeClass('flipped');
		endGameDisplayMsg();
	}, 100);
}

/** 
 * Displays GAME OVER and an alert to let the player know their score.
 */
function endGameDisplayMsg() {
	$('#end-game-msg').show().text('GAME OVER');
	setTimeout(function() {
		alert('Well done! You scored ' + currentScore + ' out of 9!');
	}, 500);
}

/** 
 * Checks if the player tile matches the computer tile clicked on.
 */
function checkTileMatch() {
	let pContent = pTilesSelection.find('.t-front').html();
	let cContent = cTilesSelection.find('.t-front').html();
	if (pContent === cContent) {
		pTilesSelection.removeClass('t-active');
		pTilesSelection.find('.t-front').removeClass('t-clicked').addClass('t-correct');
		cTilesSelection.removeClass('t-active');
		cTilesSelection.find('.t-front').removeClass('t-clicked').addClass('t-correct');
		cTilesSelection.find('.t-inner').removeClass('flipped');
		incrementScore();
	} else if (pContent !== cContent) {
		pTilesSelection.removeClass('t-active');
		pTilesSelection.find('.t-front').removeClass('t-clicked').addClass('t-incorrect')
		cTilesSelection.removeClass('t-active');
		cTilesSelection.find('.t-front').removeClass('t-clicked');
		cTilesSelection.find('.t-back').addClass('t-incorrect');
		setTimeout(function () {
			pTilesSelection.find('.t-front').removeClass('t-incorrect');
			cTilesSelection.find('.t-back').removeClass('t-incorrect');
		}, 500);
	}
	reduceTurns();
}

/** 
 * Removes one turn if an attempt is made to match tiles.
 */
function reduceTurns() {
	let turns = parseInt($('#turns').text());
	let newTurns = turns - 1;
	$('#turns').text(newTurns);
	currentTurns = newTurns;
}

/** 
 * Adds one to the current score if tiles are matched.
 */
function incrementScore() {
	let score = parseInt($('#score').text());
	let newScore = score + 1;
	$('#score').text(newScore);
	currentScore = newScore;
}

/** 
 * Flips the tiles 180 degrees on the Y axis.
 */
function flipTiles(tiles) {
	tiles.find('.t-inner').toggleClass('flipped');
}

/** 
 * Sets the countdown timer and the timer to flip the cTiles and pTiles to the relevant starting positions.
 */
function setCountdown() {
	countdownDisplay.text(countdownStart);

	countdownGame = setTimeout(function () {
		flipTiles(cTiles);
		flipTiles(pTiles);
		activateTiles(pTiles);
	}, 5000);

	countdownTimer = setInterval(function () {
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
	clearTimeout(countdownGame);
	clearInterval(countdownTimer);
	countdown = countdownStart;
	countdownDisplay.empty();
	countdownDisplay.css('color', 'red');
	countdownDisplay.show();
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
        if (tile.find('.t-front').hasClass('t-correct')) {
			tile.prop('disabled', true);
			tile.removeClass('t-active');
		} else {
			tile.prop('disabled', false);
			tile.addClass('t-active');
		}
	});
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
	tiles.each(function (index) {
		const frontTile = $(this).find('.t-front');
		const image = document.createElement('img');
		image.src = images[index].src;
		image.alt = images[index].alt;
		frontTile.empty().append(image);
	});
}

/** 
 * Displays the mode selected from the 'Mode' dropdown menu.
 */
function modeDisplay(mode) {
	if (mode === 'Easy') {
		currentMode = 'Easy';
		currentTurns = 18;
		$('#mode-display').html('EASY').css('color', 'green');
		$('#turns').html('18');
	} else if (mode === 'Normal') {
		currentMode = 'Normal';
		currentTurns = 14;
		$('#mode-display').html('NORMAL').css('color', 'black');
		$('#turns').html('14');
	} else if (mode === 'Hard') {
		currentMode = 'Hard';
		currentTurns = 9;
		$('#mode-display').html('HARD').css('color', 'red');
		$('#turns').html('9');
	}
}

/** 
 * Resets the game.
 */
function resetGame() {
	resetCountdown();
	disableTiles(cTiles);
	disableTiles(pTiles);
	cTiles.removeClass('t-active');
	cTiles.find('.t-front').removeClass('t-correct t-clicked');
	pTiles.removeClass('t-active');
	pTiles.find('.t-front').removeClass('t-correct t-clicked');
	$('.t-inner').removeClass('flipped').addClass('flipped');
	$('.t-front').empty();
	$('#start button').prop('disabled', false);
	$('#mode button').prop('disabled', false);
	$('#score').text('0');
	modeDisplay(currentMode);
	$('#end-game-msg').hide();
  currentScore = 0;
}