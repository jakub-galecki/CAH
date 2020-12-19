const router = require('express').Router();
const mongoose = require('mongoose');
require('../models/DeckSchema');
const Deck = mongoose.model('Deck');

router.post('/createDeck', function(req, res) {
    const deck = new Deck();
    deck.title = req.body.title;
    
    let shortId;
    do {
        shortId = Math.random().toString(36).substr(2, 6).toUpperCase()
    } while(Deck.findOne({'shortId': shortId}).length);
    deck.shortId = shortId;


    // narazie tak to zostawie, a potem pewnie będzie brane z uwierzytelniania
    deck.userId = req.body.userId;

    deck.save().then(function(deck) {
        res.status(201);
        res.json({'id': deck.shortId});
    }).catch(function(error) {
        res.send(error.message);
    });
});

router.get('/getDeck/:id', function(req, res) {
    const deck = Deck.findOne({'shortId': req.params.id});
    deck.then(function (deck) {
        if (deck) {
            res.json(deck);
        }
        else{
            res.status(422).send({'found': false, 'message': 'Deck not found'});
        }
    }).catch((error)=>{
        console.error(error.message);
        res.send(error.message);
    });
});

router.get('/getAllDecks', function(req, res) {
    Deck.find().then((data) => {
        res.json(data);
    });
});

router.put('/updateDeck', function(req, res) {
    if (!req.body.id) return res.status(422).send({'found': false, 'message': 'You must provide deck id'});

    const deck = Deck.findOneAndUpdate({'shortId': req.body.id}, {title: req.body.title});
    deck.then(function(deck) {
            res.status(201);
            res.json({'id': deck.shortId});
        }).catch(function(error) {
            res.send(error.message);
        });
});

router.delete('/deleteDeck', function(req, res) {
    if (!req.body.id) return res.status(422).send({'found': false, 'message': 'You must provide deck id'});
    const deck = Deck.findOneAndRemove({'shortId': req.body.id})
    deck.then(function(deck) {
            res.status(201);
            res.json({'id': deck.shortId});
        }).catch((error)=>{
        console.error(error.message);
        res.send('Deck not found');
    });
});

module.exports = router;
