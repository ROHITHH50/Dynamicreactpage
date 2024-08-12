// index.js
const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3001;

// Middleware
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'QazPlm@12', // Update with your MySQL root password
  database: 'bannerDB'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// API Routes
app.get('/api/banner', (req, res) => {
  db.query('SELECT * FROM banner', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

app.post('/api/banner', (req, res) => {
  const { visible, description, timer, link } = req.body;
  db.query('INSERT INTO banner (visible, description, timer, link) VALUES (?, ?, ?, ?)', 
    [visible, description, timer, link], 
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ id: results.insertId });
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
const cors = require('cors');
app.use(cors());

