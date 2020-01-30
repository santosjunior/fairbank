const endereco = require('../models/endereco');

const create = (dados) => {
    return endereco.create({
        rua: dados.rua,
        numero: dados.numero,
        bairro: dados.bairro,
        cep: dados.cep,
        cidade: dados.cidade,
        estado: dados.estado,
        usuarioId: dados.usuarioId
    }).then(response =>{
        return response;
    }).catch((erro) => {
        return 'Erro encontrado: '+erro;
    })
}

module.exports = {
    create: create
}