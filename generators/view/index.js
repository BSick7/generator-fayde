var yeoman = require('yeoman-generator'),
    path = require('path');

module.exports = yeoman.generators.Base.extend({
    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);
        this.argument('name', {
            required: true,
            type: String,
            desc: 'Name'
        });
    },
    prompting: {
        root: function () {
            var done = this.async();
            this.prompt({
                type: 'list',
                name: 'root_type',
                message: 'What is the root UIElement?',
                default: 0,
                choices: [
                    'Grid',
                    'StackPanel',
                    'Border'
                ]
            }, function (answers) {
                this.root_type = answers.root_type;
                done();
            }.bind(this));
        }
    },
    writing: {
        file: function () {
            var filename = path.join('app', 'Views', this.name + '.fayde');
            this.template('_View.fayde', filename, { root_type: this.root_type });
        }
    }
});