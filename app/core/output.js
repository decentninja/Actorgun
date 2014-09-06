function Output(name) {
	this.name = name
	this.data = null
	this.connections = []		// Inputs
}

Output.prototype.connect = function(input) {
	this.connections.push(input)
	var parent = this.parent.parent
	while(parent) {
		parent.removeInput(input)
		parent.removeOutput(this)
		parent = parent.parent
	}
	if(this.data) {
		input.fill(data)
	}
}

Output.prototype.disconnect = function(input) {
	var index = this.connections.indexOf(input)
	this.connections.splice(index, 1)
	var parent = this.parent.parent
	while(parent) {
		parent.addInput(input, false)
		parent.addOutput(this, false)
		parent = parent.parent
	}
}

Output.prototype.fill = function(data) {
	this.data = data
	this.connections.forEach(function(input) {
		input.fill(data)
	})
}


module.exports = Output