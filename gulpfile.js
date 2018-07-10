
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');
var del = require('del');
var runSequence = require('run-sequence');

// var source      = 'src/',
//     dest        = 'dist/',
//     sassPath    = 'app/scss/'
//     nodePath   = 'node_modules/';

// Fonts
// var fonts = {
//   in: [
//       bowerPath + 'bootstrap-sass/assets/fonts/**/*',
//       bowerPath + 'font-awesome/fonts/*'
//   ],
//   out: dest + 'fonts/'
// };

// Copy bootstrap required fonts to dist
gulp.task('fonts', function () {
  //return gulp
  //    .src(fonts.in)
  //    .pipe(gulp.dest(fonts.out));
  return gulp.src([
    'node_modules/font-awesome/fonts/**/*'])
    .pipe(gulp.dest('app/fonts/'));
});

gulp.task('clean:dist', function() {
  return del.sync('dist');
})

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

gulp.task('watch', ['browserSync', 'sass'], function (){
    gulp.watch('app/scss/**/*.scss', ['sass']); 
    gulp.watch('app/*.html', browserSync.reload); 
    gulp.watch('app/js/**/*.js', browserSync.reload);
  // Other watchers
});

gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});

//gulp.task('fonts', function() {
//  return gulp.src('app/fonts/**/*')
//  .pipe(gulp.dest('dist/fonts'))
//})

gulp.task('sass', function(){
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('default', function (callback) {
  runSequence(['holderjs', 'fonts', 'boostrapjs', 'sass','browserSync', 'watch'],
    callback
  )
})

gulp.task('holderjs', function() {
  return gulp.src('node_modules/holderjs/holder.js')
  .pipe(gulp.dest('app/js'))
});

gulp.task('boostrapjs', function() {
  return gulp.src('node_modules/bootstrap/dist/js/bootstrap.min.js')
  .pipe(gulp.dest('app/js'))
});