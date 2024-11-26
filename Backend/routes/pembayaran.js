const express = require('express');
const router = express.Router();
const Pembayaran = require('../models/pembayaran');
const Siswa = require('../models/siswa');

// Add payment
router.post('/', async (req, res) => {
    try {
        const { siswa_id, pegawai_id, jumlah, metode } = req.body;
        const newPayment = await Pembayaran.create({ siswa_id, pegawai_id, jumlah, metode, status: 'sukses' });
        res.status(201).json(newPayment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get payment history for a student
router.get('/siswa/:id', async (req, res) => {
    try {
        const siswa_id = req.params.id;
        const payments = await Pembayaran.findAll({ where: { siswa_id } });
        res.json(payments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
