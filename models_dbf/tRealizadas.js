const db = require('../dbf_connection');

const tRealizadas = db.sequelize.define('t_realizadas', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    media: {
        type: db.Sequelize.DOUBLE
    }    
})

//tRealizadas.sync();

module.exports = tRealizadas;