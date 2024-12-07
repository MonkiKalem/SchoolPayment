// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const Pegawai = require('../models/pegawai');
const Siswa = require('../models/siswa');

require('dotenv').config();

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // First, try finding an admin
        let user = await Admin.findOne({ where: { email } });
        
        // If not found, try finding a pegawai
        if (!user) user = await Pegawai.findOne({ where: { email } });

        // If not found, try finding a siswa
        if (!user) user = await Siswa.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare password with the hash stored in DB
        const isValid = bcrypt.compareSync(password, user.password);
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, role: user.constructor.name.toLowerCase() },  // dynamically sets role based on the model
            process.env.JWT_SECRET,
            { expiresIn: '1h' }  // Token expires in 1 hour
        );

        // Send token in response
        res.json({ token });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Something went wrong, please try again later.' });
    }
});

module.exports = router;
