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
                this.exjsModule = props.modules.exjsModule;
                this.controlsModule = props.modules.controlsModule;
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
            var context = {
                exjs_lib: '',
                controls_lib: ''
            };
            if (this.exjsModule)
                context.exjs_lib = genScriptInclude('lib/exjs/dist/ex.min.js');
            if (this.controlsModule)
                context.controls_lib = genLibShim('Fayde.Controls', 'lib/Fayde.Controls/Fayde.Controls', 'Fayde.Controls');

            this.template('app/_default.html', 'app/default.html', context);
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
            var _this = this;

            var done = this.async();
            var promise = new Promise(function (fulfill, reject) {
                _this.bowerInstall([], fulfill);
            });
            promise
                .then(function () {
                    if (_this.controlsModule)
                        return new Promise(function (fulfill, reject) {
                            _this.bowerInstall(['git://github.com/BSick7/Fayde.Controls.git'], {saveDev: true}, fulfill);
                        });
                })
                .then(function () {
                    if (_this.exjsModule)
                        return new Promise(function (fulfill, reject) {
                            _this.bowerInstall(['git://github.com/BSick7/exjs.git'], {saveDev: true}, fulfill);
                        });
                })
                .then(done);
        },
        grunt: function () {
            this.npmInstall();
        }
    }
});

function genScriptInclude(src) {
    return '<script src="' + src + '"></script>\
    ';
}
function genLibShim(libName, libPath, exports) {
    return '\
    <script data-lib="' + libName + '">\
        require.shim["' + libPath + '"] = {\
            exports: "' + exports + '"\
        };\
    </script>';
}