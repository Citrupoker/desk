var express = require('express');
var router = express.Router();
var passport = require('passport');

router.post('/', passport.authenticate('local-login'), (req, res) => {
    res.json({ status: 1 });
});

module.exports = router;
