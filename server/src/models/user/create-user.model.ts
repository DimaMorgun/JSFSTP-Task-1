import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserModel {
    @ApiModelProperty()
    readonly fullname: string;
    @ApiModelProperty()
    readonly username: string;
    @ApiModelProperty()
    readonly password: string;
}
