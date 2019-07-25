import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserRoleModel {
    @ApiModelProperty()
    readonly name: string;
}
