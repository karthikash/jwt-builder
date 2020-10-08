import Joi from "joi";

export const JwtSignValidator = Joi.object().keys({
    payload: Joi.object().required(),
    secretKey: Joi.string().required(),
    options: Joi.object().keys({
        expiresIn: Joi.string().required(),
        encoding: Joi.string().allow('')
    })
});

export const JwtVerifyValidator = Joi.object().keys({
    token: Joi.string().required(),
    secretKey: Joi.string().required()
});