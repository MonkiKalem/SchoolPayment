const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('db_schoolPayment', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
