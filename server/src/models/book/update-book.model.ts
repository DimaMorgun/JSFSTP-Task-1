import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateBookModel {
    @ApiModelProperty()
    readonly id: string;
    @ApiModelProperty()
    readonly name: string;
    @ApiModelProperty()
    readonly imageSrc: string;
    @ApiModelProperty()
    readonly authorName: string;
}
