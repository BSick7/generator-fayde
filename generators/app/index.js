var yeoman = require('yeoman-generator');

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
                            value: 'controlsModule',
                            name: 'Fayde-Controls',
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
                done();
            }.bind(this));
        }
    },
    configuring: {
        bowerSetup: function () {
            this.copy('_bowerrc', '.bowerrc');
            if (this.controlsModule) {
                this.copy('_bower.ex.json', 'bower.json');
            } else {
                this.copy('_bower.json', 'bower.json');
            }
        },
        gruntSetup: function () {
            this.copy('_package.json', 'package.json');
            this.copy('_Gruntfile.js', 'Gruntfile.js');
        }
    },
    writing: {
        appFiles: function () {
            if (this.controlsModule) {
                this.copy('app/default.ex.html', 'app/default.html');
            } else {
                this.copy('app/default.html', 'app/default.html');
            }
            this.copy('app/default.fap', 'app/default.fap');
            this.copy('app/ViewModels/MainViewModel.ts', 'app/ViewModels/MainViewModel.ts');
        }
    },
    install: {
        typescript: function () {
            var done = this.async();
            this.npmInstall(['typescript'], { 'saveDev': true }, done);
        },
        bower: function () {
            this.bowerInstall();
        },
        grunt: function () {
            this.npmInstall();
        }
    }
});