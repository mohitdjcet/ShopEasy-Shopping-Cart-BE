// server.js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const express = require('express');
const fetch = require('node-fetch'); // if not installed, run npm install node-fetch

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('/api/items', async (req, res) => {
    try {
      const response = await fetch('YOUR_API_ENDPOINT_HERE');
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Error fetching data' });
    }
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  createServer(server).listen(3000, (err) => {
    if (err) throw err;
    console.log('Server running on port 3000');
  });
});
