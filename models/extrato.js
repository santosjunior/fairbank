const saque = require('./saque');
const transferencia = require('./transferencia');
const deposito = require('./deposito');

const extrato = {
    user: {
        id: String,
        email: String,
        saldo: Number
    },
    saque: [saque],
    transferencia: [transferencia],
    deposito: [deposito],
    tfRecebida: [transferencia]
}

module.exports = extrato;