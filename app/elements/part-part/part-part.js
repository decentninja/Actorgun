// Sample data
function create_add() {
	// javascriptPart with nothing filled
	var part = new InternalPart(
		[new Input("a", "number", 1), new Input("b", "number", 1)],
		[new Output("c", "number")],
		function() {
			var a, b
			var that = this
			var a_input = document.createElement("input")
			this.inputs[0].html.appendChild(a_input)
			var b_input = document.createElement("input")
			this.inputs[1].html.appendChild(b_input)
			var c_result = document.createElement("p")
			c_result.innerHTML = "bla"
			this.outputs[0].html.appendChild(c_result)

			function update_c() {
				if(a && b) {
					var result = parseInt(a) + parseInt(b)
					c_result.innerHTML = result
					that.send("c", result)
				}
			}
			function update_a(aa) {
				a = aa
				a_input.value = aa
				update_c()
			}
			this.receive("a", update_a)
			function update_b(bb) {
				b_input.value = bb
				b = bb
				update_c()
			}
			this.receive("b", update_b)
			a_input.onkeyup = function() {
				update_a(a_input.value)
			}
			b_input.onkeyup = function() {
				update_b(b_input.value)
			}
		}
	)
	part.name = "Add"
	return part
}

var partpart = new PartPart("Top", [])
partpart.documentation = "I'm the sample part before loading of parts in implemented. This should be editable."

partpart.addPart(create_add())
partpart.addPart(create_add())
partpart.addPart(create_add())


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