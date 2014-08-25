var core = require("../app/core")

function create_add() {
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
	eventually: eventually
}