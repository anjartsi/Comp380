var allEngines = [];
var gWidth = 500;
var gHeight = 400;
var pSize = 60;
var game = new Engine(document.getElementById("gameCanvas"), document.getElementById('gameCanvasBtn'));
game.create(gWidth, gHeight);

allEngines.push(game);

var paddle = new Mobile(gWidth / 2 - pSize / 2, 10 - pSize);
paddle.bigness = pSize;
paddle.col = "red";
paddle.addToEngine(game);

var joystick = new SliderControl("L", 0, gWidth, "R", "white");
joystick.addToEngine(game, paddle);
// joystick.valueElem = "<div></div>";
joystick.print(document.getElementById('gameController'));
joystick.manipulate = function() {
	return this.thing.position[0];
}
joystick.changeProperty = function() {
	this.thing.position[0] = this.value;
}
joystick.turnOff = function() {};
joystick.turnOn = function() {};

var ball = new Sphere(gWidth / 2, gHeight / 2);
ball.bigness = 5;
ball.col = "blue";
ball.velocity = [150, -0];
ball.addToEngine(game);

var leftWall = new Wall(2, 0);
leftWall.bigness = gHeight;
leftWall.addToEngine(game);
var rightWall = new Wall(gWidth - 2, 0);
rightWall.bigness = gHeight;
rightWall.addToEngine(game);

var b = new StaticEngine(document.getElementById("canvas1"), document.getElementById("btn1"));
b.create(500, 600);
b.setup(1000);
b.drawGridLines = true;


allEngines.push(b);

var black = new StaticMobile(400, 500);
black.col = 'black';
black.velocity = [-100, 0];
black.acceleration = [0, -500];
black.addToEngine(b);



var a = new Engine(document.getElementById("canvas2"), document.getElementById("btn2"));
a.create(500, 600);
a.drawGridLines = true;

var shadow = new Thing(100, 200);
shadow.bigness=25;
shadow.col='black';
shadow.path.rect((shadow.position[0]-shadow.bigness),(shadow.position[1]-shadow.bigness),(2*shadow.bigness),(2*shadow.bigness))
// shadow.addToEngine(a);

var blue = new Mobile(100, 200);
blue.bigness = 25;
blue.mass = 1;
blue.velocity  = [250, 00];
blue.acceleration = [0, -500];
blue.col = 'blue';
blue.addToEngine(a);

var red = new Sphere(250,200);
red.bigness = 25;
red.mass = 1;
red.velocity  = [250, 00];
red.acceleration = [0, -500];
red.shap = 'square';
red.col = 'red';
red.addToEngine(a);


var wall = new Wall(23,25,a.canvasHeight-50);
var wall2 = new Wall(a.canvasWidth-23,25,a.canvasHeight-50);
var line = new Wall(300, 25, 100);
var floor = new Platform(25,23,a.canvasWidth-50);
var ceiling = new Platform(25,a.canvasHeight-23,a.canvasWidth-50);

wall.addToEngine(a);
wall2.addToEngine(a);
line.addToEngine(a);
floor.addToEngine(a);
ceiling.addToEngine(a);



allEngines.push(a);


var sliderCont = document.getElementById("sliderContainer");
var sliderCont2 = document.getElementById("sliderContainer2");


var redX = new SliderControl("Position - x", 0, a.canvasWidth - 4 * red.bigness, "meters", red.col);
redX.decimalPlaces = 0;
redX.addToEngine(a, red);
redX.print(sliderContainer2)

var redY = new SliderControl("Position - y", 0, a.canvasHeight - 4 * red.bigness, "meters", red.col);
redY.decimalPlaces = 0;
redY.addToEngine(a, red);
redY.print(sliderContainer2)

redX.manipulate = function() {
	return this.thing.position[0] - 50;
}
redX.changeProperty = function() {
	var newVal = this.value + 50;
	this.thing.position[0] = newVal;
}

redY.manipulate = function() {
	return this.thing.position[1] - 50;
}
redY.changeProperty = function() {
	var newVal = this.value + 50;
	this.thing.position[1] = newVal;
}


var blackX = new SliderControl("Position - x", 0, b.canvasWidth - 4 * black.bigness, "meters", "white");
blackX.decimalPlaces = 0;
blackX.addToEngine(b, black);
blackX.print(sliderContainer);
var blackY = new SliderControl("Position - y", 0, b.canvasHeight - 4 * black.bigness, "meters", "white");
blackY.decimalPlaces = 0;
blackY.addToEngine(b, black);
blackY.print(sliderContainer);


blackX.manipulate = function() {
	return this.thing.position[0] - 50;
}

blackX.changeProperty = function() {
	var newVal = this.value + 50;
	this.thing.position[0] = newVal;
	this.thing.initialPosition[0] = newVal;
	this.engine.elapsedTime = 0;
}

blackY.manipulate = function() {
	return this.thing.position[1] - 50;
}

blackY.changeProperty = function() {
	var newVal = this.value + 50;
	this.thing.position[1] = newVal;
	this.thing.initialPosition[1] = newVal;
	this.engine.elapsedTime = 0;
}
// black.addSlider(sliderCont, "position", 0, 50, 450, "x-coordinate", "m");
// black.addSlider(sliderCont, "position", 1, 50, 450, "y-coordinate", "m");

// red.addSlider(sliderCont2, "position", 0, 50, 450, "x-coordinate", "m")
// red.addSlider(sliderCont2, "position", 1, 50, 450, "y-coordinate", "m")
// red.addSlider(sliderCont2, "velocity", 0, -500, 500, "velocity-x", "m/s");
// red.addSlider(sliderCont2, "velocity", 1, -500, 500, "velocity-y", "m/s");
// blue.addSlider(sliderCont2, "position", 0, 50, 450, "x-coordinate", "m")
// blue.addSlider(sliderCont2, "position", 1, 50, 450, "y-coordinate", "m")
// blue.addSlider(sliderCont2, "velocity", 0, -500, 500, "velocity-x", "m/s");
// blue.addSlider(sliderCont2, "velocity", 1, -500, 500, "velocity-y", "m/s");


for(var i = 0; i < allEngines.length; i++) {
	allEngines[i].drawEverything();
}