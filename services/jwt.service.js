import jwt from 'jsonwebtoken';

export class JwtService {
    constructor({ payload, secretKey, options, token }) {
        this.payload = payload;
        this.secretKey = secretKey;
        this.options = options;
        this.token = token;
    }

    sign() {
        const token = jwt.sign(this.payload, this.secretKey, this.options);
        return token;
    }

    verify() {
        const decoded = jwt.verify(this.token, this.secretKey);
        return decoded;
    }
}