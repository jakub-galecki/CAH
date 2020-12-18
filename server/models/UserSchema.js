const mongoose = require('mongoose');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
    'username': {type: String, unique: true, required: [true, 'Username is required'], validate: {
        validator: function(username) {
            return username.length > 5;
        },
        message: (props) => `${props.value} is too short!`,
    }},
    'password': String,
    'salt': String,
    'played': Number,
    'won': Number,
});

UserSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.password === hash;
};

UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

UserSchema.methods.getProfileData = function() {
    return {
        'username': this.username,
        'played': this.played,
        'won': this.won,
    };
};
UserSchema.methods.getStats = function() {
    const result = (this.won / this.played) * 100;
    if (!isNaN(result)) {
        return result;
    } else {
        return 0;
    }
};
UserSchema.methods.updateStats = function(won) {
    this.played = this.played + 1;
    if (won) {
        this.won = this.won + 1;
    }
    this.save();
};
module.exports = mongoose.model('User', UserSchema, 'users');
