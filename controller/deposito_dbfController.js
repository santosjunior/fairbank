const depositos = require('../models_dbf/mediaDepositos');

const create = (media) => {
    return depositos.create({
        media: media               
    }).then(response => {
        return response;
    }).catch((erro) => {
        return 'Erro encontrado: ' + erro;
    })
}

module.exports = {
    create: create
}