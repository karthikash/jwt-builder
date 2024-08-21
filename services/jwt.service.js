const jwt = require("jsonwebtoken");
const decode = require("jwt-decode");

class JwtService {
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
    const payload = jwt.verify(this.token, this.secretKey);
    const header = decode(this.token, { header: true });
    return { payload, header };
  }
}

module.exports = JwtService;
