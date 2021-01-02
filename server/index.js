'use strict';

const mongoose = require('mongoose');
const WebSocket = require('ws');
const http = require('http');
const uri = 'mongodb://127.0.0.1:27017/CAH';
const JSONRPc = require('./src/jsonrpc');
const Request = require('./src/request');
const Methods = require('./src/method');

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


wss.on('connection', (ws) => {
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
                    'result': e.data,
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
