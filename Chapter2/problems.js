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
var hint3 = "Average acceleration is found by dividing the change in velocity (change in position/change in time) by the change in time. At rest, the car's velocity is 0 km/h."
			+ "\n\nRemember that the kilometers must be changed to meters, and the hours must be changed to seconds.";

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

/* Problem 4: deceleration and displacement */
var prob4 = document.getElementById("prob4");
var output4 = document.getElementById("output4");
prob4.innerHTML = problem4();
var answer4;
var hint4 = "Since the motorcycle is starting at position 0, you can just solve for x and find the motorcycle's displacement. To get this, the square of the final velocity must be subtracted by the square of the initial velocity. \
			This must then be divided by 2 times the deceleration of the vehicle.";

function problem4(){
	var decelerate = -7;//randomNum(-8, -5);
	var initVel = 30;//randomNum(27, 35);
	var question4 = "A motorcycle can decelerate at a rate of <span class='probNum'>" + Math.abs(decelerate) + "</span> m/s<sup>2</sup> on a certain concrete road. Imagine this vehicle is moving \
					at an initial velocity of <span class='probNum'>" + initVel + "</span> m/s.<br> Find how much distance it takes for the car to slow down until its velocity is zero, to the nearest tenth of a meter.";
	answer4 = -Math.pow(initVel, 2) / (2 * decelerate);
	answer4 = Math.round(answer4 * 10) / 10;
	return question4;
}

/* Problem 5: falling objects */
var prob5 = document.getElementById("prob5");
var output5 = document.getElementById("output5");
prob5.innerHTML = problem5();
var answer5;
var hint5 = "Finding the position of a falling object at time t can be done by using a formula. You must add the initial postion plus the initial velocity times time t plus one-half of g times t squared.";

function problem5(){
	var initVel = 13;
	var time = 2;
	var question5 = "A pebble is thrown straight up into the air on the edge of a cliff, with a starting velocity of <span class='probNum'>" + initVel + "</span> m/s. \
					As the rock falls, it misses the cliff edge and continues falling. What is the position (to the nearest tenth of a meter) of the pebble at <span class='probNum'>" + time + "</span> seconds after it is thrown? \
					<br>Assume it starts at vertical position zero, there is no wind resistance nor object mass, and a = g = -9.8 m/s<sup>2</sup>.";
	answer5 = initVel * time + -9.8 * Math.pow(time, 2) / 2;
	answer5 = Math.round(answer5 * 10) / 10;
	return question5;
}