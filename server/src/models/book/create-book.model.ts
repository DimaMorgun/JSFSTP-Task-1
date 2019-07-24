import { ApiModelProperty } from '@nestjs/swagger';

import { BookTypes } from 'src/enums';

export class CreateBookModel {
    @ApiModelProperty()
    readonly name: string;
    @ApiModelProperty()
    readonly price: number;
    @ApiModelProperty({ enum: BookTypes })
    readonly type: string;
    @ApiModelProperty({ type: [String], isArray: true })
    readonly authors?: string[];
}
