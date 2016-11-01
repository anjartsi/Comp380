/* Problem 1: displacement */
var prob1 = document.getElementById("prob1");
var output1 = document.getElementById("output1");
prob1.innerHTML = problem1();
var x1;
var y1;
var answer1;

function problem1(){
	var question1 = "";
	x1 = randomNum(1000, 4000);
	y1 = randomNum(-4000, -1000);
	answer1 = x1 + y1;
	question1 = "A jogger runs " + x1 + " meters east, stops for a bit, then runs " + Math.abs(y1) + " meters west. \
	 			What is the jogger's displacement in meters? Assume east is positive.";
	return question1;
}

/* Problem 2: _________ */
var prob2 = document.getElementById("prob2");
var output2 = document.getElementById("output2");
prob2.innerHTML = problem2();
var answer2;
/*
function problem2(){
	var question2 = "";
	question2 = "";
	return question2;
}
*/