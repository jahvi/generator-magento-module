'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('generator-magento-module:app', function () {
  describe('generate folder structure', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          namespace: 'Test Namespace',
          moduleName: 'Test Module',
          codePool: 'local',
          components: []
        })
        .on('end', done);
    });

    it('creates initial folder structure', function () {
      assert.file([
        'app/code/local/TestNamespace/TestModule'
      ]);
    });

    it('creates config file', function () {
      assert.file([
        'app/code/local/TestNamespace/TestModule/etc/config.xml'
      ]);
    });

    it('creates module id from namespace and module name', function () {
      assert.fileContent(
        'app/code/local/TestNamespace/TestModule/etc/config.xml',
        'testnamespace_testmodule'
      );
    });

    it('creates module activation file', function () {
      assert.file([
        'app/etc/modules/TestNamespace_TestModule.xml'
      ]);
    });

    it('sets module filename and codepool in activation file', function () {
      assert.fileContent(
        'app/etc/modules/TestNamespace_TestModule.xml',
        '<TestNamespace_TestModule>'
      );

      assert.fileContent(
        'app/etc/modules/TestNamespace_TestModule.xml',
        '<codePool>local</codePool>'
      );
    });

    describe('generate module without components', function () {
      it('does not create frontend config handle', function () {
        assert.noFileContent(
          'app/code/local/TestNamespace/TestModule/etc/config.xml',
          /<frontend>[\s\S]*?<\/frontend>/
        );
      });

      it('does not create block component files', function () {
        assert.noFile([
          'app/code/local/TestNamespace/TestModule/Block'
        ]);
      });

      it('does not create block config handle', function () {
        assert.noFileContent(
          'app/code/local/TestNamespace/TestModule/etc/config.xml',
          /<blocks>\s*<testnamespace_testmodule>\s*<class>TestNamespace_TestModule_Block<\/class>\s*<\/testnamespace_testmodule>\s*<\/blocks>/
        );
      });

      it('does not create controller component files', function () {
        assert.noFile([
          'app/code/local/TestNamespace/TestModule/controllers'
        ]);
      });

      it('does not create controller config handle', function () {
        assert.noFileContent(
          'app/code/local/TestNamespace/TestModule/etc/config.xml',
          /<routers>\s*<testnamespace_testmodule>\s*<use>standard<\/use>\s*<args>\s*<module>TestNamespace_TestModule<\/module>\s*<frontName>testmodule<\/frontName>\s*<\/args>\s*<\/testnamespace_testmodule>\s*<\/routers>/
        );
      });

      it('does not create helper component files', function () {
        assert.noFile([
          'app/code/local/TestNamespace/TestModule/Helper'
        ]);
      });

      it('does not create helper config handle', function () {
        assert.noFileContent(
          'app/code/local/TestNamespace/TestModule/etc/config.xml',
          /<helpers>\s*<testnamespace_testmodule>\s*<class>TestNamespace_TestModule_Helper<\/class>\s*<\/testnamespace_testmodule>\s*<\/helpers>/
        );
      });

      it('does not create model component files', function () {
        assert.noFile([
          'app/code/local/TestNamespace/TestModule/Model'
        ]);
      });

      it('does not create model config handle', function () {
        assert.noFileContent(
          'app/code/local/TestNamespace/TestModule/etc/config.xml',
          /<models>\s*<testnamespace_testmodule>\s*<class>TestNamespace_TestModule_Model<\/class>\s*<\/testnamespace_testmodule>\s*<\/models>/
        );
      });

      it('does not create observer component files', function () {
        assert.noFile([
          'app/code/local/TestNamespace/TestModule/Model/Observer.php'
        ]);
      });

      it('does not create observer config handle', function () {
        assert.noFileContent(
          'app/code/local/TestNamespace/TestModule/etc/config.xml',
          /<events>\s*<controller_action_predispatch>\s*<observers>\s*<testnamespace_testmodule>\s*<class>testnamespace_testmodule\/observer<\/class>\s*<method>sampleObserverMethod<\/method>\s*<\/testnamespace_testmodule>\s*<\/observers>\s*<\/controller_action_predispatch>\s*<\/events>/
        );
      });

      it('does not create setup resource component files', function () {
        assert.noFile([
          'app/code/local/TestNamespace/TestModule/sql'
        ]);
      });

      it('does not create setup resource config handle', function () {
        assert.noFileContent(
          'app/code/local/TestNamespace/TestModule/etc/config.xml',
          /<resources>\s*<testmodule_setup>\s*<setup>\s*<module>TestNamespace_TestModule<\/module>\s*<class>Mage_Core_Model_Resource_Setup<\/class>\s*<\/setup>\s*<\/testmodule_setup>\s*<\/resources>/
        );
      });
    });

    describe('generate module with all components', function () {
      before(function (done) {
        helpers.run(path.join(__dirname, '../generators/app'))
          .withPrompts({
            namespace: 'Test Namespace',
            moduleName: 'Test Module',
            codePool: 'local',
            components: ['block', 'controller', 'helper', 'model', 'observer', 'setup']
          })
          .on('end', done);
      });

      it('creates frontend config handle', function () {
        assert.fileContent(
          'app/code/local/TestNamespace/TestModule/etc/config.xml',
          /<frontend>[\s\S]*?<\/frontend>/
        );
      });

      it('creates block component files', function () {
        assert.file([
          'app/code/local/TestNamespace/TestModule/Block',
          'app/code/local/TestNamespace/TestModule/Block/MyBlock.php'
        ]);

        assert.fileContent(
          'app/code/local/TestNamespace/TestModule/Block/MyBlock.php',
          'TestNamespace_TestModule_Block_MyBlock'
        );
      });

      it('creates block config handle', function () {
        assert.fileContent(
          'app/code/local/TestNamespace/TestModule/etc/config.xml',
          /<blocks>\s*<testnamespace_testmodule>\s*<class>TestNamespace_TestModule_Block<\/class>\s*<\/testnamespace_testmodule>\s*<\/blocks>/
        );
      });

      it('creates controller component files', function () {
        assert.file([
          'app/code/local/TestNamespace/TestModule/controllers',
          'app/code/local/TestNamespace/TestModule/controllers/IndexController.php'
        ]);

        assert.fileContent(
          'app/code/local/TestNamespace/TestModule/controllers/IndexController.php',
          'TestNamespace_TestModule_IndexController'
        );
      });

      it('creates controller config handle', function () {
        assert.fileContent(
          'app/code/local/TestNamespace/TestModule/etc/config.xml',
          /<routers>\s*<testnamespace_testmodule>\s*<use>standard<\/use>\s*<args>\s*<module>TestNamespace_TestModule<\/module>\s*<frontName>testmodule<\/frontName>\s*<\/args>\s*<\/testnamespace_testmodule>\s*<\/routers>/
        );
      });

      it('creates helper component files', function () {
        assert.file([
          'app/code/local/TestNamespace/TestModule/Helper',
          'app/code/local/TestNamespace/TestModule/Helper/Data.php'
        ]);

        assert.fileContent(
          'app/code/local/TestNamespace/TestModule/Helper/Data.php',
          'TestNamespace_TestModule_Helper_Data'
        );
      });

      it('creates helper config handle', function () {
        assert.fileContent(
          'app/code/local/TestNamespace/TestModule/etc/config.xml',
          /<helpers>\s*<testnamespace_testmodule>\s*<class>TestNamespace_TestModule_Helper<\/class>\s*<\/testnamespace_testmodule>\s*<\/helpers>/
        );
      });

      it('creates helper component files', function () {
        assert.file([
          'app/code/local/TestNamespace/TestModule/Model',
          'app/code/local/TestNamespace/TestModule/Model/MyModel.php'
        ]);

        assert.fileContent(
          'app/code/local/TestNamespace/TestModule/Model/MyModel.php',
          'TestNamespace_TestModule_Model_MyModel'
        );
      });

      it('creates helper model handle', function () {
        assert.fileContent(
          'app/code/local/TestNamespace/TestModule/etc/config.xml',
          /<models>\s*<testnamespace_testmodule>\s*<class>TestNamespace_TestModule_Model<\/class>\s*<\/testnamespace_testmodule>\s*<\/models>/
        );
      });

      it('creates observer component files', function () {
        assert.file([
          'app/code/local/TestNamespace/TestModule/Model/Observer.php'
        ]);

        assert.fileContent(
          'app/code/local/TestNamespace/TestModule/Model/Observer.php',
          'TestNamespace_TestModule_Model_Observer'
        );
      });

      it('creates observer config handle', function () {
        assert.fileContent(
          'app/code/local/TestNamespace/TestModule/etc/config.xml',
          /<events>\s*<controller_action_predispatch>\s*<observers>\s*<testnamespace_testmodule>\s*<class>testnamespace_testmodule\/observer<\/class>\s*<method>sampleObserverMethod<\/method>\s*<\/testnamespace_testmodule>\s*<\/observers>\s*<\/controller_action_predispatch>\s*<\/events>/
        );
      });

      it('creates setup resource component files', function () {
        assert.file([
          'app/code/local/TestNamespace/TestModule/sql',
          'app/code/local/TestNamespace/TestModule/sql/testmodule_setup/install-1.0.0.php'
        ]);
      });

      it('creates setup resource config handle', function () {
        assert.fileContent(
          'app/code/local/TestNamespace/TestModule/etc/config.xml',
          /<resources>\s*<testmodule_setup>\s*<setup>\s*<module>TestNamespace_TestModule<\/module>\s*<class>Mage_Core_Model_Resource_Setup<\/class>\s*<\/setup>\s*<\/testmodule_setup>\s*<\/resources>/
        );
      });
    });
  });
});
