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

// Aqui armazenamos o último estado enviado
let estadoAtual = null;

io.on('connection', (socket) => {
  console.log('Usuário conectado:', socket.id);

  // Quando um novo usuário entra, ele recebe o estado atual (se existir)
  if (estadoAtual) {
    socket.emit('novaMensagem', estadoAtual);
  }

  // Quando um usuário envia uma nova mensagem
  socket.on('novaMensagem', (data) => {
    estadoAtual = data; // Atualiza o estado atual
    io.emit('novaMensagem', data); // Emite para todos os conectados
  });

  socket.on('disconnect', () => {
    console.log('Usuário desconectado:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  });
});

const PORT = 3001;
server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
