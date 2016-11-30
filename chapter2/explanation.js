var cHeight = 250;
var cWidth = 250;


// position canvas
var position = new Engine(document.getElementById("positionCanvas"), document.getElementById("positionCanvasBtn"));
var positionControls = document.getElementById("positionControls");
position.create(cWidth, cHeight);
position.drawGridLines = true;

var red = new Mobile(100, 100);
red.bigness = 25;
red.mass = 1;
red.velocity  = [0, 0];
red.acceleration = [0, 0];
red.col = 'red';
red.addToEngine(position);
red.addSlider(positionControls, "position", 0, 0, cWidth , "x-position", "meters")
red.addSlider(positionControls, "position", 1, 0, cHeight , "y-position", "meters")
position.drawEverything();

// Displacement vs Distance canvas
var dvd = new Engine(document.getElementById("dvdCanvas"), document.getElementById("dvdCanvasBtn"));
var dvdControls = document.getElementById("dvdControls");
dvd.create(cWidth, 50);
dvd.drawGridLines = true;
var blue = new Sphere(cWidth / 2, 25);
blue.bigness = 25;
blue.mass = 1;
blue.velocity = [0,0];
blue.acceleration = [0, 0];
blue.col = '#2233ff';

var shadow = new Sphere(cWidth / 2, 25);
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
blue.addSlider(dvdControls, "position", 0, 0, cWidth , "position", "meters");
var blueDisp = new Data(dvdControls, blue.position[0], "Displacement", "meters", blue.col);
blueDisp.addToEngine(dvd);
var blueDist = new Data(dvdControls, 0, "Distance", "meters", blue.col);
blueDist.addToEngine(dvd);
dvd.drawEverything();

blueDisp.recalculate = function() {
	return blue.position[0] - shadow.position[0];
}
blueDist.recalculate = function() {
	return Math.abs(blue.position[0] - shadow.position[0]);
}