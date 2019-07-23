import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

@Injectable()
export class Encryptor {
    private saltRounds = 10;

    public async getRandomSalt(): Promise<string> {
        const salt: string = await bcrypt.genSalt(this.saltRounds);

        return salt;
    }

    public async getSaltedHash(originalString: string, salt: string): Promise<string> {
        const saltedString: string = await bcrypt.hash(originalString, salt);

        return saltedString;
    }
}
