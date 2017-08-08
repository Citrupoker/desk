var express = require('express');
var router = express.Router();
var passport = require('passport');

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

module.exports = router;
