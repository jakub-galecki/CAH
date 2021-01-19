const mongoose = require('mongoose');
const {InternalError} = require('../src/err');
require('../models/RoomSchema');
const Room = mongoose.model('Room');

module.exports.initRoom = async function initRoom(params) {
    const room = new Room();
    room.owner = params.userId;
    room.users = [params.userId];
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
    return await Room.find({$or: [{state: 'initialized'}, {state: 'inGame'}]}).exec().then(function(data) {
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

module.exports.getUsers = async function getUsers(params) {
    return await Room.findById(params.roomId).exec().then((r) => {
        return r.users;
    }).catch((e) => {
        throw new InternalError('Could not find the room');
    });
};

module.exports.getRoom = async function getRoom(params) {
    return await Room.findById(params.roomId).exec().then((r) => {
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
