function PartPart(name, parts) {
	this.parts = parts
	this.calculate_ports()
}
PartPart.prototype = Object.create(Part.prototype)

PartPart.prototype.calculate_ports = function() {
	this.inputs = []
	this.outputs = []
	this.parts.forEach(function(part) {
		part.inputs.forEach(function(input) {
			if(!input.isConnected) {
				this.inputs.push(input)
			}
		})
		part.outputs.forEach(function(output) {
			if(outputs.connections.length !== 0) {
				this.outputs.push(output)
			}
		})
	}, this)
}

PartPart.prototype.run = function() {
	
}

module.exports = PartPart