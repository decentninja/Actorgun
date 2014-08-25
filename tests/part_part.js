var core = require("../app/core")
var testhelpers = require("./testhelpers")

describe("Part Parts", function() {
	it("connects parts", function(done) {
		var partpart = testhelpers.create_partpart()
		partpart.fill("b", 5)
		testhelpers.eventually(partpart.outputs.c, "data", 8, done)
	})
	it("connects parts of parts of parts", function(done) {
		var partpart3 = testhelpers.create_partpart()
		var partpart2 = testhelpers.create_partpart()
		var partpart1 = new core.PartPart("Add6", [partpart2, partpart3])
		partpart1.connect(partpart2, "c", partpart3, "b")
		partpart1.fill("b", 10)
		testhelpers.eventually(partpart1.outputs.c, "data", 16, done)
	})
	it("disconnects parts", function() {
		var partpart = testhelpers.create_partpart()
		
	})
	it("inherits html content")
	it("can turn html content on and off")
	it("pauses parts")
	it("manually steps parts")
})