'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const WebSocket = require('ws');
const apiRouter = require('./routes/api');
const http = require('http');
const uri = 'mongodb://127.0.0.1:27017/CAH';

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).catch((err) => console.error(err.reason));

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require('./models/UserSchema');
app.use('/api/', apiRouter);

const server = http.createServer(app);
const wss = new WebSocket.Server({server, path: '/game'});

server.listen(process.env.PORT || '8080', () => {
    console.log('Listening on port: ' + server.address().port);
});


wss.on('connection', (ws, request) => {
    ws.isAlive = true;
    ws.on('pong', () => {
        ws.isAlive = true;
    });
    ws.on('message', (message) => {
        console.log(message);
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

