'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('generator-magento-module:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        namespace: 'Namespace',
        moduleName: 'Module',
        codePool: 'local'
      })
      .on('end', done);
  });

  it('creates initial folder structure', function () {
    assert.file([
      'app/code/local/Namespace/Module'
    ]);
  });
});
