const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Koneksi MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Ganti dengan user MySQL Anda
  password: '', // Ganti dengan password MySQL Anda
  database: 'it_ticketing_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('Terhubung ke MySQL!');
});

// Buat tabel (jika belum ada)
db.query(`
  CREATE TABLE IF NOT EXISTS tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('open', 'pending', 'resolved') DEFAULT 'open',
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

// API: Buat tiket baru
app.post('/api/tickets', (req, res) => {
  const { title, description, priority } = req.body;
  const query = 'INSERT INTO tickets (title, description, priority) VALUES (?, ?, ?)';
  db.query(query, [title, description, priority], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({ id: result.insertId });
  });
});

// API: Ambil semua tiket
app.get('/api/tickets', (req, res) => {
  db.query('SELECT * FROM tickets', (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

// Jalankan server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});