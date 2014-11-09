Polymer({
	part: new PartPart("Name", [new InternalPart([], [], function() {})]),
	columns: [
		[{name: "blu"}, {}, {}],	// parts
		[{}, {}],
		[{}],
	],
	ready: function() {
		this.part.parts.forEach(function(part) {
			var ndeps = 0 // TODO calculate # part dependencies
			if(this.columns[ndeps]) {
				this.columns[ndeps].push(part)
			} else {
				this.columns[ndeps] = [part]
			}
		}, this)
	}
})