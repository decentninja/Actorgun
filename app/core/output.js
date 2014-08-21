function Output(type) {
	this.type = type
	this.data = null
	this.connections = []
}

Output.prototype.trigger = function() {
	var that = this
	setTimeout(function() {
		that.connections.forEach(function(connection) {
			connection.send(that.data)
		}, that)
	}, 0)

}

module.exports = Output