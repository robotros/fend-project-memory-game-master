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


//variables
let open = [];
let turns = 0;
let score =0;
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
* @description resets the move counter to 0
*/
function resetTurns(){
	turns=0;
	moves.html(turns);
}

/**
* @description resets the star count to 3
*/
function resetStars(){

}

/**
* @description resets the timer to 0
*/
function resetTimer(){

}

/**
* @description Starts new game
*/
function startGame() {
	// shuffle the list of cards using the "shuffle" method
	resetTurns();
	resetStars();
	resetTimer();
	score = 0;

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
};

/**
* @description listener for restart button
*/
restart.click(function(event) {
	startGame();
});

/**
* @description incriments move counter, updates score
*/
function endTurn(){
	turns++;
	moves.html(turns);
	if (score > 7){
		startGame();
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
	if (!$(this).hasClass("open") && !$(this).hasClass("match")){
			showCard($(this));
			let test=($(this));
			setTimeout(function(){
      			openCard(test);
      		},1000)
	} else {
		hideCard(open.pop());
		endTurn();
	}
  });

/* TODO:
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
