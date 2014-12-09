var Menu = require("menu")
var BrowserWindow = require("browser-window")

function Topmenu(app) {
	this.app = app
	var that = this
	Menu.setApplicationMenu(Menu.buildFromTemplate([
	  {
	    label: 'Actorgun',
	    submenu: [
	      {
	        label: 'About Actorgun',
	        selector: 'orderFrontStandardAboutPanel:'
	      },
	      {
	        type: 'separator'
	      },
	      {
	        label: 'Hide Actorgun',
	        accelerator: 'Command+H',
	        selector: 'hide:'
	      },
	      {
	        label: 'Hide Others',
	        accelerator: 'Command+Shift+H',
	        selector: 'hideOtherApplications:'
	      },
	      {
	        label: 'Show All',
	        selector: 'unhideAllApplications:'
	      },
	      {
	        type: 'separator'
	      },
	      {
	        label: 'Quit',
	        accelerator: 'Command+Q',
	        click: function() {
	        	that.quit()
	        }
	      },
	    ]
	  },
	  {
	  	label: "File",
	  	submenu: [
	  		{
	  			label: "New Part",
	  			accelerator: "Command+N",
	  			click: function() {
	  				that.new()
	  			}
	  		},
	  		{
	  			label: "Open...",
	  			accelerator: "Command+O",
	  			click: function() {
	  				that.open()
	  			}
	  		},
	  		{
	  			label: "Development Mode",
	  			accelerator: "Command+D",
	  			click: function() {
	  				that.devmode()
	  			}
	  		},
	  		{
	  			label: "Close Part",
	  			accelerator: "Command+W",
	  			selector: 'performClose:'
	  		}
	  	]
	  },
	  {
	    label: 'Edit',
	    submenu: [
	      {
	        label: 'Undo',
	        accelerator: 'Command+Z',
	        selector: 'undo:'
	      },
	      {
	        label: 'Redo',
	        accelerator: 'Shift+Command+Z',
	        selector: 'redo:'
	      },
	      {
	        type: 'separator'
	      },
	      {
	        label: 'Cut',
	        accelerator: 'Command+X',
	        selector: 'cut:'
	      },
	      {
	        label: 'Copy',
	        accelerator: 'Command+C',
	        selector: 'copy:'
	      },
	      {
	        label: 'Paste',
	        accelerator: 'Command+V',
	        selector: 'paste:'
	      },
	      {
	        label: 'Select All',
	        accelerator: 'Command+A',
	        selector: 'selectAll:'
	      },
	    ]
	  },
	  {
	    label: 'Meta',
	    submenu: [
	      {
	        label: 'Reload',
	        accelerator: 'Command+R',
	        click: function() {
	        	that.reload()
	        }
	      },
	      {
	        label: 'Debug console',
	        accelerator: 'Alt+Command+I',
	        click: function() {
	        	that.devconsole()
	        }
	      },
	    ]
	  },
	  {
	    label: 'Window',
	    submenu: [
	      {
	        label: 'Minimize',
	        accelerator: 'Command+M',
	        selector: 'performMiniaturize:'
	      },
	      {
	        type: 'separator'
	      },
	      {
	        label: 'Bring All to Front',
	        selector: 'arrangeInFront:'
	      },
	    ]
	  },
	]))
}

Topmenu.prototype.quit = function() {
	this.app.quit()
}

Topmenu.prototype.new = function() {
	window = new BrowserWindow({
		width: 800,
		height: 800
	})
	window.loadUrl("file://#1/index.html".replace("#1", __dirname))
}

Topmenu.prototype.reload = function() {
	BrowserWindow.getFocusedWindow().reloadIgnoringCache()
}

Topmenu.prototype.devconsole = function() {
	BrowserWindow.getFocusedWindow().toggleDevTools()
	
}

Topmenu.prototype.devmode = function() {
	BrowserWindow.getFocusedWindow().webContents.send("toggle-devmode")
}

Topmenu.prototype.close = function() {
	BrowserWindow.getFocusedWindow().close()
}


module.exports = Topmenu
