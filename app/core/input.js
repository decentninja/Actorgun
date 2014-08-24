function Input(type, default_value) {
	this.type = type
	this.data = default_value || null
}

Input.prototype.copy = function() {
	return new Input(this.type, this.data)
}

module.exports = Input