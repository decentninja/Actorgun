// Sample data
var partpart = new PartPart("Top", [])
var empty = new InternalPart([], [], function() {})
empty.name = "Empty"
var negative = new InternalPart([], [new Output("Out", "String")], function() {})
negative.name = "Negative"
var one = new InternalPart([new Input("In", "String")], [new Output("Out", "String")], function() {})
one.name = "One"
var two = new InternalPart([new Input("In", "String")], [new Output("Out", "String")], function() {})
two.name = "Two"
var tre = new InternalPart([new Input("In", "String"), new Input("In", "String")], [new Output("Out", "String")], function() {})
tre.name = "Tre"
partpart.addPart(one)
partpart.addPart(two)
partpart.addPart(empty)
partpart.addPart(tre)
partpart.addPart(negative)
one.outputs[0].connect(two.inputs[0])
two.outputs[0].connect(tre.inputs[0])
negative.outputs[0].connect(tre.inputs[1])


Polymer({
	editmode: "editmode",
	switchmode: function() {
		var columnstyles = [].map.call(this.shadowRoot.querySelectorAll('.column'), function(o) {return o.style})
		if(this.editmode) {
			this.editmode = ""
			var n = this.columns.map(this.full).filter(function(o) {return !o}).length
			columnstyles.map(function(o) {o.width = 100 / n + "vw"})
		} else {
			this.editmode = "editmode"
			columnstyles.map(function(o) {o.width = "14em"})
		}
	},
	part: partpart,
	columns: [],
	ready: function() {
		this.calculateColumns()
	},
	lines: [{
		from: [0, 0],
		to: [200, 200]
	}],
	full: function(column) {
		return column.every(function(part) {
			return part.inputs.every(function(input) {
				return input.connections.length != 0
			}) && part.outputs.every(function(output) {
				return output.connections.length != 0
			})
		})
	},
	calculateColumns: function() {
		/*
			Places the parts the columns.
			1. Finds parts that does not have any connected inputs.
			2. Goes through the parts and adds parts that are not already in the columns, in the depth columns.
			3. Connected parts from that part go to 2.
		*/
		this.columns = []
		var withoutDeps = this.part.parts.filter(function(part) {
			return part.outputs.every(function(output) {
				return output.connections.length == 0
			})
		})
		var that = this
		function recursive(parts, icolumn) {
			parts.forEach(function(part) {
				if(that.columns[icolumn]) {
					that.columns[icolumn].push(part)
				} else {
					that.columns[icolumn] = [part]
				}
				part.inputs.forEach(function(input) {
					input.connections.forEach(function(output) {
						recursive([output.parent], icolumn + 1)
					})
				})
			})
		}
		recursive(withoutDeps, 0)
		this.columns.reverse()
	}
})