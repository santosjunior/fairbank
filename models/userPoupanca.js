const db = require('../db_conection');
const userBase = require('./userBase');


const atributos = {    
    operacao: {
        type: db.Sequelize.STRING,
        defaultValue: 'poupança'
    }
}

const a = Object.assign(userBase, atributos);

const userPoupanca = db.sequelize.define('usuarios', a);

//userPoupanca.sync();

module.exports = userPoupanca;
