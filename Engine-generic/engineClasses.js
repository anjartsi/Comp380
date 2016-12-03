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
	this.dt = 1000.0 / 60; // In milliseconds

	// Objects inside the engine
	this.allThings = [];
	this.allMobiles = [];
	this.allImmobiles = [];	
	this.dataToUpdate = [];
	this.controls = [];
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
	for (var i = 0; i < this.dataToUpdate.length; i++) {
		this.dataToUpdate[i].update();
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
		}// end for(i)
		engine.drawEverything();
		engine.playing = window.requestAnimationFrame(function() {
			engine.animate(engine)
		});
	} // end if(engine.playing)
}

Engine.prototype.timing = function() {
	this.elapsedTime += this.dt;
}

Engine.prototype.play = function() {
    if (!this.playing){
        this.button.innerHTML = 'Pause';
        var engine = this;
        for (var i = 0; i < this.controls.length; i++) {
        	this.controls[i].turnOff();
        }
        this.playing = window.requestAnimationFrame(function() {
        	return engine.animate(engine);
        });
        console.log('playing');
    }
    else{
        window.cancelAnimationFrame(this.playing);
        this.playing = null;
        this.button.innerHTML = 'Play';
        for (var i = 0; i < this.controls.length; i++) {
        	this.controls[i].turnOn();
        }
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
	this.dt = 1000.0 / 60; //milliseconds

	// Objects inside the engine
	this.allThings = [];
	this.allMobiles = [];
	this.allImmobiles = [];	

	//new
	this.maxTime;
}

StaticEngine.prototype = Object.create(Engine.prototype)
StaticEngine.prototype.constructor = StaticEngine;

StaticEngine.prototype.setup = function(maxTime) {
	var engine = this;
	this.maxTime = maxTime;
}

StaticEngine.prototype.drawEverything = function() {
	this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
	if(this.drawGridLines) {
		this.ctx.drawImage(this.gridLinesImage, 0, 0);
	}
	for (var i = 0; i < this.allThings.length; i++) {
		this.allThings[i].draw(this.ctx);
		this.allThings[i].incrementTime(this.elapsedTime);
	}
	for (var i = 0; i < this.dataToUpdate.length; i++) {
		this.dataToUpdate[i].update();
	}
}

StaticEngine.prototype.play = function() {
    if (!this.playing){
        this.button.innerHTML = 'Pause';        
        for (var i = 0; i < this.controls.length; i++) {
        	this.controls[i].turnOff();
        }
        var engine = this;
        this.playing = window.requestAnimationFrame(function() {
        	return engine.animate(engine);
        });
    }
    else{
        window.cancelAnimationFrame(this.playing);
        this.playing = null;
        this.button.innerHTML = 'Play';
        for (var i = 0; i < this.controls.length; i++) {
        	this.controls[i].turnOn();
        }
    }
}

StaticEngine.prototype.timing = function() {
	if(this.elapsedTime >= this.maxTime) {
		this.elapsedTime = 0;
	}
	else {
		this.elapsedTime = (this.elapsedTime + this.dt) % this.maxTime;
	}
	// this.elapsedTime = (this.elapsedTime + this.dt) % this.maxTime;
}

StaticEngine.prototype.animate = function(engine) {
	if (engine.playing) {
		engine.ctx.clearRect(0, 0, engine.canvasWidth, engine.canvasHeight);
		if(engine.drawGridLines) {
			engine.ctx.drawImage(engine.gridLinesImage, 0, 0);
		}
		engine.timing();
		for(var i = 0; i < engine.allThings.length; i++) {
			if(engine.allThings[i] instanceof StaticMobile){
				// Change properties of each mobile object
				engine.allThings[i].incrementTime(engine.elapsedTime);

			}; // end if(Mobile)
		}// end for(i)
		engine.drawEverything();
		if(this.elapsedTime + this.dt < this.maxTime) {
				engine.playing = window.requestAnimationFrame(function() {
					engine.animate(engine)
				});
		}
		else {
			// this.playing = null;
			this.play();
		}
	} // end if(engine.playing)
}