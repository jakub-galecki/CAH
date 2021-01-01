const mongoose = require('mongoose');
const {InternalError} = require('../src/err');
require('../models/DeckSchema');
const Deck = mongoose.model('Deck');

module.exports.getData = async function(func, params) {
    return await func(params);
};

// {"jsonrpc": "2.0", "method": "deck.createDeck", "params": {"title":"tytul", "userId":"1"}, "id": 1}
// {"jsonrpc": "2.0", "method": "deck.getDeck", "params": {"id":"67QY5Z"}, "id": 1}
// {"jsonrpc": "2.0", "method": "deck.getAllDecks", "params": {}, "id": 1}
// {"jsonrpc": "2.0", "method": "deck.updateDeck", "params": {"id":"67QY5Z", "title":"nowy tytul"}, "id": 1}
// {"jsonrpc": "2.0", "method": "deck.deleteDeck", "params": {"id":"67QY5Z"}, "id": 1}

module.exports.getDeck = async function getDeck(params) {
    const deck = Deck.findOne({'shortId': params.id}).exec();
    return await deck.then(function(data) {
        return data;
    }).catch(function(error) {
        throw new InternalError('Deck not found');
    });
};

module.exports.createDeck = async function(params) {
    const deck = new Deck();
    if (params.title.length == 0) {
        throw new InternalError('Deck title is empty');
    }
    deck.title = params.title;

    let shortId;
    do {
        shortId = Math.random().toString(36).substr(2, 6).toUpperCase();
    } while (Deck.findOne({'shortId': shortId}).length);
    deck.shortId = shortId;

    // narazie tak to zostawie, a potem pewnie będzie brane z uwierzytelniania
    deck.userId = params.userId;

    return await deck.save().then(function(deck) {
        return shortId;
    }).catch(function(error) {
        throw new InternalError('User already exists');
    });
};

module.exports.getAllDecks = async function getAllDecks(params) {
    return await Deck.find().exec().then(function(data) {
        return data;
    }).catch(function(error) {
        throw new InternalError(error.message);
    });
};

module.exports.updateDeck = async function updateDeck(params) {
    if (!params.id) throw new InternalError('You must provide deck id');
    if (params.title.length == 0) {
        throw new InternalError('Deck title is empty');
    }

    const deck = Deck.findOneAndUpdate({shortId: params.id}, {title: params.title}, {new: true}).exec();
    return await deck.then(function(deck) {
        return deck;
    }).catch(function(error) {
        throw new InternalError(error.message);
    });
};

module.exports.deleteDeck = async function deleteDeck(params) {
    if (!params.id) throw new InternalError('You must provide deck id');
    const deck = Deck.findOneAndRemove({shortId: params.id}).exec();
    return await deck.then(function(deck) {
        return 'deleted';
    }).catch(function(error) {
        throw new InternalError('Deck not found');
    });
};
