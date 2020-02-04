const saques = require('../models_dbf/mediaSaques');

const create = (media) => {
    return saques.create({
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