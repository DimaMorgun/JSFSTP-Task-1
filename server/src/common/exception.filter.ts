import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class CommonExceptionFilter extends BaseExceptionFilter {
    public catch(exception: unknown, host: ArgumentsHost) {
        // tslint:disable-next-line: no-console
        console.log('--- exception ---');
        // tslint:disable-next-line: no-console
        console.log(exception);
        // tslint:disable-next-line: no-console
        console.log('--- ---host-- ---');
        // tslint:disable-next-line: no-console
        console.log(host);
        // tslint:disable-next-line: no-console
        console.log('--- ---End--- ---');

        super.catch(exception, host);
    }
}
