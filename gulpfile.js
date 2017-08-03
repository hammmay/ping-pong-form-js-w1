var del = require('del');
var gulp = require('gulp');
var concat = require('gulp-concat');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var utilities = require('gulp-util');
var buildProduction = utilities.env.production;
var jshint = require('gulp-jshint');

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

//this will clean up our environment before a build (the build folder and the temp folder where the other tools and tasks created concatinated files)
gulp.task("clean", function(){
  return del(['build', 'tmp']);
});

//uses minifyScripts and jsBrowserify to call upon all 3 in this order, if, you are in the build production environment: concatInterface -> jsBrowserify -> minifyScripts. We'll put clean right before the build task and call it automatically by making it a dependency of our build task so whether we're making a production or a development build, we will clean up first.
gulp.task("build", ['clean'], function(){
  if (buildProduction) {
    gulp.start('minifyScripts');
  } else {
    gulp.start('jsBrowserify');
  }
});

//proofreads the code:
gulp.task('jshint', function(){
  return gulp.src(['js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
