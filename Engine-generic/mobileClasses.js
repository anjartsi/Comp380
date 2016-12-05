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
}

/*************
MOBILE Methods
*************/
Mobile.prototype = Object.create(Thing.prototype)
Mobile.prototype.constructor = Mobile;

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
}

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



Mobile.prototype.addText = function(text, size, col) {
	this.engine.ctx.save();
	this.engine.ctx.fillStyle = col;
	this.engine.ctx.font = size + "px Arial";
	this.engine.ctx.translate(this.position[0], this.position[1]-size/3);
	this.engine.ctx.textAlign='center';
	this.engine.ctx.scale(1, -1);
	this.engine.ctx.fillText(text, 0, 0);
	this.engine.ctx.restore();
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
