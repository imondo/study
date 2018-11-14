var ws = new WebSocket('ws://localhost:8080');

console.log(ws)
ws.onopen = function () {
  console.log('ws onopen');
  ws.send('from client: hello');
};

ws.onhello = function (e) {
  console.log('ws onhello');
  console.log('from server: ' + e.data);
};