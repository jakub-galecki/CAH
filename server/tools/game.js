const mongoose = require('mongoose');
const {InternalError} = require('../src/err');
require('../models/DeckSchema');
const Deck = mongoose.model('Deck');
// {"jsonrpc": "2.0", "method": "deck.createDeck", "params": {"title":"tytul", "userId":"1"}, "id": 1}
// {"jsonrpc": "2.0", "method": "deck.getDeck", "params": {"deckId":"07ZZ4G"}, "id": 1}
// {"jsonrpc": "2.0", "method": "deck.getAllDecks", "params": {}, "id": 1}
// {"jsonrpc": "2.0", "method": "deck.updateDeck", "params": {"deckId":"07ZZ4G", "title":"nowy tytul"}, "id": 1}
// {"jsonrpc": "2.0", "method": "deck.deleteDeck", "params": {"deckId":"07ZZ4G"}, "id": 1}

module.exports.nextTurn = async function nextTurn(params) {
    if (!params.deckId) throw new InternalError('You must provide deck id');

    return await Deck.findOne({'shortId': params.deckId}).exec().then(function(data) {
        if (data) {
            return data;
        } else {
            throw new InternalError('Deck not found');
        }
    }).catch(function(error) {
        throw new InternalError(error.data);
    });
};

module.exports.createDeck = async function(params) {
    if (!params.title) throw new InternalError('You must provide deck title');
    if (params.title.length === 0) {
        throw new InternalError('Deck title is empty');
    }
    if (params.title.length > 256) {
        throw new InternalError('Deck title is too long');
    }
    const deck = new Deck();
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
    if (!params.deckId) throw new InternalError('You must provide deck id');
    if (!params.title) throw new InternalError('You must provide deck title');
    if (params.title.length === 0) {
        throw new InternalError('Deck title is empty');
    }
    if (params.title.length > 256) {
        throw new InternalError('Deck title is too long');
    }

    return await Deck.findOneAndUpdate({shortId: params.deckId}, {title: params.title}, {new: true}).exec().then(function(data) {
        if (data) {
            return data;
        } else {
            throw new InternalError('Deck not found');
        }
    }).catch(function(error) {
        throw new InternalError(error.data);
    });
};

module.exports.deleteDeck = async function deleteDeck(params) {
    if (!params.deckId) throw new InternalError('You must provide deck id');
    return await Deck.findOneAndRemove({shortId: params.deckId}).exec().then(function(data) {
        if (data) {
            return 'deleted';
        } else {
            throw new InternalError('Deck not found');
        }
    }).catch(function(error) {
        throw new InternalError(error.data);
    });
};
