import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

@Component({
    selector: 'app-task1',
    templateUrl: './task1.component.html',
    styleUrls: ['./task1.component.scss']
})
export class Task1Component implements OnInit {

    constructor() { }

    ngOnInit() {
        this.method1('123')
            .switchMap(res => this.callMethod2EverySecond(res.id))
            .subscribe(
                res => {
                    if (!res.success && res.errors) {
                        console.error(res);
                    } else {
                        console.log('subscription processing', res);
                    }
                },
                (err) => console.log(err),
                () => console.log('finished')
            );

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
                status: 'Test',
            };
        }, 5000);

        if (fetchResponse.processing) {
            setTimeout(() => this.pollUntilTaskFinished(taskId), 500);
        } else {
            console.log('pollingFinishedFor', taskId);
        }
    }

    callMethod2EverySecond(id) {
        return Observable.interval(10)
            .mergeMap(data => this.method2(id, data))
            .do(resp => console.log('resp', resp))
            .filter(resp => resp !== null)
            .take(1)
    }

    method1(data: string) {
        return Observable.of({ id: data });
    }

    method2(id: string, interval: number) {
        const ret = this.randomIntInc(0, 1) === 0 ? null : { success: true, errors: null, interval, id };
        return Observable
            .of(ret)
            .delay(this.randomIntInc(0, 2000));
    }

    randomIntInc(low, high) {
        return Math.floor(Math.random() * (high - low + 1) + low);
    }
}