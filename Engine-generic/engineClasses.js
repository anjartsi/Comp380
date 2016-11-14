/*****************************************************************************************************
ENGINE
A physics engine
*****************************************************************************************************/
var Engine = function(elem, buttonElem) {
	this.button = buttonElem;

	// Canvas
	this.canvas = elem;
	this.ctx = elem.getContext('2d');
	this.ctx.fillStyle = "black";
	this.canvasHeight;
	this.canvasWidth;

	// Gridlines
	this.drawGridLines = false;
	this.gridLineDistance = 25;
	this.gridLinesImage;
	this.playing = null;

	// Timing
	this.elapsedTime = 0; // In milliseconds
	this.t1;
	this.t2;
	this.dt = 1000.0 / 60; // In milliseconds

	// Objects inside the engine
	this.allThings = [];
	this.allMobiles = [];
	this.allImmobiles = [];	
}
/*************
ENGINE Methods
*************/
Engine.prototype.create = function(width, height) {
	var engine = this;
	engine.canvasHeight = height;
	engine.canvasWidth = width;

	engine.canvas.height = height;
	engine.canvas.width = width;

	// rotate the canvas
	engine.ctx.translate(0, height);
	engine.ctx.scale(1,-1);


	// prepare gridlines
	engine.gridLinesImage = document.createElement('canvas');
	engine.gridLinesImage.height = this.canvasHeight;
	engine.gridLinesImage.width = this.canvasWidth;
	engine.prepareGridLines(engine.gridLineDistance);

	// add event listener to button
	engine.button.addEventListener('click', function() {
		engine.play();
	});
}

Engine.prototype.prepareGridLines = function(distance) {
	var gridlines = this.gridLinesImage;
	var gridCtx = gridlines.getContext('2d');

	gridCtx.strokeStyle = 'rgba(150,150,150,1)';
	gridCtx.translate(0, this.canvasHeight);
	gridCtx.scale(1,-1)
	gridCtx.setLineDash([2, 2]);
	gridCtx.beginPath();
	gridCtx.translate(0, 0);
	
	var pos; 
	// draw vertical lines
	pos = 1;
	while(pos < this.canvasWidth) {
		gridCtx.moveTo(pos, 0);
		gridCtx.lineTo(pos, this.canvasHeight);
		gridCtx.stroke();
		pos += distance;
	}
	// draw horizontal lines
	pos = 1;
	while(pos < this.canvasHeight) {
		gridCtx.moveTo(0, pos);
		gridCtx.lineTo(this.canvasWidth, pos);
		gridCtx.stroke();
		pos += distance;
	}
}

Engine.prototype.drawEverything = function() {
	this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
	if(this.drawGridLines) {
		this.ctx.drawImage(this.gridLinesImage, 0, 0);
	}
	for (var i = 0; i < this.allThings.length; i++) {
		this.allThings[i].draw(this.ctx);
	}
}

Engine.prototype.animate = function(engine) {
	if (engine.playing) {
		engine.ctx.clearRect(0, 0, engine.canvasWidth, engine.canvasHeight);
		if(engine.drawGridLines) {
			engine.ctx.drawImage(engine.gridLinesImage, 0, 0);
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
			engine.animate(engine)
		});
	} // end if(engine.playing)
}

Engine.prototype.timing = function() {
	// this.t1 = this.t2;
	// this.t2 = new Date();
	// this.dt = this.t2 - this.t1;
	this.elapsedTime += this.dt;
}

Engine.prototype.play = function() {
    if (!this.playing){
        this.t1 = new Date();
        this.t2 = new Date();
        this.button.innerHTML = 'Pause';
        var engine = this;
        this.playing = window.requestAnimationFrame(function() {
        	return engine.animate(engine);
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

/*****************************************************************************************************
STATIC ENGINE
A physics engine
*****************************************************************************************************/
var StaticEngine = function(elem, buttonElem) {
	Engine.call(this, elem, buttonElem);
	this.button = buttonElem;

	// Canvas
	this.canvas = elem;
	this.ctx = elem.getContext('2d');
	this.ctx.fillStyle = "black";
	this.canvasHeight;
	this.canvasWidth;

	// Gridlines
	this.drawGridLines = false;
	this.gridLineDistance = 25;
	this.gridLinesImage;
	this.playing = null;

	// Timing
	this.elapsedTime = 0; // In milliseconds
	this.t1;
	this.t2;
	this.dt; //milliseconds

	// Objects inside the engine
	this.allThings = [];
	this.allMobiles = [];
	this.allImmobiles = [];	

	//new
	this.maxTime;
	this.beginning = [];
}

StaticEngine.prototype = Object.create(Engine.prototype)
StaticEngine.prototype.constructor = StaticEngine;

StaticEngine.prototype.setup = function(maxTime) {
	var engine = this;
	this.maxTime = maxTime;
	for (var i = 0; i < this.allMobiles.length; i++) {
		var twin = new Mobile;
		// twin = this.allMobiles[i].makeClone();
		this.beginning.push(twin);

		// console.log(twin);
	}	
}

