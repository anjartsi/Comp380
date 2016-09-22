
var positionX = canvasWidth / 2 - 100;
var positionY = canvasHeight / 2 + 50;

var shadow = new Thing(positionX,positionY);
shadow.bigness=25;
shadow.col='black';
shadow.path.rect((shadow.pos[0]-shadow.bigness),(shadow.pos[1]-shadow.bigness),(2*shadow.bigness),(2*shadow.bigness))
shadow.initialize();


var red = new Mobile(positionX,positionY);
red.bigness = 25;
red.m = 1;
red.v= [500,00];
red.f=[0,-500];
red.shap='square';
red.col='red';
red.initialize();

var blue = new Mobile(positionX,25);
blue.bigness = 25;
blue.m = 1;
blue.v= [500,0];
blue.f=[0, 0];
blue.shap='square';
blue.col='blue';
blue.initialize();

var yellow = new Mobile(25,positionY);
yellow.bigness = 25;
yellow.m = 1;
yellow.v= [0, 0];
yellow.f=[0, -500];
yellow.shap='square';
yellow.col='yellow';
yellow.initialize();

var wall = new Wall(23,25,canvasHeight-50);
wall.initialize();

var wall2 = new Wall(canvasWidth-23,25,canvasHeight-50);
wall2.initialize();

var wall3 = new Wall(360,10,canvasHeight-350);
// wall3.initialize();

var floor = new Platform(25,23,canvasWidth-50);
floor.initialize();

var ceiling = new Platform(25,canvasHeight-23,canvasWidth-50);
ceiling.initialize();


// Draw everything 
if(gl) {ctx.drawImage(gridlines,0,0);}
for (var i = 0; i < allThings.length; i++) {
	allThings[i].draw(ctx);
};
