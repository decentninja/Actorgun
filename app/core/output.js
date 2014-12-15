if(typeof window === "undefined") {
	var Interface = require("./interface")
}

function Output(name, type) {
	this.create(name, type)
	this.way = "output"
}

Output.prototype = new Interface()

Output.prototype.connect = function(input) {
	if(this.type === input.type) {
		this.connections.push(input)
		input.connections.push(this)
		if(this.data) {
			input.fill(this.data)
		}
	} else {
		throw new TypeError(this.type + " != " + input.type)
	}
}

Output.prototype.disconnect = function(input) {
	var index = this.connections.indexOf(input)
	var jndex = this.connections[index].connections.indexOf(this)
	this.connections[index].connections.splice(jndex, 1)
	this.connections.splice(index, 1)
}

Output.prototype.fill = function(data) {
	this.data = data
	this.connections.forEach(function(input) {
		input.fill(data)
	})
}


module.exports = Output