import { JwtSignValidator, JwtVerifyValidator } from "./jwt.validator";

export const validate = (schema = null) => (req, res, next) => {

    switch (schema) {
        case 'sign': var Validator = JwtSignValidator; break;
        case 'verify': var Validator = JwtVerifyValidator; break;
    }

    if (!Validator) {
        return next(new Error('Schema flag is not defined in validation'));
    } else {
        var body = req.body;
        var query = req.query;
        var params = req.params;
        var data = Object.assign({}, body, query, params);
        if (typeof data == 'string') {
            data = JSON.parse(data);
        }
        var validation = Validator.validate(data);
        if (!validation.error) return next();
        return res.status(400).json({ status: 400, error: validation });
    }
};