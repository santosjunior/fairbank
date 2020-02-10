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

//Obter usuário por id
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
  })
  
});

//Cria usuário
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
router.post('/saques/:id', (req, res, next) => {
  userController.listaSaques(req.params.id, req.body.inicio, req.body.fim).then(resp => {
    res.send(resp)
  })
  
});

//Lista todos os depositos
router.post('/depositos/:id', (req, res, next) => {
  userController.listaDepositos(req.params.id, req.body.inicio, req.body.fim).then(resp => {
    res.send(resp)
  })
  
});

//Lista todos as transferencias recebidas
router.post('/recebidas/:id', (req, res, next) => {
  userController.transferenciasRecebidas(req.params.id, req.body.inicio, req.body.fim).then(resp => {
    res.send(resp)
  })
  
});

//Lista todos as transferencias realizadas
router.post('/realizadas/:id', (req, res, next) => {
  userController.transferenciasRealizadas(req.params.id, req.body.inicio, req.body.fim).then(resp => {
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
