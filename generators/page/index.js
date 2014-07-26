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

        this.argument('title', {
            optional: true,
            defaults: 'Page Title',
            type: String,
            desc: 'Page Title'
        });
    },
    writing: {
        file: function () {
            var filename = path.join('app', 'Views', this.name + '.fayde');
            this.template('_Page.fayde', filename, { title: this.title });
        }
    }
});