const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');


let userSchema = mongoose.Schema({
    local: {
        username: String,
        password: String,
        admin: Boolean
    }
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);