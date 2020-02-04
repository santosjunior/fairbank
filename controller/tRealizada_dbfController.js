const tRealizadas = require('../models_dbf/tRealizadas');

const create = (media) => {
    return tRealizadas.create({
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