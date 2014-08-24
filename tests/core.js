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

describe("Javascript Parts", function() {

	it("it runs javascript", function(done) {
		var add = createAdd()
		add.init()
		add.fill("a", 3)
		add.fill("b", 5)
		eventually(add.outputs.c, "data", 8, done)
	})
	it("does not run parts if not full", function() {
		var add = createAdd()
		add.init()
		add.fill("a", 1)
		expect(add.full()).toEqual(false)
		expect(add.outputs["c"].data).toEqual(null)
	})
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
		to10.init()
		eventually(to10.outputs.a, "data", 10, done)
	})
	it("runs destructors on fill or delete")
	it("has html content")
})

describe("Part Parts", function() {
	it("connects parts", function(done) {
		var add1 = createAdd()
		add1.init()
		add1.fill("a", 1)
		var add2 = createAdd()
		add2.init()
		add2.fill("a", 2)
		var partpart = new core.PartPart("Add3", [add1, add2])
		partpart.init()
		partpart.connect(add1, "c", add2, "b")
		partpart.fill("b", 5)
		eventually(partpart.outputs.c, "data", 8, done)
	})
	it("connects parts of parts")
	it("disconnects parts")
	it("inherits html content")
	it("can turn html content on and off")
	it("pauses parts")
	it("manually steps parts")
})