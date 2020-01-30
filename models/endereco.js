const db = require('../db_conection');
const user = require('./user');

const endereco = db.sequelize.define('enderecos', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rua: {
        type: db.Sequelize.STRING,
        allowNull: false,
    },
    numero: {
        type: db.Sequelize.INTEGER
    },
    cep: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    bairro: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    cidade: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    estado: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    atual: {
        type: db.Sequelize.BOOLEAN
    }
})

user.hasMany(endereco, { onDelete: 'cascade' });

//endereco.sync({force: true});

module.exports = endereco