var app = require('express')()
var http = require('http').createServer(app)
var io = require('socket.io')(http)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/chatRoom/chatroom.html')
})

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
  socket.on('send message', (msg) => {
    io.emit('send message', msg)
    console.log('send a message', msg)
  })
  socket.broadcast.emit('hi')
})
http.listen(3000, () => {
  console.log('listening on *:3000')
})
