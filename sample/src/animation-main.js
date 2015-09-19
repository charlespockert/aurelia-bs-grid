export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-animator-css')
    .plugin('charlespockert/aurelia-bs-grid');

  aurelia.start().then(a => a.setRoot());
}
