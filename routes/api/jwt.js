import express from 'express';

import { validate } from '../../validators';
import { fnSignJwtToken, fnVerifyJwtToken } from "../../controllers/jwt.controller";

const JwtRouter = express.Router();

JwtRouter.post('/sign', validate('sign'), fnSignJwtToken);
JwtRouter.post('/verify', validate('verify'), fnVerifyJwtToken);

export default JwtRouter;