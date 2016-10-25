var number = 0;

function randomNum(min, max){
	// This function combines the randomInt() and randomNotReally() functions in
	// globalFunctions.js to generate a random number in the range between min and max inclusive.
	// wait is the number of milliseconds it takes to change the result. 1000 ms = 1 s.
	var wait = 5000;
	var result;
  	var d1 = new Date().getTime();
 	var d2 = new Date().getTime() % wait;
 	d1 = d1 - d2;
 	d1 = Math.sin(d1);
 	d1 = d1 - Math.floor(d1);
 	result = Math.floor(((min + 0.5) + (max - min) * d1));
 	return result;
}
document.getElementById("num").innerHTML = randomNum(0, 10);
