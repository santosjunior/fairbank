const user = require('../models_dbf/user');

const create = (naturalKey) => {
    return user.create({
        naturalKey: naturalKey      
    }).then(response => {
        return response;
    }).catch((erro) => {
        return 'Erro encontrado: ' + erro;
    })
}

module.exports = {
    create: create
}