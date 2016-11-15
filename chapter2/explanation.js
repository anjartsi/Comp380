var positionControls = document.getElementById("positionControls");
var position = new Engine(document.getElementById("positionCanvas"), document.getElementById("positionCanvasBtn"));

var cHeight = 250;
var cWidth = 250;

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