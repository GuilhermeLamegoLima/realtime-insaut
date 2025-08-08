const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

io.on('connection', (socket) => {
  console.log('Usuário conectado:', socket.id);

  socket.on('novaMensagem', (data) => {
    io.emit('novaMensagem', data);
  });

  socket.on('disconnect', () => {
    console.log('Usuário desconectado:', socket.id);
  });
});

const PORT = 3001;
server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
