/*
 * Create a list that holds all of your cards
 */
deckCards = document.querySelectorAll(".deck li"); // Grabs every Li element, which is the card, not the image
cardTitles = [];
for (let i = 0; i < deckCards.length; i++) { //The first child element of the li is the image and its class name is what is used to check whether or not its a match
  cardTitles.push(deckCards[i].firstElementChild.className);
}
openCards = []; // empty openCards array created for the checkMatch and flipCards functions

let time = null; // time variable in order to use clearInterval
let timerCheck = 1;
let moves = parseInt(document.querySelector(".moves").textContent); // grabs the current number of moves (which is crrently 0), needed for augment and reset

function leadZero(num) { //Simple function to add leading zero to timer, ex. 0:3 becomes 00:03
  return (num < 10 ? '0' : '') + num;
}

let matchCount = 0;
let starCount = 3;
let secs = 0;
let mins = 0;
/*
 * Create document fragment which contains timer
 * append to page and append secs and mins as text content
 */
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
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;

}
/*
 * shuffle the positions of the i tags associated
 * with the li parent element, thus shuffling the board
 */
function shuffleNames(array) {
  for (let i = 0; i < deckCards.length; i++) {
    deckCards[i].firstElementChild.setAttribute("class", array[i]);
  }
}
window.onload = shuffle(cardTitles);
window.onload = shuffleNames(cardTitles);

/*
 * flipCard function tied to click event listener
 * takes card clicked, pushes to openCards array
 * does if check for if the openCards array has two cards
 * if so, runs checkMatch function. also augments moves 
 * and starts counter on first click. also decreases starcount
 * according to number of moves played
 */

function flipCard(event) {
  moves++;
  if (matchCount === 16) {
    clearInterval(time);
    congratulations();
  }
  document.querySelector(".moves").textContent = moves;
  event.stopImmediatePropagation(); // captures event click in capture stage (stops it from going to image tag)
  event.target.style.pointerEvents = "none"; // makes card unclickable after first click
  openCards.push(event.target);
  if (timerCheck === 1) {
    time = setInterval(setTimer, 1000);
    timerCheck++;
  }
  console.log('open cards =' + openCards.length);
  event.target.setAttribute("class", "card open show");
  if (openCards.length === 2) {
    setTimeout(checkMatch, 500);
  }
  if (moves === 28) {
    starCount -= 1;
    document.querySelector("ul .starOne").style.color = "black";
  }
  if (moves === 38) {
    starCount -= 1;
    document.querySelector("ul .starTwo").style.color = "black";
  }
  if (moves === 50) {
    starCount -= 1;
    document.querySelector("ul .starThree").style.color = "black";
  }
}
/*
 * checkMatch function checks if the two image 
 * class names are the same, if so places the match 
 * class on both cards, turning them green, if not
 * closes both cards (flips them over)
 */
function checkMatch() {
  if (openCards[0].firstElementChild.className === openCards[1].firstElementChild.className) {
    openCards[0].setAttribute("class", "card show open match");
    openCards[1].setAttribute("class", "card show open match");
    openCards = [];
    matchCount += 2;
    if (matchCount === 16) {
      clearInterval(time);
      congratulations();
    }
  } else {
    openCards[0].setAttribute("class", "card");
    openCards[1].setAttribute("class", "card");
    openCards[0].style.pointerEvents = "";
    openCards[1].style.pointerEvents = "";
    openCards = [];
  }
}

/* 
 * setTimer function augments secs and mins
 * and sets it as text content for the timer
 */

function setTimer() {
  secs++;
  min = secs / 60;
  if (Number.isInteger(min)) {
    mins = min;
    secs = 0;
    counter.textContent = `${ leadZero(mins) }:${ leadZero(secs) }`;
  } else {
    counter.textContent = `${ leadZero(mins) }:${ leadZero(secs) }`;
  }


}
/*
 * reset function tied to click event listener
 * on reset icon. resets timer text content
 * shuffles the board and flips over cards
 * as well as resetting star count and moves
 */
let resetGame = document.querySelector(".fa-repeat");
resetGame.addEventListener("click", reset);

function reset() {
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
  matchCount = 0;
  congrats.setAttribute("class", "none");
}

/*
 * Congratulations functions
 * creates popup modal that tells
 * time it took to finish, star count
 * as well as move count. It also
 * asks the user if they would
 * like to play again. Yes - resets board
 * No - shows finished game;
 */

function congratulations() {
  docu = document.createDocumentFragment(); //Creates document fragment and appends h1 with the move, stars and time as the text 
  congrats = document.createElement("div");
  playAgain = document.createElement("h1");
  btn = document.createElement("BUTTON"); // Yes and No buttons created
  text = document.createTextNode("Yes");
  btn2 = document.createElement("BUTTON");
  text2 = document.createTextNode("No");
  btn.appendChild(text);
  btn2.appendChild(text2);
  playAgain.innerHTML = `Congratulations! <br /> You won in  ${moves} moves and  ${counter.textContent} <br /> With ${starCount} stars <br /> Would you like to play again??`;
  congrats.appendChild(playAgain);
  docu.appendChild(congrats);
  congrats.appendChild(btn);
  congrats.appendChild(btn2);
  body.appendChild(docu);
  btn.addEventListener("click", reset);
  btn2.addEventListener("click", function showGame() {
    congrats.setAttribute("class", "none");
  });
  congrats.setAttribute("class", "congratulations");
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 *	  for loop below adds click event listener to every card element
 */

for (let i = 0; i < deckCards.length; i++) {
  deckCards[i].addEventListener('click', flipCard);
}
