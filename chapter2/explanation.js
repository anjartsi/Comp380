var cHeight = 250;
var cWidth = 300;

/**********************************************
 Position Canvas
**********************************************/
var positionCanvas = new Engine(document.getElementById("positionCanvas"), document.getElementById("positionCanvasBtn"));
var positionControls = document.getElementById("positionControls");
positionCanvas.create(cWidth, cHeight);
positionCanvas.drawGridLines = true;

var shadow = new Mobile(125, 125);
shadow.bigness = 25;
shadow.col = 'black';
shadow.addToEngine(positionCanvas);
var red = new Mobile(125, 125);
red.bigness = 25;
red.mass = 1;
red.velocity  = [0, 0];
red.acceleration = [0, 0];
red.col = 'red';
red.addToEngine(positionCanvas);
var redX = new SliderControl("Position - x", 0, cWidth - 2 * red.bigness, "meters", red.col);
redX.decimalPlaces = 0;
redX.addToEngine(positionCanvas, red);
redX.print(positionControls);

var redY = new SliderControl("Position - y", 0, cHeight - 2 * red.bigness, "meters", red.col);
redY.decimalPlaces = 0;
redY.addToEngine(positionCanvas, red);
redY.print(positionControls);

redX.manipulate = function() {
	return this.thing.position[0] - 25;
}
redX.changeProperty = function() {
	var newVal = this.value + 25;
	this.thing.position[0] = newVal;
}

redY.manipulate = function() {
	return this.thing.position[1] - 25;
}
redY.changeProperty = function() {
	var newVal = this.value + 25;
	this.thing.position[1] = newVal;
}

positionCanvas.drawEverything();



/**********************************************
 Displacement vs Distance Canvas
**********************************************/
var dvdCanvas = new Engine(document.getElementById("dvdCanvas"), document.getElementById("dvdCanvasBtn"));
var dvdControls = document.getElementById("dvdControls");
dvdCanvas.create(cWidth, 50);
dvdCanvas.drawGridLines = true;
var blue = new Sphere(150, 25);
blue.bigness = 25;
blue.mass = 1;
blue.velocity = [0,0];
blue.acceleration = [0, 0];
blue.col = '#2233ff';

var shadow = new Sphere(150, 25);
shadow.bigness = 25;
shadow.mass = 1;
shadow.velocity = [0,0];
shadow.acceleration = [0, 0];
shadow.col = 'black';


var double = function(n) {
	return 2 * n;
}
shadow.addToEngine(dvdCanvas);
blue.addToEngine(dvdCanvas);
// blue.addSlider(dvdControls, "position", 0, 0, cWidth , "position", "meters");
var bluePos = new SliderControl("Position", -100, 100, "meters", blue.col);
bluePos.decimalPlaces = 0;
bluePos.addToEngine(dvdCanvas, blue);
bluePos.print(dvdControls);



var blueDisp = new SliderData("Displacement", -100, 100 ,"meters", blue.col);
blueDisp.decimalPlaces = 0;
blueDisp.addToEngine(dvdCanvas, blue);
blueDisp.print(dvdControls);

var blueDist = new SliderData("Distance", -100, 100, "meters", blue.col);
blueDist.decimalPlaces = 0;
blueDist.addToEngine(dvdCanvas, blue);
blueDist.print(dvdControls);

bluePos.manipulate = function() {
	return this.thing.position[0] - 150;
}
bluePos.changeProperty = function() {
	var newVal = this.value + 150;
	this.thing.position[0] = newVal;
}

blueDisp.manipulate = function() {
	return this.thing.position[0] - shadow.position[0];
}
blueDist.manipulate = function() {
	return Math.abs(this.thing.position[0] - shadow.position[0]);
}


dvdCanvas.drawEverything(dvdControls);



/**********************************************
Velocity Canvas
**********************************************/
var velocityCanvas = new Engine(document.getElementById("velocityCanvas"), document.getElementById("velocityCanvasBtn"));
var velocityControls = document.getElementById("velocityControls");
velocityCanvas.create(cWidth, cHeight);
velocityCanvas.drawGridLines = false;
var slow = new Sphere(27, 2 * cHeight / 3);
slow.bigness = 25;
slow.mass = 1;
slow.velocity = [150,0];
slow.acceleration = [0, 0];
slow.col = '#2233ff';

var fast = new Sphere(27, cHeight / 3);
fast.bigness = 25;
fast.mass = 1;
fast.velocity = [200,0];
fast.acceleration = [0, 0];
fast.col = 'red';

fast.addToEngine(velocityCanvas);
slow.addToEngine(velocityCanvas);

var wall1 = new Wall(0,0, cHeight);
var wall2 = new Wall(cWidth,0, cHeight);

wall1.addToEngine(velocityCanvas);
wall2.addToEngine(velocityCanvas);

var slowVel = new Data("Velocity", "m/s", slow.col);
var slowSp = new Data("Speed", "m/s", slow.col);
var fastVel = new Data("Velocity", "m/s", fast.col);
var fastSp = new Data("Speed", "m/s", fast.col);


slowVel.addToEngine(velocityCanvas, slow);
slowVel.print(velocityControls);
slowVel.manipulate = function() {
	return this.thing.velocity[0];
}
slowSp.addToEngine(velocityCanvas, slow);
slowSp.print(velocityControls);
slowSp.manipulate = function() {
	return Math.abs(this.thing.velocity[0]);
}
fastVel.addToEngine(velocityCanvas, fast);
fastVel.print(velocityControls);
fastVel.manipulate = function() {
	return this.thing.velocity[0];
}
fastSp.addToEngine(velocityCanvas, fast);
fastSp.print(velocityControls);
fastSp.manipulate = function() {
	return Math.abs(this.thing.velocity[0]);
}


velocityCanvas.drawEverything();


/**********************************************
Acceleration Canvas
**********************************************/

var accelerationCanvas = new StaticEngine(document.getElementById("accelerationCanvas"), document.getElementById("accelerationCanvasBtn"));
var accelerationControls = document.getElementById("accelerationControls");
accelerationCanvas.create(2 * cWidth - 100, cHeight);
accelerationCanvas.setup(3000);
accelerationCanvas.drawGridLines = false;

var slowAccel = new StaticMobile(12, 2 * cHeight / 3);
slowAccel.bigness = 10;
slowAccel.mass = 1;
slowAccel.velocity = [0,0];
slowAccel.acceleration = [50, 0];
slowAccel.col = '#2233ff';

var fastAccel = new StaticMobile(12, cHeight / 3);
fastAccel.bigness = 10;
fastAccel.mass = 1;
fastAccel.velocity = [0,0];
fastAccel.acceleration = [100, 0];
fastAccel.col = 'red';

fastAccel.addToEngine(accelerationCanvas);
slowAccel.addToEngine(accelerationCanvas);

var timeSlider = new SliderControl("Time", 0, 3000, "milliseconds", "white");
timeSlider.addToEngine(accelerationCanvas, accelerationCanvas);
timeSlider.print(accelerationControls);
timeSlider.sliderElem.step = 10;
timeSlider.decimalPlaces = 0;
timeSlider.manipulate = function() {
	return this.thing.elapsedTime;
}
timeSlider.changeProperty = function() {
	this.engine.elapsedTime = this.value;
	// this.engine.drawEverything();
}

var slowAccelA = new Data("Acceleration", "m/s<sup>2</sup>", slowAccel.col);
var slowAccelVel = new SliderData("Velocity", 0, 30, "m/s", slowAccel.col);
slowAccelVel.sliderElem.step = 0.1
var fastAccelA = new Data("Acceleration", "m/s<sup>2</sup>", fastAccel.col);
var fastAccelVel = new SliderData("Velocity", 0, 30, "m/s", fastAccel.col);
fastAccelVel.sliderElem.step = 0.1

slowAccelA.addToEngine(accelerationCanvas, slowAccel);
slowAccelA.print(accelerationControls);
slowAccelA.manipulate = function() {
	return this.thing.acceleration[0] / 10;
}

slowAccelVel.addToEngine(accelerationCanvas, slowAccel);
slowAccelVel.print(accelerationControls);
slowAccelVel.decimalPlaces = 2;
slowAccelVel.manipulate = function() {
	var v0 = parseInt(this.thing.velocity[0], 10);
	var a = parseInt(this.thing.acceleration[0], 10);
	var t = parseInt(this.thing.engine.elapsedTime, 10) / 1000;
	return (v0 + a * t) / 10;
}

fastAccelA.addToEngine(accelerationCanvas, fastAccel);
fastAccelA.print(accelerationControls);
fastAccelA.manipulate = function() {
	return this.thing.acceleration[0] / 10;
}

fastAccelVel.addToEngine(accelerationCanvas, fastAccel);
fastAccelVel.print(accelerationControls);
fastAccelVel.decimalPlaces = 2;
fastAccelVel.manipulate = function() {
	var v0 = parseInt(this.thing.velocity[0], 10);
	var a = parseInt(this.thing.acceleration[0], 10);
	var t = parseInt(this.thing.engine.elapsedTime, 10) / 1000;
	return (v0 + a * t) / 10;
}


accelerationCanvas.drawEverything();


/**********************************************
Acceleration2 Canvas
**********************************************/

var acceleration2Canvas = new StaticEngine(document.getElementById("acceleration2Canvas"), document.getElementById("acceleration2CanvasBtn"));
var acceleration2Controls = document.getElementById("acceleration2Controls");
acceleration2Canvas.create(2 * cWidth - 100, cHeight);
acceleration2Canvas.setup(4000);
acceleration2Canvas.drawGridLines = false;

var slowAccel2 = new StaticMobile(12, 2 * cHeight / 3);
slowAccel2.bigness = 10;
slowAccel2.mass = 1;
slowAccel2.velocity = [0,0];
slowAccel2.acceleration = [50, 0];
slowAccel2.col = '#2233ff';

var fastAccel2 = new StaticMobile(12, cHeight / 3);
fastAccel2.bigness = 10;
fastAccel2.mass = 1;
fastAccel2.velocity = [0,0];
fastAccel2.acceleration = [100, 0];
fastAccel2.col = 'red';

fastAccel2.incrementTime = function(time) {
	var newTime = time - 1000;
	if(newTime < 0) {
		newTime = 0;
	}
	for (var i = 0; i < 2; i++) {
		this.position[i] = this.initialPosition[i] + this.velocity[i] * newTime / 1000 
		this.position[i] += 0.5 * this.acceleration[i] * newTime * newTime / 1000000
	}
}


fastAccel2.addToEngine(acceleration2Canvas);
slowAccel2.addToEngine(acceleration2Canvas);

var timeSlider2 = new SliderControl("Elapsed Time", 0, 3000, "milliseconds", "white");
timeSlider2.addToEngine(acceleration2Canvas, acceleration2Canvas);
timeSlider2.print(acceleration2Controls);
timeSlider2.sliderElem.step = 10;
timeSlider2.decimalPlaces = 0;
timeSlider2.manipulate = function() {
	return this.thing.elapsedTime;
}
timeSlider2.changeProperty = function() {
	this.engine.elapsedTime = this.value;
	// this.engine.drawEverything();
}

var slowAccel2A = new Data("Acceleration", "m/s<sup>2</sup>", slowAccel2.col);
var slowAccel2Vel = new SliderData("Velocity", 0, 30, "m/s", slowAccel2.col);

var fastAccel2A = new Data("Acceleration", "m/s<sup>2</sup>", fastAccel2.col);
var fastAccel2Vel = new SliderData("Velocity", 0, 30, "m/s", fastAccel2.col);


slowAccel2A.addToEngine(acceleration2Canvas, slowAccel2);
slowAccel2A.print(acceleration2Controls);
slowAccel2A.manipulate = function() {
	return this.thing.acceleration[0] / 10;
}

slowAccel2Vel.addToEngine(acceleration2Canvas, slowAccel2);
slowAccel2Vel.print(acceleration2Controls);
slowAccel2Vel.decimalPlaces = 2;
slowAccel2Vel.manipulate = function() {
	var v0 = parseInt(this.thing.velocity[0], 10);
	var a = parseInt(this.thing.acceleration[0], 10);
	var t = parseInt(this.thing.engine.elapsedTime, 10) / 1000;
	return (v0 + a * t) / 10;
}

fastAccel2A.addToEngine(acceleration2Canvas, fastAccel2);
fastAccel2A.print(acceleration2Controls);
fastAccel2A.manipulate = function() {
	return this.thing.acceleration[0] / 10;
}

fastAccel2Vel.addToEngine(acceleration2Canvas, fastAccel2);
fastAccel2Vel.print(acceleration2Controls);
fastAccel2Vel.decimalPlaces = 2;
fastAccel2Vel.manipulate = function() {
	var v0 = parseInt(this.thing.velocity[0], 10);
	var a = parseInt(this.thing.acceleration[0], 10);
	var t = parseInt(this.thing.engine.elapsedTime, 10) / 1000;
	return (v0 + a * t) / 10;
}


acceleration2Canvas.drawEverything();

/**********************************************
Deceleration Canvas
**********************************************/
var decelerationCanvas = new StaticEngine(document.getElementById("decelerationCanvas"), document.getElementById("decelerationCanvasBtn"));
var decelerationControls = document.getElementById("decelerationControls");
decelerationCanvas.create(cWidth, cHeight);
decelerationCanvas.setup(4000);
decelerationCanvas.drawGridLines = false;

var decelTimeSlider = new SliderControl("Elapsed Time", 0, 4000, "milliseconds", "white");
decelTimeSlider.addToEngine(decelerationCanvas, decelerationCanvas);
decelTimeSlider.print(decelerationControls);
decelTimeSlider.sliderElem.step = 10;
decelTimeSlider.decimalPlaces = 0;
decelTimeSlider.manipulate = function() {
	return this.thing.elapsedTime;
}
decelTimeSlider.changeProperty = function() {
	this.engine.elapsedTime = this.value;
}


var decelRed = new StaticMobile(27, cHeight / 2 + 50);
decelRed.velocity = [250, 0];
decelRed.acceleration = [-125, 0];
decelRed.col = 'red';
decelRed.incrementTime = function(time) {
	var timeMaxed = Math.min(time, 2000);
	for (var i = 0; i < 2; i++) {
		this.position[i] = this.initialPosition[i] + this.velocity[i] * timeMaxed / 1000;
		this.position[i] += 0.5 * this.acceleration[i] * timeMaxed * timeMaxed / 1000000;
	}
}


decelRed.addToEngine(decelerationCanvas);
var decelBlue = new StaticMobile(27, cHeight / 2 - 50);
decelBlue.velocity = [250, 0];
decelBlue.acceleration = [-125, 0];
decelBlue.col = '#2233ff';

decelBlue.addToEngine(decelerationCanvas);

decelBlueA = new Data("Acceleration", "m/s<sup>2</sup>", blue.col);
decelBlueA.addToEngine(decelerationCanvas, decelBlue);
decelBlueA.print(decelerationControls);
decelBlueA.manipulate = function() {
	return this.thing.acceleration[0];
}

decelRedA = new Data("Acceleration", "m/s<sup>2</sup>", red.col);
decelRedA.addToEngine(decelerationCanvas, decelRed);
decelRedA.print(decelerationControls);
decelRedA.manipulate = function() {
	return this.thing.acceleration[0];
}

decelBlueV = new SliderData("Velocity", -300, 300, "m/s", blue.col);
decelBlueV.addToEngine(decelerationCanvas, decelBlue);
decelBlueV.print(decelerationControls);
decelBlueV.decimalPlaces = 2;
decelBlueV.manipulate = function() {
	var timeMaxed = Math.min(this.thing.engine.elapsedTime, 2000);
	var v0 = parseInt(this.thing.velocity[0], 10);
	var a = parseInt(this.thing.acceleration[0], 10);
	var t = parseInt(timeMaxed, 10) / 1000;
	return (v0 + a * t);
}

decelRedV = new SliderData("Velocity", -300, 300, "m/s", red.col);
decelRedV.addToEngine(decelerationCanvas, decelRed);
decelRedV.print(decelerationControls);
decelRedV.decimalPlaces = 2;
decelRedV.manipulate = function() {
	var v0 = parseInt(this.thing.velocity[0], 10);
	var a = parseInt(this.thing.acceleration[0], 10);
	var t = parseInt(this.thing.engine.elapsedTime, 10) / 1000;
	return (v0 + a * t);
}




decelerationCanvas.drawEverything();

