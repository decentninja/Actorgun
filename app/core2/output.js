function Output(name, parent) {
	this.name = name
	this.parent = parent
	this.data = null
	this.connections = []		// Inputs
}

Output.prototype.connect = function(input) {
	this.connections.push(input)
	// TODO remove parent outputs[this] and inputs[input]
	if(this.data) {
		input.fill(data)
	}
}

Output.prototype.fill = function(data) {
	this.data = data
	this.connections.forEach(function(input) {
		input.fill(data)
	})
}