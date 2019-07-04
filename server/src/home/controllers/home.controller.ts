import { Controller, Get } from '@nestjs/common';

import { buildMode } from 'src/core/common'

@Controller('/')
export class HomeController {
    @Get()
    async defaultGet(): Promise<String> {
        const response: String = JSON.stringify({
            message: 'This controller allows only get requests',
            creator: 'Dmytro Morhun',
            allowedControllers: 'home',
            currentDate: new Date(),
            applicationName: 'library-api',
            biltOn: 'NestJS',
            buildMode: buildMode,
        });

        return response;
    }
}
