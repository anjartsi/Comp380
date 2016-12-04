/* Problem 1: unit conversion*/
var prob1 = document.getElementById("prob1");
var output1 = document.getElementById("output1");
prob1.innerHTML = problem1();
var answer1;
var hint1 = "1 kilometer is equal to 1000 meters, and 1 meter is equal to 100 centimeters. Use these as your conversion factors.";

function problem1(){
	var x = randomNum(100, 250);
	var question1 = "How many centimeters is equal to <span class='probNum'>" + x + "</span> kilometers?";
	answer1 = x * 1000 * 100;
	return question1;
}

/* Problem 2: significant figures */
var prob2 = document.getElementById("prob2");
var output2 = document.getElementById("output2");
prob2.innerHTML = problem2();
var answer2;
var hint2 = "For a positive integer, the number of significant figure is usually the number of digits. Zeroes that only serve as placeholders do not count. However, zeroes that are in-between other non-zero numbers do count.";

function problem2(){
	var x = randomNum(1, 25000);
	var question2 = "How many significant figures does the number <span class='probNum'>" + x + "</span> have?";
	while (x % 10 == 0){
		x = x / 10;
	}
	answer2 = x.toString().length;
	return question2;
}