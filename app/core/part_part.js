var Part = require("./part")
var Output = require("./output")
var Input = require("./input")

function PartPart(name, parts) {
	this.name = name
	this.parts = {}
	this.connections = {}		// {partid: {outputname: {partid: partid, input: inputname}}}
	if(parts) {
		parts.forEach(function(part) {
			this.addPart(part, true)
		}, this)
	}
	this.calculate_ports()
}

PartPart.prototype = new Part()

PartPart.prototype.run = function() {
	// Should be empty right?
}

PartPart.prototype.addPart = function(part, nocalcport) {
	this.parts[part.id] = part
	part.parent = this
	this.connections[part.id] = {}
	if(!nocalcport) {
		this.calculate_ports()
	}
}

PartPart.prototype.connect = function(partA, output, partB, input) {
	this.connections[partA.id][output] = {
		partid: partB.id,
		input: input
	}
	var data = partA.outputs[output].data
	if(data) {
		partB.fill(input, data)
	}
	this.calculate_ports()
}

PartPart.prototype.calculate_ports = function() {
	this.inputs = {}
	this.outputs = {}
	this.internal_connections = {}
	for(var partid in this.connections) {
		record = this.connections[partid]
		for(var outputname in record) {
			var con = record[outputname]
			this.parts[partid].inputs[con.input].connected = true
			this.parts[partid].outputs[outputname].connected = true
		}
	}
	for(var partid in this.parts) {
		var part = this.parts[partid]
		for(var inname in part.inputs) {
			var input = part.inputs[inname]
			if(input.connected) {
				delete input.connected
				var newname = inname
				var n = 2
				while(this.internal_connections[newname]) {
					newname += n
					n++
				}
				this.internal_connections[newname] = part
				this.inputs[inname] = input.copy()
			}
		}
		for(var outname in part.outputs) {
			var output = part.outputs[outname]
			if(output.connected) {
				delete output.connected
				var newname = outname
				var n = 2
				while(this.internal_connections[newname]) {
					newname += n
					n++
				}
				this.outputs[newname] = output.copy()
			}
		}
	}
}

PartPart.prototype.fill = function(inputname, data) {
	if(!this.inputs[inputname]) {
		console.log("bdf", inputname, data)
		console.log(this)
	}
	this.inputs[inputname].data = data
	this.internal_connections[inputname].fill(inputname, data)
}

PartPart.prototype.newdata = function(part, output, data) {
	var con = this.connections[part.id][output]
	if(con) {
		this.parts[con.partid].fill(con.input, data)
	} else {
		this.outputs[output].data = data
		if(this.parent) {
			this.parent.newdata(this, output, data)
		}
	}
}

module.exports = PartPart