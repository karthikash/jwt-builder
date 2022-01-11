const express = require('express');

const ClientRouter = express.Router();

ClientRouter.get('/', (req, res) => { res.render('index', { title: "Index", constants: JSON.stringify(constants) }) });

module.exports =  ClientRouter;