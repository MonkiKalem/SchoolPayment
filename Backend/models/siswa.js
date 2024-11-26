const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Pembayaran = require('./pembayaran');

const Siswa = sequelize.define('Siswa', {
    nama: { type: DataTypes.STRING, allowNull: false },
    nis: { type: DataTypes.STRING, unique: true, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    tahun_masuk: { type: DataTypes.INTEGER, allowNull: false },
    telepon_pribadi: { type: DataTypes.STRING },
    telepon_orang_tua: { type: DataTypes.STRING },
    
}, {
    tableName: 'siswa', // Pastikan nama tabel sesuai dengan di database
    timestamps: false // Menonaktifkan createdAt dan updatedAt
});

Siswa.hasMany(Pembayaran, { foreignKey: 'siswa_id' });
Pembayaran.belongsTo(Siswa, { foreignKey: 'siswa_id' });

module.exports = Siswa;
