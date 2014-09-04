function InternalPart(javascript) {
	this.name = "Internal Part"
	this.receivers = {}
	javascript.call(this)
}

InternalPart.prototype.send = function(outputname, data) {
	this.parent.outputs[outputname].fill(data)
}

InternalPart.prototype.receive = function(inputname, callback) {
	this.receivers[inputname] = callback
}

InternalPart.prototype.trigger = function(inputname, data) {
	this.receivers[inputname].call(this, data)
}

InternalPart.prototype = new Part()