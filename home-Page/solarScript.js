var orbit = function(middle, orbitting, grav) {
	var x = orbitting.position[0] - middle.position[0];
	var y = orbitting.position[1] - middle.position[1];
	var r = Math.sqrt(x * x + y * y);
	var theta = Math.atan(y / x);

	var dir = Math.abs(x) / x;

	var f = grav / (r * r);
	orbitting.acceleration[0] = -f * Math.cos(theta) * dir;
	orbitting.acceleration[1] = -f * Math.sin(theta) * dir;	
}
var slow = 1; // scale the speed of planets
var small = 0.5; // scale the size of EVERYTHING
var cWidth = 1600 * small;
var cHeight = cWidth;
	
var solarSystemCanvas = new Engine(document.getElementById("solarSystemCanvas"), document.getElementById("solarSystemCanvasBtn"));
var solarSystemControls = document.getElementById("solarSystemControls");
solarSystemCanvas.create(cWidth, cHeight);
solarSystemCanvas.drawGridLines = false;

var x0 = cWidth / 2;
var y0 = cHeight / 2;

var sun = new Sphere(x0, y0);
sun.bigness = 25 * small;
sun.col = "gold";
sun.addToEngine(solarSystemCanvas);

/********************************* mercury *********************************/
var mercuryDist = 58 * small;
var mercuryV = 2 * Math.PI * mercuryDist / 0.88 * slow * small;
var mercuryG = mercuryV * mercuryV * mercuryDist;
var mercury = new Sphere(x0 + mercuryDist, y0);
mercury.velocity = [0, mercuryV];
mercury.col = "grey";
mercury.bigness = 5 * small;
mercury.addToEngine(solarSystemCanvas);

var mercuryRev = new Data("name", "unit", mercury.col);
mercuryRev.addToEngine(solarSystemCanvas, mercury);
mercuryRev.manipulate = function() {
	orbit(sun, mercury, mercuryG);
}
/********************************* venus *********************************/
var venusDist = 108 * small;
var venusV =  2 * Math.PI * venusDist / 2.25 * slow * small;
var venusG = venusV * venusV * venusDist;
var venus = new Sphere(x0 + venusDist, y0);
venus.velocity = [0, venusV];
venus.col = "darkgreen";
venus.bigness = 8 * small;
venus.addToEngine(solarSystemCanvas);

var venusRev = new Data("name", "unit", venus.col);
venusRev.addToEngine(solarSystemCanvas, venus);
venusRev.manipulate = function() {
	orbit(sun, venus, venusG);
}
/********************************* earth *********************************/
var earthDist = 150 * small;
var earthV =  2 * Math.PI * earthDist / 3.65 * slow * small;
var earthG = earthV * earthV * earthDist;
var earth = new Sphere(x0 + earthDist, y0);
earth.velocity = [0, earthV];
earth.col = "cyan";
earth.bigness = 10 * small;
earth.addToEngine(solarSystemCanvas);

var earthRev = new Data("name", "unit", earth.col);
earthRev.addToEngine(solarSystemCanvas, earth);
earthRev.manipulate = function() {
	orbit(sun, earth, earthG);
}

/********************************* mars *********************************/
var marsDist = 228 * small;
var marsV =  2 * Math.PI * marsDist / 6.87 * slow * small;
var marsG = marsV * marsV * marsDist;
var mars = new Sphere(x0 + marsDist, y0);
mars.velocity = [0, marsV];
mars.col = "red";
mars.bigness = 8 * small;
mars.addToEngine(solarSystemCanvas);

var marsRev = new Data("name", "unit", mars.col);
marsRev.addToEngine(solarSystemCanvas, mars);
marsRev.manipulate = function() {
	orbit(sun, mars, marsG);
}
/********************************* jupiter *********************************/
var jupiterDist = 778 * small;
var jupiterV =  2 * Math.PI * jupiterDist / 43.32 * slow * small;
var jupiterG = jupiterV * jupiterV * jupiterDist;
var jupiter = new Sphere(x0 + jupiterDist, y0);
jupiter.velocity = [0, jupiterV];
jupiter.col = "brown";
jupiter.bigness = 15 * small;
jupiter.addToEngine(solarSystemCanvas);

var jupiterRev = new Data("name", "unit", jupiter.col);
jupiterRev.addToEngine(solarSystemCanvas, jupiter);
jupiterRev.manipulate = function() {
	orbit(sun, jupiter, jupiterG);
}

solarSystemCanvas.drawEverything();