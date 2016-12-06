var cWidth = 600;
var cHeight = 400;

var componentsCanvas = new Engine(document.getElementById("componentsCanvas"), document.getElementById("componentsCanvasBtn"));
var componentsControls = document.getElementById("componentsControls");
componentsCanvas.create(cWidth, cHeight);
componentsCanvas.drawGridLines = true;

var purple = new Mobile(cWidth / 2, 337);
purple.bigness = 20;
purple.col = 'purple';
purple.velocity = [150, 0];
purple.acceleration = [0, -250];
purple.addToEngine(componentsCanvas);

/* vertical component */
var red = new Mobile(purple.bigness, purple.position[1])
red.bigness = purple.bigness;
red.col = 'red';
red.velocity = [0, purple.velocity[1]];
red.acceleration = [0, purple.acceleration[1]];
red.addToEngine(componentsCanvas);

/* horizontal component */
var blue = new Mobile(purple.position[0], purple.bigness)
blue.bigness = purple.bigness;
blue.col = 'blue';
blue.velocity = [purple.velocity[0], 0];
blue.acceleration = [purple.acceleration[0], 0];
blue.addToEngine(componentsCanvas);

/* data and sliders */
var pvx = new SliderData("Velocity[x]", -160, 160, "m/s", purple.col);
pvx.addToEngine(componentsCanvas, purple);
pvx.manipulate = function() {
	return this.thing.velocity[0];
}

var pvy = new SliderData("Velocity[y]", -400, 400, "m/s", purple.col);
pvy.addToEngine(componentsCanvas, purple);
pvy.decimalPlaces = 2;
pvy.manipulate = function() {
	return this.thing.velocity[1];
}

var bvx = new SliderData("Velocity[x]", -160, 160, "m/s", blue.col);
bvx.addToEngine(componentsCanvas, blue);
bvx.manipulate = function() {
	return this.thing.velocity[0];
}

var rvy = new SliderData("Velocity[y]", -400, 400, "m/s", red.col);
rvy.addToEngine(componentsCanvas, red);
rvy.decimalPlaces = 2;
rvy.manipulate = function() {
	return this.thing.velocity[1];
}

pvx.print(componentsControls)
bvx.print(componentsControls)
pvy.print(componentsControls)
rvy.print(componentsControls)


/* Immobiles */
var floor = new Platform(purple.bigness, purple.bigness);
floor.bigness = cWidth - 2 * purple.bigness;
floor.addToEngine(componentsCanvas);
var ceil = new Platform(purple.bigness, cHeight-purple.bigness);
ceil.bigness = cWidth - 2 * purple.bigness;
ceil.addToEngine(componentsCanvas);
var wall1 = new Wall(purple.bigness, purple.bigness);
wall1.bigness = cHeight - 2 * purple.bigness;
wall1.addToEngine(componentsCanvas);
var wall2 = new Wall(cWidth - purple.bigness, purple.bigness);
wall2.bigness = cHeight - 2 * purple.bigness;
wall2.addToEngine(componentsCanvas);



componentsCanvas.drawEverything();