const express = require('express');
const path = require('path');
const notesData = require('./develop/db/db.json');

const notes = require('./public/notes.html');
const noteRecord = require('./public/index.html');
const PORT = 3001;

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/notes', (req, res) => res.json(notesData));

app.post('/api/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a note`);

  app.post("/api/newuser", (req, res) => {


    console.log(req.body)
    const dataToSave = `
  user: ${req.body.newuser}
  email: ${req.body.email}
  phone: ${req.body.phone}
`

    console.log(dataToSave)
    fs.writeFile("signup.txt", dataToSave, (err) => {
      if (err) return res.status(500).json({ status: "error" })
      res.status(200).json({ status: "success" })
    })
  })

  app.listen(PORT, () =>
    console.log(`Express server listening on port ${PORT}!`)
  );


  app.post("/api/notes", (req, res) => {


    console.log(req.body)
    const noteToSave = `
  noteTitle: ${req.body.notTitle}
  noteTextarea: ${req.body.noteTextarea}
`

    console.log(noteToSave)
    fs.writeFile("note", noteToSave, (err) => {
      if (err) return res.status(500).json({ status: "error" })
      res.status(200).json({ status: "success" })
    })
  })
  app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
  })