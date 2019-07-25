import { Controller, Get } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { environment, Environment } from 'src/environment';

@Controller('/')
@ApiUseTags('home')
export class HomeController {
    @Get()
    public async getInfo(): Promise<string> {
        const env: Environment = environment();

        const response: string = JSON.stringify({
            message: 'This controller allows only get requests',
            creator: 'Dmytro Morhun',
            allowedControllers: 'home',
            currentDate: new Date(),
            applicationName: 'library-api',
            biltOn: 'NestJS',
            buildMode: env.environment,
        });

        return response;
    }
}
