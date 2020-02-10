const db = require('../dbf_connection');

const depositos = db.sequelize.define('depositos', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    media: {
        type: db.Sequelize.DOUBLE
    }    
})

//depositos.sync();

module.exports = depositos;