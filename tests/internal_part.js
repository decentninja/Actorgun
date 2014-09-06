var core = require("../app/core")
var testhelpers = require("./testhelpers")

describe("Internal Parts", function() {
	it("it runs javascript", function(done) {
		var add = testhelpers.create_add()
		add.inputs[0].fill(3)
		add.inputs[1].fill(5)
		testhelpers.eventually(add.outputs[0], "data", 8, done)
	})
	it("runs continually", function(done) {
		var to10 = new core.InternalPart(
			[],
			[new core.Output("a")],
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
		testhelpers.eventually(to10.outputs[0], "data", 10, done)
	})
	it("runs destructors")
	it("updates html content")
	it("can add inputs and outputs to itself")	// example math may want to have x inputs as you add unknown to the equation
})