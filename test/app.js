'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('generator-magento-module:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        namespace: 'Test Namespace',
        moduleName: 'Test Module',
        codePool: 'local'
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
});
