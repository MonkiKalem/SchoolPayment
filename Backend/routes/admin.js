const express = require('express');
const router = express.Router();
const Admin = require('../models/admin.js');
const bcrypt = require('bcrypt');

// Get all admins
router.get('/', async (req, res) => {
    try {
        const admins = await Admin.findAll();
        res.json(admins);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add new admin
router.post('/', async (req, res) => {
    try {
        const { nama, email, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newAdmin = await Admin.create({ nama, email, password: hashedPassword });
        res.status(201).json(newAdmin);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete admin by ID
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await Admin.destroy({ where: { id } });
        if (!deleted) return res.status(404).json({ message: 'Admin not found' });
        res.json({ message: 'Admin deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
