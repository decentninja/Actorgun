var Part = require("./part")

function JavascriptPart(name, inputs, outputs, update) {
	this.name = name
	this.inputs = inputs
	for(var inputname in inputs) {
		inputs[inputname].javascript_part = this
	}
	this.outputs = outputs
	this.update = update
	this.parent = null
}

JavascriptPart.prototype = new Part()

JavascriptPart.prototype.run = function() {
	var args = []
	for(var key in this.inputs) {
		args.push(this.inputs[key].data)
	}
	var that = this
	setTimeout(function() {
		that.update.apply(that, args)
	}, 0)
}

// To be used from inside update to send signal
JavascriptPart.prototype.send = function(out, data) {
	this.outputs[out].data = data
	if(this.parent) {
		this.parent.newdata(this, out, data)
	}
}

module.exports = JavascriptPart