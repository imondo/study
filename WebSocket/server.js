const app = require('express')();
const server = require('http').Server(app);
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
    console.log('连接建立');

    ws.on('hello', (msg) => {
      console.log(`客户端: ${msg}`);
    })

    ws.send('world');
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.listen(3000, () => {
  console.log(`listen on 3000`);
});