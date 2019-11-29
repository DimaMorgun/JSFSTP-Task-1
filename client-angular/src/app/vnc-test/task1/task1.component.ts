import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-task1',
    templateUrl: './task1.component.html',
    styleUrls: ['./task1.component.scss']
})

export class Task1Component implements OnInit {
    constructor() { }

    ngOnInit() {
        this.pollUntilTaskFinished('5');
    }

    private async pollUntilTaskFinished(taskId: string): Promise<void> {
        const fetchResponse = await fetch(`/tasks/${taskId}`);
        const responseObject = await fetchResponse.json();

        console.log(responseObject);

        if (responseObject.processing) {
            setTimeout(() => this.pollUntilTaskFinished(taskId), 500);
        } else {
            this.pollingFinishedFor(taskId);
        }
    }

    private pollingFinishedFor(taskId: string): void {
        console.log(`Task with id ${taskId} has been finished.`);
    }
}
