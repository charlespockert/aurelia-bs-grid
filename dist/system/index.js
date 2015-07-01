System.register([], function (_export) {
  'use strict';

  _export('configure', configure);

  function configure(aurelia) {
    aurelia.globalizeResources('./grid/grid');
    aurelia.globalizeResources('./pager/pager');
  }

  return {
    setters: [],
    execute: function () {}
  };
});