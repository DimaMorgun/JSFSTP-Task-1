import { Module } from '@nestjs/common';
import { HomeController } from 'dist/home/home.controller';

@Module({
    controllers: [HomeController],
})
export class HomeModule { }
