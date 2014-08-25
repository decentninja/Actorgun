var core = require("../app/core")
var testhelpers = require("./testhelpers")

describe("Javascript Parts", function() {
	it("it runs javascript", function(done) {
		var add = testhelpers.create_add()
		add.init()
		add.fill("a", 3)
		add.fill("b", 5)
		testhelpers.eventually(add.outputs.c, "data", 8, done)
	})
	it("does not run parts if not full", function() {
		var add = testhelpers.create_add()
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
		testhelpers.eventually(to10.outputs.a, "data", 10, done)
	})
	it("runs destructors on fill or delete")
	it("has html content")
})