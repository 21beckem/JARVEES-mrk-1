import express from 'express';
import Jarvees from './Jarvees.js';
const server = express();

Jarvees.authenticate();

server.get('/jarvees', async (req, res) => {
    if (!req.query.msg) return res.status(400).send('No message provided.');
    const { msg = null } = req.query;
    if (!msg) return res.status(400).send('No message provided.');
    
    res.send( await Jarvees.sayToHim(msg) );
});

export default server;
