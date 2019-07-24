import { ApiModelProperty } from '@nestjs/swagger';

import { BookTypes } from 'src/enums';

export class FilterBookModel {
    @ApiModelProperty({ required: false })
    readonly priceFrom?: number;
    @ApiModelProperty({ required: false })
    readonly priceTo?: number;
    @ApiModelProperty({ required: false, enum: BookTypes })
    readonly type?: string;
    @ApiModelProperty({ required: false })
    readonly name?: string;
    @ApiModelProperty({ required: false, type: [String], isArray: true })
    authors?: string[];
}
