var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var log = require('noogger');

gulp.task('develop', function() {
    var stream = nodemon({
        script: 'start.js',
        ext: 'html js',
        ignore: [ 'app/**/*', 'node_modules/**/*' ]
    });
    
    stream
        .on('restart', function() {
            log.info('restarted...');
        })
        .on('crash', function() {
            log.error('Application has crashed!\n');
            stream.emit('restart', 10);
        });
});

gulp.task('default', function() {
    console.log('Not implemented yet... Please try "gulp develop"');
});