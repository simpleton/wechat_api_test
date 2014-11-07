var gulp = require('gulp')

var plugins = require("gulp-load-plugins")({lazy: false, camelize: true});
var del = require('del')

gulp.task('coffee', function() {
  gulp.src('./src/*.coffee')
    .pipe(plugins.coffee({bare: true}).on('error', plugins.util.log))
    .pipe(gulp.dest('./dist/'))
});

// Jade to HTML
gulp.task('jade', function() {
  return gulp.src("./src/jade/*.jade")
sudo             .pipe(plugins.jade({
              'pretty': true,
              'locals': yaml.safeLoad(fs.readFileSync('./src/db/data.yml', 'utf8'))
            }))
            .pipe(gulp.dest('./dist'))
});

// Compile SCSS as compressed CSS
gulp.task('sass', function() {
  return gulp.src(['./src/scss/app.scss',
                  './src/scss/**/*.sass'
                  ])
            .pipe(plugins.rubySass({
              loadPath: [loadPath[0],loadPath[1]]
            }))
            .on('error', function(err) {console.log(err.message);})
            .pipe(plugins.concat('app.css'))
            // .pipe(plugins.minifyCss({keepBreaks: true}))
            .pipe(gulp.dest('./dist/css'));
});

gulp.task('connect', plugins.connect.server({
    root: ['dist'],
    port: 9000,
    livereload: true
}));

gulp.task('watch',function(){
    gulp.watch([
        'dist/**/*.html',
        'dist/**/*.js',
        'dist/**/*.css',
        '!dist/bower_components/**/*.js',
        '!dist/bower_components/**/*.html',
    ], function(event) {
        return gulp.src(event.path)
            .pipe(plugins.connect.reload());
    });
    gulp.watch(['!./src/**/*_test.js','./src/js/**/*.js', '!./src/bower_components/**/*.js'],['scripts']);
    gulp.watch(['./src/jade/**/*.jade'],['jade']);
    gulp.watch(['./src/*.coffee'],['coffee']);
    gulp.watch(['./src/scss/app.scss','./src/scss/**/*.sass'],['sass']);

});

gulp.task('lint', function () {
  gulp.src('./**/*.js')
    .pipe(plugins.jshint())
})

gulp.task('develop', function () {
  plugins.nodemon({ script: 'dist/app.js', ext: 'html js', ignore: ['ignored.js'] })
    .on('change', ['lint'])
    .on('restart', function () {
      console.log('restarted!')
    })
})

// Delete the dist directory
gulp.task('clean', function(cb) {
  del(['./dist'], cb);
});

gulp.task('default', ['develop', 'coffee' ,'watch'])
gulp.task('build', ['clean', 'coffee'])
