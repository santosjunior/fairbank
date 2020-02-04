var express = require('express');
var router = express.Router();

const periodoController = require('../controller/periodo_dbfController');

router.post('/add', (req, res) => {
    periodoController.create(req.body.mes, req.body.ano).then(resp => {
        res.status(201).json(resp);
    })
});

module.exports = router;