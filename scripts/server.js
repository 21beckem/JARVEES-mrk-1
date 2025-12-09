import express from 'express';
import Genesis from './Genesis.js';
const server = express();

Genesis.authenticate();

server.use('/web', express.static('web'));
server.get('/', (req, res) => {
    res.redirect('/web/');
});

server.get('/genesis', async (req, res) => {
    if (!req.query.msg) return res.status(400).send('No message provided.');
    const { msg = null, neat = null } = req.query;
    if (!msg) return res.status(400).send('No message provided.');
    

    let output = await Genesis.sayToHim(msg);
    if (!neat)
        return res.send(output);
    else
        return res.send('<br><br><br><h1>'+output+'</h1>');
});

export default server;
