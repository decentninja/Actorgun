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
	it("Test suite works", function() {
		expect(true).toBe(true)
	}),
	it("adds", function() {
		var add = createAdd()
		add.fill("a", 3)
		add.fill("b", 5)
		expect(add.outputs["c"].data).toBe(8)
	}),
	it("connects together", function() {
		var add1 = createAdd()
		var add2 = createAdd()
		add1.fill("a", 1)
		add1.fill("b", 1)
		add2.fill("b", 5)
		add1.connect("c", add2, "a")
		expect(add2.outputs["c"].data).toBe(7)
	})
})