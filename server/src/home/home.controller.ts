import { Controller, Get } from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Controller('/')
export class HomeController {
    @Get()
    public defaultGet(): Observable<string> {
        const response = JSON.stringify({
            message: 'This controller allows only get requests',
            creator: 'Dmytro Morhun',
            allowedControllers: 'home',
            currentDate: new Date(),
            applicationName: 'library-api',
            biltOn: 'NestJS',
        });

        return of(response);
    }
}
