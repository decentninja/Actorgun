// Sample data
var partpart = new PartPart("Top", [])
partpart.documentation = "I'm the sample part before loading of parts in implemented. This should be editable."
var empty = new InternalPart([], [], function() {})
empty.documentation = "I'm just an empty part that does nothing."
empty.version = "1.0.0"
empty.name = "Empty"
var negative = new InternalPart([], [new Output("Out", "String")], function() {})
negative.documentation = "I should be to the right."
negative.name = "Negative"
negative.version = "1.0.0"
var one = new InternalPart([new Input("In", "String")], [new Output("Out", "String")], function() {})
one.documentation = "I'm the most to the left as I have no dependencies."
one.name = "One"
one.inputs[0].html.appendChild(document.createElement("input"))
var input = document.createElement("input")
input.style.width = "80%"
one.outputs[0].html.appendChild(input)
one.version = "1.0.0"

var two = new PartPart("Two", [])
two.version = "WAAT"
var twotwo = new InternalPart([new Input("Longer Name", "String")], [new Output("Loger", "String")], function() {})
var ind = document.createElement("input")
ind.type = "number"
twotwo.inputs[0].html.appendChild(ind)
two.addPart(twotwo)
var bla = new InternalPart([new Input("Should not be seen", "String")], [new Output("Should not be seen", "String")], function() {})
two.addPart(bla)
two.connect(bla.outputs[0], bla.inputs[0])

var tre = new InternalPart([new Input("In", "String"), new Input("In", "String")], [new Output("Out", "String")], function() {})
tre.name = "Tre"
tre.version = "0.0.5"
partpart.addPart(one)
partpart.addPart(two)
partpart.addPart(empty)
partpart.addPart(tre)
partpart.addPart(negative)
partpart.connect(one.outputs[0], two.inputs[0])
partpart.connect(two.outputs[0], tre.inputs[0])



Polymer({
	editmode: "editmode",
	switchmode: function() {
		var columnstyles = [].map.call(this.shadowRoot.querySelectorAll('.column'), function(o) {return o.style})
		if(this.editmode) {
			this.editmode = ""
			var n = this.columns.map(this.full).filter(function(o) {return !o}).length
			var width = 100 / n + "vw"
		} else {
			this.editmode = "editmode"
			var width = "14em"
		}
		columnstyles.map(function(o) {
			o.width = width
		})
	},
	part: partpart,
	columns: [],
	ready: function() {
		this.calculateColumns()
		var that = this
		setTimeout(function() {that.calculateLines()}, 0)
		window.onresize = function() {
			that.resize()
		}
	},
	creatorline: {
		from: [0, 0],
		to: [0, 0],
		type: null
	},
	lines: [],
	calculateLines: function() {
		this.lines = []
		var parts = this.shadowRoot.querySelectorAll("block-part")
		var all_inputs = []
		var all_outputs = []
		;[].forEach.call(parts, function(part) {
			var inputs = part.shadowRoot.querySelectorAll(".input > type-circle")
			var outputs = part.shadowRoot.querySelectorAll(".output > type-circle")
			;[].forEach.call(inputs, function(type_circle) {
				all_inputs.push(type_circle)
			})
			;[].forEach.call(outputs, function(type_circle) {
				all_outputs.push(type_circle)
			})
		})
		all_outputs.forEach(function(output) {
			var output_rect = output.getBoundingClientRect()
			output.interface.connections.forEach(function(input) {
				var input_element
				all_inputs.forEach(function(inda) {
					if(input == inda.interface) {
						input_element = inda
					}
				})
				var input_rect = input_element.getBoundingClientRect()
				this.lines.push({
					input: input,
					output: output.interface,
					from: [
						output_rect.left + output_rect.width / 2,
						output_rect.top + output_rect.height / 2
					],
					to: [
						input_rect.left + output_rect.width / 2,
						input_rect.top + output_rect.height / 2
					],
					type: output.interface.type
				})
			}, this)
		}, this)
	},
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
			Places the parts the columns. We build it up backwards recursivly and then reverse it

			i = 0
			for each part that has no connected inputs
				recurse i = 0
			reverse columns
			
			where recurse is
				if not added yet
					add to column i
					for each input
						for each connection from that output
							go to the top-1 part and add that
							recurse with i+1
		*/
		this.columns = []
		var withoutDeps = this.part.parts.filter(function(part) {
			return part.outputs.every(function(output) {
				return output.connections.length == 0
			})
		})
		var that = this
		function recursive(part, icolumn) {
			var noaddedyet = that.columns.filter(function(column) {
				return column.indexOf(part) != -1
			}).length == 0
			if(noaddedyet) {
				if(that.columns[icolumn]) {
					that.columns[icolumn].push(part)
				} else {
					that.columns[icolumn] = [part]
				}
				part.inputs.forEach(function(input) {
					input.connections.forEach(function(output) {
						var part = output.parent
						while(part.parent != that.part) {
							part = part.parent
						}
						recursive(part, icolumn + 1)
					})
				})
			}
		}
		withoutDeps.forEach(function(wd) {
			recursive(wd, 0)
		})
		this.columns.reverse()
	},
	start: function(e) {
		var img = document.createElement("img")
		img.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D"	// Tiny empty gif
		e.dataTransfer.setDragImage(img, 0, 0);
		this.creatorline = {
			from: [e.x, e.y],
			to: [e.x, e.y],
			type: e.from.type
		}
	},
	drag: function(e) {
		if(e.x != 0) {	// Webkit bug at end of drag
			this.creatorline.to = [e.x, e.y]
		}
	},
	connector: {
		from: null,
		to: null,
		position: [0, 0]
	},
	tagfrom: function(e) {
		this.connector.from = e.detail
	},
	tagto: function(e) {
		this.connector.to = e.detail.to
		this.connector.position = e.detail.position
	},
	removeline: function(event, detail, sender) {
		var line = this.lines[parseInt(sender.dataset.line)]
		console.log(line)
		this.part.disconnect(line.output, line.input)
		this.calculateColumns()
		this.calculateLines()
	},
	end: function(e) {
		var xdiff = Math.abs(e.x - this.connector.position[0])
		var ydiff = Math.abs(e.y - this.connector.position[1])
		if(xdiff + ydiff < 40 && this.connector.from.way != this.connector.to.way) {
			if(this.connector.from.way == "input" && this.connector.to.way == "output") {
				var input = this.connector.from
				var output = this.connector.to
			}
			if(this.connector.from.way == "output" && this.connector.to.way == "input") {
				var output = this.connector.from
				var input = this.connector.to
			}
			this.part.connect(output, input)
			this.calculateColumns()
			var that = this
			setTimeout(function() {that.calculateLines()}, 0)
		}
		this.creatorline = {
			from: [0, 0],
			to: [0, 0]
		}
	},
	resize: function(e) {
		this.calculateLines()
	}
})