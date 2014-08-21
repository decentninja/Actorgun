var Connection = require("./connection")

function Part() {}

Part.prototype.init = function() {
	for(var key in this.inputs) {
		if(this.inputs[key].data == null) {
			return
		}
	}
	this.run()
}

Part.prototype.fill = function(inputname, data) {
	this.inputs[inputname].data = data
	this.run()
}

Part.prototype.connect = function(from, part, to) {
	this.outputs[from].connections.push(new Connection(part, to))
	this.outputs[from].trigger()
}

module.exports = Part