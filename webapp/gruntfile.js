module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      dev: [
        'development/'
      ],
      dist: [
        'distribution/'
      ]
    },
    // Uglifying
    uglify: {
      options: {
        // banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        preserveComments: 'some'
      },
      dist: {
        options: {
          compress: {
            drop_console: true
          }
        },
        files: {
          'distribution/script/main.js': [
            'source/assets/scripts/vendor/*.js',
            'source/assets/scripts/app/namespaces.js',
            'source/assets/scripts/app/helpers.js',
            'source/assets/scripts/app/model/*.js',
            'source/assets/scripts/app/view/*.js',
            'source/assets/scripts/app/controller/*.js',
            'source/assets/scripts/app/main.js'
          ]
        }
      },
      dev: {
        options: {
          banner: '/*! BUILD BY UGLIFY FOR DEVELOPMENT: EXCLUDE AS SOURCE FOR DISTRIBUTION */\n'
        },
        files: {
          'source/assets/script/vendor/vendors.min.build.js': [
            'source/assets/scripts/vendor/*.js',
            '!source/assets/scripts/vendor/vendors.min.build.js'
          ]
        }
      }
    },
    cssmin: {
      dist: {
        files: {
          'distribution/css/main.css': [
            'source/assets/css/vendor/*.css',
            'source/assets/css/base.css',
            'source/assets/css/components/*.css',
            'source/assets/css/views/*.css'
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
            'source/assets/styles/vendor/*.css',
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
            'source/assets/scripts/vendor/vendors.min.js',
            'source/assets/scripts/app/namespaces.js',
            'source/assets/scripts/app/helpers.js',
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
      options: {
        livereload: true,
      },
      scripts: {
        files: [
          'source/assets/scripts/*/*.js',
          '!source/assets/scripts/vendor/vendors.min.js'
        ],
        tasks: [
          'uglify:dev',
          'concat:scripts'
        ],
      },
      styles: {
        files: [
          'source/assets/styles/*/*.js',
          '!source/assets/styles/vendor/vendors.min.js'
        ],
        tasks: [
          'concat:styles'
        ],
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
  grunt.registerTask('develop', ['clean:dev','uglify:dev','concat','copy:dev','watch']);
  grunt.registerTask('distribute', ['clean:dist','uglify:dist','cssmin','copy:dist']);
  grunt.registerTask('default', ['develop']);

};