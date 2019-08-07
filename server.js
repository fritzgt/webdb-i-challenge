const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

//Create
server.post('/', async (req, res) => {
  const newData = req.body;
  try {
    const data = await db('accounts').insert(newData);
    res.status(200).json({ data });
  } catch {
    res.status(500).json({ message: 'Could not connect' });
  }
});

//Read
server.get('/', async (req, res) => {
  try {
    // const data = await db('accounts');
    const data = await db.select('*').from('accounts');
    res.status(200).json({ data });
  } catch {
    res.status(500).json({ message: 'Could not connect' });
  }
});

//Update
server.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  try {
  } catch {
    res.status(500).json({ message: 'Could not connect' });
  }
});

module.exports = server;
