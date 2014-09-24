var BrowserWindow = require("browser-window")


function Gluegun(app) {
	this.app = app
}

Gluegun.prototype.new = function() {
	window = new BrowserWindow({
		width: 800,
		height: 800
	})
	window.loadUrl("file://#1/part.html".replace("#1", __dirname))
}

Gluegun.prototype.open = function() {

}

module.exports = Gluegun