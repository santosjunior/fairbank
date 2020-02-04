var express = require('express');
var router = express.Router();

const tRecebida = require('../controller/tRecebida_dbfController');

router.post('/add', (req, res) => {
    tRecebida.create(req.body.media).then(resp => {
        res.status(201).json(resp);
    })
});

module.exports = router;