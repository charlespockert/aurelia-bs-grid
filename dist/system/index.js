System.register([], function (_export) {
  'use strict';

  _export('configure', configure);

  function configure(frameworkConfig) {
    frameworkConfig.aurelia.use.globalResources('./grid/grid');
  }

  return {
    setters: [],
    execute: function () {}
  };
});