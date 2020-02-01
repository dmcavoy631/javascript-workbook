'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
var x = 0;
var result;

function printBoard() {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

function generateSolution() {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateHint(guess) {
  var guessArray = guess.split("");
  var solutionArray = solution.split("");
  let correctLetterLocations = 0;
  let correctLetters = 0;
  let targetIndex = 0;
  var x = 0;

  // Loop the INDEX's of the solution and IF conditional to count == values in both arrays to determine correct value and correct posistion.
  for (let index in solutionArray) 
  {
    if (solutionArray[index] == guessArray[index])
    {
      correctLetterLocations += 1;
      solutionArray[index] = null;
    }
  }  

  // Loop values of Guess and IF conditional indexOf solution to count correct letter in any posistion.
  for (let test of guessArray)
  {
    if (solutionArray.indexOf(test) > -1)
    {
      targetIndex = solutionArray.indexOf(test);
      correctLetters += 1;
      solutionArray[targetIndex] = null;
    } 
  } 
  // Set counts to string and return
  result = correctLetterLocations + "-" + correctLetters;
  board.push(guess + " " + result)
  return console.log(result)
}


function mastermind(guess) {
  solution = 'abcd'; // Comment this out to generate a random solution
  // your code here
  if (guess == solution){
    return console.log('You guessed it!');
  } else if (board.length == 10) {
    return console.log('You ran out of turns! The solution was ' + solution);
  } else {
    generateHint(guess);
  }
}


function getPrompt() {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}
