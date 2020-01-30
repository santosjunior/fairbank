const express = require('express');
const router = express.Router();

const enderecoController = require('../controller/endereco_dbfController');

router.post('/add', (req, res) => {
    enderecoController.create(req.body).then(response => {
        res.status(201).json(response);
    });
});

module.exports = router;