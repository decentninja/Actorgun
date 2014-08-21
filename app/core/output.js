function Output(type) {
	this.type = type
	this.data = null
	this.connections = []
}

Output.prototype.trigger = function() {
	this.connections.forEach(function(connection) {
		connection.send(this.data)
	}, this)
}

module.exports = Output