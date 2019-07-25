import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateBookTypeModel {
    @ApiModelProperty()
    readonly id: string;
    @ApiModelProperty()
    readonly name?: string;
}
