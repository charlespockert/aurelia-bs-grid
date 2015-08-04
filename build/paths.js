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
  //demo: 'C:/JMC/Development/TFSRoot/JMC/Internal/RSM/EmailMonitor/RSMConsole/RSMConsole/jspm_packages/github/charlespockert/aurelia-bs-grid@master'
  //demo: '../aurelia-grid/jspm_packages/github/charlespockert/aurelia-bs-grid@0.0.2/',
  demo: '../aurelia-bs-grid-demo/jspm_packages/github/charlespockert/aurelia-bs-grid@master/',
};
