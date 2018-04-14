const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('config');
const querystring = require('querystring');
const url = require('url');
const app = express();
const server = require('http').createServer(app);
const socketEvent = require('./utils/socket_clone');
// const socketEvent = require('./utils/socket');
const io = require('socket.io')(server, {
  pingInterval: 10000,
  pingTimeout: 5000, 
  path: '/socket.io',
  transports: ['polling', 'websocket'],
  serveClient: false,
  // origins: '*',
  // maxHttpBufferSize: 1000, // avoid Dos, default http://www.numberworlds.com/numbers/10e7
  // cookie: false,
});
const port = process.env.PORT || config['port'];


const middleware = require('./middleware');
const index = require('./routes/index');
const users = require('./routes/users');
const rooms = require('./routes/rooms');
const messages = require('./routes/messages');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('HELLO ASINOMOTO TOYOTA YAMAHA',{}));
app.use(express.static(path.join(__dirname, 'public')));


// config header
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Auth-Token');
  return next();
});

app.use(middleware);

// app.use('/', index);
app.use('/users', users);
app.use('/rooms', rooms);
app.use('/messages', messages);

app.use('/', (req, res) => { return res.render('index') });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // res.status(err.status || 500);
  // res.render('error');
  return res.json(err);
});

server.on('error', (e) => {
  console.log('server error', e);
});

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});


io.engine.generateId = (req) => {
  try {
    let { query: { token } } = url.parse(req.url, true);
    console.log('token---------->',token);
    req.user = {name: 'tile'}
    return token;
  } catch (error) {
    return null
  }
}
socketEvent(io);


module.exports = app;
