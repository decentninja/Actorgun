var core = require("../app/core")
var testhelpers = require("./testhelpers")

describe("Interface", function() {
	it("update html")
})

describe("Input", function() {
	it("primitives get its html automagicly")
	it("can be filled from html")
	it("throws TypeError on wrongly connections", function() {
		var partpart = testhelpers.create_partpart()
		partpart.parts[1].inputs[0].type = "string"
		expect(function() {
			partpart.parts[0].outputs[0].connect(partpart.parts[1].inputs[0])
		}).toThrow()
	})
})

describe("Output", function() {
})