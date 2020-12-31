'use strict';
/**
 * @class
 * @classdesc Class representing Error object
 */
class RPCError extends Error {
    /**
     * @param {Number} code
     * @param {String} message
     * @param {String} meaning
     * @param {any} data
     * @constructor
     */
    constructor(code, message, meaning, data) {
        super(message);
        this.name = 'RPCError';
        this.code = code;
        this.meaning = meaning;
        this.message = message;
        this.data = data;
        Error.captureStackTrace(this, RPCError);
    }
}


module.exports.ParseError = class ParseError extends RPCError {
    /**
     * @param {any} data
     */
    constructor(data) {
        super(-32700, 'Parse error', 'Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text.', data);
        Error.captureStackTrace(this, ParseError);
    }
};

module.exports.InvalidRequest = class InvalidRequest extends RPCError {
    /**
     * @param {any} data
     */
    constructor(data) {
        super(-32600, 'Invalid Request', 'The JSON sent is not a valid Request object.', data);
        Error.captureStackTrace(this, InvalidRequest);
    }
};

module.exports.MethodNotfound = class MethodNotfound extends RPCError {
    /**
     * @param {any} data
     */
    constructor(data) {
        super(-32601, 'Method not found', 'The method does not exist / is not available.', data);
        Error.captureStackTrace(this, MethodNotfound);
    }
};

module.exports.InvalidParams = class InvalidParams extends RPCError {
    /**
     * @param {any} data
     */
    constructor(data) {
        super(-32602, 'Invalid params', 'Invalid method parameter(s).', data);
        Error.captureStackTrace(this, InvalidParams);
    }
};

module.exports.InternalError = class InternalError extends RPCError {
    /**
     * @param {any} data
     */
    constructor(data) {
        super(-32603, 'Internal error', 'Internal JSON-RPC error.', data);
        Error.captureStackTrace(this, InternalError);
    }
};

