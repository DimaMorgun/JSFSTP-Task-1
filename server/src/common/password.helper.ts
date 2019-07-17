import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordHelper {
    private saltRounds = 10;

    public async getRandomSalt(): Promise<string> {
        const salt: string = await bcrypt.genSalt(this.saltRounds);

        return salt;
    }

    public async getPasswordHash(password: string, salt: string): Promise<string> {
        const passwordHash: string = await bcrypt.hash(password, salt);

        return passwordHash;
    }
}
