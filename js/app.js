/**
* Author: Aron Roberts
* Last Updated: 05/30/2018
* Descirption: Matching Game
*
*/

/*
 * Create a list that holds all of your cards
 */
let starterDeck = ["fa fa-diamond",
	"fa fa-paper-plane-o",
	"fa fa-anchor",
	"fa fa-bolt",
	"fa fa-cube",
	"fa fa-leaf",
	"fa fa-bicycle",
	"fa fa-bomb"];

starterDeck = [...starterDeck, ...starterDeck];

// DOM Variables
const stars = $(".stars"),
	moves = $(".moves"),
	deck = $(".deck"),
	timer = $(".timer"),
	gameOverModal = $("#gameOverModal"),
	starsModal = $(".starsModal"),

	// buttons
	restart = $(".restart"),

	// star conditions
	threeStar = 20,
	twoStar =25;

// variables
let open = [],
	turns = 0,
	score = 0,
	seconds = 0,
	starCount = 3,
	timerId=0,
	gameFlag=0;

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

	// update stars inside modal
	starList = starsModal.children("li");
	i = 0;

	starList.each(function() {
		if (i < starCount){
			 $(this).find('i').removeClass('fa fa-star-o');
			 $(this).find('i').addClass('fa fa-star');
		} else {
			$(this).find('i').addClass('fa fa-star-o');
		}
		i++;
	});
};

/**
* @description updates the timer
*/
function updateTimer(){
	timer.html(++seconds);
};

/**
* @description stops the timer
*/
function stopTimer(){
	clearInterval(timerId);
};

/**
* @description resets the move counter to 0
*/
function resetTurns(){
	turns=0;
};

/**
* @description resets the star count to 3
*/
function resetStars(){
	starCount = 3;
};

/**
* @description resets the timer to 0 and updates html
*/
function resetTimer(){
	stopTimer();
	seconds = 0;
	timer.html(seconds);
};

/**
* @description resets the score to 0
*/
function resetScore(){
	score = 0;
};

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
	//let scoreList=[starterDeck.length/2, score, turns, starCount, seconds,(score == (starterDeck.length/2))];
	//console.log(scoreList);

	// update HTML
	updateScore();

	// check win condition
	if (score == (starterDeck.length/2)){
		stopTimer(timerId);
		gameOverModal.modal("show")
	}
};

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
* @description compares open cards.
*/
function compareCards(){
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
* @description adds card to open list. compares to other cards
* @param card - the card to compare
*/
function openCard(card){
	open.push(card);
};

/**
* @description listener for a card.
*/
deck.on("click", ".card", function(event) {

	/* if a game is not started start the timer*/
	if (gameFlag===0){
		timerId = setInterval(updateTimer, 3000);
		gameFlag = 1;
	}

	/* if 2 cards are already open do nothing */
	if (open.length <2){

		let selectedCard =($(this));

		/* If card is not already open or matched open card */
		if (!selectedCard.hasClass("open") && !selectedCard.hasClass("match")){
			showCard(selectedCard);
			openCard(selectedCard);
			setTimeout(function(){
      			compareCards();
      		},1000);
		} // else {
		/* else adds functionality to deselct a card (counts as a move)*/
		// 		hideCard(open.pop());
		// 		endTurn();
		// }
	}
});