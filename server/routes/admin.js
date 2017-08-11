var express = require('express');
var router = express.Router();

function isAdmin(req, res, next) {
    if (req.user.local.admin) {
        return next();
    } else {
        res.json({ message: 'You need admin rights to access this content' });
    }
}

router.get('/', isAdmin, (req, res) => {
    console.log(req.user);
    res.send(req.user);
});

module.exports = router;