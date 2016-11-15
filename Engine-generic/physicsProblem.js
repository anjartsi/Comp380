var allEngines = [];

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

for(var i = 0; i < allEngines.length; i++) {
	allEngines[i].drawEverything();
}

var sliderCont = document.getElementById("sliderContainer");


red.addSlider(sliderCont, "position", 0, 50, 450, "x-coordinate", "m")
red.addSlider(sliderCont, "position", 1, 50, 450, "y-coordinate", "m")

