import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Substituir depois pela URL do servidor online

function App() {
  const [mensagem, setMensagem] = useState('');
  const [mensagemRecebida, setMensagemRecebida] = useState('');

  useEffect(() => {
    socket.on('novaMensagem', (data) => {
      setMensagemRecebida(data);
    });

    return () => {
      socket.off('novaMensagem');
    };
  }, []);

  const enviarMensagem = () => {
    socket.emit('novaMensagem', mensagem);
    setMensagem('');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Socket.IO com React</h1>
      <input value={mensagem} onChange={(e) => setMensagem(e.target.value)} />
      <button onClick={enviarMensagem}>Enviar</button>
      <h2>Mensagem recebida: {mensagemRecebida}</h2>
    </div>
  );
}

export default App;
