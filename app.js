var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

//var cors = require('cors');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const usersDbfRouter = require('./routes/user_dbf');
const enderecoRouter = require('./routes/endereco');
const relatorioDbfRouter = require('./routes/relatorio_dbf');
const periodoRouter = require('./routes/periodo_dbf');
const saquesRouter = require('.//routes/saque_dbf');
const recebidasRouter = require('./routes/tRecebida_dbf');
const realizadasRouter = require('./routes/tRealizada_dbf');
const depositoRouter = require('./routes/deposito_dbf');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/endereco', enderecoRouter);

//rotas de banco de dados de fatos
app.use('/dbf/user', usersDbfRouter);
app.use('/dbf/relatorio', relatorioDbfRouter);
app.use('/dbf/periodo', periodoRouter);
app.use('/dbf/saques', saquesRouter);
app.use('/dbf/recebidas', recebidasRouter);
app.use('/dbf/realizadas', realizadasRouter);
app.use('/dbf/depositos', depositoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//enables cors
//app.use(cors());
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  
  res.header("Access-Control-Allow-Origin", 'http://localhost:4200');
  //res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  //res.header("Access-Control-Allow-Headers", "Content-Type, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version, X-File-Name");
  //res.header('Access-Control-Allow-Credentials', true);
  
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  
});

module.exports = app;
