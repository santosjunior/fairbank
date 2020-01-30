const db = require('../db_conection');

const userBase = {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: db.Sequelize.STRING,
    },
    dn: {
        type: db.Sequelize.DATE,
    },
    cpf: {
        type: db.Sequelize.STRING,
        unique: true    
    },
    tipo: {
        type: db.Sequelize.STRING,
        allowNull: false,
    },
    saldo: {
        type: db.Sequelize.DOUBLE,
        defaultValue: 0.0
    },
    email: {
        type: db.Sequelize.STRING,
        allowNull: false,
        isEmail: true, 
    }
    
}



module.exports = userBase;