const tRecebidas = require('../models_dbf/tRecebidas');

const create = (media) => {
    return tRecebidas.create({
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