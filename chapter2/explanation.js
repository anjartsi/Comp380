var cHeight = 250;
var cWidth = 300;

/**********************************************
 Position Canvas
**********************************************/
var position = new Engine(document.getElementById("positionCanvas"), document.getElementById("positionCanvasBtn"));
var positionControls = document.getElementById("positionControls");
position.create(cWidth, cHeight);
position.drawGridLines = true;

var shadow = new Mobile(125, 125);
shadow.bigness = 25;
shadow.col = 'black';
shadow.addToEngine(position);
var red = new Mobile(125, 125);
red.bigness = 25;
red.mass = 1;
red.velocity  = [0, 0];
red.acceleration = [0, 0];
red.col = 'red';
red.addToEngine(position);
var redX = new SliderControl("Position - x", 0, cWidth - 2 * red.bigness, "meters", red.col);
redX.decimalPlaces = 0;
redX.addToEngine(position, red);
redX.print(positionControls);

var redY = new SliderControl("Position - y", 0, cHeight - 2 * red.bigness, "meters", red.col);
redY.decimalPlaces = 0;
redY.addToEngine(position, red);
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

position.drawEverything();

/**********************************************
 Displacement vs Distance Canvas
**********************************************/
var dvd = new Engine(document.getElementById("dvdCanvas"), document.getElementById("dvdCanvasBtn"));
var dvdControls = document.getElementById("dvdControls");
dvd.create(cWidth, 50);
dvd.drawGridLines = true;
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
shadow.addToEngine(dvd);
blue.addToEngine(dvd);
// blue.addSlider(dvdControls, "position", 0, 0, cWidth , "position", "meters");
var bluePos = new SliderControl("Position", 0, 200, "meters", blue.col);
bluePos.decimalPlaces = 0;
bluePos.addToEngine(dvd, blue);
bluePos.print(dvdControls);



var blueDisp = new SliderData("Displacement", -200, 200 ,"meters", blue.col);
blueDisp.decimalPlaces = 0;
blueDisp.addToEngine(dvd);
blueDisp.print(dvdControls);

var blueDist = new SliderData("Distance", -200, 200, "meters", blue.col);
blueDist.decimalPlaces = 0;
blueDist.addToEngine(dvd);
blueDist.print(dvdControls);

bluePos.manipulate = function() {
	return this.thing.position[0] - 50;
}
bluePos.changeProperty = function() {
	var newVal = this.value + 50;
	this.thing.position[0] = newVal;
	// this.engine.drawEverything();
}

blueDisp.manipulate = function() {
	return blue.position[0] - shadow.position[0];
}
blueDist.manipulate = function() {
	return Math.abs(blue.position[0] - shadow.position[0]);
}


dvd.drawEverything(dvdControls);