const express = require('express');

const ClientRouter = express.Router();

ClientRouter.get('/', (req, res) => { res.render('index', { title: "Jwt.io", constants: JSON.stringify(constants) }) });

module.exports =  ClientRouter;