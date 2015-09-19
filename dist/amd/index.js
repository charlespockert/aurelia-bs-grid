define(["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  function configure(aurelia) {
    console.log("Loading grid");
    aurelia.globalResources('./grid/grid');
  }
});