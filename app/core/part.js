var semver = require("semver")

function Part(name, inputs, outputs) {
	this.create(name, inputs, outputs)
}

Part.prototype.create = function(name, inputs, outputs) {
	this.name = name
	this.version = null		// Null = no version, string version
	this.noChanges()
	this.documentation = ""
	this.inputs = []
	if(inputs) {
		inputs.forEach(function(input) {
			this.addInput(input, true)
		}, this)
	}
	this.outputs = []
	if(outputs) {
		outputs.forEach(function(output) {
			this.addOutput(output, true)
		}, this)
	}
}

Part.prototype.noChanges = function() {
	this.on_save = {
		minor: false,
		major: false
	}
}

Part.prototype.addInput = function(input, owner) {
	this.on_save.minor = true
	this.inputs.push(input)
	if(owner) {
		input.parent = this
	}
}

Part.prototype.removeInput = function(input) {
	this.on_save.major = true
	var i = this.inputs.indexOf(input)
	if(i != -1) {
		this.inputs.splice(i, 1)
	}
}

Part.prototype.addOutput = function(output, owner) {
	this.on_save.minor = true
	this.outputs.push(output)
	if(owner) {
		output.parent = this
	}
}

Part.prototype.removeOutput = function(output) {
	this.on_save.major = true
	var i = this.outputs.indexOf(output)
	if(i != -1) {
		this.outputs.splice(i, 1)
	}
}

Part.prototype.release = function() {
	this.version = "1.0.0"
	// TODO Upload to server
}

Part.prototype.save = function() {
	if(this.version) {
		var distance
		if(this.on_save.major && !semver.satisfies(this.version, "0.x")) {
			distance = "major"
		} else if(this.on_save.minor) {
			distance = "minor"
		} else {
			distance = "patch"
		}
		this.version = semver.inc(this.version, distance)
	} else {
		this.version = "0.0.0"
	}
	this.noChanges()
	// TODO return json representation
}

Part.prototype.get = function(inputname) {
	var ret
	this.inputs.forEach(function(input) {
		if(input.name == inputname) {
			ret = input.data
		}
	})
	return ret
}


module.exports = Part