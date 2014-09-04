function Input(type, default_value) {
	this.type = type
	this.data = default_value || null
	this.javascript_part = null	// Inputs can exist in multiple partpart but only one javascript part, this is that part.
}

Input.prototype.fill = function(data) {
	// TODO type safety?
	this.data = data
	this.javascript_part.run()
}

Input.prototype.copy = function() {
	return new Input(this.type, this.data)
}

module.exports = Input