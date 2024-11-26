const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Pembayaran = require('./pembayaran');

const Pegawai = sequelize.define('Pegawai', {
    nama: { type: DataTypes.STRING, allowNull: false },
    npwp: { type: DataTypes.STRING, unique: true, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false }
}, {
    tableName: 'pegawai',
    timestamps: false // Nonaktifkan `createdAt` dan `updatedAt` jika tidak digunakan
});

Pegawai.hasMany(Pembayaran, { foreignKey: 'pegawai_id' });
Pembayaran.belongsTo(Pegawai, { foreignKey: 'pegawai_id' });

module.exports = Pegawai;
