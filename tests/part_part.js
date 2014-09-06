var core = require("../app/core")
var testhelpers = require("./testhelpers")

describe("Part Parts", function() {
	it("has multiple part", function() {
		var partpart = testhelpers.create_partpart()
		expect(partpart.inputs.length).toBe(4)
		expect(partpart.outputs.length).toBe(2)
	})
	it("connects parts", function(done) {
		var partpart = testhelpers.create_partpart()
		partpart.parts[0].outputs[0].connect(partpart.parts[1].inputs[0])
		expect(partpart.inputs.length).toBe(3)
		expect(partpart.outputs.length).toBe(1)
		partpart.inputs[0].fill(1)
		partpart.inputs[1].fill(2)
		partpart.inputs[2].fill(3)
		testhelpers.eventually(partpart.outputs[0], "data", 6, done)
	})
	it("propagates data on connection", function(done) {
		var partpart = testhelpers.create_partpart()
		partpart.inputs[0].fill(1)
		partpart.inputs[1].fill(2)
		setTimeout(function() {
			partpart.parts[0].outputs[0].connect(partpart.parts[1].inputs[0])
			expect(partpart.inputs.length).toBe(3)
			expect(partpart.outputs.length).toBe(1)
			partpart.inputs[2].fill(3)
			testhelpers.eventually(partpart.outputs[0], "data", 6, done)
		}, 0)
	})
	it("connects parts of parts of parts", function(done) {
		var partpart1 = testhelpers.create_partpart()
		partpart1.parts[0].outputs[0].connect(partpart1.parts[1].inputs[0])
		var partpart2 = testhelpers.create_partpart()
		partpart2.parts[0].outputs[0].connect(partpart2.parts[1].inputs[0])
		var partpart3 = new core.PartPart("Mega Adder", [partpart1, partpart2])
		partpart3.parts[0].outputs[0].connect(partpart3.parts[1].inputs[0])
		expect(partpart3.inputs.length).toBe(5)
		expect(partpart3.outputs.length).toBe(1)
		partpart3.inputs.forEach(function(input, i) {
			input.fill(i+1)
		})
		testhelpers.eventually(partpart3.outputs[0], "data", 15, done)
	})
	it("disconnects parts", function(done) {
		var partpart = testhelpers.create_partpart()
		partpart.parts[0].outputs[0].connect(partpart.parts[1].inputs[0])
		expect(partpart.parts[1].inputs[0].connections.length).toBe(1)
		expect(partpart.inputs.length).toBe(3)
		expect(partpart.outputs.length).toBe(1)
		partpart.inputs[0].fill(1)
		partpart.inputs[1].fill(2)
		partpart.inputs[2].fill(3)
		setTimeout(function() {
			partpart.parts[0].outputs[0].disconnect(partpart.parts[1].inputs[0])
			expect(partpart.parts[1].inputs[0].connections.length).toBe(0)
			expect(partpart.parts[0].outputs[0].connections.length).toBe(0)
			expect(partpart.inputs.length).toBe(4)
			expect(partpart.outputs.length).toBe(2)
			partpart.inputs[0].fill(1000)
			testhelpers.eventually(partpart.outputs[0], "data", 6, done)
		}, 0)
	})
	it("can remove part", function() {
		var partpart = testhelpers.create_partpart()
		partpart.parts[0].outputs[0].connect(partpart.parts[1].inputs[0])
		partpart.removePart(partpart.parts[1])
		expect(partpart.parts.length).toBe(1)
		expect(partpart.parts[0].outputs[0].connections.length).toBe(0)
	})
	it("can connect one output to two inputs")
	it("already connected parts from the outside gets disconnected when same name gets degraded from name extension like 2")
	it("inherits html content")
	it("can turn html content on and off")
	it("pauses parts")
	it("manually steps parts")
})