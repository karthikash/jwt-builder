const express = require('express');
const JwtRouter = require('./jwt');

const ApiRouter = express.Router();

ApiRouter.get('/', (req, res) => { return res.status(200).json('HEALTH_CHECK') });
ApiRouter.use('/jwt', JwtRouter);

module.exports = ApiRouter;