import { Component, OnInit } from '@angular/core';

import { timer, from, Observable, of } from 'rxjs';

import { TaskModel } from './task.model';
import { concatMap, filter, take } from 'rxjs/operators';

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

    private pollUntilTaskFinished(taskId: string): void {
        timer(0, 500)
            .pipe(concatMap(() => {
                this.consoleLog(`new pool with id ${taskId}.`, this.getCurrentTaskState());

                return from(this.fetch(taskId));
            }))
            .pipe(filter((task: TaskModel) => task.processing))
            .pipe(take(1))
            .subscribe(() => this.pollingFinishedFor(taskId));
    }

    private fetch(taskId: string): Observable<TaskModel> {
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

        return of(requiredTask);
    }

    private pollingFinishedFor(taskId: string): void {
        this.consoleLog(`task with id ${taskId} has been finished.`, this.getCurrentTaskState());
    }

    private getCurrentTaskState = (): TaskModel[] => {
        const currentTaskState: TaskModel[] = [];
        for (const task of this.tasks) {
            currentTaskState.push({ ...task });
        }

        return currentTaskState;
    }

    private consoleLog(...messages: any[]): void {
        console.log(
            ...messages,
            `${new Date().getMinutes()}:${new Date().getSeconds()}:${new Date().getMilliseconds()}`,
        );
    }
}
