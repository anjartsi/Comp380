var Data = function(desc, unit, col) {
	this.dataType = "data";
	this.engine;
	this.value;
	this.desc = desc;
	this.units = unit;
	this.col = col;
	this.decimalPlaces = 2;
	// HTML elements linked to this data
	this.parentElem;
	this.valueElem = document.createElement("div");
	this.descElem = document.createElement("div");
	this.unitsElem = document.createElement("div");
	this.rowElem = document.createElement("div");
}

Data.prototype.addToEngine = function(engine) {
	engine.dataToUpdate.push(this);
	this.engine = engine;	
}

Data.prototype.makeDesc = function() {
	this.descElem.className = "controllerDescription " + this.dataType +  "Desc";
	this.descElem.innerHTML = this.desc;
}

Data.prototype.makeValue = function() {
	this.valueElem.className = "controllerValue " + this.dataType +  "Value";
	this.valueElem.innerHTML = this.value;
}

Data.prototype.makeUnits = function() {
	this.unitsElem.innerHTML = this.units;
	this.unitsElem.className = "unit";
}

Data.prototype.print = function(parentElem) {
	this.parent = parentElem;

	this.rowElem.className = "controllerRow " + this.dataType +  "Row";
	this.rowElem.style.color = this.col;

	this.makeDesc();
	this.makeValue();
	this.makeUnits();

	// add to controller
	this.rowElem.appendChild(this.descElem);
	this.rowElem.appendChild(this.valueElem);
	this.rowElem.appendChild(this.unitsElem);
	this.parent.appendChild(this.rowElem);
}

Data.prototype.update = function() {
	var newVal = this.manipulate();
	newVal = newVal.toFixed(this.decimalPlaces);
	this.value = newVal;
	this.valueElem.innerHTML = newVal;
}

Data.prototype.manipulate = function() {
	return 0;
}

/***********************************************
SLIDERDATA
************************************************/
var SliderData = function(desc, mini, maxi, unit, col) {
	Data.call(this, desc, unit, col);
	this.sliderElem = document.createElement("input");
	this.minVal = mini;
	this.maxVal = maxi;

}

SliderData.prototype = Object.create(Data.prototype)
SliderData.prototype.constructor = SliderData;

SliderData.prototype.addToEngine = function(engine) {
	engine.dataToUpdate.push(this);
	this.engine = engine;
}

SliderData.prototype.print = function(parentElem) {
	this.parent = parentElem;

	this.rowElem.className = "controllerRow " + this.dataType +  "Row";
	this.rowElem.style.color = this.col;

	this.makeDesc();
	this.makeSlider();
	this.makeValue();
	this.makeUnits();

	// add to controller
	this.rowElem.appendChild(this.descElem);
	this.rowElem.appendChild(this.sliderElem);
	this.rowElem.appendChild(this.valueElem);
	this.rowElem.appendChild(this.unitsElem);
	this.parent.appendChild(this.rowElem);
}

SliderData.prototype.update = function() {
	var newVal = this.manipulate();
	newVal = newVal.toFixed(this.decimalPlaces);
	this.value = newVal;
	this.valueElem.innerHTML = newVal;
	this.valueElem.value = newVal;
	this.sliderElem.value = newVal;
}

SliderData.prototype.makeDesc = function() {
	this.descElem.className = "controllerDescription sliderDesc";
	this.descElem.innerHTML = this.desc;
}

SliderData.prototype.makeValue = function() {
	this.valueElem.className = "controllerValue sliderValue";
	this.valueElem.innerHTML = this.value;
}

SliderData.prototype.makeUnits = function() {
	this.unitsElem.innerHTML = this.units;
	this.unitsElem.className = "unit";
}

SliderData.prototype.makeSlider = function() {
	this.sliderElem.type = "range";
	this.sliderElem.className = this.dataType +  "Slider";
	this.sliderElem.min = this.minVal;
	this.sliderElem.max = this.maxVal;
}


/***********************************************
SLIDERCONTROL
************************************************/
var SliderControl = function(desc, mini, maxi, unit, col) {
	SliderData.call(this, desc, mini, maxi, unit, col);
	this.dataType = "control";
	this.valueElem = document.createElement("input");
	this.valueElem.type = "number";
	this.thing;
}

SliderControl.prototype = Object.create(SliderData.prototype)
SliderControl.prototype.constructor = SliderControl;

SliderControl.prototype.addToEngine = function(engine, thing) {
	engine.dataToUpdate.push(this);
	engine.controls.push(this);
	this.engine = engine;
	this.thing = thing;
}



SliderData.prototype.makeValue = function() {
	this.valueElem.className = "controllerValue sliderValue";
	this.valueElem.value = this.value;
}

SliderData.prototype.print = function(parentElem) {
	this.parent = parentElem;

	this.rowElem.className = "controllerRow " + this.dataType +  "Row";
	this.rowElem.style.color = this.col;

	this.makeDesc();
	this.makeSlider();
	this.makeValue();
	this.makeUnits();

	// add to controller
	this.rowElem.appendChild(this.descElem);
	this.rowElem.appendChild(this.sliderElem);
	this.rowElem.appendChild(this.valueElem);
	this.rowElem.appendChild(this.unitsElem);
	this.parent.appendChild(this.rowElem);

	var controlSlider = this;

	// event listeners
	this.sliderElem.addEventListener("input", function() {
		controlSlider.value = parseInt(controlSlider.sliderElem.value, 10);
		controlSlider.valueElem.value = controlSlider.value;
		controlSlider.changeProperty();
		controlSlider.engine.drawEverything();
	})

	this.valueElem.addEventListener("input", function() {
		var inp = parseInt(controlSlider.valueElem.value, 10);
		if(inp > controlSlider.maxVal) {
			inp = controlSlider.maxVal;
			controlSlider.valueElem.value = controlSlider.maxVal;
		}
		else if (inp < controlSlider.minVal) {
			inp = controlSlider.minVal;
			controlSlider.valueElem.value = controlSlider.minVal;
		}
		if(inp == NaN || inp == null) {
			inp = controlSlider.minVal;
		}
		controlSlider.value = inp;
		controlSlider.sliderElem.value = inp;
		controlSlider.changeProperty();
		controlSlider.engine.drawEverything();
	})

}

SliderData.prototype.changeProperty = function() {
	return 0;
}

SliderControl.prototype.turnOff = function() {
	addClass(this.sliderElem, "turnedOff");
	addClass(this.valueElem, "turnedOff");
}

SliderControl.prototype.turnOn = function() {
	remove(this.sliderElem, "turnedOff");
	remove(this.valueElem, "turnedOff");
}