const form = document.querySelector("form");
const btn = document.querySelector("button");

const inputTitle = document.querySelector('[name = note-title]');
const inputNote = document.querySelector('[name = note-textarea]');



form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const noteTitle = inputTitle.value
  const noteTextarea = inputNote.value

  const noteData = {
    noteTitle: noteTitle,
    noteTextarea: noteTextarea

  }
  console.log(noteData)
  await fetch("/api/notes", {
    method: "POST",
    body: JSON.stringify(noteData),
    headers: {
      "Content-Type": "application/json"
    }
  })

})

