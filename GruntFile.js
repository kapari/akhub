module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
      // Package
      pkg: grunt.file.readJSON('package.json'),

      // Uglify
      uglify: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n' +
                  ' * @author <%= pkg.author %>\n'
        },
        build: {
          src: 'src/<%= pkg.name %>.js',
          dest: 'build/<%= pkg.name %>.min.js'
        }
      }
      // Sass
      sass: {
          dev: {
            options: {
              style: 'expanded',
              banner: '<%= tag.banner %>',
              compass: true
            },
            files: {
              '<%= project.assets %>/css/style.css': '<%= project.css %>'
            }
          },
          dist: {
            options: {
              style: 'compressed',
              compass: true
            },
            files: {
              'css/style.css': 'scss/style.scss %>'
            }
          }
        },
        // Watch
        watch: {
          sass: {
            files: 'scss/{,*/}*.{scss,sass}',
            tasks: ['sass:dev']
          }
        }
    });
};

// Load Plugins (matchdep loads all others)
require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

// Default task
grunt.registerTask('default', [
  'sass:dev',
  'watch'
]);
// Deploy task
grunt.registerTask('deploy', [
  'sass:dist',
  'uglify:build'
]);
