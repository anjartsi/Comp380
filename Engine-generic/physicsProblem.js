var allEngines = [];

var a = new Engine(document.getElementById("canvas1"), document.getElementById("btn1"));
a.create(500, 300);
allEngines.push(a);
var b = new Engine(document.getElementById("canvas2"), document.getElementById("btn2"));
b.create(500, 300);
allEngines.push(b);


var shadow = new Thing(100,100);
shadow.bigness=25;
shadow.col='black';
shadow.path.rect((shadow.pos[0]-shadow.bigness),(shadow.pos[1]-shadow.bigness),(2*shadow.bigness),(2*shadow.bigness))
shadow.initialize(a);


var red = new Mobile(100,100);
red.bigness = 25;
red.m = 1;
red.v= [500,00];
red.f=[0,-500];
red.shap='square';
red.col='red';
red.initialize(a);

var shadow2 = new Thing(100,100);
shadow2.bigness=25;
shadow2.col='black';
shadow2.path.rect((shadow2.pos[0]-shadow2.bigness),(shadow2.pos[1]-shadow2.bigness),(2*shadow2.bigness),(2*shadow2.bigness))
shadow2.initialize(b);


var blue = new Mobile(100,100);
blue.bigness = 25;
blue.m = 1;
blue.v= [100,500];
blue.f=[0,-500];
blue.shap='square';
blue.col='blue';
blue.initialize(b);

var wall = new Wall(23,25,a.canvasHeight-50);
wall.initialize(a);

var wall2 = new Wall(a.canvasWidth-23,25,a.canvasHeight-50);
wall2.initialize(a);


var floor = new Platform(25,23,a.canvasWidth-50);
floor.initialize(a);

var ceiling = new Platform(25,a.canvasHeight-23,a.canvasWidth-50);
ceiling.initialize(a);



var wallB = new Wall(23,25,b.canvasHeight-50);
wallB.initialize(b);
var wall2B = new Wall(b.canvasWidth-23,25,b.canvasHeight-50);
wall2B.initialize(b);
var floorB = new Platform(25,23,b.canvasWidth-50);
floorB.initialize(b);
var ceilingB = new Platform(25,b.canvasHeight - 23,b.canvasWidth - 50);
ceilingB.initialize(b);


// for (var i = 0; i < a.allThings.length; i++) {
// 	a.allThings[i].draw(a.ctx);
// };

// for (var i = 0; i < b.allThings.length; i++) {
// 	b.allThings[i].draw(b.ctx);
// };


for(var i = 0; i < allEngines.length; i++) {
	var current = allEngines[i];
	if(current.drawGridLines) {
		current.ctx.drawImage(current.gridLinesImage, 0, 0);
	}
	for (var j = 0; j < current.allThings.length; j++) {
		current.allThings[j].draw(current.ctx);
	}
}