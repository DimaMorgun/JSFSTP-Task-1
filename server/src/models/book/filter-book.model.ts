import { ApiModelProperty } from '@nestjs/swagger';

export class FilterBookModel {
    @ApiModelProperty({ required: false })
    readonly priceFrom?: number;
    @ApiModelProperty({ required: false })
    readonly priceTo?: number;
    @ApiModelProperty({ required: false })
    readonly type?: string;
    @ApiModelProperty({ required: false })
    readonly name?: string;
    readonly authorNames?: string[];
}
