var express = require('express');
var router = express.Router();

const userController = require('../controller/user_dbfController');
const relatorioController = require('../controller/relatorio_dbfController');

router.post('/add', (req, res) => {
    userController.create(req.body.naturalKey).then(resp => {
        res.status(201).json(resp);
    })
});

router.get('/:conta', (req, res) => {
    relatorioController.buscaUsuario(req.params.conta).then(resp => {
        res.status(201).json(resp);
    })
});

module.exports = router;