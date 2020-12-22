const router = require('express').Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('../models/UserSchema');
const User = mongoose.model('User');

router.get('/getData/:id', function(req, res) {
    User.findById(req.params.id).then((user)=>{
        if (user) {
            return res.json(user.getProfileData());
        }
    }).catch((error)=>{
        console.error(error.message);
        res.status(401);
        res.send('User not found');
    });
});

router.get('/getStats/:id', function(req, res) {
    User.findById(req.params.id).then((user)=>{
        if (user) {
            return res.status(200).send({'stats': user.getStats()});
        }
    }).catch((error) => {
        console.error(error.message);
        res.status(401);
        res.send('User not found');
    });
});

router.post('/createUser', function(req, res) {
    const user = new User();
    user.username = req.body.username;
    user.setPassword(req.body.password);
    user.played = req.body.played;
    user.won = req.body.won;

    user.save().then(function(user) {
        res.status(201);
        res.json({'id': user._id});
    }).catch(function(error) {
        if (error.name === 'ValidationError') {
            return res.status(422).send({'status': false, 'message': 'Username is already taken'});
        } else {
            res.send(error.message);
        }
    });
});

router.post('/login', function(req, res) {
    if (!req.body.username) return res.status(422).send({'found': false, 'message': 'You must provide username'});
    if (!req.body.password) return res.status(422).send({'found': false, 'message': 'You must provide password'});
    User.findOne({'username': req.body.username}).then( function(user) {
        const pass = user.validatePassword(req.body.password);
        if (pass) {
            jwt.sign({user}, 'privatekey', {expiresIn: '1h'}, (err, token) => {
                if (err) console.log(err);
                res.status(202).send({token, 'found': true, 'message': 'Logged in'});
            });
        } else {
            return res.status(422).send({'found': false, 'message': 'Invalid password'});
        }
    }).catch((error) => {
        console.error(error.message);
        return res.status(422).send({'found': false, 'message': 'User does not exist.'});
    });
});

router.put('/updateStats', function(req, res) {
    if (!req.body.id) return res.status(422).send({'found': false, 'message': 'You must provide user id'});
    if (!req.body.played) return res.status(422).send({'found': false, 'message': 'Was the game played? true/false'});
    User.findById(req.body.id).then((user)=>{
        if (user) {
            user.updateStats(req.body.won);
            return res.status(200).send({'stats': user.getStats()});
        }
    }).catch((error) => {
        console.error(error.message);
        res.status(401);
        res.send('User not found');
    });
});

module.exports = router;
