var express = require('express');
var router = express.Router();

const relatorioController = require('../controller/relatorio_dbfController');

router.post('/add', (req, res) => {
    relatorioController.create(req.body).then(resp => {
        res.status(201).json(resp);
    });
});
module.exports = router;