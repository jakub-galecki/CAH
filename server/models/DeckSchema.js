const mongoose = require('mongoose');

const DeckSchema = new mongoose.Schema({
    'title': {
        type: String,
        required: [true, 'Title is required'],
        validate: {
            validator: function(content) {
                return content.length <= 256;
            },
            message: (props) => `${props.value} is too long!`,
        },
    },
    'shortId': String,
    'userId': String,
});

module.exports = mongoose.model('Deck', DeckSchema, 'decks');
