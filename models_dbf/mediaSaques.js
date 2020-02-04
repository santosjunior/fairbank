const db = require('../dbf_connection');

const saques = db.sequelize.define('saques', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    media: {
        type: db.Sequelize.DOUBLE
    }    
})

//saques.sync();

module.exports = saques;