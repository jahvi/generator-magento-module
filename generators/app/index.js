'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');
var _ = require('lodash');

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
      this.namespace = _.upperFirst(_.camelCase(props.namespace));
      this.moduleName = _.upperFirst(_.camelCase(props.moduleName));

      done();
    }.bind(this));
  },

  writing: {
    folders: function () {
      mkdirp('app/code/' + this.codePool);
      mkdirp('app/code/' + this.codePool + '/' + this.namespace);
      mkdirp('app/code/' + this.codePool + '/' + this.namespace + '/' + this.moduleName);
    }
  }
});
