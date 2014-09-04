var Part = require("./part")
var Output = require("./output")
var Input = require("./input")

function PartPart(name, parts) {
	this.name = name
	this.parts = {}
	this.connections = {}		// {partid: {outputname: {partid: partid, input: inputname}}}
	this.inputs = {}
	this.outputs = {}
	if(parts) {
		parts.forEach(function(part) {
			this.addPart(part)
		}, this)
	}
	this.parent = null
}

PartPart.prototype = new Part()

PartPart.prototype.run = function() {
	// Should be empty right?
}

PartPart.prototype.addPart = function(part) {
	this.parts[part.id] = part
	part.parent = this
	this.connections[part.id] = {}
	for(var inputname in part.inputs) {
		this.inputs[newName(inputname, this.inputs)] = part.inputs[inputname]
	}
	for(var outputname in part.outputs) {
		this.outputs[newName(outputname, this.outputs)] = part.outputs[outputname]
	}
}

function newName(original, inside) {
	var newname = original
	var n = 2
	while(inside[newname]) {
		newname += n
		n++
	}
	return newname
}

PartPart.prototype.connect = function(partA, output, partB, input) {
	this.connections[partA.id][output] = {
		partid: partB.id,
		input: input
	}
	delete this.inputs[input]
	delete this.outputs[output]
	var data = partA.outputs[output].data
	if(data) {
		partB.fill(input, data)
	}
}

PartPart.prototype.disconnect = function(partA, outputname, partB, inputname) {
	delete this.connections[partA.id][outputname]
	this.outputs[outputname] = partA.outputs[outputname]
	this.inputs[inputname] = partB.inputs[inputname]
}

// Called by outside parts or ui of new data
PartPart.prototype.fill = function(inputname, data) {
	if(!this.inputs[inputname]) {
		throw new Error("No such input", inputname)
	}
	this.inputs[inputname].fill(data)
}

// Called by inside parts notifying of new data
PartPart.prototype.newdata = function(part, output, data) {
	var con = this.connections[part.id][output]
	if(con) {
		this.parts[con.partid].fill(con.input, data)
	} else {
		if(!this.outputs[output]) {
			throw new Error("No such output " + output)
		}
		this.outputs[output].data = data
		if(this.parent) {
			this.parent.newdata(this, output, data)
		}
	}
}

module.exports = PartPart