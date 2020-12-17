const router = require('express').Router();
const mongoose = require('mongoose');
require('../models/User');
const User = mongoose.model('User');

router.get('/data', function(req, res, next){
    User.findById(req.payload.id).then((user)=>{
        if(user){
            return res.json({user: user.getProfileData()})
        } else {
            res.status(401);
            res.send("User not found");
        }
    });
});

module.exports = router;