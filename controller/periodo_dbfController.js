const periodo = require('../models_dbf/periodo');

const create = (mes, ano) => {
    return periodo.create({
        mes: mes,
        ano: ano        
    }).then(response => {
        return response;
    }).catch((erro) => {
        return 'Erro encontrado: ' + erro;
    })
}

module.exports = {
    create: create
}