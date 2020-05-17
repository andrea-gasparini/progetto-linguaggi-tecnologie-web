import io from 'socket.io-client';
const socket = io('http://localhost:3000', {reconnection: false}); // reconnection false, così non prova a connettersi automaticamente nel caso in cui il websocket non andasse.
export default socket;
