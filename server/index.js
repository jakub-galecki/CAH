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
const cors = require('cors');
const room = require('./tools/room');
const {toRoom} = require('./src/MethodsToBroadcast');
const {allUsers} = require('./src/MethodsToBroadcast');

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).catch((err) => console.error(err.reason));

const app = express();
app.use(cors());
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
        if (!message) {
            ws.send('Empty request');
            return;
        }
        try {
            const rpcObj = JSONRPc.parse(message);
            if (rpcObj.method.indexOf('room') !== -1) {
                rpcObj.params.userId = ws.userData.user._id;
            }
            Methods._callMethod(rpcObj.method, rpcObj.params).then((res) => {
                const response = {
                    'jsonrpc': '2.0',
                    'result': res,
                    'id': rpcObj.id,
                };
                if (allUsers.includes(rpcObj.method)) {
                    console.log('broadcast all');
                    broadcast(wss, response);
                } else if (toRoom.includes(rpcObj.method)) {
                    console.log('broadcast toRoom');
                    broadcastToRoom(wss, rpcObj.params.roomId, response);
                } else {
                    console.log('toUser');
                    ws.send(JSON.stringify(response));
                }
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

/**
 * @param {WebSocketServer} wss
 * @param {String} roomId
 * @param {Object} data
 */
function broadcastToRoom(wss, roomId, data) {
    (async function(wss, roomId, data) {
        const users = await room.getUsers({roomId: roomId});
        wss.clients.forEach((client) => {
            const inRoom = Object.values(users).some((u) => {
                return u === client.userData.user._id;
            });
            if (client.readyState === 1 && inRoom) {
                client.send(JSON.stringify(data));
            }
        });
    })(wss, roomId, data);
}
/**
 * @param {WebSocketServer} wss
 * @param {Object} data
 */
function broadcast(wss, data) {
    wss.clients.forEach((client) => {
        if (client.readyState === 1) {
            console.log('send');
            client.send(JSON.stringify(data));
        }
    });
}

wss.on('close', () => {
    clearInterval(interval);
});
