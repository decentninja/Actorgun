var app = require("app")
var Topmenu = require("./topmenu.js")


process.on('error', function(err) {
  console.error(err)
  // TODO dialog for production, but only production
});

var topmenu = new Topmenu(app);

app.on('window-all-closed', function() {
	if (process.platform != 'darwin') {
  		app.quit()
	}
});

app.on('ready', function() {
  topmenu.new()
})