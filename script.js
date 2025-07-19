// const { createElement } = require("react");

let randomNumber = parseInt(Math.random() * 10 + 1);
const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const loworhi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');

const p = document.createElement('p');
let prevguess = [];
let numguess = 1;
let playgame = true;

if (playgame) {
    submit.addEventListener('click', function (e) {
        e.preventDefault();
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    });
}

function validateGuess(guess) {
    if (isNaN(guess)) {
        alert('Please enter a valid Number');
    } else if (guess < 1) {
        alert('Please enter a number greater than 1');
    } else if (guess > 100) {
        alert('Please enter a number less than 100');
    } else {
        prevguess.push(guess);
        displayGuess(guess);
        if (numguess === 11 || guess === randomNumber) {
            displayMessage(`Game Over. Random Number was ${randomNumber}`);
            endGame();
        } else {
            checkGuess(guess);
        }
    }
}

function checkGuess(check) {
    if (check === randomNumber) {
        displayMessage(`You guessed it right!`);
        endGame();
    } else if (check < randomNumber) {
        displayMessage(`Number is too low`);
    } else {
        displayMessage(`Number is too high`);
    }
}

function displayGuess(guess) {
    userInput.value = '';
    guessSlot.innerHTML += `${guess} `;
    numguess++;
    remaining.innerHTML = `${11 - numguess}`;
}

function displayMessage(message) {
    loworhi.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    p.classList.add('button');
    p.innerHTML = `<h2 id="newGame">Start New Game</h2>`;
    startOver.appendChild(p);
    playgame = false;
    newGame();
}

function newGame() {
    const newgame = document.querySelector('#newGame');
    newgame.addEventListener('click', function () {
        randomNumber = parseInt(Math.random() * 10 + 1);
        prevguess = [];
        numguess = 1;
        guessSlot.innerHTML = '';
        remaining.innerHTML = `${11 - numguess}`;
        userInput.removeAttribute('disabled');
        loworhi.innerHTML = '';
        startOver.removeChild(p);
        playgame = true;
    });
}
