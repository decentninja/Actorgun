var gulp = require("gulp")
var shell = require("gulp-shell")
var downloadatomshell = require("gulp-download-atom-shell")

gulp.task("install", function(cb) {
	downloadatomshell({
		version: "0.15.8",
		outputDir: "binaries"
	}, cb)
})

gulp.task("demo", shell.task([
	"./binaries/Atom.app/Contents/MacOS/Atom app/"
]))