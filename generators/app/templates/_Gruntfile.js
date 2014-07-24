module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-typescript');

    grunt.initConfig({
        typescript: {
            build: {
                src: ['app/**/*.ts', '!app/lib/**/*.ts'],
                options: {
                    module: 'amd',
                    target: 'es5',
                    sourceMap: true
                }
            }
        },
        watch: {
            files: 'app/**/*.ts',
            tasks: ['typescript:build']
        }
    });

    grunt.registerTask('default', ['typescript:build']);
};