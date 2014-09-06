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

Output.prototype.disconnects = function(input) {
	// blabla and adds it self up the parent chain
}

Output.prototype.fill = function(data) {
	this.data = data
	this.connections.forEach(function(input) {
		input.fill(data)
	})
}


module.exports = Output