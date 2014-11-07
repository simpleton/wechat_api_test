var gulp = require('gulp')

var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var runSequence = require('run-sequence');

gulp.task('coffee', function() {
  gulp.src('./src/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./public/'))
});

// Jade to HTML
gulp.task('jade', function() {
  return gulp.src("./src/jade/*.jade")
            .pipe(plugins.jade({
              'pretty': true,
              'locals': yaml.safeLoad(fs.readFileSync('./src/db/data.yml', 'utf8'))
            }))
            .pipe(gulp.dest('./dist'))
});

gulp.task('default', ['coffee'])
