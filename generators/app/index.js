'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');
var _s = require('underscore.string');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user
    this.log(yosay(
      'Welcome to the sweet ' + chalk.red('Magento 1 module') + ' generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'namespace',
        message: 'What is your namespace?',
        default: 'Medialounge'
      },
      {
        type: 'input',
        name: 'moduleName',
        message: 'What is your module name?',
        default: 'MyModule'
      },
      {
        type: 'list',
        name: 'codePool',
        message: 'What is the module codepool?',
        choices: ['local', 'community'],
        default: 'local'
      }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;

      this.codePool = props.codePool;
      this.namespace = _s.classify(props.namespace);
      this.moduleName = _s.classify(props.moduleName);

      done();
    }.bind(this));
  },

  writing: {
    folders: function () {
      this.modulePath = 'app/code/' + this.codePool + '/' + this.namespace + '/' + this.moduleName;

      mkdirp('app/code/' + this.codePool);
      mkdirp('app/code/' + this.codePool + '/' + this.namespace);
      mkdirp('app/code/' + this.codePool + '/' + this.namespace + '/' + this.moduleName);

      mkdirp('app/code/' + this.codePool + '/' + this.namespace + '/' + this.moduleName + '/etc');
    },

    config: function () {
      this.fs.copyTpl(
        this.templatePath('config.xml'),
        this.destinationPath(this.modulePath + '/etc/config.xml'),
        {
          moduleId: this.namespace.toLowerCase() + '_' + this.moduleName.toLowerCase()
        }
      );
    }
  }
});
