// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ RANDOM NUMBERS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var seed = 2;
// returns a random-ish number that can be seeded. 
// Should NOT be used in a final product
function randomNotReally() {
    var x = Math.sin(seed++);
    return x - Math.floor(x);
}

// returns a random INTEGER between max and min (inclusive) with an even distribution (tested)
// Note: this isn't really random, but it's a work-around so I can seed the random number
// uncomment the first line and delete the second to make it random every time
// See the randomNotReally function above
var randomInt = function(min, max){
  // return Math.floor(min + (max - min + 1) * Math.random());
  return Math.floor((min + 0.5) + (max - min) * randomNotReally());
}

// This function combines the randomInt() and randomNotReally() functions in
// globalFunctions.js to generate a random number in the range between min and max inclusive.
// wait is the number of milliseconds it takes to change the result. 1000 ms = 1 s. 86400000 ms = 1 day.
function randomNum(min, max){
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

// ~~~~~~~~~~~~~~~~~ Answer-checking function for sample problems ~~~~~~~~~~~~~~~~~~~~~

// inputField is the string for the element ID where the user's answer is typed in.
// elementOutput is the element that displays whether the answer is correct or not.
function answerCheck(inputField, answer, elementOutput){
	var input = document.getElementById(inputField).value;
	if (input == answer){
		elementOutput.innerHTML = "Correct!";
    elementOutput.className = "correct"
	}
	else{
		elementOutput.innerHTML = "Incorrect, please try again";
    elementOutput.className = "incorrect"
		
	}
}

// ~~~~~~~~~~~~~~~~~~~ Hint-displaying function ~~~~~~~~~~~~~~~~~~~~~~
function showHint(hint, elementOutput){
  elementOutput.innerHTML = hint;
  elementOutput.className = "hint"
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ HTML Class Functions~~~~~~~~~~~~~~~
function addClass(el, cls) {
  var classes = el.className.split(' ');
  classes.push(cls);
  el.className = classes.join(' ');
}

function removeClass(el, cls) {
  el.className = el.className.replace(cls,'');
}

function hasClass(el,cls) {
  return el.className.search(cls)!=-1
}

function toggleClass(el,cls) {
  if(hasClass(el,cls)){removeClass(el,cls)}
  else{addClass(el,cls)};
}

/*************************************************************************
                  Vertical Align: Center
Vertically centers an element based on its height and its parent element height
**************************************************************************/
function verticalCenter(elem) {
  var elemHeight = elem.clientHeight;
  var containerHeight = elem.parentElement.clientHeight;
  elem.style.marginTop = ( containerHeight - elemHeight ) / 2 + "px";
}
