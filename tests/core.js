var core = require("../app/core")

function createAdd() {
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

describe("Core", function() {

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
					expect(false).toEqual(true)
					done()
				}
			}
		}
		loop()
	}

	it("adds", function() {
		var add = createAdd()
		add.init()
		add.fill("a", 3)
		add.fill("b", 5)
		expect(add.outputs["c"].data).toEqual(8)
	}),
	it("connects together", function(done) {
		var add1 = createAdd()
		var add2 = createAdd()
		add1.init()
		add2.init()
		add1.fill("a", 1)
		add1.fill("b", 1)
		add2.fill("b", 5)
		add1.connect("c", add2, "a")
		eventually(add2.outputs.c, "data", 7, done)
	}),
	it("does not run if not full", function() {
		var add = createAdd()
		add.init()
		add.fill("a", 1)
		expect(add.full()).toEqual(false)
		expect(add.outputs["c"].data).toEqual(null)
	}),
	it("runs continually", function(done) {
		var to10 = new core.JavascriptPart(
			"Counter",
			{},
			{a: new core.Output("number")},
			function() {
				var counter = 0
				var that = this
				function loop() {
					counter++
					that.send("a", counter)
					if(counter < 10) {
						setTimeout(loop, 0)
					}
				}
				loop()
			}
		)
		spyOn(to10, "send").and.callThrough()
		to10.init()
		eventually(to10.outputs.a, "data", 10, done)
	})
})