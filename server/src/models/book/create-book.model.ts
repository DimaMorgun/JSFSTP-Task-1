import { ApiModelProperty } from '@nestjs/swagger';

export class CreateBookModel {
    @ApiModelProperty()
    readonly name: string;
    @ApiModelProperty()
    readonly price: number;
    @ApiModelProperty()
    readonly type: string;
}
