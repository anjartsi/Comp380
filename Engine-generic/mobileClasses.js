/*****************************************************************************************************
MOBILE
Objects that move
These are only square
*****************************************************************************************************/
var Mobile = function(x, y) {
	Thing.call(this, x, y);
	// Position, Velocity, Force
	this.position = [x, y];
	this.velocity = [0, 0];
	this.acceleration = [0, 0];
	// Mass 
	this.mass = 1;

	// Whether the object will undergo a collision between this frame and next frame
	this.willCollide = [false,false]; 

	// Shape
	// Half the side of a square, radius of a circle
	this.bigness = 20;
	this.path = new Path2D();

	// top, right, bottom, left edges
	this.edges = [];
	this.printedValues = [];
	this.calculatedValues = [];
}

/*************
MOBILE Methods
*************/
Mobile.prototype = Object.create(Thing.prototype)
Mobile.prototype.constructor = Mobile;

// First method that should be called for each object. 
// Adds the object to the list(s) it belongs to.
// Calls setEdges so the object can be drawn.
Mobile.prototype.addToEngine = function(engine) {
	engine.allThings.push(this);
	engine.allMobiles.push(this);
	this.engine = engine;
	this.setEdges();
	}

Mobile.prototype.setEdges = function() {
	this.edges[0] = this.position[1] + this.bigness; // top edge
	this.edges[1] = this.position[0] + this.bigness; // right edge
	this.edges[2] = this.position[1] - this.bigness; // bottom edge
	this.edges[3] = this.position[0] - this.bigness; // left edge
}

Mobile.prototype.makePath = function() {
	this.path= new Path2D();
	this.path.rect(this.edges[3],this.edges[2],(2 * this.bigness),(2 * this.bigness));
}

// Draws the object based on its color and path
Mobile.prototype.draw = function(ctx) {
	this.setEdges();
	this.makePath();
	ctx.save();
	ctx.strokeStyle = 'black';
	ctx.fillStyle = this.col;
	ctx.stroke(this.path);
	ctx.fill(this.path);
	ctx.restore();

	// update data and control values
	// for (var i = 0; i < this.printedValues.length; i++) {
	// 	this.updateValue(this.printedValues[i][0], 
	// 					this.printedValues[i][1], 
	// 					this.printedValues[i][2]);
	// }
}

Mobile.prototype.addText = function() {
	ctx.save();
	ctx.fillStyle='black';
	ctx.translate(this.position[0], this.position[1]);
	ctx.textAlign='center';
	ctx.scale(1, -1);
	ctx.fillText('( ' + this.position[0] + ' , ' + this.position[1] + ' )', 0, 0);
	ctx.restore();
}

// Changes all the properties of the mobile object after each time increment
Mobile.prototype.incrementTime = function(dt) {
	// Change the position and velocity
	for(var i = 0; i < this.velocity.length; i++) {
		if(this.velocity[i] && !this.willCollide[i]) {
			this.position[i] += this.velocity[i] * (dt / 1000) 
			this.position[i] += this.acceleration[i] / this.mass * dt * dt / 1000000;
		}
		if(this.acceleration[i] && !this.willCollide[i]) {
			this.velocity[i] += this.acceleration[i] / this.mass * dt / 1000;
		}
	}

	this.willCollide = [false, false];
};

// Checks for collisions and sets the willCollideX or willCollideY to true if there is a collision 
Mobile.prototype.checkForCollisions = function(otherObject, dt) {
	// Checks for top, then right, then bottom, then left collision
	// The top and bottom edge (edge[0], edge[2]) are related to position[1] and velocity[1]
	// The right and left edge (edge[1], edge[3]) are related to position[0] and velocity[0]
	var a1, a2, b, c, d, e;
	var nextPos = [0,0];
	nextPos[0] = this.position[0] + this.velocity[0] * dt / 1000 + this.acceleration[0] * dt * dt / 1000000;
	nextPos[1] = this.position[1] + this.velocity[1] * dt / 1000 + this.acceleration[1] * dt * dt / 1000000;
		
	// top of circle is below bottom edge of otherObject
	b = this.position[1] + this.bigness < otherObject.edges[2];

	// bottom of circle is above bottom edge of otherObject 
	c = this.position[1] - this.bigness > otherObject.edges[0];

	// right of circle is below left edge of otherObject
	d = this.position[0] + this.bigness < otherObject.edges[3];

	// left of circle is above right edge of otherObject
	e = this.position[0] - this.bigness > otherObject.edges[1];

	// going to the right
	if(this.velocity[0] > 0) {
		// right end of circle touching left edge of otherObject
		a1 = Math.abs(this.position[0] - otherObject.edges[3]) < this.bigness;
		a2 = Math.abs( nextPos[0] - otherObject.edges[3]) < this.bigness;
		if( !a1 & a2 & !(b||c) ) {
			this.willCollide[0] = true;
			this.collide(otherObject, 1, dt, 1);
		}
	}
	// going to the left
	else if (this.velocity[0] < 0) {
		a1 = Math.abs(this.position[0] - otherObject.edges[1]) < this.bigness;
		a2 = Math.abs( nextPos[0] - otherObject.edges[1]) < this.bigness;
		
		if(!a1 & a2 & !(b || c)) {
			this.willCollide[0] = true;
			this.collide(otherObject, 3, dt, -1);
		}
	}

	// going up
	if (this.velocity[1] > 0) {
		// top edge of circle touching bottome edge of otherObject
		a1 = Math.abs(this.position[1] - otherObject.edges[2]) < this.bigness;
		a2 = Math.abs( nextPos[1] - otherObject.edges[2]) < this.bigness;
		if(!a1 & a2 & !(d || e)) {
			this.willCollide[1] = true;
			this.collide(otherObject, 0, dt, 1)
		}
	}
	else if (this.velocity[1] < 0) {
		// left edge of circle touching right edge of otherObject
		a1 = Math.abs(this.position[1] - otherObject.edges[0]) < this.bigness;
		a2 = Math.abs( nextPos[1] - otherObject.edges[0]) < this.bigness;
		if(!a1 & a2 & !(d || e)) {
			this.willCollide[1] = true;
			this.collide(otherObject, 2, dt, -1)
		}
	}
}

// Elastic collision
// input: side is the index of the edges array that had the collision
// input: dir is the direction of collision. +1 if it's up or to the right, -1 otherwise
Mobile.prototype.collide = function(otherObject, side, dt, dir) {
	var xv = (side + 1) % 2;
	var otherObjEdge = (side + 2) % 4;
	// The distance between this object and the other in the last instance before their collision
	var dx = 0; 
	// The small amount of time required for this object to collide (MUST be less than dt)
	var dtPrime = 0;
	// The remaining time 
	var dtLeft = 0;
	if(otherObject instanceof Immobile) {
		// distance between the two objects in current frame
		dx = Math.abs(this.edges[side] - otherObject.edges[otherObjEdge])
		// amount of time needed for collision to take place
		dtPrime = Math.abs(1000 * dx / (this.velocity[xv] + 0.5 * this.acceleration[xv] * dt));
		// remaining time, or the time the object needs to travel in the opposite direction
		dtLeft = dt - dtPrime;

		this.position[xv] = otherObject.edges[otherObjEdge];
		this.position[xv] -= dir * Math.abs(dtLeft * this.velocity[xv] / 1000);
		this.position[xv] -= dir * dtLeft * dtLeft * this.acceleration[xv] / this.mass / 1000000;
		this.position[xv] -= dir * this.bigness;

		this.velocity[xv] += dir * Math.abs(this.acceleration[xv] / this.mass * dtPrime / 1000);
		this.velocity[xv] += dir * Math.abs(this.acceleration[xv] / this.mass * dtLeft / 1000)
		this.velocity[xv] *= -1;
		
	}

	else if (otherObject instanceof Mobile) {
		this.willCollide[(side + 1) % 2] = false;

	}
	else {
		this.willCollide[(side + 1) % 2] = false;
	}
}

// /** 
// Adds a slider to change certain values of a mobile object
// parent: the parent HTML element that will hold the slider
// variable: the name of the variable that will be controlled by the slider
// index: For some variables taht are arrays (like position) this will indicate the 
// 		index of the array that will be controlled by the slider.
// 		For variables that are not arrays, set index to -1
// min / max: The min/max value allowed in the slider
// desc: a 1- or 2-word description that will be printed next to the slider
// units: a string indicating the unit that will appear after the number-input
// **/
// Mobile.prototype.addSlider = function(parent, variable, index, min, max, desc, units) {
// 	var mobile = this;
// 	var row = document.createElement("div");
// 	row.className = "controllerRow controlRow";
// 	row.style.color = this.col;
// 	// create slider
// 	var slider = document.createElement("input");
// 	slider.type = "range";
// 	slider.className = "sliderInput";
// 	slider.min = min;
// 	slider.max = max;
// 	if(index != -1) 
// 		slider.value = this[variable][index];
// 	else
// 		slider.value = this[variable];
// 	// create number input
// 	var num = document.createElement("input");
// 	num.type = "number";
// 	num.name = variable;
// 	num.id = variable;
// 	num.className = "controllerValue numberInput"
// 	num.min = min;
// 	num.max = max;
// 	num.value = this[variable][index];
// 	if(index != -1) 
// 		num.value = this[variable][index];
// 	else
// 		num.value = this[variable];

// 	// create label
// 	var name = document.createElement("label");
// 	name.for = num.name;
// 	name.className = "controllerDescription"
// 	name.innerHTML = desc;

// 	// create unit
// 	var unit = document.createElement("div");
// 	unit.innerHTML = units;
// 	unit.className = "unit";

// 	// event listeners
// 	slider.addEventListener("input", function() {
// 		if(index != -1) 
// 			mobile[variable][index] = parseInt(slider.value);
// 		else
// 			mobile[variable] = parseInt(slider.value);
// 		num.value = parseInt(slider.value);
// 		mobile.engine.drawEverything();
// 	})

// 	num.addEventListener("input", function() {
// 		var inp = parseInt(num.value);
// 		if(inp > max) {
// 			inp = max;
// 			num.value = max;
// 		}
// 		else if (inp < min || inp == NaN || inp == null) {
// 			inp = min;
// 			num.value = min;
// 		}
// 		if(index != -1) 
// 			mobile[variable][index] = inp;
// 		else 
// 			mobile[variable] = inp;
// 		slider.value = inp;
// 		mobile.engine.drawEverything();
// 	})

// 	// add to controller
// 	row.appendChild(name);
// 	row.appendChild(slider);
// 	row.appendChild(num);
// 	row.appendChild(unit);

// 	parent.appendChild(row);
// 	mobile.printedValues.push([slider, variable, index]);
// 	mobile.printedValues.push([num, variable, index]);
// }

// Mobile.prototype.updateValue = function(elem, variable, index) {
// 	if(index < 0) {
// 		value = this[variable];
// 	}
// 	else {
// 		value = this[variable][index];
// 	}
// 	value = value.toFixed(2);
// 	elem.value= value;
// 	elem.innerHTML = value;
// }

/*****************************************************************************************************
Sphere
Mobile objects that are circular in shape
*****************************************************************************************************/
var Sphere = function(x, y) {
	Mobile.call(this, x, y);

}
Sphere.prototype = Object.create(Mobile.prototype)
Sphere.prototype.constructor = Sphere;

Sphere.prototype.makePath = function() {
	this.path = new Path2D();
	this.path.arc(this.position[0], this.position[1], this.bigness, 0, 2 * Math.PI, true);
}
