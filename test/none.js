'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('generate module without components', function () {
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
