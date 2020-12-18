const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
    'content': {
        type: String,
        required: [true, 'Content is required'],
        validate: {
            validator: function(content) {
                return content.length <= 256;
            },
            message: 'Card content is too long!',
        },
    },
    'deckId': {
        type: String,
        required: [true, 'Deck id is required'],
    },
    'cardType': {
        type: Number,
        required: [true, 'Card type is required'],
    },
});

module.exports = mongoose.model('Card', CardSchema, 'cards');
