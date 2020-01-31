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

  for (let index = 0; index < solutionArray.length; index++) 
  {
    if (solutionArray[index] == guessArray[index])
    {
      correctLetterLocations += 1;
      solutionArray[index] = null;
    }
  }  
  
  console.log(solutionArray + " " + guessArray + " Correct Pos & Letters " + correctLetterLocations)

  for (let index in solutionArray) 
  {
    for (let test of guessArray)
    {
      if (solutionArray[index] == test)
      {
        targetIndex = index;
        correctLetters += 1;
        solutionArray[index] = null;
      } 
    } 
  }
  
  console.log(solutionArray + " " + guessArray + " Correct Leters " + correctLetters)
  // console.log(correctLetters + " " + solutionArray)
}
  // let i = 0;
  // solutionArray.forEach(s => 
  // {
  //   if (guessArray.indexOf(s) != -1)
  //   {
  //     correctLetters += 1;
  //     targetIndex = i;
  //     solutionArray[s] = null;
  //     i ++;
  //   }
  // });



function mastermind(guess) {
  solution = 'abcd'; // Comment this out to generate a random solution
  // your code here
  if (guess == solution){
    return console.log('You guessed it!');
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
