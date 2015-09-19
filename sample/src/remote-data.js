import {HttpClient} from 'aurelia-http-client';
import {inject} from 'aurelia-framework';

@inject(HttpClient)
export class RemoteData {

  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  getComments(gridOptions) {
    // Return a promise that resolves to the data

    var start = (gridOptions.paging.page - 1) * gridOptions.paging.size;
    var end = start + gridOptions.paging.size;

    return this.httpClient.createRequest("http://jsonplaceholder.typicode.com/comments")
          .withParams({
            _start: start,
            _end: end
          })
          .asGet()
          .send()
          .then(response => {
              return {
                data: response.content,
                count: response.headers.headers["X-Total-Count"]
              };  
          });  
  }
}