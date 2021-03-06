import { ApiModelProperty } from '@nestjs/swagger';

export class CreateAuthorModel {
    @ApiModelProperty()
    readonly name?: string;
    @ApiModelProperty()
    readonly country?: string;
    @ApiModelProperty()
    readonly birthday?: Date;
    @ApiModelProperty()
    readonly deathday?: Date;
    @ApiModelProperty({ type: [String], isArray: true })
    readonly books?: string[];
}
