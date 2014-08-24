function Output(type) {
	this.type = type
	this.data = null
}

Output.prototype.copy = function() {
	var r = new Output(this.type)
	r.data = this.data
	return r
}

module.exports = Output