//require need modules
var gulp = require('gulp'),
flatten = require('gulp-flatten'), //不创建子目录
sequence = require( 'gulp-run-sequence' ),
del = require( 'del' ),
Sass = require( 'gulp-sass' );

//规避gulp报错时中断监听
function swallowError(error) {
  // If you want details of the error in the console
  console.error(error.toString())
  this.emit('end')
}

/***************************************************************/
/*clear folder*/
gulp.task( 'del', function() {
  del( [ './static/css/modal.css', './static/css/const.css' ] );
} );
/***************************************************************/

/***************************************************************/
/*compile all .scss files*/
gulp.task( 'sass', function() {
  return gulp.src( [ './static/scss/*.scss', '!./static/scss/const.scss'  ] )
  .pipe( Sass() )
  .on('error', swallowError)// 用来规避报错时的退出
  .pipe( flatten() )
  .pipe( gulp.dest( './static/css/' ) )
} );
/***************************************************************/

/*****************************************************/
/*set default task*/
gulp.task( 'default', function() {
  sequence( 'del', 'sass' );
} );
/*****************************************************/