const mongoose = require('mongoose');
const {InternalError} = require('../src/err');
require('../models/RoomSchema');
const Room = mongoose.model('Room');
const User = mongoose.model('User');

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
    try {
        await room.save();
        return {
            data: room,
            user: params.userId,
            method: 'room.initRoom',
        };
    } catch (err) {
        throw new InternalError(err.message);
    }
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
    const {_id, username} = await User.findById(params.userId);

    if (params.userId) {
        const user = await Room.find({
            users: {$elemMatch: {$eq: params.userId}},
            state: {$in: ['initialized', 'inGame']},
        });
        console.log(user);
        if (!user) {
            throw new InternalError('Error while fetching user in Room.find');
        }
        if (!user.length) {
            try {
                const r = await Room.findById(params.roomId);
                if (params.userId) {
                    r.users = r.users.concat(params.userId);
                    r.save();
                    return {
                        data: r,
                        user: {_id, username},
                        method: 'room.join',
                    };
                }
            } catch (e) {
                throw new InternalError('Could not find the room');
            }
        } else {
            throw new InternalError('User is currently in the other game');
        }
    } else {
        return new InternalError('User Id is required.');
    }
};

module.exports.getUsers = async function getUsers(params) {
    return await Room.findById(params.roomId).populate([{path: 'owner', select: {username: 1}}, {path: 'users', select: {username: 1}}]).exec().then((r) => {
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

module.exports.getMyRoom = async function getMyRoom(params) {
    return await Room.findOne({
        users: params.userId,
    }).populate([{path: 'owner', select: {username: 1}}, {path: 'users', select: {username: 1}}]).exec().then((r) => {
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

module.exports.attachDeck = async function attachDeck(params) {
    if (params.roomId) {
        return await Room.findById(params.roomId).exec().then((room) => {
            room.attachDeck(params.decks);
            return {
                data: room.getInfo(),
                user: params.userId,
                method: 'room.attachDeck',
            };
        }).catch((e) => {
            throw new InternalError('Not such room');
        });
    } else {
        throw new Error('No roomId provided');
    }
};

module.exports.detachDeck = async function detachDeck(params) {
    if (params.roomId) {
        return await Room.findById(params.roomId).exec().then((room) => {
            room.detachDeck(params.deckId);
            return {
                data: room.getInfo(),
                user: params.userId,
                method: 'room.detachDeck',
            };
        }).catch((e) => {
            throw new InternalError('Not such room');
        });
    } else {
        throw new Error('No roomId provided');
    }
};

module.exports.start = async function start(params) {
    const gameId = params.games.length + 1;
    params.games.push({
        gameId,
        roomId: params.roomId,
    });

    return Promise.resolve({
        data: gameId,
        user: params.userId,
        method: 'room.start',
    });
};
