var Part = require("./part")

function JavascriptPart(name, inputs, outputs, update) {
	this.name = name
	this.inputs = inputs
	this.outputs = outputs
	this.update = update
}

JavascriptPart.prototype = new Part()

JavascriptPart.prototype.run = function() {
	var arguments = []
	for(var key in this.inputs) {
		arguments.push(this.inputs[key].data)
	}
	this.update.apply(this, arguments)
}

// To be used from inside update to send signal
JavascriptPart.prototype.send = function(out, data) {
	this.outputs[out].data = data
	this.outputs[out].trigger()
}

module.exports = JavascriptPart