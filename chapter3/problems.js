/* Problem 1: adding vectors - magnitude*/
var prob1 = document.getElementById("prob1");
var output1 = document.getElementById("output1");
prob1.innerHTML = problem1();
var aMag, aDeg, bMag, bDeg; // Mag = magnitude, deg = degree above x-axis
var ax, ay, bx, by, rx, ry;
var answer1;
var hint1 = "Adding the vectors together requires that you first add their x-components and y-components together.<br>The x-component can be found by multiplying the magnitude by the cosine of the direction."
			+ "<br>The y-component can be found by multiplying the magnitude by the sine of the direction.<br>The new vector's magnitude can then be solved by adding the squares of its x- and y-components together, and finding the square root of this.";

function problem1(){
	aMag = randomNum(43, 67);
	aDeg = randomNum(8, 30);
	bMag = randomNum(29, 46);
	bDeg = randomNum(33, 56);
	var question1 = "Vector A has a magnitude of <span class='probNum'>" + aMag + "</span> m with direction <span class='probNum'>" + aDeg + "</span>&deg.<br> \
				Vector B has a magnitude of <span class='probNum'>" + bMag + "</span> m with direction <span class='probNum'>" + bDeg + "</span>&deg.<br> \
				Find the magnitude of the vector made from adding these two vectors together, to the nearest tenth of a meter.";
	aDeg = aDeg * Math.PI / 180;
	bDeg = bDeg * Math.PI / 180;
	ax = aMag * Math.cos(aDeg);
	bx = bMag * Math.cos(bDeg);
	ay = aMag * Math.sin(aDeg);
	by = bMag * Math.sin(bDeg);
	rx = ax + bx;
	ry = ay + by;
	answer1 = Math.sqrt( Math.pow(rx, 2) + Math.pow(ry, 2) );
	answer1 = Math.round(answer1 * 10) / 10; // round to 1 decimal place;
	return question1;
}

/* Problem 2: adding vectors - direction*/
var prob2 = document.getElementById("prob2");
var output2 = document.getElementById("output2");
prob2.innerHTML = problem2();
var answer2;
var hint2 = "To find the direction of a vector, find the value of the y-component divided by the x-component, and find the inverse tangent of this.";

function problem2(){
	var question2 = "Using the information from the first problem, find the direction of the vector made from adding vectors A and B together, to the nearest tenth of a degree.";
	answer2 = Math.atan(ry/rx);
	answer2 = Math.round(answer2 / Math.PI * 180 * 10) / 10;
	return question2;
}

/* Problem 3: projectile motion*/
var prob3 = document.getElementById("prob3");
var output3 = document.getElementById("output3");
prob3.innerHTML = problem3();
var answer3;
var hint3 = "The maximum height is found by squaring the initial velocity in the y-direction, and dividing this by two times g.\
			 <br>Initial velocity in the y-direction is found by multiplying the initial velocity by the sine of the initial angle.";

function problem3(){
	var initSpd = randomNum(20, 30);
	var angle = randomNum(18, 34);
	var question3 = "A soccer ball is kicked with an initial speed of <span class='probNum'>" + initSpd + "</span> m/s at an angle of <span class='probNum'>" + angle + "</span>&deg.<br> \
					What is the maximum height this ball will reach (to the nearest meter)? Assume the initial y-position is 0, and g = 9.80 m/s<sup>2</sup>.";
	angle = angle * Math.PI / 180;
	answer3 = initSpd * Math.sin(angle);
	answer3 = Math.pow(answer3, 2);
	answer3 = Math.round(answer3 / (2 * 9.8));
	return question3;
}

/* Problem 4: adding velocities */
var prob4 = document.getElementById("prob4");
var output4 = document.getElementById("output4");
prob4.innerHTML = problem4();
var answer4;
var hint4 = "When an object is travelling at an angle relative to a horizontal axis, its total velocity can be found by adding the velocities of its x- and y-components. \
			This can be solved by squaring the velocities of both the x- and y-components, adding them together, and finding the square root of this.";

function problem4(){
	var planeVel = randomNum(37, 54);
	var windVel = randomNum(17, 22);
	var question4 = "A plane travelling north has a velocity of <span class='probNum'>" + planeVel +"</span> m/s. The wind velocity is in the east direction, with a velocity of <span class='probNum'>" + windVel + "</span> m/s.<br> \
					What is the total velocity (to the nearest tenth of m/s) of the plane as it moves north and is pushed east by the wind?";
	answer4 = Math.sqrt( Math.pow(planeVel, 2) + Math.pow(windVel, 2) );
	answer4 = Math.round(answer4 * 10) / 10;
	return question4;
}