'use strict';


module.exports = function browserify(grunt) {
	// Load task
	grunt.loadNpmTasks('grunt-browserify');

	// Options
	return {
		build: {
			files: {
				'.build/js/application.js': ['public/js/application.js'],
                '.build/dist/js/editor.js': ['public/js/manager/**/*.js'],
                '.build/js/public.js': ['public/js/public.js'],
                'public/dist/js/application.js': ['public/js/application.js'],
                'public/dist/js/editor.js': ['public/js/manager/**/*.js'],
                'public/dist/js/public.js': ['public/js/public.js']
			},
			options: {
                "transform": ["reactify"]
            }
		}
	};
};
