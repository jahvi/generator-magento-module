'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var mkdirp = require('mkdirp');
var _s = require('underscore.string');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    var ml = [
      '',
      chalk.red('     .\'\'-`'),
      chalk.red('    ...\'\'\'.'),
      chalk.red('   .`  `\'\'\'-     `......``'),
      chalk.red('  .`    .\'\'\'\'..\'\'\'\'\'\'\'.`..\'.`'),
      chalk.red(' ..      `\'\'\'\'\'\'\'\'\'.`       `..`'),
      chalk.red('`.         `.....`              ``'),
      ''
    ].join('\n');

    this.log(ml);

    var prompts = [
      {
        type: 'input',
        name: 'namespace',
        message: 'What is your namespace?',
        default: 'Medialounge',
        store: true
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
          },
          {
            name: 'Model',
            value: 'model'
          },
          {
            name: 'Observer',
            value: 'observer'
          },
          {
            name: 'Setup Resource',
            value: 'setup'
          },
          {
            name: 'Widget',
            value: 'widget'
          }
        ]
      }
    ];

    this.author = {
      name: this.user.git.name(),
      email: this.user.git.email()
    };

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
      this.includeModel = hasComponent('model');
      this.includeObserver = hasComponent('observer');
      this.includeSetup = hasComponent('setup');
      this.includeWidget = hasComponent('widget');

      this.hasFrontendComponents = this.includeController || this.includeObserver;

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
            moduleName: this.moduleClassName,
            author: this.author
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
            moduleName: this.moduleClassName,
            author: this.author
          }
        );
      }

      if (this.includeHelper || this.includeWidget) {
        mkdirp(this.modulePath + '/Helper');

        this.fs.copyTpl(
          this.templatePath('helper.php'),
          this.destinationPath(this.modulePath + '/Helper/Data.php'),
          {
            namespace: this.namespace,
            moduleName: this.moduleClassName,
            author: this.author
          }
        );
      }

      if (this.includeModel) {
        mkdirp(this.modulePath + '/Model');

        this.fs.copyTpl(
          this.templatePath('model.php'),
          this.destinationPath(this.modulePath + '/Model/MyModel.php'),
          {
            namespace: this.namespace,
            moduleName: this.moduleClassName,
            author: this.author
          }
        );
      }

      if (this.includeObserver) {
        mkdirp(this.modulePath + '/Model');

        this.fs.copyTpl(
          this.templatePath('observer.php'),
          this.destinationPath(this.modulePath + '/Model/Observer.php'),
          {
            namespace: this.namespace,
            moduleName: this.moduleClassName,
            author: this.author
          }
        );
      }

      if (this.includeSetup) {
        mkdirp(this.modulePath + '/sql/' + this.moduleName.toLowerCase() + '_setup');

        this.fs.copy(
          this.templatePath('setup.php'),
          this.destinationPath(this.modulePath + '/sql/' + this.moduleName.toLowerCase() + '_setup/install-1.0.0.php')
        );
      }

      if (this.includeWidget) {
        this.fs.copyTpl(
          this.templatePath('widget.xml'),
          this.destinationPath(this.modulePath + '/etc/widget.xml'),
          {
            moduleId: this.namespace.toLowerCase() + '_' + this.moduleName.toLowerCase(),
            namespace: this.namespace.toLowerCase(),
            moduleFrontName: this.moduleName.toLowerCase()
          }
        );

        mkdirp(this.modulePath + '/Block/Widget');

        this.fs.copyTpl(
          this.templatePath('widget_block.php'),
          this.destinationPath(this.modulePath + '/Block/Widget/MyWidget.php'),
          {
            namespace: this.namespace,
            moduleName: this.moduleClassName,
            author: this.author
          }
        );

        mkdirp('app/design/frontend/base/default/template/' + this.namespace.toLowerCase() + '/' + this.moduleName.toLowerCase() + '/widget');

        this.fs.copyTpl(
          this.templatePath('default.phtml'),
          this.destinationPath('app/design/frontend/base/default/template/' + this.namespace.toLowerCase() + '/' + this.moduleName.toLowerCase() + '/widget/default.phtml'),
          {
            author: this.author
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
          hasFrontendComponents: this.hasFrontendComponents,
          includeBlock: this.includeBlock,
          includeController: this.includeController,
          includeHelper: this.includeHelper,
          includeModel: this.includeModel,
          includeObserver: this.includeObserver,
          includeSetup: this.includeSetup,
          includeWidget: this.includeWidget
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
