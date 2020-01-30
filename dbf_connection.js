const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'fairbank_dbf',
    'root',
    '35399252',
    {
      host: 'localhost',
      dialect: 'mysql'
    } 
  )
  
  module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
  }