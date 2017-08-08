var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-register', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password'
    },
    function(username, password, done) {
        process.nextTick(function() {
            // Checking to see if the user trying to login already exists
            User.findOne({ 'local.username':  username }, function(err, user) {
                if (err)
                    return done(err);
                    
                if (user) {
                    return done(null, false);
                } else {
                    // if there is no user with that email, create the user
                    var newUser = new User();
    
                    newUser.local.username = username;
                    newUser.local.password = newUser.generateHash(password);
    
                    newUser.save(function(err) {
                        if (err) throw err;
                        return done(null, newUser);
                    });
                }
            });    
        });
    }));
    
    passport.use('local-login', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password'
    },
    function(username, password, done) { 
        // Checking to see if the user trying to login already exists
        User.findOne({ 'local.username' :  username }, function(err, user) {
            if (err)
                return done(err);
            // if no user is found, return the message
            if (!user)
                return done(null, false); 
            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false); 
            // all is well, return successful user
            return done(null, user);
        });
    }));

};