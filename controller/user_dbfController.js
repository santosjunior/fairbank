const user = require('../models_dbf/user');

const create = (conta, tipo) => {
    return user.create({
        conta: conta,
        tipo: tipo
    }).then(() => {
        return 'ok';
    }).catch((erro) => {
        return 'Erro encontrado: ' + erro;
    })
}

module.exports = {
    create: create
}