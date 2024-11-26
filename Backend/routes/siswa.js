const express = require('express');
const router = express.Router();
const Siswa = require('../models/siswa');

// Get all siswa
router.get('/', async (req, res) => {
    try {
        const siswa = await Siswa.findAll();
        res.json(siswa);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add siswa
router.post('/', async (req, res) => {
    try {
        const { nama, nis, email, password, tahun_masuk } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newSiswa = await Siswa.create({ 
            nama, 
            nis, 
            email, 
            password: hashedPassword, 
            tahun_masuk 
        });
        res.status(201).json(newSiswa);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get tunggakan for a student
router.get('/tunggakan/:id', async (req, res) => {
    try {
        const siswa = await Siswa.findByPk(req.params.id, {
            include: ['HargaSPP', 'Pembayaran']
        });
        if (!siswa) return res.status(404).json({ message: 'Siswa not found' });

        const totalBayar = siswa.Pembayarans.reduce((total, p) => total + p.jumlah, 0);
        const tunggakan = siswa.HargaSPP.harga - totalBayar;

        res.json({ tunggakan });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
