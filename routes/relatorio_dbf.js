var express = require('express');
var router = express.Router();

const relatorioController = require('../controller/relatorio_dbfController');

router.post('/add', (req, res) => {
    relatorioController.create(req.body).then(resp => {
        res.status(201).json(resp);
    });
});

router.post('/busca_periodo/:conta', (req, res) => {
    relatorioController.buscaPeriodo(req.params.conta, req.body.mes, req.body.ano).then(resp => {
        if(resp != null) {
            res.status(201).json(resp);
        } else {
            res.send('Não encontrado');
        }
        
    })
});

router.post('/user', (req, res) => {
    relatorioController.findUser(req.body).then(resp => {        
        res.status(201).json(resp);
    })
});

module.exports = router;