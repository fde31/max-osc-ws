module.exports = function(grunt) {

	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		browserify : {
			simple_example: {
				files: {
					'public/js/simple_example.js': ['client/simple_example/**/*.js']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-browserify');
};
