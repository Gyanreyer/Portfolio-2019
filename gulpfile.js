const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const nodemon = require('gulp-nodemon');
const eslint = require('gulp-eslint');

gulp.task('sass', ()=>{
   gulp.src('./scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./hosted/style')); 
});

gulp.task('js', () => {
    gulp.src('./client/*.js')
        .pipe(babel({
            presets: ['env', 'babili']//Compile for backwards compat and minify
        }))
        .pipe(gulp.dest('./hosted'));
});

gulp.task('lint', () => {
    return gulp.src(['./server/*.js'])
        .pipe(eslint({fix:true}))
        .pipe(eslint.format())
        .pipe(gulp.dest('./server'))
        .pipe(eslint.failAfterError());
});

gulp.task('watch', () => {
    gulp.watch('./scss/*.scss', ['sass']);
    gulp.watch('./client/*.js', ['js']);

    nodemon({ 
        script: './server/app.js',
        ext: 'js',
        tasts: ['lint']
    });
});

gulp.task('build', () => {
    gulp.start('sass');
    gulp.start('js');
    gulp.start('lint');
});