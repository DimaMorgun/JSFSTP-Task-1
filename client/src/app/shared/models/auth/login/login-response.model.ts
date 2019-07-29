import { BaseResponseModel } from 'src/app/shared/models';

export interface LoginResponseModel extends BaseResponseModel {
    token?: string;
}
