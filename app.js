var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var compression = require('compression');

//import de las rutas del api
var indexRouter = require('./routes/index');
var NotificacionesRouter=require('./routes/api_notifica');
var usersRouter = require('./routes/users');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Permisos para consultas de tipo CROSS-ORIGIN
app.use(function(req,res,next){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Methods','Origin,X-Requested/With,Content-Type,Accept','application/json','text/json');
  res.header('Access-Control-Allow-Methods','POST,GET,PUT,DELETE,OPTIONS');
  next();
});

//compresion de las rutas
app.use(compression())


//set del path de acceso del api
app.use('/', indexRouter);
app.use('/api/notificaciones',NotificacionesRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

if(process.env.NODE_ENV === 'production') {
  // We are running in production mode
  console.log('modo produccion');
} else {
 // We are running in development mode
 console.log('modo desarrollo');
}

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
