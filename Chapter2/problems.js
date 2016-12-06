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
	x1 = randomNum(1000, 3000);
	y1 = randomNum(-4000, -1000);
	answer1 = x1 + y1;
	question1 = "A jogger, starting at position A, runs <span class='probNum'>" + x1 + "</span> meters east to point B, stops for a bit, then runs <span class='probNum'>" + Math.abs(y1) + "</span> meters west to point C."
				+" What is the jogger's displacement in meters?" 
				+" <br>Assume east is positive.";
	return question1;
}
var p1Canvas = new Engine(document.getElementById("p1Canvas"), document.getElementById("p1CanvasBtn"));
var p1Controls = document.getElementById("p1Controls");
p1Canvas.create(700, 50);
p1Canvas.drawGridLines = true;
var p1black = new Mobile(p1Canvas.canvasWidth / 2, p1Canvas.canvasHeight / 2);
p1black.addToEngine(p1Canvas);
p1black.col = 'black';
p1black.bigness = p1black.engine.canvasHeight / 2 - 5;
var p1red = new Mobile(p1black.position[0] + x1 / 10, p1Canvas.canvasHeight / 2);
p1red.addToEngine(p1Canvas);
p1red.col = 'red';
p1red.bigness = p1red.engine.canvasHeight / 2 - 5;
var p1blue = new Mobile(p1red.position[0] + y1 / 10, p1Canvas.canvasHeight / 2);
p1blue.addToEngine(p1Canvas);
p1blue.col = 'blue';
p1blue.bigness = p1blue.engine.canvasHeight / 2 - 5;


p1Canvas.drawEverything();
p1black.addText("A", 30, 'white');
p1red.addText("B", 30, 'white');
p1blue.addText("C", 30, 'white');

/* Problem 2: speed */
var prob2 = document.getElementById("prob2");
var output2 = document.getElementById("output2");
prob2.innerHTML = problem2();
var t2;
var x2;
var answer2;
var hint2 = "The average speed is calculated by dividing the distance traveled by the change in time."
			+"<br>Remember to convert the units to meters and seconds first."
			+"<br> (1 mile is 5280 feet, and 1 meter is about 3.28 feet)"

function problem2(){
	var question2 = "";
	t2 = randomNum(40, 70); // time in minutes
	x2 = randomNum(20, 80);	// distance in miles
	answer2 = x2 / t2 * 5280 / 3.28 / 60; // answer in meters per second, with 1 meter = 3.28 feet
	answer2 = Math.round(answer2);
	question2 = "A train travels between two cities in a time of <span class='probNum'>" + t2 + "</span> minutes. \
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
var hint3 = "Average acceleration is found by dividing the change in velocity by the change in time."
			+"<br> When the car is at rest, its velocity is 0 km/h."
			+ "<br> Remember that the kilometers must be changed to meters, and the hours must be changed to seconds.";

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
var hint4 = "Since the motorcycle is starting at position 0, you can just solve for x and find the motorcycle's displacement."
			+"<br> Take the formula v<sub>f</sub><sup>2</sup> = v<sub>0</sub><sup>2</sup> + 2ax and solve it for x"
			+"<br> It becomes x = (v<sub>f</sub><sup>2</sup> - v<sub>0</sub><sup>2</sup>) / 2a";

function problem4(){
	var decelerate = randomNum(-8, -5);
	var initVel = randomNum(27, 35);
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
var hint5 = "Finding the position of a falling object at time t can be done by using the formula: "
			+ "x = x<sub>0</sub> + v<sub>0</sub>t + 1&frasl;2 a t<sup>2</sup>";

function problem5(){
	var initVel = randomNum(12, 17);
	var time = 2;
	var question5 = "A pebble is thrown straight up into the air on the edge of a cliff, with a starting velocity of <span class='probNum'>" + initVel + "</span> m/s. \
					As the rock falls, it misses the cliff edge and continues falling. What is the position (to the nearest tenth of a meter) of the pebble at <span class='probNum'>" + time + "</span> seconds after it is thrown? \
					<br>Assume it starts at vertical position zero, there is no wind resistance, and a = g = -9.8 m/s<sup>2</sup>.";
	answer5 = initVel * time + -9.8 * Math.pow(time, 2) / 2;
	answer5 = Math.round(answer5 * 10) / 10;
	return question5;
}

/********************************************* 
Game animation 
*********************************************/
var cHeight = 500;
var cWidth = 150;
var cTime = 1500;
var bBig = 25;
var bStart = 10 + bBig;
var oldPos = bStart;
var newPos = bStart;
var msgOutput = false;
var scaleDown = 9.8 / 500; 
var scaleUp = 1 / scaleDown;
var maxHeightCanvas = new StaticEngine(document.getElementById("maxHeightCanvas"), document.getElementById("maxHeightCanvasBtn"));
var maxHeightControls = document.getElementById("maxHeightControls");
var maxHeightOutput = document.getElementById("maxHeightOutput");
maxHeightCanvas.create(cWidth, cHeight);
maxHeightCanvas.setup(cTime);
maxHeightCanvas.drawGridLines = true;

var blue = new StaticMobile(cWidth / 2, bStart);
blue.bigness = bBig;
blue.mass = 1;
blue.velocity  = [0, 250];
blue.acceleration = [0, -500];
blue.col = 'blue';

var hred = randomNum(cHeight - cWidth + 1, cHeight - 3 * blue.bigness);
var hgreen = randomNum(hred - cWidth + blue.bigness, hred - 2 * blue.bigness);

var yred = hred + cWidth / 2;
var ygreen = hgreen + cWidth / 2;

var blueVel = new SliderControl("Initial Velocity", 0, 20, "m/s", blue.col);
blueVel.addToEngine(maxHeightCanvas, blue);
blueVel.print(maxHeightControls);
blueVel.sliderElem.step = 0.1;
blueVel.manipulate = function() {
	if(msgOutput == false){
		newPos = this.thing.position[1];
		heightCheck();
		oldPos = this.thing.position[1];
	}
	return this.thing.velocity[1] * scaleDown;
}

blueVel.changeProperty = function() {
	oldPos = bStart;
	newPos = bStart;
	msgOutput = false;
	this.thing.velocity[1] = this.value * scaleUp;
	this.engine.elapsedTime = 0;
	maxHeightOutput.innerHTML = "";
}

function heightCheck(){
	if (blue.position[1] + bBig >= hred){
		maxHeightOutput.setAttribute("style", "color: #ff3333");
		msgOutput = true;
		return maxHeightOutput.innerHTML = "Entered red area... choose a lower velocity and try again!";
	}
	if (newPos < oldPos && (blue.position[1] + bBig < hred) && (blue.position[1] - bBig > hgreen)){
		maxHeightOutput.setAttribute("style", "color: #1aff1a");
		msgOutput = true;
		return maxHeightOutput.innerHTML = "You did it! The max height the square reached was " + Math.round(oldPos * scaleDown * 100) / 100 + " meters.";
	}
	if (newPos < oldPos && (blue.position[1] - bBig < hgreen)){
		maxHeightOutput.setAttribute("style", "color: #ff3333");
		msgOutput = true;
		return maxHeightOutput.innerHTML = "Velocity too low... choose a higher velocity and try again!";
	}
}

var green = new StaticMobile(cWidth / 2, ygreen);
green.bigness = cWidth / 2;
green.col = 'green';

var red = new StaticMobile(cWidth / 2, yred);
red.bigness = cWidth / 2;
red.col = 'red';

var bA = new Data("Acceleration", "m/s<sup>2</sup>", blue.col);
bA.addToEngine(maxHeightCanvas, blue);
bA.print(maxHeightControls);
bA.manipulate = function() {
	return -this.thing.acceleration[1] * scaleDown;
}

var hG = new Data("Minimum height", "m", green.col);
hG.addToEngine(maxHeightCanvas, green);
hG.print(maxHeightControls);
hG.decimalPlaces = 3;
hG.manipulate = function() {
	return hgreen * scaleDown;
}

var hR = new Data("Maximum height", "m", red.col);
hR.addToEngine(maxHeightCanvas, red);
hR.print(maxHeightControls);
hR.decimalPlaces = 3;
hR.manipulate = function() {
	return hred * scaleDown;
}

green.addToEngine(maxHeightCanvas);
red.addToEngine(maxHeightCanvas);
// floor.addToEngine(maxHeightCanvas);
// ceiling.addToEngine(maxHeightCanvas);
blue.addToEngine(maxHeightCanvas);
maxHeightCanvas.drawEverything();