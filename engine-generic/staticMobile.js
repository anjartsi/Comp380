/*****************************************************************************************************
STATIC MOBILE
Objects that move
So far they are only square-shaped
*****************************************************************************************************/
var StaticMobile = function(x, y) {
	Mobile.call(this, x, y);
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

/*****************************************************************************************************
STATIC MOBILE
Objects that move in the Static Engine
*****************************************************************************************************/
var StaticMobile = function(x, y) {
	Mobile.call(this, x, y);
	// Position
	this.initialPosition = [x, y];
	this.position = [x, y];
	this.velocity = [0, 0];
	this.acceleration = [0, 0];
	// Mass 
	this.mass = 1;

	// Shape
	// Half the side of a square, radius of a circle
	this.bigness = 20;
	this.path = new Path2D();
	this.shap = 'square';
	// top, right, bottom, left edges
	this.edges = [];

}

/*************
STATIC MOBILE Methods
*************/
StaticMobile.prototype = Object.create(Mobile.prototype)
StaticMobile.prototype.constructor = StaticMobile;

StaticMobile.prototype.incrementTime = function(time) {
	for (var i = 0; i < 2; i++) {
		// movement is based on initial position and total elapsed time
		this.position[i] = this.initialPosition[i] + this.velocity[i] * time / 1000 
		this.position[i] += 0.5 * this.acceleration[i] * time * time / 1000000
	}
}
