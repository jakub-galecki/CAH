// https://www.youtube.com/watch?v=6XzGmdXbZmU&ab_channel=GolecuOrkiestra
const Request = require('./request');
const {ParseError, InvalidRequest} = require('./err');
/**
 *
 * @param {Object} obj
 * @return {Request}
 */
function createRpcObj(obj) {
    if (Request.isRequest(obj)) {
        Request.parseRequest(obj);
        const {id, jsonrpc, method, params} = obj;
        return new Request(jsonrpc, id, method, params);
    }
    throw new InvalidRequest('Invalid request was sent');
}
/**
 * @param {string} message
 * @return {Object}
 */
module.exports.parse = function(message) {
    let obj;
    try {
        obj = JSON.parse(message);
    } catch (e) {
        throw new ParseError(e.message);
    }
    return createRpcObj(obj);
};
