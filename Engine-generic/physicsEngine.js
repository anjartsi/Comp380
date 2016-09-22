
var canvas = document.getElementById('actionCanvas');
var ctx = canvas.getContext('2d');
var canvasHeight = 500
var canvasWidth= 500*1.618034 //Estimation of the golden ratio
canvas.height=canvasHeight;
canvas.width=canvasWidth;
ctx.translate(0,canvasHeight);
ctx.scale(1,-1);

/***************************************
Adding gridlines as a background image
****************************************/
// Set this to true to draw gridlines
var gl = true;
if(gl) {
	var gridlines = document.createElement('canvas');
	gridlines.height = canvasHeight;
	gridlines.width = canvasWidth;
	var glctx = gridlines.getContext('2d');

	var gridLinePosition = 1;
	glctx.strokeStyle = 'rgba(150,150,150,1)';
	glctx.setLineDash([2, 2])
	glctx.beginPath();
	glctx.translate(0, 0);
	while(gridLinePosition < canvasWidth) {
		glctx.moveTo(gridLinePosition, 0);
		glctx.lineTo(gridLinePosition, canvasHeight);
		glctx.stroke();
		gridLinePosition += 25;
	}
	gridLinePosition = 1
	while(gridLinePosition < canvasHeight) {
		glctx.moveTo(0, gridLinePosition);
		glctx.lineTo(canvasWidth, gridLinePosition);
		glctx.stroke();
		gridLinePosition += 25;
	}
}

/***************************************
 Time Variables
 NEEDS WORK
****************************************/
var elapsedTime=0; // In milliseconds
var t1;
var t2;
var dt; //milliseconds

var timing = function() {
	t1 = t2;
	t2 = new Date();
	dt = 1000. / 60;
	elapsedTime +=dt;
}


/***************************************

****************************************/
// Whether or not the animation is playing
var playing = null;

var drawEverything = function() {
	if(playing){
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
		if(gl){ctx.drawImage(gridlines, 0, 0);}
		timing();

		for (var i = 0; i < allThings.length; i++) {
			
			if(allThings[i] instanceof Mobile){
				// Check for Collisions
				for(var k = 0; k < allThings.length; k++) {
					if(k != i){
						allThings[i].checkForCollisions(allThings[k], dt);
					}
				}

				// Change properties of each mobile object
				allThings[i].incrementTime(dt);

			};
			// Draw Everything
			allThings[i].draw(ctx);
		};
		window.requestAnimationFrame(drawEverything);
	}
}

var play = function() {
	if(!playing) {
		playing = true;
		t1 = new Date();
		t2 = new Date();	
		window.requestAnimationFrame(drawEverything);
		console.log('playing')

	}
}

var pause = function() {
	playing = null;
}

document.getElementById('playButton').addEventListener('mousedown', play);
document.getElementById('pauseButton').addEventListener('mousedown', pause);
