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

import React, { useState, useEffect } from 'react';
import './App.css';
import Banner from './Banner';

function App() {
  const [banner, setBanner] = useState({
    visible: false,
    description: '',
    timer: 0,
    link: ''
  });

  useEffect(() => {
    fetch('/api/banner')
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const bannerData = data[0]; // Assuming the first record is used
          setBanner(bannerData);
        }
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src="/logo.png" className="App-logo" alt="logo" />
        <h1>Dynamic One-Page Website</h1>
        <Banner
          visible={banner.visible}
          description={banner.description}
          timer={banner.timer}
          link={banner.link}
        />
      </header>
    </div>
  );
}

export default App;

useEffect(() => {
  fetch('http://localhost:3001/api/banner')  // Ensure the URL matches your backend's URL
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        const bannerData = data[0];  // Assuming you're using the first record
        setBanner(bannerData);
      }
    });
}, []);

app.put('/api/banner/:id', (req, res) => {
  const { id } = req.params;
  const { visible, description, timer, link } = req.body;
  db.query(
    'UPDATE banner SET visible = ?, description = ?, timer = ?, link = ? WHERE id = ?',
    [visible, description, timer, link, id],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: 'Banner updated successfully' });
    }
  );
});



