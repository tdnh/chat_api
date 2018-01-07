'use strict';


var controllers = require('../controllers');
var msgService = require('../services/messages');
const userService = require('../services/user');


exports = module.exports = (io) => {
  io.on('connection', socket => {

    socket.on('newRoom', (data) => {
      socket.join(data.roomId);
    });

    socket.on('join', (data) => {
      console.log(`user ${socket.id} join room with data ${JSON.stringify(data)}`);
      userService.getDetail(data.user, (err, user) => {
        if (err) {
          console.log('userService::getDetail::error==> ', err);
          return;
        }
        socket.join(data.roomId);
        socket.emit('join', user);
        socket.broadcast.to(data.roomId).emit('join', user);
      });
    });

    socket.on('message', (data) => {
      // console.log('socket id client', socket.id);
      // console.log('message data', data);
      let obj = {
        body: data.message,
        author: data.user,
        room: data.roomId
      }

      msgService.createMessage(obj, (err, message) => {
        if (err) {
          console.log(err);
          return ;
        }
        console.log('nessage new', message);
        socket.emit('message', message);
        socket.broadcast.to(data.roomId).emit('newMessage', message);
      });
    });

    socket.on('typping', (data) => {
      socket.broadcast.to(data.roomId).emit('typping', data);
    });

    socket.on('leave', (data) => {
      socket.leave(data.roomId);
      socket.broadcast.to(data.roomId).emit('leave', data);
    });

    socket.on('disconnect', () => {

    });
  });
};