var express = require('express');
var router = express.Router();

const tRealizada = require('../controller/tRealizada_dbfController');

router.post('/add', (req, res) => {
    tRealizada.create(req.body.media).then(resp => {
        res.status(201).json(resp);
    })
});

module.exports = router;