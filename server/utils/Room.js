/* eslint-disable require-jsdoc */
module.exports.Room = class Room {
    constructor(owner) {
        this.owner = owner;
        this.state = 'lobby';
        this.users = [owner];
    }
    addUser(userId) {
        this.users.push(userId);
    }
    removeUser(userId) {
        const index = this.users.indexOf(userId);
        if (index != -1) this.users.splice(index, 1);
    }
    destroy() {
        // @todo: make GC handle this
        this.state = 'destroyed';
        this.users.length = 0;
        this.owner = '';
    }
};
