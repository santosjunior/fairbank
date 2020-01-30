const relatorio = require('../models_dbf/relatorio');

const create = (dados) => {
    return relatorio.create({
        debitos: dados.debitos,
        entradas: dados.entradas,
        usuarioId: dados.idUser,
        enderecoId: dados.idEndereco
    }).then(response => {
        return response
    }).catch((erro) => {
        return 'Erro: '+erro
    })
} 

module.exports = {
    create: create
}