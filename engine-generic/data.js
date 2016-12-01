var Data = function(val, desc, unit, col) {
	this.engine;
	this.value = val;
	this.desc = desc;
	this.units = unit;
	this.col = col;

	this.decimalPlaces = 2;
	// HTML elements linked to this data
	this.parentElem;
	this.rowElem = document.createElement("div");
	this.valueElem = document.createElement("div");
	this.descElem = document.createElement("div");
	this.unitsElem = document.createElement("div");
}

Data.prototype.addToEngine = function(engine) {
	engine.dataToUpdate.push(this);
	this.engine = engine;	
}

Data.prototype.writeDesc = function() {
	this.descElem.className = "dataDesc";
	this.descElem.innerHTML = this.desc;
}

Data.prototype.writeValue = function() {
	this.valueElem.className = "dataValue";
	this.valueElem.innerHTML = this.value;
}

Data.prototype.writeUnits = function() {
	this.unitsElem.innerHTML = this.units;
	this.unitsElem.className = "unit";
}

Data.prototype.print = function(parentElem) {
	this.parent = parentElem;
	this.rowElem.className = "dataRow";
	this.rowElem.style.color = this.col;

	this.writeDesc();
	this.writeValue();
	this.writeUnits();

	// add to controller
	this.rowElem.appendChild(this.descElem);
	this.rowElem.appendChild(this.valueElem);
	this.rowElem.appendChild(this.unitsElem);
	this.parent.appendChild(this.rowElem);
}

Data.prototype.update = function() {
	var newVal = this.recalculate();
	newVal = newVal.toFixed(this.decimalPlaces);
	this.value = newVal;
	this.valueElem.innerHTML = newVal;
}

Data.prototype.recalculate = function() {
	return 0;
}

// Mobile.prototype.addSlider = function(parent, variable, index, min, max, desc, units) {
// 	var mobile = this;
// 	var row = document.createElement("div");
// 	row.className = "controlRow";
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
// 	num.className = "numberInput"
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