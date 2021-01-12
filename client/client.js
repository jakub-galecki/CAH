/**
 * @class
 */
export class RpcClient {
    /**
     * @param {WebSocket} ws
     */
    constructor(ws) {
        if (!ws) {
            throw new Error('You must provide WebSocket connection');
        }
        this.requests = {};
        this.busy = false;
        this.cb = null;
        this.ws = ws;
    }

    /**
     * @param {string} method
     * @param {object} params
     * @param {boolean} notification
     * @return {object} request
     */
    createRequest({method, params, notification}) {
        const req = {
            jsonrpc: '2.0',
            method: method,
        };
        if (params) {
            req.params = params;
        }
        if (notification === false) {
            req.id = this.setId();
        }
        return req;
    }

    /**
     * @param {Object} obj
     * @param {number} id
     */
    async sendReq({obj, id}) {
        const data = JSON.stringify(obj);
        await this.prep(this.ws);
        return new Promise((resolve, reject) => {
            this.requests[id] = {obj: obj, resolve, reject};
            setTimeout(() => {
                if (this.requests[id]) {
                    delete this.requests[id];
                    reject(new Error('Time out.'));
                }
            }, 30000);
            try {
                if (this.ws && this.ws.readyState === 1) {
                    return this.ws.send(data);
                } else {
                    delete this.requests[id];
                    reject(new Error('Socket is not opened.'));
                }
            } catch (e) {
                delete this.requests[id];
                reject(e);
            }
        });
    }

    /**
     * @return {number} id
     */
    setId() {
        const temp = new Date().getSeconds() * Math.floor(Math.random() * (11 - 1)) + 1;
        return Number(String(temp).charAt(0));
    }

    /**
     *
     * @param {WebSocket} socket
     * @return {Promise<*>}
     */
    async prep(socket) {
        if (!socket) {
            throw new Error('No ws provideed');
        }
        return new Promise((resolve, reject) => {
            socket.removeEventListener('message', this.cb);
            const maxNumberOfAttempts = 10;
            const intervalTime = 200;

            let currentAttempt = 0;
            const interval = setInterval(() => {
                if (currentAttempt > maxNumberOfAttempts - 1) {
                    clearInterval(interval);
                    reject(new Error('Could not connect.'));
                } else if (socket.readyState === socket.OPEN) {
                    socket.addEventListener('message', this.cb);
                    clearInterval(interval);
                    resolve();
                }
                currentAttempt++;
            }, intervalTime);
        });
    }

    /**
     * @param {string} body
     */
    response(body) {
        const response = JSON.parse(body);
        const res = 'result' in response;
        const err = 'error' in response;
        if (!res && !err) return;
        const reqToProcess = this.requests[response.id];
        delete this.requests[response.id];
        if (!reqToProcess) return;
        if (res) {
            reqToProcess.resolve(response.result);
        }
        if (err) {
            reqToProcess.reject({err: response.error});
        }
    }

    /**
     *
     * @param  {string} method
     * @param {object} params
     * @param {boolean} notification
     * @return {Promise<void>}
     */
    async send(method, params, notification) {
        await this.prepare();
        const req = this.createRequest({method, params, notification});
        return this.sendReq({obj: req, id: req.id});
    }

    /**
     * @return {Promise<void>}
     */
    async prepare() {
        if (!this.busy) {
            await this.bindCallback(this.response.bind(this));
            this.busy = true;
        }
    }
    // eslint-disable-next-line require-jsdoc
    async bindCallback(cb) {
        this.cb = function(event) {
            cb(event.data);
        };
    }
}

