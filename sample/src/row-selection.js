import {HttpClient} from 'aurelia-http-client';
import {inject} from 'aurelia-framework';

@inject(HttpClient)
export class RowSelection {

    constructor(httpClient) {
        this.httpClient = httpClient;
    }

    getLocalData(gridOptions) {
        
        // Return a promise that resolves to the data
        var data = [];
        var names = ["apple", "peach", "pear", "banana", "kiwi", "apple", "orange", "melon", "lemon", "persimmon", "physalis", "strawberry", "cherry", "lime", "watermelon", "cantaloupe (the lowest of the melons)"];

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
