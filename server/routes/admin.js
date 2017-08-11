var express = require('express');
var router = express.Router();

function isAdmin(req, res, next) {
    if (req.user.local.admin) {
        return next();
    } else {
        res.json({ message: 'You need admin rights to access this content' });
    }
}

router.get('/', (req, res) => {
    console.log(req);
    res.send(req.user);
});

module.exports = router;
