var path = require('path');

var appRoot = 'src/';

module.exports = {
  root: appRoot,
  source: appRoot + '**/*.js',
  html: appRoot + '**/*.html',
  css: appRoot + '**/*.css',
  style: 'styles/**/*.css',
  output: 'dist/',
  amd: 'dist/amd/**/*.js',
  doc:'./doc',
  e2eSpecsSrc: 'test/e2e/src/*.js',
  e2eSpecsDist: 'test/e2e/dist/',
  demo: '../aurelia-bs-grid-demo/jspm_packages/github/CharlesPockert/aurelia-bs-grid@master/',
};
