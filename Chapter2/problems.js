/* Problem 1: displacement */
var prob1 = document.getElementById("prob1");
var output1 = document.getElementById("output1");
prob1.innerHTML = problem1();
var x1;
var y1;
var answer1;
var hint1 = "The starting position is 0 meters in this case. Add the amount of movement east, and subtract the amount of movement west.";

function problem1(){
	var question1 = "";
	x1 = randomNum(1000, 4000);
	y1 = randomNum(-4000, -1000);
	answer1 = x1 + y1;
	question1 = "A jogger runs <span class='probNum'>" + x1 + "</span> meters east, stops for a bit, then runs <span class='probNum'>" + Math.abs(y1) + "</span> meters west. \
	 			What is the jogger's displacement in meters? Assume east is positive.";
	return question1;
}

/* Problem 2: speed */
var prob2 = document.getElementById("prob2");
var output2 = document.getElementById("output2");
prob2.innerHTML = problem2();
var t2;
var x2;
var answer2;
var hint2 = "The average speed is calculated by dividing the distance traveled by the change in time.\n\nRemember, 1 mile is 5280 feet, and 1 meter is about 3.28 feet.";

function problem2(){
	var question2 = "";
	t2 = randomNum(40, 70); // time in minutes
	x2 = randomNum(20, 80);	// distance in miles
	answer2 = x2 / t2 * 5280 / 3.28 / 60; // answer in meters per second, with 1 meter = 3.28 feet
	answer2 = Math.round(answer2);
	question2 = "A train travels between 2 different cities in a time of <span class='probNum'>" + t2 + "</span> minutes. \
				The distance between these two cities is  <span class='probNum'>" + x2 + "</span> miles. What is the average speed of the train, to the nearest meters per second?";
	return question2;
}

/* Problem 3: average acceleration*/
var prob3 = document.getElementById("prob3");
var output3 = document.getElementById("output3");
prob3.innerHTML = problem3();
var t3;
var x3;
var answer3;
var hint3 = "Average acceleration is found by dividing the change in velocity (change in position/change in time) by the change in time. At rest, the car's velocity is 0 km/h.\n\nRemember that the kilometers must be changed to meters, and the hours must be changed to seconds.";

function problem3(){
	var question3 = "";
	x3 = randomNum(25, 35); // average velocity, in kilometers per hour
	t3 = randomNum(15, 25); // time in seconds
	answer3 = x3 / t3 * 1000 / 3600; // answer in meters per second squared
	answer3 = Math.round(answer3 * 100) / 100; // round to 2 dec. places
	question3 = "A car accelerates from rest to <span class='probNum'>" + x3 + "</span> km/h in the first <span class='probNum'>" + t3 + "</span> s of it moving. \
				What is the average acceleration during this time interval, in m/s<sup>2</sup>? (Round to 2 decimal places.)";
	return question3;
}