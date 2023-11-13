require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/chat', (req, res) => {
  res.render('index');
});

io.on('connection', (client) => {
  console.log('New user connected');
  client.on('chat message', (msg,name) => {
    io.emit('chat message', msg,name);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}.`);
});
