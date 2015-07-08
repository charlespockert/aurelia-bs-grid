System.register([], function (_export) {
  'use strict';

  _export('configure', configure);

  function configure(aurelia) {
    aurelia.globalizeResources('./grid/grid');
  }

  return {
    setters: [],
    execute: function () {}
  };
});