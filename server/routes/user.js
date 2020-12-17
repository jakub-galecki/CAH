const router = require('express').Router();
const mongoose = require('mongoose');
require('../models/UserSchema');
const User = mongoose.model('User');

router.get('/getData/:id', function(req, res){
    User.findById(req.params.id).then((user)=>{
        if(user){
            return res.json(user.getProfileData());
        } else {
            res.status(401);
            res.send("User not found");
        }
    });
});

router.post('/createUser', function (req,res){
    let user = new User();
    user.username = req.body.username;
    user.setPassword(req.body.password);
    user.played = req.body.played;
    user.won = req.body.won;

    user.save().then(function (user){
        res.status(201);
        res.json({"id" : user._id});
    }).catch(function (error){
        if (error.name === 'MongoError' && error.code === 11000){
            return res.status(422).send({'status': false, 'message' : 'Username is already taken'});
        } else {
            res.send(error.message);
        }
    });

});

module.exports = router;
