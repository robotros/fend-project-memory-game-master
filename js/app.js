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


// Shuffle function from http://stackoverflow.com/a/2450976
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


function startGame() {
	// shuffle the list of cards using the "shuffle" method
	let newDeck = shuffle(starterDeck);
	let c = document.createDocumentFragment();
	//loop through each card and create its HTML
	newDeck.forEach(function(cards) {
    	const card = document.createElement("li");
    	card.className = "card";

    	const symbol = document.createElement("i");
    	symbol.className = cards;

    	card.appendChild(symbol);
   	 	c.appendChild(card);
	});

	//add each card's HTML to the page
	deck.children().remove();
	deck.append(c);
};

/**
* @description sets selected color
*/
restart.click(function(event) {
	startGame();
});


deck.on("click", ".card", function(event) {
      $(this).addClass("open");
  });
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
