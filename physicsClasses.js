"use strict"
// Array containing all the objects that exist
var allThings = [];
var allMobiles = [];
var allImmobiles = [];

/*****************************************************************************************************
THINGS
If it's a thing, it belongs here
*****************************************************************************************************/
var Thing = function(x,y) {
	// Position and mass
	this.pos = [x,y];
	this.m = 1;
	// Shape
	this.shap=''
	this.path = new Path2D();
	this.bigness = 10;
	// Array holding 4 edges of the object, top-right-bottom-left
	this.edges = [];
}

Thing.prototype.draw = function(ctx) {
	ctx.save();
	ctx.strokeStyle='black';
	ctx.fillStyle = this.col;
	ctx.stroke(this.path);
	ctx.fill(this.path);
	ctx.restore;
}
Thing.prototype.initialize = function() {
	allThings.push(this);
	this.setEdges();
}

Thing.prototype.setEdges = function() {
	this.edges[0] = this.pos[1]+this.bigness; // top edge
	this.edges[1] = this.pos[0]+this.bigness; // right edge
	this.edges[2] = this.pos[1]-this.bigness; // bottom edge
	this.edges[3] = this.pos[0]-this.bigness; // left edge
}
/*****************************************************************************************************
MOBILE
Objects that move
So far they are only square-shaped
*****************************************************************************************************/
var Mobile = function(x, y) {
	Thing.call(this,x,y);
	// Position, Velocity, Force
	this.pos = [x,y];
	this.v = [0,0];
	this.f = [0,0];
	// Mass 
	this.m = 1;

	// Whether the object will undergo a collision between this frame and next frame
	this.willCollide = [false,false]; 

	// Shape
	this.shap='square'
	this.path = new Path2D();
	// Half side length
	this.bigness = 20;

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
// Creates the path for the object's shape .
Mobile.prototype.initialize = function() {
	allThings.push(this);
	allMobiles.push(this);
	this.setEdges();
	}

Mobile.prototype.setEdges = function() {
	this.edges[0] = this.pos[1]+this.bigness; // top edge
	this.edges[1] = this.pos[0]+this.bigness; // right edge
	this.edges[2] = this.pos[1]-this.bigness; // bottom edge
	this.edges[3] = this.pos[0]-this.bigness; // left edge
}

Mobile.prototype.makePath = function() {
	this.path= new Path2D();
	if (this.shap=='square') {
		this.path.rect(this.edges[3],this.edges[2],(2*this.bigness),(2*this.bigness));
		
		// Old path without using edges. Remove this if edges don't cause problems
		// this.path.rect((this.pos[0]-this.bigness),(this.pos[1]-this.bigness),(2*this.bigness),(2*this.bigness));
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
	ctx.translate(this.pos[0],this.pos[1]);
	ctx.textAlign='center'
	ctx.scale(1,-1);
	ctx.fillText('( '+this.pos[0]+' , '+this.pos[1]+' )',0,0)
	ctx.restore();
}

// Changes all the properties of the mobile object after each time increment
Mobile.prototype.incrementTime = function(dt) {
	// Change the position and velocity
	for(var i = 0;i<this.v.length;i++) {
		if(this.v[i]&&!this.willCollide[i]) {this.pos[i]+= this.v[i]*(dt/1000)+this.f[i]/this.m*dt*dt/1000000;}
		if(this.f[i]&&!this.willCollide[i]) {this.v[i]+=this.f[i]/this.m*dt/1000;}
	}

	this.willCollide = [false, false];
};

// Checks for collisions and sets the willCollideX or willCollideY to true if there is a collision 
Mobile.prototype.checkForCollisions = function(otherObject,dt) {
	for(var i = 0;i<this.edges.length;i++) {
		if((this.edges[i]<=otherObject.edges[(i+2)%4])&&(this.edges[i]+this.v[(i+1)%2]*dt/1000>=otherObject.edges[(i+2)%4])) {
			this.willCollide[(i+1)%2]= true;
			this.collide(otherObject,i,dt,1);
		}
		else if ((this.edges[i]>=otherObject.edges[(i+2)%4])&&(this.edges[i]+this.v[(i+1)%2]*dt/1000<=otherObject.edges[(i+2)%4])) {
			this.willCollide[(i+1)%2]= true;
			this.collide(otherObject,i,dt,-1);
		}	
	}
}

// Elastic collision
// input: side is the index of the edges array that had the collision
// input: dir is the direction of collision. +1 if it's up or to the right, -1 otherwise
Mobile.prototype.collide = function(otherObject,side,dt,dir) {
	var xv = (side+1)%2;
	var otherObjEdge = (side+2)%4;
	// The distance between this object and the other in the last instance before their collision
	var dx = 0; 
	// The small amount of time required for this object to collide (MUST be less than dt)
	var dtPrime = 0;
	// The remaining time 
	var dtLeft = 0;
	if(otherObject instanceof Immobile) {
		console.log('hi');
		dx = Math.abs(this.edges[side]-otherObject.edges[otherObjEdge])
		dtPrime = Math.abs(1000*dx/(this.v[xv]));
		dtLeft = dt-dtPrime;

		this.pos[xv] = otherObject.edges[otherObjEdge] - dir*Math.abs(dtLeft*this.v[xv]/1000) - dir*dtLeft*dtLeft*this.f[xv]/this.m/1000000 - dir*this.bigness;

		this.v[xv] += dir*Math.abs(this.f[xv]/this.m*dtPrime/1000) + dir*Math.abs(this.f[xv]/this.m*dtLeft/1000) ;

		this.v[xv] *= -1;
		
	}

	else if (otherObject instanceof Mobile) {
		this.willCollide[(side+1)%2] = false;

	}
	else {
		this.willCollide[(side+1)%2] = false;
	}
}

/*****************************************************************************************************
IMMOBILE
Objects that don't move
Walls and Platforms
*****************************************************************************************************/
var Immobile = function(x, y, bigness) {
	Thing.call(this,x,y)

	this.pos[0] = x;
	this.pos[1] = y;	
	this.m = Infinity;
	// Shape --> Can be wall or platform
	this.shap='';
	this.path = new Path2D();
	// bigness--> Height of a wall or width of a platform
	if(bigness==undefined){this.bigness=200}

	this.col = 'black';
}

Immobile.prototype = Object.create(Thing.prototype)
Immobile.prototype.constructor = Immobile;
Immobile.prototype.initialize = function() {
	allThings.push(this);
	allImmobiles.push(this);
}

/*********
Walls
Vertical Immobile Objects
*********/
var Wall = function(x,y,bigness) {
	Immobile.call(this,x,y,bigness);
	// Position
	this.pos[0] = x;
	this.pos[1] = y;
	// Shape
	this.path = new Path2D();
	this.bigness = bigness; //Height of the wall
	if(bigness==undefined){this.bigness=200}
	this.thickness = 2;
}
Wall.prototype = Object.create(Immobile.prototype)
Wall.prototype.constructor = Wall;

Wall.prototype.setEdges = function() {
	this.edges[0] = this.pos[1]+this.bigness; // top edge
	this.edges[1] = this.pos[0]+this.thickness; // right edge
	this.edges[2] = this.pos[1]; // bottom edge
	this.edges[3] = this.pos[0]-this.thickness; // left edge
}

Wall.prototype.initialize = function() {
	this.setEdges();
	allThings.push(this);
	allImmobiles.push(this);
	this.path.rect(this.edges[3],this.edges[2],(2*this.thickness),(this.bigness));

}


Wall.prototype.draw = function(ctx) {
	ctx.strokeStyle='black';
	ctx.fillStyle = this.col;
	ctx.stroke(this.path);
	ctx.fill(this.path);
}

/*********
Platforms
*********/
var Platform = function(x,y,bigness) {
	Immobile.call(this,x,y,bigness);
	// Position
	this.pos[0] = x;
	this.pos[1] = y;
	// Shape
	this.path = new Path2D();
	this.bigness = bigness; //Length of the Platform
	if(bigness==undefined){this.bigness=200}
	this.thickness = 2;
}
Platform.prototype = Object.create(Immobile.prototype)
Platform.prototype.constructor = Platform;

Platform.prototype.setEdges = function() {
	this.edges[0] = this.pos[1]+this.thickness; // top edge
	this.edges[1] = this.pos[0]+this.bigness; // right edge
	this.edges[2] = this.pos[1]-this.thickness; // bottom edge
	this.edges[3] = this.pos[0]; // left edge
}

Platform.prototype.initialize = function() {
	this.setEdges();
	allThings.push(this);
	allImmobiles.push(this);
	this.path.rect(this.edges[3],this.edges[2],(this.bigness),(2*this.thickness));

}


Platform.prototype.draw = function(ctx) {
	ctx.strokeStyle='black';
	ctx.fillStyle = this.col;
	ctx.stroke(this.path);
	ctx.fill(this.path);
}