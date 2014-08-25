var core = require("../app/core")

function create_add() {
	// javascriptPart with nothing filled
	return new core.JavascriptPart(
		"Add",
		{
			a: new core.Input("number"), 
			b: new core.Input("number")
		},
		{
			c: new core.Output("number")
		},
		function(a, b) {
			this.send('c', a + b)
		}
	)
}

function create_partpart() {
	// PartPart with b in and c out. in the end it adds 3.
	var add1 = create_add()
	add1.init()
	add1.fill("a", 1)
	var add2 = create_add()
	add2.init()
	add2.fill("a", 2)
	var partpart = new core.PartPart("Add3", [add1, add2])
	partpart.init()
	partpart.connect(add1, "c", add2, "b")
	return partpart
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