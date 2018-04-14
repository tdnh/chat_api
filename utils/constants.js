const SOCKET_NAME = {
  BROADCAST: {
    NEW_MESSAGE: 'new_message',
    NEW_JOIN: 'new_join',
  },
  ON: {
    CONNECTION: 'connection',
    JOIN: 'join',
    MESSAGE: 'message',
    TYPING: 'typing',
    SEEN: 'seen',
    LEAVE: 'leave',
    DISCONNECT: 'disconnect',
    ERROR: 'error'
  },
  EMIT: {
    SENT_MESSAGE: 'sent',
    JOINED: 'joined'
  }
}


const ROOM = {
  TYPE: {
    ANONYMOUS: 1,
    CHAT: 2
  },
  STATUS: {
    NEW: 1,
    CLOSE: 2
  }
}








module.exports = {
  ROOM,
  SOCKET_NAME
}