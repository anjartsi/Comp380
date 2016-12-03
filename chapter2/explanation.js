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
var bluePos = new SliderControl("Position", 0, 200, "meters", blue.col);
bluePos.decimalPlaces = 0;
bluePos.addToEngine(dvdCanvas, blue);
bluePos.print(dvdControls);



var blueDisp = new SliderData("Displacement", -200, 200 ,"meters", blue.col);
blueDisp.decimalPlaces = 0;
blueDisp.addToEngine(dvdCanvas, blue);
blueDisp.print(dvdControls);

var blueDist = new SliderData("Distance", -200, 200, "meters", blue.col);
blueDist.decimalPlaces = 0;
blueDist.addToEngine(dvdCanvas, blue);
blueDist.print(dvdControls);

bluePos.manipulate = function() {
	return this.thing.position[0] - 50;
}
bluePos.changeProperty = function() {
	var newVal = this.value + 50;
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
accelerationCanvas.create(2 * cWidth, cHeight);
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
var slowAccelVel = new SliderData("Velocity", 0, 300, "m/s", slowAccel.col);

var fastAccelA = new Data("Acceleration", "m/s<sup>2</sup>", fastAccel.col);
var fastAccelVel = new SliderData("Velocity", 0, 300, "m/s", fastAccel.col);


slowAccelA.addToEngine(accelerationCanvas, slowAccel);
slowAccelA.print(accelerationControls);
slowAccelA.manipulate = function() {
	return this.thing.acceleration[0] / 10;
}

slowAccelVel.addToEngine(accelerationCanvas, slowAccel);
slowAccelVel.print(accelerationControls);
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
fastAccelVel.manipulate = function() {
	var v0 = parseInt(this.thing.velocity[0], 10);
	var a = parseInt(this.thing.acceleration[0], 10);
	var t = parseInt(this.thing.engine.elapsedTime, 10) / 1000;
	return (v0 + a * t) / 10;
}


accelerationCanvas.drawEverything();



/**

var engineName = new Engine(canvasElem, buttonElem)
engineName.create(width, height)

mobileName = new Mobile(x, y);
mobileName.velocity = [];
mobileName.acceleration = [];
mobileName.bigness = 10;
mobileName.addToEngine(engineName);

mobileDataName = new Data(label, units, color);
mobileDataName.addToEngine(engineName, mobileName);
mobileDataName.print(controllerElem)

mobileDataName.manipulate = function() {
	return this.thing.position[0] * 2 ;
}

mobileSliderControlName = new SliderData(label, max, min, units, color);
mobileSliderControlName.addToEngine(engineName, mobileName);
mobileSliderControlName.print(controllerElem);

mobileSliderControlName.manipulate = function() {
	return ....;
}

mobileSliderControlName.changeProperty = function() {
	return ....;
}
**/