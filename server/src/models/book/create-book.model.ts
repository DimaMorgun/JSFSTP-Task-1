import { ApiModelProperty } from '@nestjs/swagger';

export class CreateBookModel {
    @ApiModelProperty()
    name: string;
    @ApiModelProperty()
    imageSrc: string;
    @ApiModelProperty()
    authorName: string;
}
