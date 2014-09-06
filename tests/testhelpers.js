var core = require("../app/core")

var n = 0

function create_add() {
	// javascriptPart with nothing filled
	var part = new core.InternalPart(
		[new core.Input("a", 1), new core.Input("b", 1)],
		[new core.Output("c")],
		function() {
			var a, b
			var that = this
			function update() {
				if(a && b) {
					that.send("c", a + b)
				}
			}
			this.receive("a", function(aa) {
				a = aa
				update()
			})
			this.receive("b", function(bb) {
				b = bb
				update()
			})
		}
	)
	part.debugid = n++
	return part
}

function create_partpart() {
	return new core.PartPart("Advanced Super 2000", [create_add(), create_add()])
}

function eventually(obj, field, be, done) {
	var timeout = 500
	function loop() {
		if(obj[field] == be) {
			done()
		} else {
			timeout -= 5
			if(timeout > 0) {
				setTimeout(loop, 5)
			} else {
				expect(obj[field]).toEqual(be)
				done()
			}
		}
	}
	loop()
}

module.exports = {
	create_add: create_add,
	create_partpart: create_partpart,
	eventually: eventually
}