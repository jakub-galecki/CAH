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
const qs = require('qs');

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

const wss = new WebSocket.Server({server: server});

server.listen(process.env.PORT || '8080', () => {
    console.log('Listening on port: ' + server.address().port);
});

wss.on('connection', (ws, request) => {
    let authenticated;
    try {
        authenticated = authUser(request.url);
    } catch (e) {
        ws.send('No token provided');
        ws.terminate();
        return;
    }
    if (!authenticated || !authenticated.authenticated) {
        ws.send('User not authenticated');
        ws.terminate();
        return;
    }
    ws.isAlive = true;
    ws.userData = authenticated.data;
    ws.on('pong', () => {
        ws.isAlive = true;
    });
    ws.on('message', (message) => {
        console.log(ws);
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
            }).catch((e) => {
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

/**
 *
 * @param {string} reqUrl
 * @return {{data: any, authenticated: boolean}}
 */
function authUser(reqUrl) {
    console.log(reqUrl);
    const obj = qs.parse(reqUrl, {delimiter: '/'});
    if (obj.token) {
        const _JWT = obj.token;
        try {
            const decoded = jwt.verify(_JWT, 'qwerty');
            return {authenticated: true, data: decoded};
        } catch (e) {
            return {authenticated: false};
        }
    } else {
        throw new Error('No token provided');
    }
}

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
