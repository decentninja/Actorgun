var core = require("../app/core")
var testhelpers = require("./testhelpers")

describe("Part Parts", function() {
	it("connects parts", function(done) {
		var add1 = testhelpers.create_add()
		add1.init()
		add1.fill("a", 1)
		var add2 = testhelpers.create_add()
		add2.init()
		add2.fill("a", 2)
		var partpart = new core.PartPart("Add3", [add1, add2])
		partpart.init()
		partpart.connect(add1, "c", add2, "b")
		partpart.fill("b", 5)
		testhelpers.eventually(partpart.outputs.c, "data", 8, done)
	})
	it("connects parts of parts")
	it("disconnects parts")
	it("inherits html content")
	it("can turn html content on and off")
	it("pauses parts")
	it("manually steps parts")
})