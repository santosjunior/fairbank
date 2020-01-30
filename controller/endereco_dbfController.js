const endereco = require('../models_dbf/endereco');

const create = (dados) => {
    return endereco.create({ 
        naturalKey: dados.id,
        cidade: dados.cidade,
        estado: dados.estado,       
    }).then(() =>{
        return 'ok'
    }).catch((erro) => {
        return 'Erro encontrado: '+erro
    })
}

module.exports = {
    create: create
}