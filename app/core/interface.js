function Interface() {}

Interface.prototype.create = function(name, type) {
	this.name = name
	this.data = null
	this.parent = null
	this.type = type		// Just a string that needs to match input and output
	this.connections = []
	if(typeof window !== "undefined") {
		this.html = document.createElement("div")
	} else {
		this.html = null
	}
}


module.exports = Interface