import { Controller, Get, Req, Param } from '@nestjs/common';
import { Request } from 'express';

@Controller('home')
export class HomeController {
    @Get()
    get(): string {
        return 'Welcome to home page.';
    }

    @Get(':param')
    getWithParameters(@Param('param') param): string {
        return `Welcome to home page with parameters, you'r parameter is ${param}.`;
    }
}
