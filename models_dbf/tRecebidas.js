const db = require('../dbf_connection');

const tRecebidas = db.sequelize.define('t_recebidas', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    media: {
        type: db.Sequelize.DOUBLE
    }    
})

//tRecebidas.sync();

module.exports = tRecebidas;