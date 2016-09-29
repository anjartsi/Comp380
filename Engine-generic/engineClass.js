var Engine = function(elem, buttonElem) {
	this.canvas = elem;
	this.ctx = elem.getContext('2d');
	this.button = buttonElem;

	this.ctx.fillStyle = "black";
	this.canvasHeight;
	this.canvasWidth;

	this.drawGridLines = false;
	this.gridLineDistance = 25;
	this.gridLinesImage;
	this.playing = null;

	this.elapsedTime = 0; // In milliseconds
	this.t1;
	this.t2;
	this.dt; //milliseconds

	this.allThings = [];
	this.allMobiles = [];
	this.allImmobiles = [];	
}

Engine.prototype.create = function(height, width, drawGridLines) {
	this.canvasHeight = height;
	this.canvasWidth = width;

	this.canvas.height = height;
	this.canvas.width = width;

	// rotate the canvas
	this.ctx.translate(0, height);
	this.ctx.scale(1,-1);
	// prepare gridlines
	this.drawGridLines = drawGridLines;
	if(this.drawGridLines) {
		this.gridlines(this.gridLineDistance);
	}
	// add event listener to button
	var engine = this;
	this.button.addEventListener('click', function() {
		engine.play();
	});
}

Engine.prototype.gridlines = function(distance) {
	var gridlines = document.createElement('canvas');
	gridlines.height = this.canvasHeight;
	gridlines.width = this.canvasWidth;
	var gridCtx = gridlines.getContext('2d');

	var pos; 
	gridCtx.strokeStyle = 'rgba(150,150,150,1)';
	gridCtx.setLineDash([2, 2]);
	gridCtx.beginPath();
	gridCtx.translate(0, 0);
	
	// draw vertical lines
	pos = 1;
	while(pos < this.width) {
		gridCtx.moveTo(pos, 0);
		gridCtx.lineTo(pos, this.height);
		gridCtx.stroke();
		pos += distance;
	}
	// draw horizontal lines
	pos = 1;
	while(pos < this.height) {
		gridCtx.moveTo(0, pos);
		gridCtx.lineTo(this.width, pos);
		gridCtx.stroke();
		pos += distance;
	}
	this.gridlinesImage = gridlines;
}

Engine.prototype.drawEverything = function(engine) {
	if (engine.playing) {
		engine.ctx.clearRect(0, 0, engine.canvasWidth, engine.canvasHeight);
		if(engine.gridlines) {
			// engine.ctx.drawImage(engine.gridLinesImage, 0, 0);
		}
		engine.timing();
		for(var i = 0; i < engine.allThings.length; i++) {
			if(engine.allThings[i] instanceof Mobile){
				// Check for Collisions
				for(var k = 0; k < engine.allThings.length; k++) {
					if(k != i){
						engine.allThings[i].checkForCollisions(engine.allThings[k], engine.dt);
					}
				}

				// Change properties of each mobile object
				engine.allThings[i].incrementTime(engine.dt);

			}; // end if(Mobile)
			// Draw Everything
			engine.allThings[i].draw(engine.ctx);
		}// end for(i)
		engine.playing = window.requestAnimationFrame(function() {
			engine.drawEverything(engine)
		});
	} // end if(engine.playing)
}

Engine.prototype.timing = function() {
	this.t1 = this.t2;
	this.t2 = new Date();
	this.dt = 1000. / 60;
	this.elapsedTime += this.dt;
}

Engine.prototype.play = function() {
    if (!this.playing){
        this.t1 = new Date();
        this.t2 = new Date();
        this.button.innerHTML = 'Pause';
        var engine = this;
        this.playing = window.requestAnimationFrame(function() {
        	return engine.drawEverything(engine);
        });
        console.log('playing');
    }
    else{
        window.cancelAnimationFrame(this.playing);
        this.playing = null;
        this.button.innerHTML = 'Play';
        console.log('paused at ' + this.elapsedTime);
    }
}