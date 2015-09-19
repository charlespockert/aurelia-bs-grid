import {HttpClient} from 'aurelia-http-client';
import {inject} from 'aurelia-framework';

@inject(HttpClient)
export class LocalData {

    constructor(httpClient) {
        this.httpClient = httpClient;
    }

    getLocalData(gridOptions) {
        // Return a promise that resolves to the data
        var data = [];
        var names = ["charles", "john", "oliver", "fred", "dean", "chris", "pete", "steve", "lee", "rob", "alex", "rose", "mike", "dan", "james", "rebecca", "heather", "kate", "liam"];

        for (var i = 0; i < 1000; i++) {


        	var n = names[Math.floor(Math.random() * names.length)];
            data.push({
                id: i,
                name: n
            });
        };

        return new Promise((resolve, reject) => {
            resolve({
                data: data,
                count: data.length
            });
        });

    }
}
