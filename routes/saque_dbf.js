var express = require('express');
var router = express.Router();

const saqueController = require('../controller/saque_dbfController');

router.post('/add', (req, res) => {
    saqueController.create(req.body.media).then(resp => {
        res.status(201).json(resp);
    })
});

module.exports = router;