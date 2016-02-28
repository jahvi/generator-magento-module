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
  });

  describe('generate module with all components', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          namespace: 'Test Namespace',
          moduleName: 'Test Module',
          codePool: 'local',
          components: ['block']
        })
        .on('end', done);
    });

    it('creates block component files', function () {
      assert.file([
        'app/code/local/TestNamespace/TestModule/Block'
      ]);
    });
  });

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

    it('does not create block component files', function () {
      assert.noFile([
        'app/code/local/TestNamespace/TestModule/Block'
      ]);
    });
  });
});
