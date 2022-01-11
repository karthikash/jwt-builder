const Joi = require('joi');

const JwtSignValidator = Joi.object().keys({
    payload: Joi.object().required(),
    secretKey: Joi.string().required(),
    options: Joi.object().keys({
        expiresIn: Joi.string().required(),
        encoding: Joi.string().allow(''),
        algorithm: Joi.string().required()
    })
});

const JwtVerifyValidator = Joi.object().keys({
    token: Joi.string().required(),
    secretKey: Joi.string().required()
});

module.exports = {
    JwtSignValidator,
    JwtVerifyValidator
}