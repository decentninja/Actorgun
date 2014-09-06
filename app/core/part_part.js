var Part = require("./part")


function PartPart(name, parts) {
	this.create(name)
	this.parts = []
	parts.forEach(function(part) {
		this.addPart(part)
	}, this)
}

PartPart.prototype = new Part()

PartPart.prototype.addPart = function(part) {
	part.parent = this
	this.parts.push(part)
	part.inputs.forEach(function(input) {
		this.addInput(input, false)
	}, this)
	part.outputs.forEach(function(output) {
		this.addOutput(output, false)
	}, this)
}

PartPart.prototype.removePart = function(part) {
	// makes sure that all inputs and outputs have no other references
}


module.exports = PartPart