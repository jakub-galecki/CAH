const fs = require('fs');
const deck = require('../tools/deck');
const card = require('../tools/card');
const mongoose = require('mongoose');
const uri = 'mongodb://127.0.0.1:27017/CAH';

// Temporarily you have to turn off the script off manually - after around 30sec - 1min.

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).catch((err) => console.error(err.reason));


fs.readFile('cah-cards-full.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const tmp = JSON.parse(data);
    for ([key, value] of Object.entries(tmp)) {
        deck.createDeck({title: value.name, userId: '5fdbacb740b4b2436b104feb', cardsCount: value.black.length, type: 1}).then((res)=>{
            for ([t, cards] of Object.entries(value.white)) {
                card.createCard({content: cards.text, deckId: res, cardType: 0, userId: 0});
            }
        });
        deck.createDeck({title: value.name, userId: '5fdbacb740b4b2436b104feb', cardsCount: value.white.length, type: 0}).then((res)=>{
            for ([t, cards] of Object.entries(value.black)) {
                card.createCard({content: cards.text, deckId: res, cardType: 1, userId: 0});
            }
        });
    }
});
