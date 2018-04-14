'use strict';

const { SOCKET_NAME } = require('../utils/constants');
const { createMessage } = require('../services/messages');


exports = module.exports = (io) => {

  io.on(SOCKET_NAME.ON.CONNECTION, (socket) => {
    // console.log('socket id', socket.conn.id);
    // console.log('socket request', socket.request.user);
    // console.log('socket handshake referer', socket.handshake.headers.referer);

    socket.use((packet, next) => {
      // console.log('packet -----> ',packet);
      if (packet.id) {
        return next();
      }
      return next();
      // return next(new Error('Token not found'));
    })



    // on join room
    socket.on(SOCKET_NAME.ON.JOIN, ({ roomId, userId }) => {
      console.log('SOCKET_NAME.ON.JOIN', roomId, userId);

      socket.join(roomId, () => { // join client in room
        let rooms = Object.keys(socket.rooms);
        // console.log('List rooms', rooms);
        socket.emit(SOCKET_NAME.EMIT.JOINED, userId);
        socket.to(roomId).emit(SOCKET_NAME.BROADCAST.NEW_JOIN, userId);
      });

    });

    socket.on(SOCKET_NAME.ON.MESSAGE, (data) => {
      console.log('SOCKET_NAME.ON.MESSAGE', data);
      console.log('SOCKET_NAME.ON.MESSAGE', socket.id);
      createMessage({ body: data.msg }, (err, msg) => {
        socket.emit(SOCKET_NAME.EMIT.SENT_MESSAGE, msg);
        socket.to().emit(SOCKET_NAME.BROADCAST.NEW_MESSAGE, msg);
      })
    });

    socket.on(SOCKET_NAME.ON.TYPING, (data) => {
      console.log('SOCKET_NAME.ON.TYPING', data);
    });

    socket.on(SOCKET_NAME.ON.SEEN, (data) => {
      console.log('SOCKET_NAME.ON.SEEN', data);
    });

    socket.on(SOCKET_NAME.ON.LEAVE, (data) => {
      console.log('SOCKET_NAME.ON.LEAVE', data);
    });

    socket.on(SOCKET_NAME.ON.DISCONNECT, (data) => {
      console.log('SOCKET_NAME.ON.DISCONNECT', data);
    });

    socket.on(SOCKET_NAME.ON.ERROR, (data) => {
      console.log('SOCKET_NAME.ON.ERROR', data);
    });


  });

}