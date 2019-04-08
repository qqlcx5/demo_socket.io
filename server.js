// websocket 依赖http服务器
// 我们需要创建一个http的服务器，提供握手，静态文件服务等功能
let express = require('express')
let path = require('path')
let app = express()
app.use(express.static(__dirname))
app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'index.html'))
})
let server = require('http').createServer(app)
server.listen(8080)

let io = require('socket.io')(server)

io.on('connection', function(socket) {
  console.log('客户端已经连接')
  socket.send('欢迎欢迎')
  socket.on('message', function(msg) {
    console.log(msg)
    socket.send('服务端 ' + msg)
  })
})
