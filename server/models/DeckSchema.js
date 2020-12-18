const mongoose = require('mongoose');

const DeckSchema = new mongoose.Schema({
    'title': {
        type: String,
        required: [true, 'Title is required'],
        validate: {
            validator: function(content) {
                return content.length <= 256;
            },
            message: 'Title is too long!',
        },
    },
    'userId': String,
});

module.exports = mongoose.model('Deck', DeckSchema, 'decks');
