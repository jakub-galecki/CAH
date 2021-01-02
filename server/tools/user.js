const router = require('express').Router();
const mongoose = require('mongoose');
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
