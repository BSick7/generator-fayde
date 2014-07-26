var yeoman = require('yeoman-generator'),
    path = require('path');

module.exports = yeoman.generators.Base.extend({
    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);
        this.argument('name', {
            required: true,
            type: String,
            desc: 'Name of view model'
        });
    },
    writing: {
        file: function () {
            var name = this.name;
            var index = name.toLowerCase().indexOf('viewmodel');
            if (index >= Math.max(0, name.length - 'ViewModel'.length))
                name = name.substr(0, index);

            var filename = path.join('app', 'ViewModels', name + 'ViewModel.ts');
            this.template('_ViewModel.ts', filename, { name: name });
        }
    }
});
