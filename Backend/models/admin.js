const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Admin = sequelize.define('Admin', {
    nama: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false }
}, {
    tableName: 'admin',
    timestamps: false // Nonaktifkan `createdAt` dan `updatedAt` jika tidak digunakan
});

module.exports = Admin;
