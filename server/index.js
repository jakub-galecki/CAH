'use strict';

const mongoose = require('mongoose');
const WebSocket = require('ws');
const http = require('http');
const uri = 'mongodb://127.0.0.1:27017/CAH';
const Request = require('./src/request');

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).catch((err) => console.error(err.reason));

const server = http.createServer();
const wss = new WebSocket.Server({server});

server.listen(process.env.PORT || '8080', () => {
    console.log('Listening on port: ' + server.address().port);
});


wss.on('connection', (ws, request) => {
    ws.isAlive = true;
    ws.on('pong', () => {
        ws.isAlive = true;
    });
    ws.on('message', (message) => {
        const tmp = JSON.parse(message);
        const req = new Request(tmp.jsonrpc, tmp.id, tmp.method, tmp.params);
        if (Request.isRequest(req)) { // For testing purposes only.
            Request.parseRequest(req);
        }
        console.log(Request.getData(req));
        ws.send(message);
    });
});

const interval = setInterval(() => {
    wss.clients.forEach((ws) => {
        if (!ws.isAlive) return ws.terminate();
        ws.isAlive = false;
        ws.ping(() => {
        });
    });
}, 5000);

wss.on('close', () => {
    clearInterval(interval);
});
