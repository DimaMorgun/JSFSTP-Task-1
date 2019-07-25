import { ApiModelProperty } from '@nestjs/swagger';

import { BookType } from 'src/enums';

export class UpdateBookModel {
    @ApiModelProperty()
    readonly id: string;
    @ApiModelProperty()
    readonly name?: string;
    @ApiModelProperty()
    readonly price?: number;
    @ApiModelProperty({ required: false, enum: BookType })
    readonly type?: string;
    @ApiModelProperty({ type: [String], isArray: true })
    authors?: string[];
}
