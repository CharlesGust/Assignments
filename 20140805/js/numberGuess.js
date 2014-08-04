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
* TODO: add betting feature once log2() function can be found or written
*/

	// alert("First Code");
	var answer = 0;
	var minRange = 0;
	var maxRange = 0;
	var guesser = "Human";
	var correct = false;
	var guess = 0;

	function yes(theString) {
		return theString[0].toLowerCase() == "y";
	}

	function getNumber(promptPhrase) {
		var isNumber = false;
		var userInput;

		while(! isNumber) {
			userInput = toNumber(prompt(promptPhrase));
			isNumber = true; //! userInput.isNaN();
			// document.write(isNumber);
		}

		return userInput;
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

getGameParameters();

correct = false;
if(guesser == "Human") {
		// lineout("Human guessing");

		answer = Math.floor(Math.random() * ((maxRange - minRange) + 1)) + toNumber(minRange);

		// lineout("Answer is: " + answer);

		while( ! correct ) {
			guess = getNumber("What is your guess?");

			correct = (guess == answer);
			if( correct ) {
					lineout("You are correct! The number is: " + guess);
			}
			else {
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
}
else {
	var	curMax = toNumber(maxRange);
	var curMin = toNumber(minRange);

	answer = prompt("Don't tell me, but think of a number between " + minRange + " and " + maxRange + " and press Enter");

	while(!correct) {
		var humanResponse;

		guess = curMin + Math.floor((curMax - curMin) / 2);

		humanResponse = captureAndLog("Is the number you are thinking of: " + guess + "?");

		correct = yes(humanResponse);

		if(! correct) {
			if(curMin >= curMax) {
				lineout("I think we should stop playing now");
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

	lineout("Thank you for playing with me!");
}


