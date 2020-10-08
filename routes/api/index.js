import express from 'express';
import JwtRouter from "./jwt";

const ApiRouter = express.Router();

ApiRouter.get('/', (req, res) => { return res.status(200).json('HEALTH_CHECK') });
ApiRouter.use('/jwt', JwtRouter);

export default ApiRouter;