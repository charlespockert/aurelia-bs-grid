import {HttpClient} from 'aurelia-http-client';
import {inject} from 'aurelia-framework';

@inject(HttpClient)
export class LocalData {

    data = [];
    names = ["charles", "john", "oliver", "fred", "dirk", "mike", "ewan", "gary", "james", "pete"];

    constructor(httpClient) {
        this.httpClient = httpClient;
    }

    getLocalData(gridOptions) {
        // Return a promise that resolves to the data
        for (var i = 0; i < 3; i++) {
        	this.data.push({
                id: i,
                name: this.names[i]
            });
        };

        return new Promise((resolve, reject) => {
            resolve({
                data: this.data,
                count: this.data.length
            });
        });

    }

    addPerson() {
        if(this.data.length < 10)
        {
            var i = this.data.length;

            this.data.push({
                id: i,
                name: this.names[i]
            });
        }
    }

    removePerson() {
        if(this.data.length > 0){
            this.data.pop();
        }
    }
}
