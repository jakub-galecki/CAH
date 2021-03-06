const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    'owner': {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    'users': [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    'decks': Array,
    'state': String,
    'name': String,
});

RoomSchema.methods.setState = function(state) {
    this.state = state;
    this.save();
    return this.state;
};

RoomSchema.methods.addUsers = function(users) {
    this.users = this.users.concat(users);
    this.save();
};

RoomSchema.methods.removeUser = function(id) {
    const i = this.users.indexOf(id);
    if (i > -1) {
        this.users.splice(i, 1);
    }
    this.save();
};

RoomSchema.methods.attachDeck = function(ids) {
    ids.forEach((val)=>{
        if (!this.decks.includes(val)) {
            this.decks.push(val);
        }
    });
    this.save();
};

RoomSchema.methods.detachDeck = function(deckId) {
    const i = this.decks.indexOf(deckId);
    if (i > -1) {
        this.decks.splice(i, 1);
    }
    this.save();
};

RoomSchema.methods.getInfo = function() {
    return {
        'roomId': this._id,
        'owner': this.owner,
        'users': this.users,
        'decks': this.decks,
        'state': this.state,
        'name': this.name,
    };
};

module.exports = mongoose.model('Room', RoomSchema, 'rooms');
