const user = require('../models/user');
const saque = require('../models/saque');
const transferencia = require('../models/transferencia');
const db = require('../db_conection');
const extrato = require('../models/extrato')
const deposito = require('../models/deposito');


const userPoupanca = require('../models/userPoupanca');

const create = (dados) => {
    return user.create({
        email: dados.email,
        nome: dados.nome,
        cpf: dados.cpf,
        dn: dados.dn,
        tipo: dados.tipo
    }).then(response => {
        return response;
    }).catch((erro) => {
        return 'Erro encontrado: ' + erro;
    })
}

const testePoupanca = (dados) => {
    return userPoupanca.create({
        email: dados.email,
        nome: dados.nome,
        cpf: dados.cpf,
        dn: dados.dn,
        tipo: dados.tipo
    }).then(response => {
        return response;
    }).catch((erro) => {
        return 'Erro encontrado: ' + erro;
    })
}

const findOne = (id) => {
    return user.findAll({
        where: {
            id: id
        }
    }).then(users => {
        //console.log("Usuário:", JSON.stringify(users, null, 6))
        return users
    }).catch((erro) => {
        return 'Erro encontrado: ' + erro;
    })
}

const findAll = () => {
    return user.findAll().then(users => {
        //console.log("Todos os usuários cadastrados:", JSON.stringify(users, null, 6))
        return users;
    }).catch((erro) => {
        return 'Erro encontrado: ' + erro;
    })
}

//obter todos os usuários exceto o usuário solicitante
const findAllExceptSelf = (id) => {
    return user.findAll({
        where: {
            id: {
                [db.Sequelize.Op.ne]: id
            }
        }
    }).then(users => {
        //console.log("Usuário:", JSON.stringify(users, null, 6))
        return users
    }).catch((erro) => {
        return 'Erro encontrado: ' + erro;
    })
}

//obter usuário pelo email
const findByEmail = (email) => {
    return user.findAll({
        where: {
            email: email
        }
    }).then(users => {
        //console.log("Usuário:", JSON.stringify(users, null, 6))
        return users
    }).catch((erro) => {
        return 'Erro encontrado: ' + erro;
    })
}

const findByCpf = (dados) => {
    return user.findAll({
        where: {
            cpf: dados.cpf
        }
    }).then(users => {
        //console.log("Usuário:", JSON.stringify(users, null, 6))
        return users[0]
    }).catch((erro) => {
        return 'Erro encontrado: ' + erro;
    })
}

//Atualiza os dados quando há saque
const updateSaldoSaque = (dados) => {
    let saldo = 0;
    return usuario = findOne(dados.usuarioId).then(resp => {
        for (const r of resp) {
            saldo = r.saldo
        }
        if (saldo > 0 && dados.valor < saldo) {
            return db.sequelize.transaction(t => {
                return user.update({
                    saldo: saldo - dados.valor
                }, {
                    where: {
                        id: dados.usuarioId
                    }
                }, { transaction: t }).then(response => {
                    return saque.create({
                        valor: dados.valor,
                        usuarioId: dados.usuarioId
                    }, { transaction: t });
                });
            }).then(result => {
                return result;
            }).catch((erro) => {
                return 'erro encontrado: ' + erro;
            })
        } else {
            return 'saldo insuficiente.';
        }
    });
}

//Realiza o Depósito
const createDeposito = (dados) => {
    usuarioId = 0;
    saldo = 0;
    return usuario = findOne(dados.usuarioId).then(respUser => {
        usuarioId = respUser[0].id;
        saldo = respUser[0].saldo;
        return db.sequelize.transaction(t => {
            return user.update({
                saldo: saldo + dados.valor
            }, {
                where: {
                    id: usuarioId
                }
            }, { transaction: t }).then(value => {
                return deposito.create({
                    valor: dados.valor,
                    usuarioId: usuarioId

                }, { transaction: t });
            }).then(response => {
                return response
            }).catch((erro) => {
                return 'Erro: ' + erro
            })
        })
    })
}

//Atualiza os dados quando há transferência
const updateSaldoTransferencia = (dados) => {
    let saldoRemetente = 0;
    let saldoDestino = 0;
    return remetente = findOne(dados.usuarioId).then(respRemetente => {
        saldoRemetente = respRemetente[0].saldo;
        if (saldoRemetente > 0 && dados.valor <= saldoRemetente) {
            return destinatario = findOne(dados.destinatario).then(respDestino => {
                saldoDestino = respDestino[0].saldo;
                return db.sequelize.transaction(t => {
                    return user.update({
                        saldo: saldoRemetente - dados.valor
                    }, {
                        where: {
                            id: dados.usuarioId
                        }
                    }, { transaction: t }).then(value => {
                        return user.update({
                            saldo: saldoDestino + dados.valor
                        }, {
                            where: {
                                id: dados.destinatario
                            }
                        }, { transaction: t }).then(value => {
                            return transferencia.create({
                                valor: dados.valor,
                                destinatario: dados.destinatario,
                                usuarioId: dados.usuarioId
                            }, { transaction: t });
                        });
                    });
                }).then(result => {
                    return result;
                }).catch((erro) => {
                    return 'Erro encontrado: ' + erro;
                })
            })
        }
    })
}

const listaSaques = (id, inicio, fim) => {
    return user.findAll({
        where: {
            id: id
        },
        include: [{
            model: saque,
            where: {
                id: db.Sequelize.col('saques.usuarioId'),
                createdAt: {
                    [db.Sequelize.Op.gte]: new Date(inicio),
                    [db.Sequelize.Op.lte]: new Date(fim),
                }

            }
        }]
    })
}

listaDepositos = (id, inicio, fim) => {
    return deposito.findAll({
        where: {
            usuarioId: id,
            createdAt: {
                [db.Sequelize.Op.gte]: new Date(inicio),
                [db.Sequelize.Op.lte]: new Date(fim),
            }
        }
    }).then(depositos => {
        return depositos
    }).catch((erro) => {
        return 'Erro encontrado: ' + erro;
    })
}

const transferenciasRealizadas = (id, inicio, fim) => {
    return user.findAll({
        where: {
            id: id
        },
        include: [{
            model: transferencia,
            where: {
                id: db.Sequelize.col('transferencias.usuarioId'),
                createdAt: {
                    [db.Sequelize.Op.gte]: new Date(inicio),
                    [db.Sequelize.Op.lte]: new Date(fim),
                }

            }
        }]
    })
}

const transferenciasRecebidas = (id, inicio, fim) => {
    return transferencia.findAll({
        where: {
            destinatario: id,
            createdAt: {
                [db.Sequelize.Op.gte]: new Date(inicio),
                [db.Sequelize.Op.lte]: new Date(fim),
            }
        }
    })
}

const doExtrato = (id, inicio, fim) => {
    return findOne(id).then(u => {
        extrato.user = u;
        return transferenciasRealizadas(id, inicio, fim).then(response => {
            if (response.length > 0) {
                extrato.transferencia = response[0].dataValues.transferencias               
                
            }            
            return listaSaques(id, inicio, fim).then(saques => {
                if (saques.length > 0) {
                    extrato.saque = saques[0].dataValues.saques
                }
                
                return transferenciasRecebidas(id, inicio, fim).then(tr => {
                    if (tr.length > 0) {
                        extrato.tfRecebida = tr
                    }                    
                    return listaDepositos(id, inicio, fim).then(depositos => {
                        if (depositos.length > 0) {
                            extrato.deposito = depositos
                        }
                        return extrato
                    }).catch((erro) => {
                        return 'Erro encontrado: ' + erro;
                    })
                }).catch((erro) => {
                    return 'Erro encontrado: ' + erro;
                })
            }).catch((erro) => {
                return 'Erro encontrado: ' + erro;
            })
        }).catch((erro) => {
            if (erro.message === "Cannot read property 'dataValues' of undefined") {
                return 'Não há movimentações a serem exibidas.'
            } else {
                return 'Erro encontrado: ' + erro;
            }

        })
    }).catch((erro) => {
        if (erro.message === "Cannot read property 'dataValues' of undefined") {
            return 'Não há movimentações a serem exibidas.'
        } else {
            return 'Erro encontrado: ' + erro;
        }
    })
}

module.exports = {
    create: create,
    findOne: findOne,
    findAll: findAll,
    listaSaques: listaSaques,
    updateSaldoSaque: updateSaldoSaque,
    updateSaldoTransferencia: updateSaldoTransferencia,
    doExtrato: doExtrato,
    findByEmail: findByEmail,
    findAllExceptSelf: findAllExceptSelf,
    createDeposito: createDeposito,
    findByCpf: findByCpf,
    testePoupanca: testePoupanca,
    transferenciasRealizadas: transferenciasRealizadas,
    transferenciasRecebidas: transferenciasRecebidas,
    listaDepositos: listaDepositos
}
