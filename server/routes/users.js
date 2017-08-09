var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/User');
var jwt    = require('jsonwebtoken');


    router.post('/register', passport.authenticate('local-register'), (req, res) => {
        res.json({ status: 1 });
    });
    router.post('/login', passport.authenticate('local-login'), (req, res) => {
        User.findOne({
            name: req.body.name
        }, function(err, user) {
            var token = jwt.sign(user, process.env.secret, {
                expiresIn: 60 * 60 * 24 // expires in 24 hours
            });

            // return the information including token as JSON
            res.json({
                success: true,
                message: 'Enjoy your token!',
                token: token
            });
        })
    });
    router.get('/logout', (req, res) => {
        req.logout();
        res.json({ status: 1 });
    });
    router.get('/', function(req, res) {
        User.find({}, function(err, users) {
            res.json(users);
        });
    });

    router.post('/authenticate', function(req, res) {

        // find the user
        User.findOne({
            name: req.body.name
        }, function(err, user) {

            if (err) throw err;

            if (!user) {
                res.json({ success: false, message: 'Authentication failed. User not found.' });
            } else if (user) {

                // check if password matches
                if (user.password != req.body.password) {
                    res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                } else {

                    // if user is found and password is right
                    // create a token
                    var token = jwt.sign(user, app.get('superSecret'), {
                        expiresIn : 60*60*24 // expires in 24 hours
                    });

                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                }

            }

        });
    });




module.exports = router;
