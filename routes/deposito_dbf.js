var express = require('express');
var router = express.Router();

const depositoController = require('../controller/deposito_dbfController');

router.post('/add', (req, res) => {
    depositoController.create(req.body.media).then(resp => {
        res.status(201).json(resp);
    })
});

module.exports = router;