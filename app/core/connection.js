function Connection(part, input) {
	this.part = part
	this.input = input
}

Connection.prototype.send = function(data) {
	this.part.fill(this.input, data)
}

module.exports = Connection