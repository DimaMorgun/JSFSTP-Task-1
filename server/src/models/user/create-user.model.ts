import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserModel {
    @ApiModelProperty()
    readonly fullName: string;
    @ApiModelProperty()
    readonly userName: string;
    @ApiModelProperty()
    readonly password: string;
}
