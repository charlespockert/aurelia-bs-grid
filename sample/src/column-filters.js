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
        var names = ["charles", "john", "oliver", "fred", "apple", "peach", "banana", "pear", "kiwi", "dog", "cat", "mouse", "turtle", "high", "low", "jacks", "aces", "kings", "queens"];

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
