const express = require('express');
const router = express.Router();
const Pegawai = require('../models/pegawai');
const bcrypt = require('bcrypt');

// Get all pegawai
router.get('/', async (req, res) => {
    try {
        const pegawai = await Pegawai.findAll();
        res.json(pegawai);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
