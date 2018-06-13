/*
 * Create a list that holds all of your cards
 */
deckCards = document.querySelectorAll(".deck li");
cardTitles = [];
for (let i = 0; i < deckCards.length; i++) {
		cardTitles.push(deckCards[i].firstElementChild.className);
}
openCards = [];
let time = null;
let moves = parseInt(document.querySelector(".moves").textContent);

function leadZero(num) {
		return ( num < 10 ? '0' : '') + num;
}

let secs = 00;
let mins = 00;
let timer = document.createDocumentFragment();
let body = document.querySelector('body');
		let counter = document.createElement('h1');
		counter.textContent = `${ leadZero(mins) }:${ leadZero(secs) }`;
		counter.setAttribute("class", "counter");
		timer.appendChild(counter);
		body.appendChild(timer);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;

}
	function shuffleNames(array) {
			for (let i = 0; i < deckCards.length; i++) {
		deckCards[i].firstElementChild.setAttribute("class", array[i]);
}
}
window.onload = shuffle(cardTitles);
window.onload = shuffleNames(cardTitles);


function flipCard(event) {
		moves++;
		document.querySelector(".moves").textContent = moves;	
		event.stopImmediatePropagation();
		event.target.style.pointerEvents = "none";
		openCards.push(event.target);
		if ( secs === 0 ) { time = setInterval(setTimer, 1000); }
		console.log('open cards =' + openCards.length);
		event.target.style.animation = 'rotate 3s';
        event.target.setAttribute("class","card open show");
        if (openCards.length === 2) { setTimeout(checkMatch,500); }   
		if (moves === 30) { document.querySelector("ul .starOne").style.color = "black"; }
		if (moves === 45) { document.querySelector("ul .starTwo").style.color = "black"; }
		if (moves === 60) { document.querySelector("ul .starThree").style.color = "black"; }

}
function checkMatch() {
		if (openCards[0].firstElementChild.className === openCards[1].firstElementChild.className){
                        openCards[0].setAttribute("class","card show open match");
						openCards[1].setAttribute("class", "card show open match");
						openCards = [];
                }
                        else {
                        openCards[0].setAttribute("class","card");
						openCards[1].setAttribute("class", "card");
						openCards[0].style.pointerEvents = "";
						openCards[1].style.pointerEvents = "";
                        openCards = []; 
                        }
}


function setTimer() {
		secs++;
		min = secs/60;
		if (Number.isInteger(min))  { 
				mins = min; 
				secs = 0;
		counter.textContent = `${ leadZero(mins) }:${ leadZero(secs) }`;
		}
		else {
		counter.textContent = `${ leadZero(mins) }:${ leadZero(secs) }`;
		}


}

let reset = document.querySelector(".fa-repeat");
	reset.addEventListener("click", function reset() {
		clearInterval(time);	
		counter.textContent = "00:00"; 	
		shuffle(cardTitles);
		shuffleNames(cardTitles);
		moves = 0;	
		document.querySelector(".moves").textContent = moves;	
	    document.querySelector(".starOne").style.color = "gold";
		document.querySelector(".starTwo").style.color = "gold";
		document.querySelector(".starThree").style.color = "gold";
		for (let i = 0; i < deckCards.length; i++) {
		deckCards[i].setAttribute("class", "card");
		deckCards[i].style.pointerEvents = "";		
		}
			secs = 0;
			mins = 0;
			
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
for( let i = 0; i < deckCards.length; i++ ) {
		deckCards[i].addEventListener('click',flipCard);
}
