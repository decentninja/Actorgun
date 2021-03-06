if(typeof window === "undefined") {
	var Part = require("./part")
}


function InternalPart(inputs, outputs, code) {
	this.create("Internal Part", inputs, outputs)
	this.receivers = {}
	code.call(this)
}

InternalPart.prototype = new Part()

InternalPart.prototype.send = function(outputname, data) {
	this.outputs.forEach(function(output) {
		if(output.name == outputname) {
			output.fill(data)
		}
	})
}

InternalPart.prototype.receive = function(inputname, callback) {
	this.receivers[inputname] = callback
	var data = this.get(inputname)
	var that = this
	if(data) {
		setTimeout(function() {
			that.trigger(inputname, data)
		}, 0)
	}
}

InternalPart.prototype.trigger = function(inputname, data) {
	this.receivers[inputname].call(this, data)
}


module.exports = InternalPart