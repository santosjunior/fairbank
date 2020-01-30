const db = require('../dbf_connection');

const endereco = db.sequelize.define('enderecos', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    naturalKey: {
        type: db.Sequelize.INTEGER
    },
    cidade: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    estado: {
        type: db.Sequelize.STRING,
        allowNull: false
    }
})

//endereco.sync({force: true});

module.exports = endereco