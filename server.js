const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

//Create
//Required the following fields:
//{
//"name": "Test"
//"budget": 123
//}
server.post('/', async (req, res) => {
  //Get data from body
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
    const data = await db.select('*').from('accounts');
    res.status(200).json({ data });
  } catch {
    res.status(500).json({ message: 'Could not connect' });
  }
});

//Read by ID
//Required a valid ID in the URL
server.get('/:id', async (req, res) => {
  //Get id from URL
  const { id } = req.params;
  try {
    //Logic, select all from accounts were the
    //id from the URL matches the id in DB
    const data = await db
      .select('*')
      .from('accounts')
      .where('id', '=', id);
    //Catch invalid ID converting to return object to string
    if (!`${data}`) {
      res.status(400).json({ message: `No accounts found with the id: ${id}` });
    } else {
      res.status(200).json({ data });
    }
  } catch {
    res.status(500).json({ Error: 'Could not connect' });
  }
});

//Update
//Required a valid ID in the URL
server.put('/:id', async (req, res) => {
  //Get the id from the URL
  const id = req.params.id;
  //Get the changes from the body
  const changes = req.body;
  try {
    //Logic, from the db when the id from URL matches
    //The id from db update with the changes
    const data = await db('accounts')
      .where('id', '=', id)
      .update(changes);
    //Check if the return object is 0/false = not a valid ID
    if (!data) {
      res.status(400).json({ message: `${id} is not a valid ID` });
    } else {
      res.status(200).json({ data });
    }
  } catch {
    res.status(500).json({ message: 'Could not connect' });
  }
});

//Delete
server.delete('/:id', async (req, res) => {
  //get id from url
  const { id } = req.params;
  try {
    const data = await db('accounts')
      .where('id', '=', id)
      .del();
    //Check if the return object is 0/false = not a valid ID
    if (!data) {
      res.status(400).json({ message: `${id} is not a valid ID` });
    } else {
      res.status(200).json({ data });
    }
  } catch {
    res.status(500).json({ message: 'Could not connect' });
  }
});

//Stretch
//how many different cities are stored in the Customers table

module.exports = server;
