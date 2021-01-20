const router = require('express').Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('../models/UserSchema');
const User = mongoose.model('User');


router.post('/createUser', function(req, res) {
    const user = new User();
    user.username = req.body.username;
    user.setPassword(req.body.password);
    user.played = req.body.played;
    user.won = req.body.won;

    user.save().then(function(user) {
        jwt.sign({user}, 'qwerty', {expiresIn: '1h'}, (err, token) => {
            if (err) console.log(err);
            res.status(202).send({'token': token, 'found': true, 'message': 'Logged in'});
        });
    }).catch(function(error) {
        if (error.name === 'ValidationError') {
            return res.status(422).send({'status': false, 'message': 'Username is already taken'});
        } else {
            res.send(error.message);
        }
    });
});

router.post('/login', function(req, res) {
    console.log(req.body);
    if (!req.body.username) return res.status(422).send({'found': false, 'message': 'You must provide username'});
    if (!req.body.password) return res.status(422).send({'found': false, 'message': 'You must provide password'});
    User.findOne({'username': req.body.username}).then( function(user) {
        const pass = user.validatePassword(req.body.password);
        if (pass) {
            jwt.sign({user}, 'qwerty', {expiresIn: '1h'}, (err, token) => {
                if (err) console.log(err);
                res.status(202).send({'token': token, 'found': true, 'message': 'Logged in', 'userId': user._id});
            });
        } else {
            return res.status(422).send({'found': false, 'message': 'Invalid password'});
        }
    }).catch((error) => {
        console.error(error.message);
        return res.status(422).send({'found': false, 'message': 'User does not exist.'});
    });
});

module.exports = router;
