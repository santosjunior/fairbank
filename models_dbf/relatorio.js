const db = require('../dbf_connection');
const user = require('./user')
const endereco = require('./endereco');

const relatorio = db.sequelize.define('relatorios', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    debitos: {
        type: db.Sequelize.DOUBLE
    },
    entradas: {
        type: db.Sequelize.DOUBLE
    }
})

user.hasMany(relatorio, { onDelete: 'cascade' });
endereco.hasMany(relatorio, { onDelete: 'cascade' });

//relatorio.sync({force: true});

module.exports = relatorio;