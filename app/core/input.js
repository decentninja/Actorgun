var Interface = require("./interface")

function Input(name, default_value) {
	this.create(name)
	if(default_value !== undefined) {
		this.data = default_value
	}
}

Input.prototype = new Interface()


// Called by html representation or other parts
Input.prototype.fill = function(data) {
	this.data = data
	var that = this
	setTimeout(function() {
		that.parent.trigger(that.name, that.data)
	}, 0)
}


module.exports = Input