var Connection = require("./connection")

function Part() {}

Part.prototype.init = function() {
	if(this.full()) {
		this.run()
	}
}

Part.prototype.full = function() {
	for(var key in this.inputs) {
		if(this.inputs[key].data == null) {
			return false
		}
	}
	return true
}

Part.prototype.fill = function(inputname, data) {
	this.inputs[inputname].data = data
	if(this.full()) {
		this.run()
	}
}

Part.prototype.connect = function(from, part, to) {
	this.outputs[from].connections.push(new Connection(part, to))
	this.outputs[from].trigger()
}

module.exports = Part