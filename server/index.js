'use strict';

const mongoose = require('mongoose');
const WebSocket = require('ws');
const http = require('http');
const uri = 'mongodb://127.0.0.1:27017/CAH';
const JSONRPc = require('./src/jsonrpc');
const Methods = require('./src/method');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = require('./routes/router');
const bodyParser = require('body-parser');

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).catch((err) => console.error(err.reason));

const app = express();
app.use(bodyParser.json());
app.use('/', router);
const server = http.createServer(app);

const wss = new WebSocket.Server({noServer: true});

server.listen(process.env.PORT || '8080', () => {
    console.log('Listening on port: ' + server.address().port);
});

wss.on('connection', (ws, request, client) => {
    ws.isAlive = true;
    ws.on('pong', () => {
        ws.isAlive = true;
    });
    ws.on('message', (message) => {
        if (!message) {
            ws.send('Empty request');
            return;
        }
        try {
            const rpcObj = JSONRPc.parse(message);
            Methods._callMethod(rpcObj.method, rpcObj.params).then((res) => {
                const response = {
                    'jsonrpc': '2.0',
                    'result': res,
                    'id': rpcObj.id,
                };
                ws.send(JSON.stringify(response));
            }).catch((e)=>{
                const response = {
                    'jsonrpc': '2.0',
                    'error': e.data,
                    'id': rpcObj.id,
                };
                ws.send(JSON.stringify(response));
            });
        } catch (e) {
            try {
                const res = JSON.parse(message);
                if (!res.id) {
                    ws.send('Notification'); // Not supported yet
                }
                const err = {
                    'jsonrpc': '2.0',
                    'error': {
                        'code': e.code,
                        'message': e.data,
                    },
                    'id': res.id,
                };
                ws.send(JSON.stringify(err));
            } catch (e) {
                ws.send(e.message);
            }
        }
    });
});
server.on('upgrade', async function upgrade(request, socket, head) {
    const _JWT = request.headers.token;
    if (!_JWT) {
        socket.destroy();
    }
    let client = {};
    try {
        jwt.verify(_JWT, 'qwerty', function(err, decoded) {
            if (err) {
                socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
                socket.destroy();
            } else {
                client = {'data': decoded};
            }
        });
    } catch (e) {
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
        socket.destroy();
        return;
    }

    wss.handleUpgrade(request, socket, head, function done(ws) {
        wss.emit('connection', ws, request, client);
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
