import { useState } from 'react'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    createNote({
      content: newNote,
      important: false,
    })

    setNewNote('')
  }

  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input
          id="note-input"
          value={newNote}
          onChange={handleChange}
          placeholder="write here note content"
        />
        <button id="save-btn" type="submit">save</button>
      </form>
    </div>
  )
}

export default NoteForm
