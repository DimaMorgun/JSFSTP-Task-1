import { Controller, Get } from '@nestjs/common';

import { buildMode } from 'src/core/environment/environment.config';

@Controller('/')
export class HomeController {
    @Get()
    async defaultGet(): Promise<string> {
        const response: string = JSON.stringify({
            message: 'This controller allows only get requests',
            creator: 'Dmytro Morhun',
            allowedControllers: 'home',
            currentDate: new Date(),
            applicationName: 'library-api',
            biltOn: 'NestJS',
            buildMode,
        });

        return response;
    }
}
