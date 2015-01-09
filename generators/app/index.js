var yeoman = require('yeoman-generator'),
    Promise = require('promise'),
    unify = require('fayde-unify'),
    controls_version = "~0.16.0",
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
                            name: 'Fayde.Controls',
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
        gruntSetup: function () {
            this.copy('_package.json', 'package.json');
            this.copy('_Gruntfile.js', 'Gruntfile.js');
        }
    },
    writing: {
        appFiles: function () {
            this.copy('app/default.html', 'app/default.html');
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
        fayde: function () {
            var done = this.async();
            var libs = [];
            if (this.exjsModule)
                libs.push('exjs#' + exjs_version);
            if (this.controlsModule)
                libs.push('fayde.controls#' + controls_version);
            unify.commands.install({libs: libs, options: {save: true}}, done);
        },
        grunt: function () {
            this.npmInstall();
        }
    }
});