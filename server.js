const express = require('express');
const path = require('path');
const notesData = require('./db/db.json');

// Helper functions for reading and writing to the JSON file
const { readFromFile, writeToFile, readAndAppend } = require('./helpers/fsUtils');
const uniqueId = require('./helpers/uuid')
//console.log('random number', uniqueId());

const PORT = 3001;

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  //console.log('__dirname is', __dirname);
  //console.log('joined result:', path.join(__dirname, './public/notes.html'))
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  // when we hit this route, we want to read a file and then return its content in the form of json data

  // first we read the file--how do we do that using the built-in fs module belonging to Node
  // use the imported helper functions

  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})


//   app.post("/api/newuser", (req, res) => {


//     console.log(req.body)
//     const dataToSave = `
//   user: ${req.body.newuser}
//   email: ${req.body.email}
//   phone: ${req.body.phone}
// `

//     console.log(dataToSave)
//     fs.writeFile("signup.txt", dataToSave, (err) => {
//       if (err) return res.status(500).json({ status: "error" })
//       res.status(200).json({ status: "success" })
//     })
//   })


app.post("/api/notes", (req, res) => {

  const noteToSave = {
    title: req.body.title,
    text: req.body.text,
    id: uniqueId()
  }

  readAndAppend(noteToSave, "./db/db.json")


  // read your file contents first
  readFromFile('./db/db.json').then((existingNotesData) => {
    //res.json(JSON.parse(data)));
    // let's console what the existing notes look like, i.e is it an array, an object, etc
    console.log('Existing notes are:', existingNotesData);
    // add the new note to the file

    // overwrite or save the file again



    res.json("all good");
  })
  // fs.writeFile("note", noteToSave, (err) => {
  //   if (err) return res.status(500).json({ status: "error" })
  //   res.status(200).json({ status: "success" })
  // })
  writeToFile(noteToSave, existingNotesData)
})


app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
)
