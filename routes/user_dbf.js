var express = require('express');
var router = express.Router();

const userController = require('../controller/user_dbfController');

router.post('/add', (req, res) => {
    userController.create(req.body.conta, req.body.tipo).then(resp => {
        res.status(201).json('ok')
    })
});

module.exports = router;