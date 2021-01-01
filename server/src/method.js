const {MethodNotfound, InternalError} = require('./err');

module.exports._callMethod = function(methodName, params) {
    if (typeof methodName === 'string' && typeof params === 'object') {
        const _PATH = '../tools/';
        const file = methodName.split('.')[0];
        const method = methodName.split('.')[1];
        let handler;
        try {
            handler = require(_PATH + file);
        } catch (e) {
            throw new MethodNotfound('Module not found');
        }
        try {
            return handler[method](params).then((res)=>{
                return res;
            }).catch(()=>{
                throw new InternalError('Error while waiting for the results');
            });
        } catch (e) {
            throw new MethodNotfound('Could not find method');
        }
    }
};
