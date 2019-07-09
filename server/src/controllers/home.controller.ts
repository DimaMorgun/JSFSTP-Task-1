import { Controller, Get } from '@nestjs/common';

import { Environment } from 'src/environment/environment';

@Controller('/')
export class HomeController {
    constructor(private readonly environment: Environment) { }

    @Get()
    async getInfo(): Promise<string> {
        const response: string = JSON.stringify({
            message: 'This controller allows only get requests',
            creator: 'Dmytro Morhun',
            allowedControllers: 'home',
            currentDate: new Date(),
            applicationName: 'library-api',
            biltOn: 'NestJS',
            buildMode: this.environment.buildMode,
        });

        return response;
    }
}
