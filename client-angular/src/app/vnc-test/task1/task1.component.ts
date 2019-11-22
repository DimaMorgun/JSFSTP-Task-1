import { Component, OnInit } from '@angular/core';

import { timer } from 'rxjs'

@Component({
    selector: 'app-task1',
    templateUrl: './task1.component.html',
    styleUrls: ['./task1.component.scss']
})
export class Task1Component implements OnInit {

    constructor() { }

    ngOnInit() {
        this.pollUntilTaskFinished('51');
    }

    async pollUntilTaskFinished(taskId) {
        let fetchResponse = {
            processing: true,
            status: '',
        };

        setTimeout(() => {
            fetchResponse = {
                processing: false,
                status: 'IDI NAHUI',
            };
        }, 5000);

        if (fetchResponse.processing) {
            setTimeout(() => this.pollUntilTaskFinished(taskId), 500);
        } else {
            console.log('pollingFinishedFor', taskId);
        }
    }
}
