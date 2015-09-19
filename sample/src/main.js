import 'github:twbs/bootstrap@3.3.5';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-bs-grid');

  aurelia.start().then(a => a.setRoot('app'));
}
