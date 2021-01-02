const mongoose = require('mongoose');
const {InternalError} = require('../src/err');
require('../models/CardSchema');
const Card = mongoose.model('Card');

// {"jsonrpc": "2.0", "method": "card.createCard", "params": {"content":"zawartosc", "deckId":"4UDMW3", "cardType":0, "userId":"1"}, "id": 1}
// {"jsonrpc": "2.0", "method": "card.getCard", "params": {"cardId":"5ff08f48f506ee35a319ef1f"}, "id": 1}
// {"jsonrpc": "2.0", "method": "card.getCardsFromDeck", "params": {"deckId":"4UDMW3"}, "id": 1}
// {"jsonrpc": "2.0", "method": "card.updateCard", "params": {"cardId":"5ff08f48f506ee35a319ef1f", "content":"nowa zawartosc"}, "id": 1}
// {"jsonrpc": "2.0", "method": "card.deleteCard", "params": {"cardId":"5ff08f48f506ee35a319ef1f"}, "id": 1}

module.exports.getCard = async function getCard(params) {
    if (!params.cardId) throw new InternalError('You must provide card id');

    return await Card.findById(params.cardId).exec().then(function(data) {
        return data;
    }).catch(function(error) {
        throw new InternalError('Card not found');
    });
};

module.exports.createCard = async function createCard(params) {
    if (!params.content) throw new InternalError('You must provide card content');
    if (params.cardType !== 0 && params.cardType !== 1) throw new InternalError('You must provide valid card type');
    if (params.content.length === 0) {
        throw new InternalError('Deck content is empty');
    }
    if (params.content.length > 256) {
        throw new InternalError('Deck content is too long');
    }

    // TODO check if black card is valid

    const card = new Card();
    card.content = params.content;
    card.cardType = params.cardType;
    card.deckId = params.deckId;

    return await card.save().then(function(card) {
        return card._id;
    }).catch(function(error) {
        throw new InternalError(error.message);
    });
};

module.exports.getCardsFromDeck = async function getCardsFromDeck(params) {
    if (!params.deckId) throw new InternalError('You must provide deck id');
    return await Card.find({deckId: params.deckId}).exec().then(function(data) {
        return data;
    }).catch(function(error) {
        throw new InternalError(error.message);
    });
};

module.exports.updateCard = async function updateCard(params) {
    if (!params.cardId) throw new InternalError('You must provide card id');
    if (!params.content) throw new InternalError('You must provide card content');
    if (params.content.length === 0) {
        throw new InternalError('Card content is empty');
    }
    if (params.content.length > 256) {
        throw new InternalError('Card content is too long');
    }

    return await Card.findByIdAndUpdate(params.cardId, {content: params.content}, {new: true}).exec().then(function(data) {
        return data;
    }).catch(function(error) {
        throw new InternalError('Card not found');
    });
};

module.exports.deleteCard = async function deleteCard(params) {
    if (!params.cardId) throw new InternalError('You must provide card id');
    return await Card.findByIdAndRemove(params.cardId).exec().then(function(deck) {
        return 'deleted';
    }).catch(function(error) {
        throw new InternalError('Card not found');
    });
};
