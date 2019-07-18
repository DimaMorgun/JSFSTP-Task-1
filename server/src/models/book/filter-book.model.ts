import { ApiModelProperty } from '@nestjs/swagger';

export class FilterBookModel {
    @ApiModelProperty()
    readonly priceFrom: number;
    @ApiModelProperty()
    readonly priceTo: number;
    @ApiModelProperty()
    readonly type: number;
    @ApiModelProperty()
    readonly name: string;
    readonly authorNames: string[];
}
