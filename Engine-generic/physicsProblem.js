var allEngines = [];

var a = new Engine(document.getElementById("canvas1"), document.getElementById("btn1"));
a.create(500, 300);
a.drawGridLines = true;
allEngines.push(a);

var b = new StaticEngine(document.getElementById("canvas2"), document.getElementById("btn2"));
b.create(500, 300);

allEngines.push(b);


var shadow = new Thing(100,400);
shadow.bigness=25;
shadow.col='black';
shadow.path.rect((shadow.position[0]-shadow.bigness),(shadow.position[1]-shadow.bigness),(2*shadow.bigness),(2*shadow.bigness))
shadow.addToEngine(a);


var red = new Mobile(100,400);
red.bigness = 25;
red.mass = 1;
red.velocity  = [0,00];
red.acceleration = [0,-1000];
red.shap = 'square';
red.col = 'red';
red.addToEngine(a);

var shadow2 = new Thing(100,100);
shadow2.bigness=25;
shadow2.col='black';
shadow2.path.rect((shadow2.position[0]-shadow2.bigness),(shadow2.position[1]-shadow2.bigness),(2*shadow2.bigness),(2*shadow2.bigness))
shadow2.addToEngine(b);


var blue = new Mobile(100,100);
blue.bigness = 25;
blue.mass = 1;
blue.velocity = [100,500];
blue.acceleration=[0,-500];
blue.shap='square';
blue.col='blue';
blue.addToEngine(b);

var wall = new Wall(23,25,a.canvasHeight-50);
wall.addToEngine(a);

var wall2 = new Wall(a.canvasWidth-23,25,a.canvasHeight-50);
wall2.addToEngine(a);


var floor = new Platform(25,23,a.canvasWidth-50);
floor.addToEngine(a);

var ceiling = new Platform(25,a.canvasHeight-23,a.canvasWidth-50);
ceiling.addToEngine(a);



var wallB = new Wall(23,25,b.canvasHeight-50);
wallB.addToEngine(b);
var wall2B = new Wall(b.canvasWidth-23,25,b.canvasHeight-50);
wall2B.addToEngine(b);
var floorB = new Platform(25,23,b.canvasWidth-50);
floorB.addToEngine(b);
var ceilingB = new Platform(25,b.canvasHeight - 23,b.canvasWidth - 50);
ceilingB.addToEngine(b);


// for (var i = 0; i < a.allThings.length; i++) {
// 	a.allThings[i].draw(a.ctx);
// };

// for (var i = 0; i < b.allThings.length; i++) {
// 	b.allThings[i].draw(b.ctx);
// };

b.setup(5000);
for(var i = 0; i < allEngines.length; i++) {
	var current = allEngines[i];
	if(current.drawGridLines) {
		current.ctx.drawImage(current.gridLinesImage, 0, 0);
	}
	for (var j = 0; j < current.allThings.length; j++) {
		current.allThings[j].draw(current.ctx);
	}
}