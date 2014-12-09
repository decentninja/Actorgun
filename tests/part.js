var core = require("../app/core")

describe("Part", function() {
	it("have documentation", function() {
		var part = new core.Part("Test", [], [])
		if(part.documentation != "") {
			expect(false).toBe(true)
		}
	})
	it("saves correctly")
	it("decodes correctly")
	it("semvers")
})