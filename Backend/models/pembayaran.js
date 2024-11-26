const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Pembayaran = sequelize.define('Pembayaran', {
    siswa_id: { type: DataTypes.INTEGER, allowNull: false },
    pegawai_id: { type: DataTypes.INTEGER, allowNull: true }, // Null jika pembayaran dilakukan langsung oleh siswa
    jumlah: { type: DataTypes.FLOAT, allowNull: false },
    metode: { type: DataTypes.STRING, allowNull: false }, // Contoh: 'transfer', 'tunai'
    status: { type: DataTypes.STRING, defaultValue: 'menunggu' }, // Status pembayaran
}, {
    tableName: 'pembayaran',
    timestamps: true // Untuk mencatat waktu pembayaran
});

module.exports = Pembayaran;
