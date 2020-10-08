import express from 'express';

const ClientRouter = express.Router();

ClientRouter.get('/', (req, res) => { res.render('index', { title: "Index", constants: JSON.stringify(constants) }) });

export default ClientRouter;