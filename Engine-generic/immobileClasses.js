"use strict"
/*****************************************************************************************************
THINGS
If it's a thing, it belongs here
*****************************************************************************************************/
var Thing = function(x,y) {
	// Position and mass
	this.position = [x,y];
	this.m = 1;
	// Shape
	this.shap = '';
	this.path = new Path2D();
	this.bigness = 10;
	// Array holding 4 edges of the object, top-right-bottom-left
	this.edges = [];
	this.col = "black";
	this.engine;
}


Thing.prototype.draw = function(ctx) {
	ctx.save();
	ctx.strokeStyle = 'black';
	ctx.fillStyle = this.col;
	ctx.stroke(this.path);
	ctx.fill(this.path);
	ctx.restore;
}
Thing.prototype.addToEngine = function(engine) {
	engine.allThings.push(this);
	this.engine = engine;
	this.setEdges();
}

Thing.prototype.setEdges = function() {
	this.edges[0] = this.position[1] + this.bigness; // top edge
	this.edges[1] = this.position[0] + this.bigness; // right edge
	this.edges[2] = this.position[1] - this.bigness; // bottom edge
	this.edges[3] = this.position[0] - this.bigness; // left edge
}

/*****************************************************************************************************
IMMOBILE
Objects that don't move
Walls and Platforms
*****************************************************************************************************/
var Immobile = function(x, y, bigness) {
	Thing.call(this,x,y)

	this.position[0] = x;
	this.position[1] = y;	
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
Immobile.prototype.addToEngine = function(engine) {
	engine.allThings.push(this);
	engine.allImmobiles.push(this);
}

/*********
Walls
Vertical Immobile Objects
*********/
var Wall = function(x,y,bigness) {
	Immobile.call(this,x,y,bigness);
	// Position
	this.position[0] = x;
	this.position[1] = y;
	// Shape
	this.path = new Path2D();
	this.bigness = bigness; //Height of the wall
	if(bigness==undefined){this.bigness=200}
	this.thickness = 2;
}
Wall.prototype = Object.create(Immobile.prototype)
Wall.prototype.constructor = Wall;

Wall.prototype.setEdges = function() {
	this.edges[0] = this.position[1]+this.bigness; // top edge
	this.edges[1] = this.position[0]+this.thickness; // right edge
	this.edges[2] = this.position[1]; // bottom edge
	this.edges[3] = this.position[0]-this.thickness; // left edge
}

Wall.prototype.addToEngine = function(engine) {
	this.setEdges();
	engine.allThings.push(this);
	engine.allImmobiles.push(this);
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
var Platform = function(x ,y ,bigness) {
	Immobile.call(this,x,y,bigness);
	// Position
	this.position[0] = x;
	this.position[1] = y;
	// Shape
	this.path = new Path2D();
	this.bigness = bigness; //Length of the Platform
	if(bigness==undefined){this.bigness=200}
	this.thickness = 2;
}
Platform.prototype = Object.create(Immobile.prototype)
Platform.prototype.constructor = Platform;

Platform.prototype.setEdges = function() {
	this.edges[0] = this.position[1]+this.thickness; // top edge
	this.edges[1] = this.position[0]+this.bigness; // right edge
	this.edges[2] = this.position[1]-this.thickness; // bottom edge
	this.edges[3] = this.position[0]; // left edge
}

Platform.prototype.addToEngine = function(engine) {
	this.setEdges();
	engine.allThings.push(this);
	engine.allImmobiles.push(this);
	this.path.rect(this.edges[3],this.edges[2],(this.bigness),(2*this.thickness));

}


Platform.prototype.draw = function(ctx) {
	ctx.strokeStyle='black';
	ctx.fillStyle = this.col;
	ctx.stroke(this.path);
	ctx.fill(this.path);
}