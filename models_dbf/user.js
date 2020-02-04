const db = require('../dbf_connection');

const user = db.sequelize.define('usuarios', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    naturalKey: {
        type: db.Sequelize.INTEGER,
        unique: true,
    } 
})

//user.sync({force: true});

module.exports = user;