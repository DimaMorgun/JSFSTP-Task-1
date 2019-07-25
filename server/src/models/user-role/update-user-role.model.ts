import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateUserRoleModel {
    @ApiModelProperty()
    readonly id: string;
    @ApiModelProperty()
    readonly name?: string;
}
