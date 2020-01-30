const db = require('../db_conection');
const user = require('./user');

const saque = db.sequelize.define('saques', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    valor: {
        type: db.Sequelize.DOUBLE,
        defaultValue: 0.0
    },

})

user.hasMany(saque, { onDelete: 'cascade' });
//saque.sync()

module.exports = saque;