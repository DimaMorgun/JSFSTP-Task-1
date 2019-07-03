import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class Middleware implements NestMiddleware {
    // tslint:disable-next-line:ban-types
    use(req: Request, res: Response, next: Function) {
        const logContent: string = JSON.stringify({
            date: new Date(),
            path: req.path,
            baseUrl: req.baseUrl,
            originalUrl: req.originalUrl,
            headers: req.headers,
        });

        // tslint:disable-next-line:no-console
        console.log(logContent);

        next();
    }
}
