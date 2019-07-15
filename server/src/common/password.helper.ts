import { Injectable } from '@nestjs/common';

import { HexBase64Latin1Encoding, Hmac, createHmac, randomBytes } from 'crypto';

@Injectable()
export class PasswordHelper {
    private saltLength: number = 16;
    private passwordHashEncryptType: string = 'sha512';
    private stringFormat: string = 'hex';
    private encodingAlgorithm: HexBase64Latin1Encoding = 'hex';

    async getRandomSalt(): Promise<string> {
        const randomHexBytes: string = randomBytes(Math.ceil(this.saltLength / 2)).toString(this.stringFormat);
        const randomSalt: string = randomHexBytes.slice(0, this.saltLength);

        return randomSalt;
    }

    async getPasswordHash(password: string, salt: string): Promise<string> {
        const passwordHash: Hmac = createHmac(this.passwordHashEncryptType, salt);
        passwordHash.update(password);

        const hashedPassword: string = passwordHash.digest(this.encodingAlgorithm);

        return hashedPassword;
    }
}
