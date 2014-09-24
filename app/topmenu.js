var Menu = require("menu")
var BrowserWindow = require("browser-window")

function Topmenu(app, gluegun) {
	this.app = app
	this.gluegun = gluegun
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
	  				that.gluegun.new()
	  			}
	  		},
	  		{
	  			label: "Open...",
	  			accelerator: "Command+O",
	  			click: function() {
	  				that.gluegun.open()
	  			}
	  		},
	  		{
	  			label: "Close Part",
	  			accelerator: "Command+W",
	  			click: function() {
	  				console.log("HI")
	  				that.close()
	  			}
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
	        label: 'Toggle DevTools',
	        accelerator: 'Alt+Command+I',
	        click: function() {
	        	that.devtools
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
	        label: 'Close',
	        accelerator: 'Command+W',
	        selector: 'performClose:'
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

Topmenu.prototype.reload = function() {
	BrowserWindow.getFocusedWindow().reloadIgnoringCache()
}

Topmenu.prototype.devtools = function() {
	BrowserWindow.getFocusedWindow().toggleDevTools()
}

Topmenu.prototype.close = function() {
	BrowserWindow.getFocusedWindow().close()
}


module.exports = Topmenu