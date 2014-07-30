var yeoman = require('yeoman-generator'),
    Promise = require('promise');

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
        },
        faydeSetup: function () {
            var config = this.src.readJSON('app/fayde.json');
            if (this.exjsModule) {
                config.libs["exjs"] = {
                    "path": "lib/exjs/dist/ex.min",
                    "exports": "exjs"
                };
            }
            if (this.controlsModule) {
                config.libs["Fayde.Controls"] = {
                    "exports": "Fayde.Controls"
                };
            }

            this.dest.write('app/fayde.json', JSON.stringify(config, undefined, 2));
        }
    },
    writing: {
        appFiles: function () {
            this.copy('app/require-config.js', 'app/require-config.js');
            this.copy('app/default.html', 'app/default.html');
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
            var done = this.async();
            var deps = [];
            if (this.controlsModule)
                deps.push('fayde.controls');
            if (this.exjsModule)
                deps.push('exjs');
            this.bowerInstall(deps, { save: true }, done);
        },
        grunt: function () {
            this.npmInstall();
        }
    }
});