var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('config');
var app = express();
var server = require('http').createServer(app);
var socketEvent = require('./utils/socket');
var io = require('socket.io')(server, {
  pingInterval: 10000,
  pingTimeout: 5000, 
  cookie: false,
  origins: '*'
});
var port = process.env.PORT || config['port'];


var middleware = require('./middleware');
var index = require('./routes/index');
var users = require('./routes/users');
var rooms = require('./routes/rooms');
var messages = require('./routes/messages');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
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

app.use('/',(req,res)=>{return res.render('index')});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // res.status(err.status || 500);
  // res.render('error');
  return res.json(err);
});


server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

socketEvent(io);

// let numUsers = 0;
// io.on('connection', (socket) => {
//   var addedUser = false;

//   socket.on('new-room', () => {

//   });

//   // when the client emits 'new message', this listens and executes
//   socket.on('new-message', function (data) {
//     // we tell the client to execute 'new message'
//     // socket.broadcast.to(id).emit('my message', msg);
//     socket.broadcast.emit('new-message', {
//       username: socket.username,
//       message: data
//     });
//   });

//   // when the client emits 'add user', this listens and executes
//   socket.on('add-user', function (username) {
//     // if (addedUser) return;
//     console.log(username);

//     // we store the username in the socket session for this client
//     socket.username = username;
//     ++numUsers;
//     addedUser = true;
//     socket.emit('login', {
//       numUsers: numUsers
//     });
//     // echo globally (all clients) that a person has connected
//     socket.broadcast.emit('user-joined', {
//       username: socket.username,
//       numUsers: numUsers
//     });
//   });

//   // when the client emits 'typing', we broadcast it to others
//   socket.on('typing', function () {
//     socket.broadcast.emit('typing', {
//       username: socket.username
//     });
//   });

//   // when the client emits 'stop typing', we broadcast it to others
//   socket.on('stop-typing', function () {
//     socket.broadcast.emit('stop-typing', {
//       username: socket.username
//     });
//   });

//   // when the user disconnects.. perform this
//   socket.on('disconnect', function () {
//     if (addedUser) {
//       --numUsers;

//       // echo globally that this client has left
//       socket.broadcast.emit('user-left', {
//         username: socket.username,
//         numUsers: numUsers
//       });
//     }
//   });
// });


module.exports = app;
