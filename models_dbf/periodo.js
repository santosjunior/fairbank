const db = require('../dbf_connection');

const periodo = db.sequelize.define('periodo', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    mes: {
        type: db.Sequelize.INTEGER      
    },
    ano: {
        type: db.Sequelize.INTEGER
    }
})

//periodo.sync();

module.exports = periodo;