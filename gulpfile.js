var gulp = require("gulp")
var shell = require("gulp-shell")
var downloadatomshell = require("gulp-download-atom-shell")
var jasmine = require("gulp-jasmine")
var less = require("gulp-less")
var path = require("path")
var sourcemaps = require("gulp-sourcemaps")
var watch = require("gulp-watch")
var plumber = require('gulp-plumber')

gulp.task("install", function(cb) {
	downloadatomshell({
		version: "0.15.8",
		outputDir: "binaries"
	}, cb)
})

gulp.task('less', function () {
  gulp.src("app/**/*.less")
  	.pipe(plumber())
  	.pipe(watch("app/**/*.less"))
	.pipe(sourcemaps.init())
	.pipe(less())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('app'))
});

gulp.task("demo", ["less"], shell.task([
	"./binaries/Atom.app/Contents/MacOS/Atom app/"
]))

gulp.task('test', function () {
	return gulp.src('tests/test.js').pipe(jasmine({
		includeStackTrace: true
	}))
})

gulp.task("default", ["demo"])