const gulp = require('gulp');

const dist = "./dist";

gulp.task("copy-php", () => {
	return gulp
		.src("./src/**/*.php", {
            base: './src/'
        })
		.pipe(gulp.dest(dist))
});

gulp.task("watch", () => {
    gulp.watch('./src/**/*', gulp.parallel('copy-php'));
});