const db = require('../dbf_connection');
const user = require('./user');
const periodo = require('./periodo');
const saques = require('./mediaSaques');
const tRecebidas = require('./tRecebidas');
const tRealizadas = require('./tRealizadas');



const relatorio = db.sequelize.define('relatorios', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    debitos: {
        type: db.Sequelize.DOUBLE
    },
    creditos: {
        type: db.Sequelize.DOUBLE
    },
    saldo: {
        type: db.Sequelize.DOUBLE
    },

})

user.hasOne(relatorio, { onDelete: 'cascade' });
periodo.hasOne(relatorio, { onDelete: 'cascade' });
saques.hasOne(relatorio, { onDelete: 'cascade' });
tRecebidas.hasOne(relatorio, { onDelete: 'cascade' });
tRealizadas.hasOne(relatorio, { onDelete: 'cascade' });

//relatorio.sync({force: true});

module.exports = relatorio;