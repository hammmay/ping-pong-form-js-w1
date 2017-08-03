var utilities = require('gulp-util');
var gulp = require('gulp');
var concat = require('gulp-concat');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buildProduction = utilities.env.production;


gulp.task('jsBrowserify', ['concatInterface'], function() {
  return browserify({ entries: ['./tmp/allConcat.js'] })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/js'));
});

//this is what will make the allConcat.js file and the JS files need to be referenced in path in the array
gulp.task('concatInterface', function() {
  return gulp.src(['./js/pingpong-interface.js', './js/signup-interface.js'])
    .pipe(concat('allConcat.js'))
    .pipe(gulp.dest('./tmp'));
});

//running this will also run jsBrowserify and then concatInterface because it's part of jsBrowserify
gulp.task("minifyScripts", ["jsBrowserify"], function(){
  return gulp.src("./build/js/app.js")
    .pipe(uglify())
    .pipe(gulp.dest("./build/js"));
});

//uses minifyScripts and jsBrowserify to call upon all 3 in this order concatInterface -> jsBrowserify -> minifyScripts.
gulp.task("build", function(){
  if (buildProduction) {
    gulp.start('minifyScripts');
  } else {
    gulp.start('jsBrowserify');
  }
});
