const express = require('express');
const router = express.Router();

const enderecoController = require('../controller/enderecoController')

router.post('/add', (req, res) => {
    enderecoController.create(req.body).then(resp => {
        res.status(201).json(resp)
    })
});

module.exports = router;