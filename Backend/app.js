var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const sequelize = require('./config/db');

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

const Siswa = require('./models/siswa');

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

module.exports = app;
