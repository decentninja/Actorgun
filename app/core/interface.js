function Interface() {}

Interface.prototype.create = function(name) {
	this.name = name
	this.data = null
	this.parent = null
	this.connections = []
}


module.exports = Interface