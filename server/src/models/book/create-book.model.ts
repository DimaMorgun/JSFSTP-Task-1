import { ApiModelProperty } from '@nestjs/swagger';

export class CreateBookModel {
    @ApiModelProperty()
    readonly name: string;
    @ApiModelProperty()
    readonly imageSrc: string;
    @ApiModelProperty()
    readonly authorName: string;
}
