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
      },
      {
        type: 'checkbox',
        name: 'components',
        message: 'What components do you need?',
        choices: [
          {
            name: 'Block',
            value: 'block'
          },
          {
            name: 'Controller',
            value: 'controller'
          },
          {
            name: 'Helper',
            value: 'helper'
          }
        ]
      }
    ];

    this.prompt(prompts, function (answers) {
      var components = answers.components;

      function hasComponent(component) {
        return components && components.indexOf(component) !== -1;
      }

      this.codePool = answers.codePool;
      this.namespace = _s.classify(answers.namespace);
      this.moduleName = _s.classify(answers.moduleName);

      this.includeBlock = hasComponent('block');
      this.includeController = hasComponent('controller');
      this.includeHelper = hasComponent('helper');

      this.moduleClassName = this.namespace + '_' + this.moduleName;
      this.modulePath = 'app/code/' + this.codePool + '/' + this.namespace + '/' + this.moduleName;

      done();
    }.bind(this));
  },

  writing: {
    files: function () {
      mkdirp(this.modulePath);
      mkdirp(this.modulePath + '/etc');

      if (this.includeBlock) {
        mkdirp(this.modulePath + '/Block');

        this.fs.copyTpl(
          this.templatePath('block.php'),
          this.destinationPath(this.modulePath + '/Block/MyBlock.php'),
          {
            namespace: this.namespace,
            moduleName: this.moduleClassName
          }
        );
      }

      if (this.includeController) {
        mkdirp(this.modulePath + '/controllers');

        this.fs.copyTpl(
          this.templatePath('controller.php'),
          this.destinationPath(this.modulePath + '/controllers/IndexController.php'),
          {
            namespace: this.namespace,
            moduleName: this.moduleClassName
          }
        );
      }

      if (this.includeHelper) {
        mkdirp(this.modulePath + '/Helper');

        this.fs.copyTpl(
          this.templatePath('helper.php'),
          this.destinationPath(this.modulePath + '/Helper/Data.php'),
          {
            namespace: this.namespace,
            moduleName: this.moduleClassName
          }
        );
      }
    },

    config: function () {
      this.fs.copyTpl(
        this.templatePath('config.xml'),
        this.destinationPath(this.modulePath + '/etc/config.xml'),
        {
          moduleId: this.namespace.toLowerCase() + '_' + this.moduleName.toLowerCase(),
          moduleName: this.moduleClassName,
          moduleFrontName: this.moduleName.toLowerCase(),
          includeBlock: this.includeBlock,
          includeController: this.includeController,
          includeHelper: this.includeHelper
        }
      );
    },

    activate: function () {
      this.fs.copyTpl(
        this.templatePath('module.xml'),
        this.destinationPath('app/etc/modules/' + this.moduleClassName + '.xml'),
        {
          moduleName: this.moduleClassName,
          codePool: this.codePool
        }
      );
    }
  }
});
