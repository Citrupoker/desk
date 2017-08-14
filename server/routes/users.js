var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/User');


router.post('/register', passport.authenticate('local-register'), (req, res) => {
    res.json({ status: 1 });
});

router.post('/login', passport.authenticate('local-login'), (req, res) => {
    res.json({ status: 1 });
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

module.exports = router;
