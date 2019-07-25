import { ApiModelProperty } from '@nestjs/swagger';

export class CreateBookTypeModel {
    @ApiModelProperty()
    readonly name: string;
}
