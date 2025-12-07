import express from 'express';
import Jarvees from './Jarvees.js';
const server = express();

Jarvees.authenticate();

server.get('/jarvees', async (req, res) => {
    if (!req.query.msg) return res.status(400).send('No message provided.');
    const { msg = null, neat = null } = req.query;
    if (!msg) return res.status(400).send('No message provided.');
    

    let output = await Jarvees.sayToHim(msg);
    if (!neat)
        return res.send(output);
    else
        return res.send('<br><br><br><h1>'+output+'</h1>');
});

export default server;
