'use strict';

const {InvalidRequest} = require('./err');

/**
 * @class
 */
module.exports = class Request {
    #version;
    #id;
    #method;
    #params;
    /**
     * @param {string} version
     * @param {number} id
     * @param {string} method
     * @param {Array} params
     */
    constructor(version, id, method, params) {
        this.#version = version;
        this.#id = id;
        this.#method = method;
        this.#params = params;
    }

    /**
     * @param {Request} req
     * @return {string}
     */
    static getVersion(req) {
        return req.#version;
    }
    /**
     * @param {Request} req
     * @return {number}
     */
    static getId(req) {
        return req.#id;
    }
    /**
     * @param {Request} req
     * @return {number}
     */
    static getMethod(req) {
        return req.#method;
    }
    /**
     * @param {Request} req
     * @return {number}
     */
    static getParams(req) {
        return req.#params;
    }
    /**
     * @param {Request} req
     * @return {Object}
     */
    static getData(req) {
        return {
            'jsonrpc': req.#version,
            'id': req.#id,
            'method': req.#method,
            'params': req.#params,
        };
    }

    /**
     *
     * @param {Request} req
     */
    static parseRequest(req) {
        if (typeof req !== 'object' && req == null && Array.isArray(req)) {
            throw new InvalidRequest('Request received was not an object');
        }
        if (req.#id != null || req.#id !== undefined) {
            if (typeof req.#id !== 'number' || !Number.isInteger(req.#id)) {
                throw new InvalidRequest('Id property must be integer');
            }
        } else {
            throw new InvalidRequest('You must provide id parameter');
        }
        if (typeof req.#method !== 'string') {
            throw new InvalidRequest('Method must be string');
        }
        if (/^rpc/i.test(req.#method)) {
            throw new InvalidRequest('Method should not start with the rpc prefix');
        }
        if (req.#params === undefined) {
            throw new InvalidRequest('You must provide some parameters');
        } else {
            if (typeof req.#params !== 'object' || req.#params === null) {
                throw new InvalidRequest('Parameters (params) must be an object');
            }
        }
    }
    /**
     *
     * @param {Request} req
     * @return {boolean}
     */
    static isRequest(req) {
        if (typeof req !== 'object' || req == null || Array.isArray(req)) {
            return false;
        }
        if (req.#params && req.#params !== 'object') {
            return false;
        }
        return !(!req.#id || !req.#method);
    }
};
