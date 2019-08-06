import { ApiModelProperty } from '@nestjs/swagger';

import { BookType } from 'src/enums';

export class FilterBookModel {
    @ApiModelProperty({ required: false, type: [String], isArray: true })
    readonly idList?: string[];
    @ApiModelProperty({ required: false })
    readonly priceFrom?: number;
    @ApiModelProperty({ required: false })
    readonly priceTo?: number;
    @ApiModelProperty({ required: false, enum: BookType })
    readonly type?: string;
    @ApiModelProperty({ required: false })
    readonly name?: string;
    @ApiModelProperty({ required: false, type: [String], isArray: true })
    authors?: string[];
}
