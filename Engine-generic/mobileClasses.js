/*****************************************************************************************************
MOBILE
Objects that move
So far they are only square-shaped
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

// First method that should be called for each object. 
// Adds the object to the list(s) it belongs to.
// Calls setEdges so the object can be drawn.
Mobile.prototype.addToEngine = function(engine) {
	engine.allThings.push(this);
	engine.allMobiles.push(this);
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
	if (this.shap=='square') {
		this.path.rect(this.edges[3],this.edges[2],(2 * this.bigness),(2 * this.bigness));
	}
}

// Draws the object based on its color and path
Mobile.prototype.draw = function(ctx) {
	this.setEdges();
	this.makePath();
	ctx.save();
	ctx.strokeStyle='black';
	ctx.fillStyle = this.col;
	ctx.stroke(this.path);
	ctx.fill(this.path);
	ctx.restore();
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
	for(var i = 0;i<this.velocity.length;i++) {
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
	for(var i = 0; i < this.edges.length; i++) {
		var a, b, c, d;

		// up / right
		a = this.edges[i] <= otherObject.edges[(i + 2) % 4];
		b = this.edges[i] + this.velocity[(i + 1) % 2] * dt / 1000 >= otherObject.edges[(i + 2) % 4];
		
		// down / left
		c = this.edges[i] >= otherObject.edges[(i + 2) % 4];
		d = this.edges[i] + this.velocity[(i + 1) % 2] * dt / 1000 <= otherObject.edges[(i + 2) % 4];

		if(a && b) {
			this.willCollide[(i + 1) % 2] = true;
			this.collide(otherObject, i, dt, 1);
		}
		else if (c && d) {
			this.willCollide[(i + 1) % 2] = true;
			this.collide(otherObject, i, dt, -1);
		}	
	}
}

// Elastic collision
// input: side is the index of the edges array that had the collision
// input: dir is the direction of collision. +1 if it's up or to the right, -1 otherwise
Mobile.prototype.collide = function(otherObject,side,dt,dir) {
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