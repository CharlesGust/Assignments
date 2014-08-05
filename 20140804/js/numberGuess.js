/*
* This code is a human vs. computer numerical guessing game.
*
* The human may choose the range of numbers and their role. They may either:
* (1) Think of a number, and tell the computer whether the number is too high or too low
*		(a) The computer will ask the human whether they want to place a bet the computer
*       will be able to guess the number in log2(Max-min)+1 guesses
* (2) Try to guess the number the computer is thinking, and the computer will tell them
*       whether the number is too high or low
*		(a) The computer will ask the human whether they want to place a bet that they will
*       guess the number in log2(Max-min) guesses?
* 
*/

	// alert("First Code");
  var minRange = 0;
  var maxRange = 0;
  var guesser = "Human";

	function yes(theString) {
		return theString[0].toLowerCase() == "y";
	}

	function getNumber(promptPhrase) {
		var isNumber = false;
		var userInput;

		while(! isNumber) {
			userInput = toNumber(prompt(promptPhrase));
			isNumber = ! isNaN(userInput);
			// document.write(isNumber);
		}

		return userInput;
	}

  function approxLog2(n) {
    var iCount = 0;

    while(n>0) {
      n = Math.floor(n/2);
      iCount++;
    }
    return iCount;
  }

	function lineout(phrase) {
		document.write("<p>" + phrase + "</p>");
	}

	function toNumber(sbNumber) {
		return parseInt(sbNumber,10);
	}

	function captureAndLog(phrase) {
		var result = prompt(phrase);
		lineout(phrase + " " + result);
		return result;
	}

	function getGameParameters() {
		var guesserAnswer;

		minRange = 0;
		maxRange = 0;

		while(maxRange <= minRange) {
			minRange = getNumber("What is the smallest number you'd like in the game?");
			maxRange = getNumber("What is the largest number you'd like in the game?");
		}

		guesserAnswer = prompt("Would you like to do the guessing of a number between " + minRange + " and " + maxRange + "?");

		if(yes(guesserAnswer)) {
			guesser = "Human";
		}
		else {
			guesser = "Computer";
		}

		lineout(guesser + " will guess a number between " + minRange + " and " + maxRange);
	}

function humanGuess () {
	var answer = 0;
  var correct = false;
  var guess = 0;
  var numGuesses = 0;

		answer = Math.floor(Math.random() * ((maxRange - minRange) + 1)) + toNumber(minRange);

		while( ! correct ) {
			guess = getNumber("What is your guess?");
      numGuesses++;

			correct = (guess == answer);
			if ( ! correct ) {
				if( guess > answer) {
					lineout("Your guess " + guess + " is too big");
					if( guess > maxRange) {
						lineout("It's larger than the largest number");
					}
				}
				else {
					lineout("Your guess " + guess + " is too small");
					if( guess < minRange) {
						lineout("It's smaller than the smallest number");
					}
				}
			}
		}
	lineout("You are correct! The number is: " + guess);
	return numGuesses;
}
function computerGuess () {
	var answer = 0;
  var correct = false;
  var guess = 0;
  var numGuesses = 0;

  var	curMax = toNumber(maxRange);
  var curMin = toNumber(minRange);

  	alert("Think of a number between " + minRange + " and " + maxRange + " and press Enter");

  	while(!correct) {
  		var humanResponse;

  		guess = curMin + Math.floor((curMax - curMin + 1) / 2);

  		humanResponse = captureAndLog("Is the number you are thinking of: " + guess + "?");
      numGuesses++;

  		correct = yes(humanResponse);

  		if(! correct) {
  			if(curMin >= curMax) {
          numGuesses = 0;
  				correct = true;
  			}
  			else {
  				humanResponse = captureAndLog("Is your number larger than my guess of " + guess + "?");

  				if(yes(humanResponse)) {
  					curMin = guess + 1;
  				} else {
  					curMax = guess - 1;
  				}
  			}
  		}
  	}
  	return numGuesses;
}

function gameProcess() {
  var numGuesses = 0;
  var maxGuesses = 0;
  var wager = false;

  maxGuesses = approxLog2(maxRange-minRange+1);

  if(guesser == "Human") {
  	wager = yes(prompt("Do you think you can guess the number in " + maxGuesses + " guesses?"));
  	numGuesses = humanGuess();
  }
  else {
  	wager = !yes(prompt("Do you think I can guess the number in " + maxGuesses + " guesses?"));
  	numGuesses = computerGuess();
  }

  if( numGuesses > 0 ) {
    lineout("Only took " + numGuesses + " guesses");
    if(wager) {
      if(numGuesses <= maxGuesses) {
        lineout(guesser + " wins!!!");
      } else {
        lineout(guesser + " lost");
      }
    }
  } else {
  	// If human cheats, computerGuess() returns 0
  	lineout("Human reneged, Computer wins!");
  }

	lineout("Thank you for the game!");
}

getGameParameters();

gameProcess();
