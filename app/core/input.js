function Input(name, default_value) {
	this.name = name
	this.parent = null
	this.data = default_value || null
}


// Called by html representation or other parts
Input.prototype.fill = function(data) {
	this.data = data
	var that = this
	setTimeout(function() {
		that.parent.trigger(that.name, that.data)
	}, 0)
}


module.exports = Input