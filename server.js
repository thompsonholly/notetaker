const express = require('express');
const path = require('path');
const notesData = require('./db/db.json');

// Helper functions for reading and writing to the JSON file
const { readFromFile, writeToFile, readAndAppend } = require('./helpers/fsUtils');

//console.log('random number', uniqueId());

const { v4: uuidv4 } = require('uuid')
const noteId = uuidv4()

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/notes', (req, res) => {
  //console.log('__dirname is', __dirname);
  //console.log('joined result:', path.join(__dirname, './public/notes.html'))
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  // when we hit this route, we want to read a file and then return its content in the form of json data

  // first we read the file--how do we do that using the built-in fs module belonging to Node
  // use the imported helper functions

  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});


app.post('/api/notes', (req, res) => {
  console.log(req.body);
  const noteToSave = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4()
  }
  readAndAppend(noteToSave, "./db/db.json")

  let response;
  if (req.body.title && req.body.text) {
    response = {
      status: 'Hooray',
      data: req.body,
    };
    res.json(`Note ${response.data.title} && ${response.data.text} has been added`)
  } else {
    res.json('All fields must have input.')
  }

  console.log(req.body);


});

// Delete note
app.delete("/api/notes/:id", (req, res) => {
  console.info(`${req.method} to delete note`);
  const reqID = req.params.id;

  // // Read notes from database 
  // fs.readFile(path.join(__dirname, databasePath), 'utf8', (err, data) => {
  //   if (err) return res.status(500).json({ status: "error", body: 'Error reading from database' });
  //   const database = JSON.parse(data);

  // Delete Item from Database
  const deletedItem = notesData.filter(item => item.id === reqID);
  notesData = notesData.filter(item => item.id !== reqID);
  fs.writeFile("./db/db.json", JSON.stringify(notesData), (err) => {
    if (err) return res.status(500).json({ status: "error", body: 'Error deleting item from database' });
    console.log(deletedItem);
    return res.status(200).json({ status: "success", body: deletedItem });
  });
});
// });




app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`))
