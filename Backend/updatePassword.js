const bcrypt = require('bcrypt');
const Admin = require('./models/admin');
const Pegawai = require('./models/pegawai');
const Siswa = require('./models/siswa');
require('dotenv').config();

// Set the bcrypt salt rounds
const saltRounds = 10;

async function hashPasswords() {
    try {
        // Update Admin users
        const admins = await Admin.findAll();
        for (const admin of admins) {
            const hashedPassword = bcrypt.hashSync(admin.password, saltRounds);
            await admin.update({ password: hashedPassword });
            console.log(`Updated password for admin with email: ${admin.email}`);
        }

        // Update Pegawai users
        const pegawais = await Pegawai.findAll();
        for (const pegawai of pegawais) {
            const hashedPassword = bcrypt.hashSync(pegawai.password, saltRounds);
            await pegawai.update({ password: hashedPassword });
            console.log(`Updated password for pegawai with email: ${pegawai.email}`);
        }

        // Update Siswa users
        const siswas = await Siswa.findAll();
        for (const siswa of siswas) {
            const hashedPassword = bcrypt.hashSync(siswa.password, saltRounds);
            await siswa.update({ password: hashedPassword });
            console.log(`Updated password for siswa with email: ${siswa.email}`);
        }

        console.log('All passwords have been successfully updated!');
    } catch (err) {
        console.error('Error updating passwords:', err);
    }
}

// Run the password update function
hashPasswords();
