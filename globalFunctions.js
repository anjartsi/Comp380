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

