const Sequelize = require('sequelize');

// Option 2: Passing a connection URI
//const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');

const sequelize = new Sequelize(
  'fairbank',
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
