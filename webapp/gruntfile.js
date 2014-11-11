module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // Simple but very effective cleaning
    clean: {
      dev: [
        'development/'
      ],
      dist: [
        'distribution/'
      ]
    },
    // Minify JavaScript (only)
    uglify: {
      options: {
        // banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        preserveComments: 'some'
      },
      // For distribution only
      dist: {
        options: {
          compress: {
            drop_console: true
          }
        },
        files: {
          'distribution/script/main.min.js': [
            'source/assets/scripts/vendor/*.js',
            'source/assets/scripts/app/helpers.js',
            'source/assets/scripts/app/namespaces.js',
            'source/assets/scripts/app/config/*.js',
            'source/assets/scripts/app/model/*.js',
            'source/assets/scripts/app/view/*.js',
            'source/assets/scripts/app/controller/*.js',
            'source/assets/scripts/app/main.js'
          ]
        }
      },
      // For development just minify the vendors and save to 'build/'
      dev: {
        files: {
          'build/assets/scripts/vendor/vendors.min.js': [
            'source/assets/scripts/vendor/*.js'
          ]
        }
      }
    },
    // minify css
    cssmin: {
      // Distribution minies all
      dist: {
        files: {
          'distribution/css/main.css': [
            'source/assets/styles/vendor/*.css',
            'source/assets/styles/base.css',
            'source/assets/styles/components/*.css',
            'source/assets/styles/views/*.css'
          ]
        }
      },
      // Development needs minied vendors
      dev: {
        files: {
          'build/assets/styles/vendor/vendors.min.css': [
            'source/assets/styles/vendor/*.css'
          ]
        }
      }
    },
    concat: {
      options: {
        // banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        stripBanners: true
      },
      styles: {
        files: {
          // css files
          'development/assets/main.css': [
            'build/assets/styles/vendor/vendors.min.css',
            'source/assets/styles/base.css',
            'source/assets/styles/components/*.css',
            'source/assets/styles/views/*.css'
          ]
        }
      },
      scripts: {
        files: {
          // js files
          'development/assets/main.js': [
            'build/assets/scripts/vendor/vendors.min.js',
            'source/assets/scripts/app/namespaces.js',
            'source/assets/scripts/app/helpers.js',
            'source/assets/scripts/app/config/*.js',
            'source/assets/scripts/app/model/*.js',
            'source/assets/scripts/app/view/*.js',
            'source/assets/scripts/app/controller/*.js',
            'source/assets/scripts/app/main.js'
          ]
        }
      }
    },
    // to just copy the html files
    copy: {
      dev: {
        expand: true,
        cwd: 'source/assets/views/',
        src: ['*.html','**/*.html'],
        dest: 'development/',
        // flatten: true
        // filter: 'isFile',
      },
      dist: {
        expand: true,
        cwd: 'source/assets/views/',
        src: ['*.html','**/*.html'],
        dest: 'distribution/',
        // flatten: true
        // filter: 'isFile',
      }
    },
    watch: {
      scripts: {
        files: [
          'source/assets/scripts/**/*.js'
        ],
        tasks: [
          'uglify:dev',
          'concat:scripts'
        ]
      },
      styles: {
        files: [
          'source/assets/styles/**/*.css'
        ],
        tasks: [
          'cssmin:dev',
          'concat:styles'
        ]
      },
      html: {
        files: [
          'source/assets/views/*.html'
        ],
        tasks: [
          'copy:dev'
        ]
      }
    }
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('develop', ['clean:dev','uglify:dev','cssmin:dev','concat','copy:dev','watch']);
  grunt.registerTask('distribute', ['clean:dist','uglify:dist','cssmin:dist','copy:dist']);
  grunt.registerTask('default', ['develop']);

};