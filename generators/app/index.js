var yeoman = require('yeoman-generator'),
    Promise = require('promise'),
    unify = require('fayde-unify'),
    controls_version = "*",
    exjs_version = "*";

module.exports = yeoman.generators.Base.extend({
    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);
    },
    prompting: {
        promptName: function () {
            var done = this.async();
            this.prompt({
                type: 'input',
                name: 'name',
                message: 'Your project name',
                default: this.appname // Default to current folder name
            }, function (answers) {
                this.name = answers.name;
                this.log(answers.name);
                done();
            }.bind(this));
        },
        promptModules: function () {
            var done = this.async();

            var prompts = [
                {
                    type: 'checkbox',
                    name: 'modules',
                    message: 'Which modules would you like to include?',
                    choices: [
                        {
                            value: 'exjsModule',
                            name: 'exjs',
                            checked: true
                        },
                        {
                            value: 'controlsModule',
                            name: 'fayde.controls',
                            checked: true
                        }
                    ]
                }
            ];

            this.prompt(prompts, function (props) {
                var hasMod = function (mod) {
                    return props.modules.indexOf(mod) !== -1;
                };
                this.controlsModule = hasMod('controlsModule');
                this.exjsModule = hasMod('exjsModule');
                done();
            }.bind(this));
        }
    },
    configuring: {
        bowerSetup: function () {
            this.copy('_bowerrc', '.bowerrc');
            this.copy('_bower.json', 'bower.json');
        },
        gulpSetup: function () {
            this.copy('_package.json', 'package.json');
            this.directory('gulp', 'gulp');
            this.copy('_gulpfile.js', 'gulpfile.js');
        }
    },
    writing: {
        appFiles: function () {
            this.copy('app/index.html', 'app/index.html');
            this.copy('app/default.fap', 'app/default.fap');
            this.copy('app/ViewModels/MainViewModel.ts', 'app/ViewModels/MainViewModel.ts');
        }
    },
    install: {
        unify: function () {
            var done = this.async();
            unify.commands.init({
                name: this.name,
                tests: ['app/fayde.json'],
                type: 'app'
            }, done);
        },
        unifyBower: function () {
            var done = this.async();
            unify.commands.bower({}, done);
        },
        bower: function () {
            var done = this.async();
            var libs = ['fayde'];
            if (this.exjsModule)
                libs.push('exjs#' + exjs_version);
            if (this.controlsModule)
                libs.push('fayde.controls#' + controls_version);
            this.bowerInstall(libs, {save: true}, done);
        },
        grunt: function () {
            this.npmInstall();
        }
    }
});