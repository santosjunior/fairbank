const relatorio = require('../models_dbf/relatorio');
//const saques = require('../models_dbf/mediaSaques');
//const periodo = require('../models_dbf/periodo');
//const tRecebidas = require('../models_dbf/tRecebidas');
//const tRealizadas = require('../models_dbf/tRealizadas');

const create = (dados) => {
    return relatorio.create({
        debitos: dados.debitos,
        creditos: dados.entradas,
        saldo: dados.saldo,
        usuarioId: dados.idUser,
        saqueId: dados.idSaque,
        periodoId: dados.idPeriodo,
        tRecebidaId: dados.idTRecebida,
        tRealizadaId: dados.idTRealizada,
    }).then(response => {
        return response
    }).catch((erro) => {
        return 'Erro: '+erro
    })
} 

module.exports = {
    create: create
}