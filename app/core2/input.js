function Inputs(name, parent, default) {
	this.name = name
	this.parent = parent
	this.data = default || null
}


// Called by html representation or other parts
Inputs.prototype.fill = function(data) {
	this.data = data
	var that = this
	setTimeout(function() {
		that.parent.trigger(that.name, that.data)
	}, 0)
}