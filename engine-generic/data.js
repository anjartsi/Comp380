var Data = function(parentElem, val, desc, unit, col) {
	this.engine;
	this.parent = parentElem;
	this.value = val;
	this.desc = desc;
	this.units = unit;
	this.col = col;
	this.dataValue = document.createElement("div");
}

Data.prototype.addToEngine = function(engine) {
	engine.dataToUpdate.push(this);
	this.engine = engine;

	var row = document.createElement("div");
	row.className = "dataRow";
	row.style.color = this.col;

	// create description
	var name = document.createElement("div");
	name.className = "dataDesc";
	name.innerHTML = this.desc;
	// create value
	this.dataValue.className = "dataValue";
	this.dataValue.innerHTML = this.value;
	
	// create units
	var unit = document.createElement("div");
	unit.innerHTML = this.units;
	unit.className = "unit";

	// add to controller
	row.appendChild(name);
	row.appendChild(this.dataValue);
	row.appendChild(unit);
	this.parent.appendChild(row);
}

Data.prototype.update = function() {
	var newVal = this.recalculate();
	newVal = newVal.toFixed(2);
	this.value = newVal;
	this.dataValue.innerHTML = newVal;
}

Data.prototype.recalculate = function() {
	return 0;
}

