import 'bootstrap';
import 'bootstrap/css/bootstrap.css!';

export class App {
  configureRouter(config, router){
    config.title = 'Demo Pages';
    config.map([
      { route: ['','welcome'],  moduleId: 'remote-data',      nav: true, title:'Remote Data' },
      { route: 'local',  moduleId: 'local-data',      nav: true, title:'Local Data' },
      { route: 'templates',  moduleId: 'column-templates',      nav: true, title:'Column Templates' },
      { route: 'selection',  moduleId: 'row-selection',      nav: true, title:'Selection' },
      { route: 'mutation',  moduleId: 'datasource-mutation',      nav: true, title:'Datasource Mutation' },
      { route: 'columnfilters',  moduleId: 'column-filters',      nav: true, title:'Column Filters' }
  	]);

    this.router = router;
  }
}
