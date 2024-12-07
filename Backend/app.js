require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const bcrypt = require('bcrypt');
const sequelize = require('./config/db');
const Admin = require('./models/admin');
const Pegawai = require('./models/pegawai');
const Siswa = require('./models/siswa');

sequelize.authenticate()
    .then(() => console.log('Database connected!'))
    .catch(err => console.error('Error:', err));
    
sequelize.sync({ alter: true })
.then(() => console.log('Database synchronized'))
.catch(err => console.error('Database sync failed:', err));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const siswaRoutes = require('./routes/siswa');
const adminRoutes = require('./routes/admin');
const pegawaiRoutes = require('./routes/pegawai');
const pembayaranRoutes = require('./routes/pembayaran');
const authRoutes = require('./routes/auth');

var app = express();
const cors = require('cors');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/siswa', siswaRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/pegawai', pegawaiRoutes);
app.use('/api/pembayaran', pembayaranRoutes);
app.use('/api/auth', authRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Function to hash all users' passwords
async function hashPasswords() {
  try {
      // Hash Admin Passwords
      const admins = await Admin.findAll();
      for (const admin of admins) {
          if (!bcrypt.compareSync(admin.password, admin.password)) { // Avoid hashing already hashed passwords
              const hashedPassword = await bcrypt.hash(admin.password, 10);
              admin.password = hashedPassword;
              await admin.save(); // Save the hashed password
              console.log(`Hashed password for Admin: ${admin.email}`);
          }
      }

      // Hash Pegawai Passwords
      const pegawai = await Pegawai.findAll();
      for (const employee of pegawai) {
          if (!bcrypt.compareSync(employee.password, employee.password)) {
              const hashedPassword = await bcrypt.hash(employee.password, 10);
              employee.password = hashedPassword;
              await employee.save(); // Save the hashed password
              console.log(`Hashed password for Pegawai: ${employee.email}`);
          }
      }

      // Hash Siswa Passwords
      const siswa = await Siswa.findAll();
      for (const student of siswa) {
          if (!bcrypt.compareSync(student.password, student.password)) {
              const hashedPassword = await bcrypt.hash(student.password, 10);
              student.password = hashedPassword;
              await student.save(); // Save the hashed password
              console.log(`Hashed password for Siswa: ${student.email}`);
          }
      }

  } catch (err) {
      console.error('Error hashing passwords:', err);
  }
}

module.exports = app;
