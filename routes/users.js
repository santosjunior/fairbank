var express = require('express');
var router = express.Router();

//operações
const userController = require('../controller/userController')

/* GET users listing. */
router.get('/', (req, res, next) => {
  userController.findAll().then(resposta => {
    res.send(resposta);
  })
  
});

router.get('/:id', (req, res, next) => {
  userController.findOne(req.params.id).then(resp => {
    res.send(resp[0]);
  })
  
});

//obter todos os usuários exceto o usuário solicitante
router.get('/alle/:id', (req, res, next) => {
  userController.findAllExceptSelf(req.params.id).then(resp => {
    res.send(resp);
  })
  
});

//obter usuário por email
router.get('/email/:email', (req, res) => {
  usuario = userController.findByEmail(req.params.email).then(resp => {
    res.send(resp[0]);
  })
  
});

//obter usuário por cpf
router.post('/cpf', (req, res) => {
  userController.findByCpf(req.body).then(resp => {
    res.status(201).json(resp);
    console.log(resp)
  })
  
});

router.post('/add', (req, res) => {
  userController.create(req.body).then(resp => {
    res.status(201).json(resp)
  })
});

router.post('/teste', (req, res) => {
  userController.testePoupanca(req.body).then(resp => {
    res.status(201).json(resp)
  })
})

//Atualiza o valor do saldo quando há saque
router.put('/saque', (req, res) => {
  userController.updateSaldoSaque(req.body).then(valor => {
    res.status(201).json(valor);
  })
});

//Lista todos os saques
router.get('/saques/:id', (req, res, next) => {
  userController.listaSaques(req.params.id).then(resp => {
    res.send(resp)
  })
  
});

//Realizar transferência
router.put('/transferencia', (req, res) => {
  userController.updateSaldoTransferencia(req.body).then(resp => {
    res.status(201).json(resp);
  })
});

//Exibe o extrato
router.post('/extrato', (req, res) => {
  userController.doExtrato(req.body.id, req.body.inicio, req.body.fim).then(resp => {
    res.send(resp)
  })
});

//Fazer depósito
router.post('/deposito', (req, res) => {
  userController.createDeposito(req.body).then(response => {
    res.status(201).json(response);
  });
});

module.exports = router;
