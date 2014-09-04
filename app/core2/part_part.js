function PartPart(name) {
	this.name = name
	this.parts = {}
	parts.forEach(function(part) {
		this.addPart(part)
	}, this)
}

PartPart.prototype = new Part()

PartPart.prototype.addPart = function(part) {
	part.parent = this
	this.parts[part.name] = part
	part.inputs.forEach(function(input) {
		this.inputs.push(input)
	}, this)
	part.outputs.forEach(function(output) {
		this.outputs.push(output)
	}, this)
}

PartPart.prototype.trigger = function(inputname, data) {
	// Nothing
}