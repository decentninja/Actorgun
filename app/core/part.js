function Part() {}

var nParts = 0

Part.prototype.init = function() {
	if(this.full()) {
		this.run()
	}
	this.id = nParts
	nParts++
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

module.exports = Part