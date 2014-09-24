var app = require("app")
var Topmenu = require("./topmenu.js")
var Gluegun = require("./gluegun.js")

process.on('error', function(err) {
  console.error(err);
  // TODO dialog for production, but only production
});

var gluegun = new Gluegun(app)

var topmenu = new Topmenu(app, gluegun);

app.on('window-all-closed', function() {
	if (process.platform != 'darwin') {
  		app.quit();
	}
});

app.on('ready', function() {
  gluegun.new()
})