const db = require('../db_conection');
const user = require('./user');

const deposito = db.sequelize.define('depositos', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    valor: {
        type: db.Sequelize.DOUBLE
    }
})

user.hasMany(deposito, { onDelete: 'cascade' });

//deposito.sync();

module.exports = deposito;