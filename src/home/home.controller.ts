import { Controller, Get, Param, Post, HttpCode, Body } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { PostHomeDto } from 'src/home/dto/home.dto';

@Controller('home')
export class HomeController {
    @Get()
    get(): string {
        return 'Welcome to home page.';
    }

    @Get('promise')
    async getAsyncPromice(): Promise<any[]> {
        return [];
    }

    @Get('observable')
    getAsyncObservable(): Observable<any[]> {
        return of([]);
    }

    @Get(':id')
    getWithParameters(@Param('id') id): string {
        return `This action in home controller returns a #${id}.`;
    }

    @Post()
    @HttpCode(401)
    postAction(@Body() postHomeDto: PostHomeDto): PostHomeDto {
        const valueToIncrese: number = 10;

        const response: PostHomeDto = new PostHomeDto();
        response.name = `We have added ${valueToIncrese} to value(${postHomeDto.value}) by this name -> ${postHomeDto.name}`;
        response.value = postHomeDto.value + valueToIncrese;

        return response;
    }
}
