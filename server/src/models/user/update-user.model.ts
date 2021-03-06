import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateUserModel {
    @ApiModelProperty()
    readonly id: string;
    @ApiModelProperty()
    readonly fullname: string;
    @ApiModelProperty()
    readonly username: string;
    @ApiModelProperty()
    readonly password: string;
}
