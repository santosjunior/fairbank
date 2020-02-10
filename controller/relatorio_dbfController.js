const relatorio = require('../models_dbf/relatorio');
const saques = require('../models_dbf/mediaSaques');
const depositos = require('../models_dbf/mediaDepositos');
//const periodo = require('../models_dbf/periodo');
const tRecebidas = require('../models_dbf/tRecebidas');
const tRealizadas = require('../models_dbf/tRealizadas');
const user = require('../models_dbf/user');
const db = require('../dbf_connection');

const create = (dados) => {
    return relatorio.create({
        debitos: dados.debitos,
        creditos: dados.entradas,
        saldo: dados.saldo,
        mes: dados.mes,
        ano: dados.ano,
        usuarioId: dados.user,
        saqueId: dados.saques,
        tRecebidaId: dados.tRecebidas,
        tRealizadaId: dados.tRealizadas,
    }).then(response => {
        return response
    }).catch((erro) => {
        return 'Erro: ' + erro
    })
}

const buscaUsuario = (conta) => {
    return user.findAll({
        where: {
            naturalKey: conta
        }
    }).then(user => {
        return user[0]
    }).catch((erro) => {
        return 'Erro encontrado: ' + erro;
    })
}

const buscaPeriodo = (conta, mes, ano) => {
    return buscaUsuario(conta).then(user => {
        if (user.id != null) {
            return relatorio.findAll({
                where: {
                    usuarioId: user.id,
                    mes: mes,
                    ano: ano
                }
            }).then(relatorio => {
                return relatorio[0]
            }).catch((erro) => {
                return 'Erro encontrado: ' + erro;
            })
        } else {
            return null
        }

    })
}

const findUser = (dados) => {
    return db.sequelize.query(
        `select r.id,  r.mes, r.ano, r.creditos, r.debitos, r.saldo, s.media as media_saques, d.media as media_depositos, tr.media as media_transferencias_recebidas, t.media as media_transferencias_realizadas from relatorios r, usuarios u, t_realizadas t, t_recebidas tr, saques s, depositos d where u.naturalKey = ${dados.conta} and r.usuarioId = u.id and r.mes = ${dados.mes} and r.ano = ${dados.ano} and r.saqueId = s.id and r.tRecebidaId = tr.id and r.tRealizadaId = t.id`
        ).then(([results, metadata]) => {
            return results[0]
        }).catch((erro) => {
            return 'Erro encontrado: ' + erro;
        })
}

module.exports = {
    create: create,
    buscaUsuario: buscaUsuario,
    buscaPeriodo: buscaPeriodo,
    findUser: findUser
}