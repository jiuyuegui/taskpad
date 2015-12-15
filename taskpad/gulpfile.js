var gulp = require('gulp');

var	autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
	jshint = require('gulp-jshint'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	babel = require('gulp-babel'),
	notify = require('gulp-notify'),
	livereload = require('gulp-livereload'),
	imagemin = require('gulp-imagemin'),
	cache = require('gulp-cache');

gulp.task('styles', function() {
	return gulp.src('src/css/**/*.css')
			   .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8'))
			   .pipe(concat('all.css'))
			   .pipe(rename({suffix: '.min'}))
			   .pipe(minifycss())
			   .pipe(gulp.dest('dist'))
			   .pipe(notify({message: 'styles task complete'}));
});

// gulp.task('scripts', function() {
	//js代码校验
	// return gulp.src('src/js/**/*.js') 
	/*		   .pipe(jshint())
			   .pipe(jshint.reporter('default'))	
	//js代码合并
			   .pipe(concat('all.js'))
	//react代码转译
			   .pipe(babel({
			    	presets: ['es2015']
			   }))
	//给文件添加min后缀
			   .pipe(rename({suffix: '.min'}))
	//js代码压缩
		       .pipe(uglify())
	//输出到指定目录
			   .pipe(gulp.dest('dist'))
    //提醒任务完成
    		   .pipe(notify({message: 'scripts task complete'}));*/
// });

gulp.task('images', function() {
	return gulp.src('src/img/*')
			   .pipe(cache(imagemin({optimizationLevel: 3, progressive: true, interlaced: true})))
			   .pipe(gulp.dest('images'))
			   .pipe(notify({message: 'images task complete'}));
});

gulp.task('watch', function() {
	//监听
	// gulp.watch('src/**/*.js', ['scripts']);
	gulp.watch('src/**/*.css', ['styles']);
	livereload.listen();
	gulp.watch(['dist/*']).on('change', livereload.changed);
});

gulp.task('default', function() {
	gulp.start('styles', 'images');
});


