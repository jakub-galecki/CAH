const mongoose = require('mongoose');
const {InternalError} = require('../src/err');
require('../models/RoomSchema');
const Room = mongoose.model('Room');

module.exports.initRoom = async function initRoom(params) {
    if (!params.name) throw new InternalError('You must provide room name');
    if (params.name.length === 0) {
        throw new InternalError('Room name is empty');
    }
    if (params.name.length > 256) {
        throw new InternalError('Room name is too long');
    }
    const room = new Room();
    room.owner = params.userId;
    room.users = [params.userId];
    room.name = params.name;
    if (params.users && Array.isArray(params.users)) {
        room.users = room.users.concat(params.users);
    }
    room.state = 'initialized';
    return await room.save().then(function() {
        return room.getInfo();
    }).catch((err) => {
        throw new InternalError(err.message);
    });
};

module.exports.getRooms = async function getRooms() {
    return await Room.find({$or: [{state: 'initialized'}, {state: 'inGame'}]}).populate([{path: 'owner', select: {username: 1}}]).exec().then(function(data) {
        return data;
    }).catch(function(error) {
        throw new InternalError(error.message);
    });
};

module.exports.addUsers = async function addUsers(params) {
    return await Room.findById(params.roomId).exec().then((r) => {
        if (params.users && Array.isArray(params.users)) {
            r.users = r.users.concat(params.users);
            r.save();
            return r.users;
        }
    }).catch((e) => {
        throw new InternalError('Could not find the room');
    });
};

module.exports.join = async function join(params) {
    return await Room.findById(params.roomId).exec().then((r) => {
        if (params.userId) {
            r.users = r.users.concat(params.userId);

            console.log(r.users.length);
            r.save();
            return r;
        }
    }).catch((e) => {
        throw new InternalError('Could not find the room');
    });
};

module.exports.getUsers = async function getUsers(params) {
    return await Room.findById(params.roomId).exec().then((r) => {
        return r.users;
    }).catch((e) => {
        throw new InternalError('Could not find the room');
    });
};

module.exports.getRoom = async function getRoom(params) {
    return await Room.findById(params.roomId).populate([{path: 'owner', select: {username: 1}}, {path: 'users', select: {username: 1}}]).exec().then((r) => {
        return r.getInfo();
    }).catch((e) => {
        throw new InternalError('Could not find the room');
    });
};

module.exports.changeState = async function changeState(params) {
    return await Room.findById(params.roomId).exec().then((r) => {
        return r.setState(params.state);
    }).catch((e) => {
        throw new InternalError('Could not find the room');
    });
};
