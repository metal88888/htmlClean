var gulp      = require('gulp');
var compass   = require('../node_modules/gulp-compass');
var plumber   = require('../node_modules/gulp-plumber');
var minifyCSS = require('../node_modules/gulp-minify-css');
var rename = require('../node_modules/gulp-rename');

var postcss  = require('../node_modules/gulp-postcss'),
autoprefixer = require('../node_modules/autoprefixer'),
cssgrace     = require('../node_modules/cssgrace'),
csswring     = require('../node_modules/csswring'),
csscomb      = require('../node_modules/gulp-csscomb'),
sourcemaps   = require('../node_modules/gulp-sourcemaps'),
uglify       = require('../node_modules/gulp-uglify'),
copy       = require('../node_modules/gulp-copy'),
usemin       = require('../node_modules/gulp-usemin');

var clean = require('../node_modules/gulp-clean');
var async = require('../node_modules/async');


var browserSync = require('../node_modules/browser-sync').create();

var proxyMiddleware = require('../node_modules/http-proxy-middleware');

// var proxy = proxyMiddleware('/tyjdk/', {target: 'http://183.129.130.220:91'});


// http://183.129.130.220:91/tyjdk/lottery/actionlottery
// http://183.129.130.220:91/tyjdk/lottery/actionlottery

gulp.task('watch',function(){

  // browserSync.init({
  //   server: {
  //     baseDir: "./",
  //     middleware: [proxy]
  //   }
  //   // proxy: "http://10.200.37.207/pfyh/tyjdk/"
  // });
  browserSync.init({
    server: "./"
    // proxy: "http://10.200.37.207/pfyh/tyjdk/"
  });

  // gulp.watch('./assets/**/*.scss', ['dosass'] );

  gulp.watch('./*.html').on('change', browserSync.reload);;
  // gulp.watch('./assets/js/**').on('change', browserSync.reload);
  // gulp.watch('./assets/**/*.js').on('change', browserSync.reload);

});


gulp.task('dosass', function() {

  var processors = [
      autoprefixer({browsers: ['last 1 version']}),
      require('../node_modules/cssgrace'),
      require('../node_modules/csswring')
  ];

  gulp.src('./assets/sass/*.scss')
	.pipe(plumber())
    .pipe(compass({
      css: './assets/css',
      sass: './assets/sass',
      config_file: './config.rb'
    }))

    .pipe( csscomb() )
    // .pipe( rename({ extname: '.comb.css' }) )
    // .pipe( gulp.dest('./assets') )
    .pipe( postcss( processors ) )
    .pipe( rename({ extname: '.min.css' }) )
    .pipe(minifyCSS())
    .pipe(rename('all.min.css') )
    .pipe( gulp.dest('assets/css') )
    // .pipe(browserSync.stream());

    // browserSync.reload;
});



gulp.task('clean-build', function () {
  return gulp.src('./build')
    .pipe(clean());
});

gulp.task('build',['clean-build'], function() {


  gulp.src('./index.html')
    .pipe(usemin({
      // js: [uglify()]
    }))
    .pipe(gulp.dest('build/'));

    gulp.src('assets/canvas/**/*.{jpg,png,gif}')
      .pipe(copy('./build/'));

    gulp.src('assets/css/all.min.css')
      .pipe(copy('./build/'));

    gulp.src('assets/js/app.js')
      .pipe(copy('./build/'));
    gulp.src('assets/images/**')
      .pipe(copy('./build/'));

});


gulp.task('build2', function() {
  del(['./build']);
  gulp.src('./index2.html')
    .pipe(usemin({
      jsmin: uglify()
    }))
    .pipe(gulp.dest('build2/'));


    gulp.src('assets/canvas/**/*.{jpg,png,gif}')
      .pipe(copy('./build2/'));

    gulp.src('assets/css/all.min.css')
      .pipe(copy('./build2/'));

    gulp.src('assets/js/app2.js')
      .pipe(copy('./build2/'));
    gulp.src('assets/images/**')
      .pipe(copy('./build2/'));

});


gulp.task('libsmin', function() {

  gulp.src('./build2/assets/js/libs.js')
   .pipe(uglify())
    .pipe(gulp.dest('./build2/dist'));
  gulp.src('./build2/assets/canvas/stages.js')
   .pipe(uglify())
    .pipe(gulp.dest('./build2/dist'));


})
gulp.task('canvasmin', function() {

  gulp.src('./main.js')
   .pipe(uglify())
    .pipe(gulp.dest('./canvas/'));
});
