const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  console.log('User connected');
  
  socket.on('newTicket', (ticket) => {
    io.emit('ticketCreated', ticket); // Broadcast ke semua admin
  });
});

// Ganti app.listen dengan:
server.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});