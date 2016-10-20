module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			hapi: {
				files: [ '**/*.js', '!app/*.js' ],
				tasks: [ 'hapi' ],
				options: {
					spawn: false
				}
			}
		},
		hapi: {
			custom_options: {
				options: {
					server: require('path').resolve('./index')
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-hapi');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', [ 'hapi', 'watch' ]);
}