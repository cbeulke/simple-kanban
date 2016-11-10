var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('develop', function() {
    var stream = nodemon({
        script: 'start.js',
        ext: 'html js',
        ignore: [ 'app/**/*', 'node_modules/**/*' ]
    });
});

gulp.task('default', function() {
    console.log('Not implemented yet... Please try "gulp develop"');
});