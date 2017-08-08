var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    req.logout();
    res.json({ status: 1 });
});

module.exports = router;
