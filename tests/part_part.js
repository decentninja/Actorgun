var core = require("../app/core")
var testhelpers = require("./testhelpers")

describe("Part Parts", function() {
	it("has multiple part", function() {
		var add1 = testhelpers.create_add()
		var add2 = testhelpers.create_add()
		var partpart = new core.PartPart("adders", [add1, add2])
		expect(Object.keys(partpart.inputs).length).toBe(4)
		expect(Object.keys(partpart.outputs).length).toBe(2)
	})
	it("connects parts", function(done) {
		var partpart = testhelpers.create_partpart()
		partpart.fill("b2", 5)
		console.log(partpart)
		testhelpers.eventually(partpart.outputs.c2, "data", 8, done)
	})
	it("connects parts of parts of parts", function(done) {
		var partpart3 = testhelpers.create_partpart()
		var partpart2 = testhelpers.create_partpart()
		var partpart1 = new core.PartPart("Add6", [partpart2, partpart3])
		partpart1.connect(partpart2, "c", partpart3, "b")
		partpart1.fill("b", 10)
		testhelpers.eventually(partpart1.outputs.c, "data", 16, done)
	})
	xit("disconnects parts", function(done) {
		// Disconnects parts so that there are two outputs c and c2. c will be 1000
		var partpart = testhelpers.create_partpart()
		var parts = []
		for(var partid in partpart.parts) {
			parts.push(partpart.parts[partid])
		}
		partpart.disconnect(parts[0], "c", parts[1], "b")
		partpart.fill("b", 999)
		testhelpers.eventually(partpart.outputs.c, "data", 1000, done)
	})
	it("can connect one output to two inputs")
	it("already connected parts from the outside gets disconnected when same name gets degraded from name extension like 2")
	it("inherits html content")
	it("can turn html content on and off")
	it("pauses parts")
	it("manually steps parts")
})