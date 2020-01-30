const db = require('../db_conection');
const userBase = require('./userBase');

const user = db.sequelize.define('usuarios', userBase);

//transferencia.belongsToMany(user, { through: 'usuarios_transferencias' });
//user.sync({force: true});

module.exports = user;
    

