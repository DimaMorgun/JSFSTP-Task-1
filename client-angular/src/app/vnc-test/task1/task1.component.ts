import { Component, OnInit } from '@angular/core';
import { TaskModel } from './task.model';

@Component({
    selector: 'app-task1',
    templateUrl: './task1.component.html',
    styleUrls: ['./task1.component.scss']
})

export class Task1Component implements OnInit {
    private tasks: TaskModel[] = [];

    ngOnInit() {
        setTimeout(() => {
            this.pollUntilTaskFinished('0'); // 1
        }, 300);
        setTimeout(() => {
            this.pollUntilTaskFinished('1'); // 3
        }, 3000);
        setTimeout(() => {
            this.pollUntilTaskFinished('2'); // 4
        }, 6600);
        setTimeout(() => {
            this.pollUntilTaskFinished('3'); // 5
        }, 10000);
        setTimeout(() => {
            this.pollUntilTaskFinished('4'); // 2
        }, 2500);

    }

    private async pollUntilTaskFinished(taskId: string): Promise<void> {
        const response = await this.fetch(taskId);
        console.log(
            `new pool with id ${taskId}.`, this.tasks,
            `${new Date().getMinutes()}:${new Date().getSeconds()}:${new Date().getMilliseconds()}`,
        );

        if (!response.processing) {
            setTimeout(() => this.pollUntilTaskFinished(taskId), 500);
        } else {
            this.pollingFinishedFor(taskId);
        }
    }

    private fetch(taskId: string): TaskModel {
        let requiredTask: TaskModel = this.tasks.find(task => task.taskId === taskId);
        if (!requiredTask) {
            const task: TaskModel = {
                taskId,
                processing: false,
            };

            this.tasks.push(task);
            requiredTask = task;
        }

        setTimeout(() => {
            requiredTask.processing = true;
        }, 5000);

        return requiredTask;
    }

    private pollingFinishedFor(taskId: string): void {
        console.log(
            `task with id ${taskId} has been finished.`,
            `${new Date().getMinutes()}:${new Date().getSeconds()}:${new Date().getMilliseconds()}`,
        );
    }
}
