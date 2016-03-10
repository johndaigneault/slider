module.exports = function(grunt) {
	
    // Configuration 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

		sass: {
		    dist: {
		        options: {
		            style: 'compressed',
		            sourcemap: 'none'
		        },
		        files: {
		            'demo/slider.css': 'slider.scss'
		        }
		    } 
		},
		
		postcss: {
        	options: {
        		processors: [
		            require('autoprefixer')({
						browsers: ['last 2 versions', 'ie 8', 'ie 9']
            		})
				]
        	},
			dist: {
                files: [{
				    src: 'demo/slider.css', 
				    dest: 'demo/slider.css' 
				}]
			}
      	},
      					
		watch: {
			options: {
		        livereload: true,
		    },
		    css: {
			    files: ['*.scss'],
			    tasks: ['sass', 'postcss'],
			    options: {
			    }
			}
		}

    });

    // Load Plugins
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-postcss');

    // Tasks
    grunt.registerTask('default', ['sass', 'postcss']);

};