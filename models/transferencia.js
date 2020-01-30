const db = require('../db_conection');
const user = require('./user');

const transferencia = db.sequelize.define('transferencias', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    valor: {
        type: db.Sequelize.DOUBLE
    },
    destinatario: {
        type: db.Sequelize.INTEGER,
        allowNull: false
    }
})

user.hasMany(transferencia, { onDelete: 'cascade' });

//transferencia.sync({force: true});

module.exports = transferencia;