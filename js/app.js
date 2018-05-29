
/* TODO:
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

/*
 * Create a list that holds all of your cards
 */
const starterDeck = ["fa fa-diamond",
	"fa fa-diamond",
	"fa fa-paper-plane-o",
	"fa fa-paper-plane-o",
	"fa fa-anchor",
	"fa fa-anchor",
	"fa fa-bolt",
	"fa fa-bolt",
	"fa fa-cube",
	"fa fa-cube",
	"fa fa-leaf",
	"fa fa-leaf",
	"fa fa-bicycle",
	"fa fa-bicycle",
	"fa fa-bomb",
	"fa fa-bomb"];

// DOM Variables
const stars = $(".stars");
const moves = $(".moves");
const deck = $(".deck");
const restart = $(".restart");
const timer = $(".timer");

// variables
let open = [];
let turns = 0;
let score = 0;
let seconds = 0;
let starCount = 3;
let timerId=0;
let gameFlag=0;

// star conditions
const threeStar = 20;
const twoStar =25;

/**
* @description Shuffle function from http://stackoverflow.com/a/2450976
* @param array - an array that should be shuffled
* @return array - a new array with randomized index
*/
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

/**
* @description updates turns and stars on the html
*/
function updateScore(){

	// update turn count
	moves.html(turns);

	// update stars
	let starList = stars.children("li");
	let i = 0;
	starList.each(function() {
		if (i < starCount){
			 $(this).find('i').removeClass('fa fa-star-o');
			 $(this).find('i').addClass('fa fa-star');
		} else {
			$(this).find('i').addClass('fa fa-star-o');
		}
		i++;
	});
}

/**
* @description updates the timer
*/
function updateTimer(){
	timer.html(++seconds);
}

/**
* @description stops the timer
*/
function stopTimer(){
	clearInterval(timerId);
}

/**
* @description resets the move counter to 0
*/
function resetTurns(){
	turns=0;
}

/**
* @description resets the star count to 3
*/
function resetStars(){
	starCount = 3;
}

/**
* @description resets the timer to 0 and updates html
*/
function resetTimer(){
	stopTimer();
	seconds = 0;
	timer.html(seconds);
}

/**
* @description resets the score to 0
*/
function resetScore(){
	score = 0;
}

/**
* @description Starts new game
*/
function startGame() {
	// reset game parameters.
	resetScore();
	resetTurns();
	resetStars();
	resetTimer();


	// shuffle the list of cards using the "shuffle" method
	let newDeck = shuffle(starterDeck);
	let frag = document.createDocumentFragment();

	// loop through each card and create its HTML
	newDeck.forEach(function(cards) {

		// create li element
    	const card = document.createElement("li");
    	card.className = "card";

    	// create i element
    	const symbol = document.createElement("i");
    	symbol.className = cards;

    	// append to fragments
    	card.appendChild(symbol);
   	 	frag.appendChild(card);
	});

	//add each card's HTML to the page
	deck.children().remove();
	deck.append(frag);

	// update score box and start timer
	updateScore();
	timerId = setInterval(updateTimer, 3000);
	gameFlag = 1;
};

/**
* @description listener for restart button
*/
restart.click(function(event) {
	startGame();
});

/**
* @description incriments move counter, updates score, checks win conditions
*/
function endTurn(){
	//incriment turns
	turns++;

	// check condition for star rating
	turns < threeStar ? starCount = 3 :
		turns < twoStar ? starCount = 2 : starCount = 1;

	// testing purposes only
	let scoreList=[starterDeck.length/2, score, turns, starCount, seconds,(score == (starterDeck.length/2))];
	console.log(scoreList);
	// update HTML
	updateScore();

	// check win condition
	if (score == (starterDeck.length/2)){
		stopTimer(timerId);
		//startGame();
	}
}

/**
* @description shows a cards symbol
* @param card - the card to show
*/
function showCard(card){
	card.addClass("open show");
};

/**
* @description hides a cards symbol
* @param card - the card to hide
*/
function hideCard(card){
	card.removeClass("open show");
};

/**
* @description locks in a matched pair
* @param pair - the matched pair
*/
function matchCard(pair){
	// add match class
	pair[0].addClass("match");
	pair[1].addClass("match");
	score++;
};


/**
* @description adds card to open list. compares to other cards
* @param card - the card to compare
*/
function openCard(card){
	open.push(card);

	if (open.length > 1){

			if (open[0].find("i").attr("class") === open[1].find("i").attr("class")) {
				matchCard(open);
			}

			hideCard(open.pop());
			hideCard(open.pop());
			endTurn();
	}
}

/**
* @description listener for a card.
*/
deck.on("click", ".card", function(event) {

	if (gameFlag===0){
		timerId = setInterval(updateTimer, 3000);
		gameFlag = 1;
	}

	let selectedCard =($(this));

	if (!selectedCard.hasClass("open") && !selectedCard.hasClass("match")){
			showCard(selectedCard);
			setTimeout(function(){
      			openCard(selectedCard);
      		},1000)
	} else {
		setTimeout(function(){
			hideCard(open.pop());
			endTurn();
		},1000)
	}
  });


